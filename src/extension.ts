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
      // Creates a new webview panel beside the active panel
      const panel = vscode.window.createWebviewPanel(
        "stock-image-finder",
        `Unsplash Images for ${query}`,
        vscode.ViewColumn.Beside,
        {}
      );
      panel.webview.html = getWebviewContent();
    }
  );

  context.subscriptions.push(imageSearchCommand);
}

function getWebviewContent() {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Gallery</title>
    <style>
        .images {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}

.image {
    width: auto;
    height: 250px;
    background-color: pink;
}

.pagination {
    display: flex;
    width: auto;
    justify-content: cener;
}
    </style>
</head>
<body>
    <div class="image-grid">
        <div class="images">
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
            <div class="image"></div>
        </div>
        <div class="pagination-controls">
            <button disabled>Previous</button>
            <button>Next</button>
        </div>
    </div>
    <div class="selected-image">
        <div class="image-container"></div>
        <div class="image-caption"></div>
        <div class="image-code-snippet"></div>
    </div>
</body>
</html>
  `;
}
export function deactivate() {}
