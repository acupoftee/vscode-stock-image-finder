import { PhotoResponse } from "../api/types";

export const ImageDetail = (image: PhotoResponse) => {
  const formattedCodeBlock = `
    &lt;img src="${image.urls.regular}" alt="${image.alt_description}" /&gt;
    &lt;!-- Attribution --&gt; 
    &lt;p&gt;Photo by &lt;a href="${image.links.html}"&gt;${image.user.name}&lt;/a&gt; on &lt;ahref="https://www.unsplash.com"&gt;Unsplash&lt;/a&gt;&lt;/p&gt;
    `;

  const formattedCSS = `
    background-image: url("${image.urls.regular}");
    background-size: cover;
    background-repeat: no-repeat;
    `;

  return `
    <div class="selected-image">
        <div class="header">
            <div class="author">
            </div>
        </div>
        <div class="image-display">
            <img src=${image.urls.small} alt=${image.alt_description}/>
              <p>Photo by <a href="${image.links.html}?utm_source=vscode-stock-image-finder&utm_medium=referral">Michael Afonso</a> on <ahref="https://www.unsplash.com">Unsplash</a></p>
        </div>
        <br></br><br></br>
        <div class="code-block">
            <h3>HTML</h3>
            <pre>
              ${formattedCodeBlock}
            </pre>
          </div>
        <div class="code-block">
            <h3>CSS</h3>
            <pre>
              ${formattedCSS}
            </pre>
        </div>
        <div class="image-actions">
            <button>Download</button>
            <button>Back</button>
        </div>
      </div>
    `;
};
