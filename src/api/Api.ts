import { PhotoResponse } from "./types";

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
  const response = await fetch(
    `https://vscode-stock-image-finder-api-production.up.railway.app/photos?query=${query}&page=${page}`
  );
  const data: any = await response.json();
  const images = data.data.results;
  const totalPages = data.total_pages;

  return {
    images,
    totalPages,
  };
};
