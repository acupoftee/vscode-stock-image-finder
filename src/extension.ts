// Extension flow
// User searches unplash with prompt command
// user sees a list of image options in a web view with the owner caption (either scrolling or pagination buttons trigger the next page of results (with first page cached))
// User clicks on a photo

// save for syntax highlighting
// <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css" rel="stylesheet" />
// <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/prism.min.js"></script>
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Track current panel with a webview
  let currentPanel: vscode.WebviewPanel | undefined = undefined;
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

      // const columnToShowIn = vscode.window.activeTextEditor
      //   ? vscode.window.activeTextEditor.viewColumn
      //   : undefined;

      if (currentPanel) {
        // Show the current panel in the target column with new search results
        // currentPanel.reveal(columnToShowIn);
        currentPanel.dispose();
      }
      try {
        const response = await fetch(
          `https://vscode-stock-image-finder-api-production.up.railway.app/photos?query=${query}`
        );
        const data: any = await response.json();
        const images = data.data.results;

        // Creates a new webview panel beside the active panel
        currentPanel = vscode.window.createWebviewPanel(
          "stock-image-finder",
          `Unsplash Images for ${query}`,
          vscode.ViewColumn.Beside,
          {}
        );

        const chunkSize = 10;
        const imageColumns = [];
        for (let i = 0; i < images.length; i += chunkSize) {
          const chunk = images
            .slice(i, i + chunkSize)
            .map(
              (image: any) =>
                `<div class="image"><img src="${image.urls.thumb}" /><span><b>${image.user.name}</b></span></div>`
            )
            .join("");
          imageColumns.push(chunk);
        }

        currentPanel.webview.html = getWebviewContent(query, imageColumns);

        // Reset the current panel after tab close
        currentPanel.onDidDispose(
          () => {
            currentPanel = undefined;
          },
          null,
          context.subscriptions
        );
      } catch (error) {
        vscode.window.showErrorMessage("Unable to fetch images." + error);
      }
    }
  );

  context.subscriptions.push(imageSearchCommand);
}

function getWebviewContent(query: string, images: any[]) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Gallery</title>
    <style>
      .body {
        max-width: 500px;
      }
      .image-grid {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .images {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        max-width: 600px;
      }
      .image-column {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .image {
        position: relative;
      }
      .image img { 
        width: 100%;
        height: 100%;
        margin-bottom: auto;
        object-fit: cover;
      }
      .image:hover {
        cursor: pointer;
      }
      .image > span {
        position: absolute;
        opacity: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.7);
        transition: opacity 0.25s ease;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-end;
        margin-bottom: auto;
      }
      .image span b {
        padding-left: 4px;
        padding-bottom: 4px;
      }
      .image:hover > span {
        opacity: 1;
      }
      .pagination {
        display: flex;
        width: auto;
        justify-content: center;
      }
    </style>
</head>
<body>
    <div class="image-grid">
        <p>Showing results for ${query}</p>
        <div class="images">
            ${images
              .map((imageColumn) => {
                return `<div class="image-column">${imageColumn}</div>`;
              })
              .join("")}
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
