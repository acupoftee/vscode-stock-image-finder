import { PhotoResponse } from "../api/types";

const createGalleryHtml = (images: PhotoResponse[]) => {
  const chunkSize = 10;
  const imageColumns = [];

  for (let i = 0; i < images.length; i += chunkSize) {
    const chunk = images
      .slice(i, i + chunkSize)
      .map(
        (image: PhotoResponse) =>
          `<div class="image" data-imageid="${image.id}"><img src="${image.urls.thumb}" /><span class="image-caption"><b>${image.user.name}</b></span></div>`
      )
      .join("");
    imageColumns.push(chunk);
  }

  return imageColumns
    .map((images) => `<div class="image-column">${images}</div>`)
    .join("");
};

type ImagesProps = {
  query: string;
  images: PhotoResponse[];
  page: number;
  totalPages: number;
  nonce: string;
};

export const ImageList = ({
  query,
  images,
  page,
  totalPages,
  nonce,
}: ImagesProps) =>
  `
        <div class="image-grid">
            <p>Showing results for <span id="query">${query}</span></p>
            <div class="images">${createGalleryHtml(images)}</div>
            <div class="pagination-controls">
                <button id="prevBtn" ${
                  page === 1 ? "disabled" : ""
                }>Previous</button>
                <button id="nextBtn" ${
                  page === totalPages ? "disabled" : ""
                }>Next</button>
            </div>
            <p>Page ${page} of ${totalPages}</p>
        </div>
        <script nonce="${nonce}">
            const vscode = acquireVsCodeApi();
            document.getElementById('nextBtn').addEventListener('click', () => {
                vscode.postMessage({ command: 'paginate', diretion: 'next' });
            });
            document.getElementById('prevBtn').addEventListener('click', () => {
                vscode.postMessage({ command: 'paginate', direction: 'prev' });
            });
            document.querySelector('.images').addEventListener('click', event => {
                const image = event.target.closest('.image');
                if (!image) {
                    return;
                }
                vscode.postMessage({ command: 'viewImage', image: image.getAttribute("data-imageid") });
            });
        </script>
  `;
