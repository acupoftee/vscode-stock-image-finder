import * as vscode from "vscode";
import { StockImageFinderController } from "./controller/Controller";
import { Store } from "./store/Store";
/**
 * Web view panel for Stock Image Finder
 */
export class StockImageFinderPanel {
  public static currentPanel: StockImageFinderPanel | undefined;

  private readonly _panel: vscode.WebviewPanel;
  private readonly _controller: StockImageFinderController;
  private _disposables: vscode.Disposable[] = [];

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._controller = new StockImageFinderController(
      extensionUri,
      this._panel.webview,
      (html) => (this._panel.webview.html = html)
    );

    this._panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case "paginate":
          await this._controller.handlePagination(message.direction);
          break;
        case "viewImage":
          await this._controller.handleImageSelection(message.image);
          break;
        case "back":
          await this._controller.handleBack();
          break;
        case "copy":
          await this._controller.handleCopy();
          break;
        case "download":
          break;
      }
    });

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programmatically
    this._panel.onDidDispose(() => this._dispose(), null, this._disposables);

    this._controller.render();
  }

  public static createOrShow(extensionUri: vscode.Uri, query: string) {
    Store.getInstance().setState({ query });

    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    if (StockImageFinderPanel.currentPanel) {
      StockImageFinderPanel.currentPanel._panel.reveal(column);
      StockImageFinderPanel.currentPanel._controller
        .handleSearch(query)
        .catch(() => Store.getInstance().setState({ view: "error" }));
      return;
    } else {
      const panel = vscode.window.createWebviewPanel(
        "stock-image-finder",
        `Unsplash Search Results`,
        vscode.ViewColumn.Beside,
        {
          enableScripts: true,
          localResourceRoots: [vscode.Uri.joinPath(extensionUri, "media")],
        }
      );

      StockImageFinderPanel.currentPanel = new StockImageFinderPanel(
        panel,
        extensionUri
      );
    }
  }

  private _dispose() {
    StockImageFinderPanel.currentPanel = undefined;

    this._panel.dispose();

    Store.getInstance().unsubscribe();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }
}
