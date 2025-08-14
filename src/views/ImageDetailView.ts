import { PhotoResponse } from "../api/types";

export const ImageDetail = (image: PhotoResponse, nonce: string) => {
  const formattedCodeBlock = `
    &lt;img src="${image.urls.regular}" alt="${image.alt_description}" /&gt;
    &lt;!-- Attribution --&gt; 
    &lt;p&gt;Photo by &lt;a href="${image.links.html}"&gt;${image.user.name}&lt;/a&gt; on &lt;a href="https://www.unsplash.com"&gt;Unsplash&lt;/a&gt;&lt;/p&gt;
    `;

  const formattedCSS = `
    background-image: url("${image.urls.regular}");
    background-size: cover;
    background-repeat: no-repeat;
    `;

  return `
    <div class="selected-image">
        <div class="image-display">
            <img src=${image.urls.small} alt=${image.alt_description}/>
              <p>Photo by <a href="${image.user.links.html}?utm_source=vscode-stock-image-finder&utm_medium=referral">${image.user.name}</a> on <a href="https://www.unsplash.com">Unsplash</a></p>
        </div>
        <br></br>
        <div class="code-block">
            <h3 class="block-title">HTML</h3>
            <div class="code-container">
              <code id="html-text">
              ${formattedCodeBlock}
              </code>
              <button class="copy-code secondary" id="copy-html">Copy</button>
            </div>
          </div>
        <div class="code-block">
            <h3 class="block-title">CSS</h3>
            <div class="code-container">
              <code id="css-text">
                ${formattedCSS}
              </code>
              <button class="copy-code secondary" id="copy-css">Copy</button>
            </div>
        </div>
        <div class="image-actions">
            <button id="download">Download</button>
            <button id="back">Back</button>
        </div>
      </div>
      <script nonce="${nonce}">
        const vscode = acquireVsCodeApi();
        document.getElementById('back').addEventListener('click', () => {
          vscode.postMessage({ command: 'back' });
        });
        document.getElementById('download').addEventListener('click', () => {
          vscode.postMessage({ command: 'download', url: '${image.links.download}', filename: '${image.slug}.jpg' });
        });
        document.getElementById('copy-html').addEventListener('click', (e) => {
          event.target.style.display = "none";
          const preHtml = document.getElementById('html-text');
          copyText(event, preHtml);
          vscode.postMessage({ command: "copy" });
        });
        document.getElementById('copy-css').addEventListener('click', (e) => {
          event.target.style.display = "none";
          const preCss = document.getElementById('css-text');
          copyText(event, preCss);
          vscode.postMessage({ command: "copy" });
        });

        function copyText(event, node) {
          const range = document.createRange();
          range.selectNode(node);
          window.getSelection().addRange(range);
          navigator.clipboard.writeText(node.innerText);
  
          event.target.innerText = "Copied!"
          setTimeout(() => {
            event.target.innerText = "Copy";
          }, 2000);

          event.target.style.display = "block";
          window.getSelection().removeAllRanges();
        }
      </script>
    `;
};
