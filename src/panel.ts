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
        case "next":
        case "previous":
          await this._controller.handlePagination(message.command);
          break;
        case "viewImage":
          await this._controller.handleImageSelection(message.image);
          break;
        case "back":
          await this._controller.handleBack();
          break;
        case "download":
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

    this._controller.render();
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

    // Because we're creating an instance where the controller is initialized,
    // we need to invoke the state change to populate the search results
    Store.getInstance().setState({ query });

    StockImageFinderPanel.currentPanel = new StockImageFinderPanel(
      panel,
      extensionUri
    );
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
}
