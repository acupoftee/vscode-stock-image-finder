import * as vscode from "vscode";

export const ViewWrapper = (
  webview: vscode.Webview,
  extensionUri: vscode.Uri,
  children: string,
  nonce: string
) => {
  const styleResetPath = vscode.Uri.joinPath(
    extensionUri,
    "media",
    "reset.css"
  );
  const stylesPathVSCodePath = vscode.Uri.joinPath(
    extensionUri,
    "media",
    "vscode.css"
  );
  const stylesPathMainPath = vscode.Uri.joinPath(
    extensionUri,
    "media",
    "style.css"
  );

  const stylesResetUri = webview.asWebviewUri(styleResetPath);
  const stylesVSCodeUri = webview.asWebviewUri(stylesPathVSCodePath);
  const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);

  return `
    <!DOCTYPE html>
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
    <body>
        <div id="root">${children}</div>
    </body>
    </html>
  `;
};
