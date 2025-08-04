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
  private _totalPages: number | null = null;
  private _cache: any = {};

  private constructor(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    query: string
  ) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._query = query;

    this._panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case "next":
          this._currentPage = this._currentPage + 1;
          this._panel.webview.html = this._getHtmlForWebview(
            this._panel.webview,
            this._createLoadingScreen(this._currentPage, this._totalPages!)
          );
          await this._updatePage(this._query, this._currentPage);
          break;
        case "previous":
          this._currentPage = this._currentPage - 1;
          this._panel.webview.html = this._getHtmlForWebview(
            this._panel.webview,
            this._createLoadingScreen(this._currentPage, this._totalPages!)
          );
          await this._updatePage(this._query, this._currentPage);
          break;
        case "viewImage":
          const code = await this._createImageDisplay(
            this._getImage(this._query, this._currentPage, message.data)
          );
          this._panel.webview.html = this._getHtmlForWebview(
            this._panel.webview,
            code
          );
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

    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private _getImage(query: string, page: number, imageId: string) {
    const result = this._cache[`${query}-${page}`].results.find(
      (image: any) => image.id === imageId
    );
    return result;
  }

  private async _updatePage(query: string, page: number) {
    if (this._cache[`${query}-${page}`]) {
      this._panel.webview.html = this._getHtmlForWebview(
        this._panel.webview,
        this._cache[`${query}-${page}`].html
      );
      return;
    }
    try {
      const response = await fetch(
        `https://vscode-stock-image-finder-api-production.up.railway.app/photos?query=${query}&page=${page}`
      );
      const data: any = await response.json();
      const images: any = data.data.results;
      const totalPages: number = data.data.total_pages;
      const galleryHtml: string = this._createImageGallery(
        images,
        page,
        totalPages
      );

      this._currentPage = page;
      this._totalPages = totalPages;
      this._cache[`${query}-${page}`] = {
        results: images,
        html: galleryHtml,
      };
      this._panel.webview.html = this._getHtmlForWebview(
        this._panel.webview,
        galleryHtml
      );
    } catch (error) {
      vscode.window.showErrorMessage("Unable to fetch images." + error);
    }
  }

  private _createLoadingScreen(currentPage: number, totalPages: number) {
    return `
        <div class="image-grid">
            <p>Loading...</p>
            <div class="pagination-controls">
                <button id="prevBtn" disabled>Previous</button>
                <button id="nextBtn" disabled>Next</button>
            </div>
            <p>Page ${currentPage} of ${totalPages}</p>
        </div>`;
  }

  private _createImageGallery(
    images: any,
    currentPage: number,
    totalPages: number
  ) {
    const chunkSize = 10;
    const imageColumns = [];
    for (let i = 0; i < images.length; i += chunkSize) {
      const chunk = images
        .slice(i, i + chunkSize)
        .map(
          (image: any) =>
            `<div class="image" data-imageid="${image.id}"><img src="${image.urls.thumb}" /><span class="image-caption"><b>${image.user.name}</b></span></div>`
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
            <p>Page ${currentPage} of ${totalPages}</p>
        </div>`;
  }

  private async _createImageDisplay(image: any) {
    const formattedCodeBlock = `
    &lt;img src="${image.urls.regular}" alt="${image.alt_description}" /&gt;
    &lt;!-- Attribution --&gt; 
    &lt;p&gt;Photo by &lt;a href="${image.links.html}"&gt;${image.user.name}&lt;/a&gt; on &lt;ahref="https://www.unsplash.com"&gt;Unsplash&lt;/a&gt;&lt;/p&gt;
    `;

    const formattedCSS = `
    background-image: url("${image.urls.regular}");
    background-size: cover;
    background-repeat: no-repeat;
    `;
    return `
    <div class="selected-image">
        <div class="header">
            <div class="author">
            </div>
        </div>
        <div class="image-display">
            <img src=${image.urls.small} alt=${image.alt_description}/>
              <p>Photo by <a href="${image.links.html}?utm_source=vscode-stock-image-finder&utm_medium=referral">Michael Afonso</a> on <ahref="https://www.unsplash.com">Unsplash</a></p>
        </div>
        <br></br><br></br>
        <div class="code-block">
            <h3>HTML</h3>
            <pre>
              ${formattedCodeBlock}
            </pre>
          </div>
        <div class="code-block">
            <h3>CSS</h3>
            <pre>
              ${formattedCSS}
            </pre>
        </div>
        <div class="image-actions">
            <button>Download</button>
            <button>Back</button>
        </div>
      </div>
    `;
  }

  private _getHtmlForWebview(webview: vscode.Webview, content: any) {
    const scriptPathOnDisk = vscode.Uri.joinPath(
      this._extensionUri,
      "media",
      "main.js"
    );
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

    const scriptUri = webview.asWebviewUri(scriptPathOnDisk);
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
  				<title>Stock Image Finder Results</title>
  			</head>
  			<body id="content">
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
