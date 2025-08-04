(() => {
    const vscode = acquireVsCodeApi();

    document.getElementById('nextBtn').addEventListener('click', () => {
        vscode.postMessage({ command: 'next' });
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        vscode.postMessage({ command: 'previous' });
    });
})();