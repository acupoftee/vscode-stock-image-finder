console.log('vscode extension is working!')

      // try {
      //   const response = await fetch(
      //     `https://vscode-stock-image-finder-api-production.up.railway.app/photos?query=${query}`
      //   );
      //   const data: any = await response.json();
      //   const images = data.data.results;

      //   const chunkSize = 10;
      //   const imageColumns = [];
      //   for (let i = 0; i < images.length; i += chunkSize) {
      //     const chunk = images
      //       .slice(i, i + chunkSize)
      //       .map(
      //         (image: any) =>
      //           `<div class="image"><img src="${image.urls.thumb}" /><span><b>${image.user.name}</b></span></div>`
      //       )
      //       .join("");
      //     imageColumns.push(chunk);
      //   }

      // } catch (error) {
      //   vscode.window.showErrorMessage("Unable to fetch images." + error);
      // }