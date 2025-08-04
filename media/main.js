(() => {
    const vscode = acquireVsCodeApi();
    console.log('vscode extension is working!')

    document.getElementById('nextBtn').addEventListener('click', () => {
        vscode.postMessage({ command: 'next' });
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        vscode.postMessage({ command: 'previous' });
    });
})();