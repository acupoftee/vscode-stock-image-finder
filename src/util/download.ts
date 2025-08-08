import fs from "fs-extra";
import path from "path";
import { Readable } from "stream";
import { finished } from "stream/promises";
import * as vscode from "vscode";

// Used to check if a file exists
const getAvailableFilePath = (filePath: string): string => {
  const extension = path.extname(filePath);
  const basename = path.basename(filePath, extension);
  const dir = path.dirname(filePath);

  let counter = 1;
  let newFilePath = filePath;

  while (fs.existsSync(newFilePath)) {
    newFilePath = path.join(dir, `${basename} (${counter})${extension}`);
    counter++;
  }
  return newFilePath;
};

/**
 * Downloads image to the workspace folder
 * @param url
 * @param filename
 */
export const downloadImage = async (url: string, filename: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
    if (!response.body) {
      vscode.window.showErrorMessage("Unable to download image: no content.");
      return;
    }

    const workspace = vscode.workspace.workspaceFolders?.[0].uri.fsPath;

    if (!workspace) {
      vscode.window.showErrorMessage(
        "Unable to download image: workspace folder not found."
      );
      return;
    }

    const filepath = getAvailableFilePath(path.join(workspace, filename));
    const writer = fs.createWriteStream(filepath, { flags: "wx" });

    await finished(Readable.fromWeb(response.body).pipe(writer));
    vscode.window.showInformationMessage(
      `Successfully downloaded ${filepath} in workspace.`
    );
  } catch (error) {
    vscode.window.showErrorMessage(
      "Unable to download image. Please try again."
    );
    console.error(error);
  }
};
