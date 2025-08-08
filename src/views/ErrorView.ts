export const ErrorScreen = (nonce: string) =>
  ` 
        <div class="image-grid">
            <p>Error loading results</p>
            <button id="retryBtn">Retry</button>
        </div>
        <script nonce=${nonce}>
          const vscode = acquireVsCodeApi();
          document.getElementById("retryBtn").addEventListener('click', () => {
            vscode.postMessage({ command: "retry" });
          });
        </script>
  `;
