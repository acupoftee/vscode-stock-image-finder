// Extension flow
// User searches unplash with prompt command
// user sees a list of image options in a web view with the owner caption (either scrolling or pagination buttons trigger the next page of results (with first page cached))
// User clicks on a photo

// save for syntax highlighting
// <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css" rel="stylesheet" />
// <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/prism.min.js"></script>

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import * as vscode from "vscode";

// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {
//   // Use the console to output diagnostic information (console.log) and errors (console.error)
//   // This line of code will only be executed once when your extension is activated
//   console.log(
//     'Congratulations, your extension "stock-image-finder" is now active!'
//   );

//   // The command has been defined in the package.json file
//   // Now provide the implementation of the command with registerCommand
//   // The commandId parameter must match the command field in package.json
//   const disposable = vscode.commands.registerCommand(
//     "stock-image-finder.helloWorld",
//     () => {
//       // The code you place here will be executed every time your command is executed
//       // Display a message box to the user
//       vscode.window.showInformationMessage(
//         "Hello World from Stock Image Finder!"
//       );
//     }
//   );

//   context.subscriptions.push(disposable);
// }

// // This method is called when your extension is deactivated
// export function deactivate() {}

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

// called when extension is deactivated
export function deactivate() {}
