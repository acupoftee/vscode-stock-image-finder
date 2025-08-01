// Extension flow
// User searches unplash with prompt command
// user sees a list of image options in a web view with the owner caption (either scrolling or pagination buttons trigger the next page of results (with first page cached))
// User clicks on a photo

// save for syntax highlighting
// <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css" rel="stylesheet" />
// <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/prism.min.js"></script>
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('"stock-image-fimder" is now active!');

  const imageSearchCommand = vscode.commands.registerCommand(
    "stock-image-finder.findUnsplashImage",
    async () => {
      const query = await vscode.window.showInputBox({
        placeHolder: "Find an Unsplash Image",
        prompt: "Search Unplash Images",
      });
      if (!query) {
        vscode.window.showWarningMessage(`Please include valid search query`);
        return;
      }
      vscode.window.showInformationMessage(`Unsplash query: ${query}`);
    }
  );

  context.subscriptions.push(imageSearchCommand);
}

export function deactivate() {}
