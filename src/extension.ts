// Extension flow
// User searches unplash with prompt command
// user sees a list of image options in a web view with the owner caption (either scrolling or pagination buttons trigger the next page of results (with first page cached))
// User clicks on a photo

// save for syntax highlighting
// <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css" rel="stylesheet" />
// <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/prism.min.js"></script>
import * as vscode from "vscode";
import { StockImageFinderPanel } from "./panel";

export function activate(context: vscode.ExtensionContext) {
  // Technical Guidelines
  // All API uses must use the hotlinked image URLs returned by the API under the photo.urls  properties.
  // This applies to all uses of the image and not just search results.

  // When your application performs something similar to a download (like when a user chooses the image to include in a blog post, set as a header, etc.),
  // you must send a request to the download endpoint returned under the photo.links.download_location  property.

  // When displaying a photo from Unsplash, your application must attribute Unsplash, the Unsplash photographer, and contain a link back to their Unsplash profile.
  // All links back to Unsplash should use utm parameters in the ?utm_source=your_app_name&utm_medium=referral.

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
      return StockImageFinderPanel.createOrShow(context.extensionUri, query);
    }
  );

  context.subscriptions.push(imageSearchCommand);
}

export function deactivate() {}
