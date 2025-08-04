(() => {
    const vscode = acquireVsCodeApi();

    const next = document.getElementById('nextBtn');
    const prev = document.getElementById('prevBtn');

    if (next && prev) {
        next.addEventListener('click', () => {
            vscode.postMessage({ command: 'next' });
        });
        prev.addEventListener('click', () => {
            vscode.postMessage({ command: 'previous' });
        });
        document.querySelector('.images').addEventListener('click', event => {
            const image = event.target.closest('.image');
            if (!image) {
                return;
            }
        
            vscode.postMessage({ command: "viewImage", data: image.getAttribute("data-imageid") });
        });
    }
})();