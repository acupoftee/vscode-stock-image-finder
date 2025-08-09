import { PhotoResponse } from "./types";
// const URL = "https://vscode-stock-image-finder-api-production.up.railway.app";

const URL = "http://localhost:3000";
/**
 * Searches for Unsplash images based on a search query, and the current page. The endpoint returns 30 images at a time.
 * @param query search query
 * @param page the current page (defaults to 1)
 * @returns an Object containing 30 images, and the total number of pages
 */
export const searchImages = async (
  query: string,
  page: number = 1
): Promise<{ images: PhotoResponse[]; totalPages: number }> => {
  const response = await fetch(`${URL}/photos?query=${query}&page=${page}`);
  const data: any = await response.json();
  const images = data.data.results;
  const totalPages = data.data.total_pages;

  return {
    images,
    totalPages,
  };
};

/**
 * Increments the download counter in the Unsplash API
 * @param url the download location url
 */
export const incrementDownload = async (url: string): Promise<void> => {
  await fetch(`${URL}/download`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ url }),
  });
};
