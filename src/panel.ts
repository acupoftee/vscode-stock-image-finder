import * as vscode from "vscode";
/**
 * Web view panel for Stock Image Finder
 */
export class StockImageFinderPanel {
  public static currentPanel: StockImageFinderPanel | undefined;

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private readonly _query: string;
  private _disposables: vscode.Disposable[] = [];
  private _currentPage: number = 1;
  private _totalPages: number = 0;
  private _cache: any = {};

  private constructor(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    query: string
  ) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._query = query;

    // Listen for events from the client
    this._panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case "next":
          console.log("clicked next");
          await this._updatePage(this._query, this._currentPage + 1);
          break;
        case "previous":
          console.log("clicked previous");
          await this._updatePage(this._query, this._currentPage - 1);
          break;
      }
    });

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programmatically
    this._panel.onDidDispose(
      () => this._panel.dispose(),
      null,
      this._disposables
    );
  }

  public static createOrShow(extensionUri: vscode.Uri, query: string) {
    if (StockImageFinderPanel.currentPanel) {
      StockImageFinderPanel.currentPanel._panel.dispose();
    }

    // Creates a new webview panel beside the active panel
    const panel = vscode.window.createWebviewPanel(
      "stock-image-finder",
      `Unsplash Search Results`,
      vscode.ViewColumn.Beside,
      {
        // Enable javascript in the webview
        enableScripts: true,
        // And restrict the webview to only loading content from our extension's `media` directory.
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, "media")],
      }
    );

    StockImageFinderPanel.currentPanel = new StockImageFinderPanel(
      panel,
      extensionUri,
      query
    );

    StockImageFinderPanel.currentPanel
      ._updatePage(query, 1)
      .catch(console.error);
  }

  public dispose() {
    StockImageFinderPanel.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private async _updatePage(query: string, page: number) {
    try {
      const response = await fetch(
        `https://vscode-stock-image-finder-api-production.up.railway.app/photos?query=${query}&page=${page}`
      );
      const data: any = await response.json();
      const images: any = data.data.results;

      const galleryHtml = this._createImageGallery(images);
      this._totalPages = data.total_pages;
      this._currentPage = page;
      this._cache[`${query}-${page}`] = galleryHtml;
      this._panel.webview.html = this._getHtmlForWebview(
        this._panel.webview,
        galleryHtml
      );
    } catch (error) {
      vscode.window.showErrorMessage("Unable to fetch images." + error);
    }
  }

  private _createImageGallery(images: any) {
    const chunkSize = 10;
    const imageColumns = [];
    for (let i = 0; i < images.length; i += chunkSize) {
      const chunk = images
        .slice(i, i + chunkSize)
        .map(
          (image: any) =>
            `<div class="image"><img src="${image.urls.thumb}" /><span class="image-caption"><b>${image.user.name}</b></span></div>`
        )
        .join("");
      imageColumns.push(chunk);
    }

    const columnHtml = imageColumns
      .map((images) => `<div class="image-column">${images}</div>`)
      .join("");

    return `
        <div class="image-grid">
            <p>Showing results for <span id="query">${this._query}</span></p>
            <div class="images">${columnHtml}</div>
            <div class="pagination-controls">
                <button id="prevBtn">Previous</button>
                <button id="nextBtn">Next</button>
            </div>
        </div>`;
  }

  private _createImageDisplay(image: any) {
    return `
    <div class="selected-image">
        <div class="header">
            <div class="author">
            </div>
            <div class="download">
                <button>Download</button>
            </div>
            <div class="back">
                <button>Back</button>
            </div>
        </div>
        <div class="image-display">
            <img src=${image.urls.regular} alt=${image.alt_description}/>
        </div>
        <div class="image-use">
            <div class="sizes">
                <button>Small</button>
                <button>Medium</button>
                <button>Large</button>
                <button>Full</button>
            </div>
            <div class="code-snippet">
                <div class="tab-list">
                    <button>HTML</button>
                    <button>CSS</button>
                </div>
                <div class="code-block">
                    <pre>
                    <code class="language-html">
&lt;img src=${image.urls.full}
    alt=${image.alt_description} /&gt;
&lt;!-- Attribution --&gt;
&lt;p&gt;Photo by &lt;a href=${image.links.html}&gt;${image.user.name}&lt;/a&gt;on&lt;a href="https://www.unsplash.com"&gt;Unsplash&lt;/a&gt;&lt;/p&gt;
</code>
                    </pre>
                </div>
<div class="code-block">
</div>
            </div>
        </div>

    </div>
    `;
  }

  private _getHtmlForWebview(webview: vscode.Webview, content: string) {
    // Local path to main script run in the webview
    const scriptPathOnDisk = vscode.Uri.joinPath(
      this._extensionUri,
      "media",
      "main.js"
    );

    // And the uri we use to load this script in the webview
    const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

    // Local path to css styles
    const styleResetPath = vscode.Uri.joinPath(
      this._extensionUri,
      "media",
      "reset.css"
    );
    const stylesPathVSCodePath = vscode.Uri.joinPath(
      this._extensionUri,
      "media",
      "vscode.css"
    );
    const stylesPathMainPath = vscode.Uri.joinPath(
      this._extensionUri,
      "media",
      "style.css"
    );

    // Uri to load styles into webview
    const stylesResetUri = webview.asWebviewUri(styleResetPath);
    const stylesVSCodeUri = webview.asWebviewUri(stylesPathVSCodePath);
    const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);

    // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce();

    return `<!DOCTYPE html>
  			<html lang="en">
  			<head>
  				<meta charset="UTF-8">

  				<!--
  					Use a content security policy to only allow loading images from https or from our extension directory,
  					and only allow scripts that have a specific nonce.
  				-->
  				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">

  				<meta name="viewport" content="width=device-width, initial-scale=1.0">

  				<link href="${stylesResetUri}" rel="stylesheet">
                <link href="${stylesVSCodeUri}" rel="stylesheet">
  				<link href="${stylesMainUri}" rel="stylesheet">

  				<title>Stock Image Finder Results for ${this._query}</title>
  			</head>
  			<body>
          ${content}
  				<script nonce="${nonce}" src="${scriptUri}"></script>
  			</body>
  			</html>`;
  }
}

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
