import { searchImages } from "../api/Api";
import { PhotoResponse } from "../api/types";
import { Store } from "../store/Store";
import { ErrorScreen } from "../views/ErrorView";
import { ImageDetail } from "../views/ImageDetailView";
import { ImageList } from "../views/ImageListView";
import { LoadingScreen } from "../views/LoadingScreenView";

/**
 * Used to manage the state of the Stock Image Finder
 */
export class StockImageFinderController {
  private readonly updateHtml: (html: string) => void;
  private readonly store: Store = Store.getInstance();

  constructor(updateHtml: (html: string) => void) {
    this.updateHtml = updateHtml;

    // Monitors updates to the current state
    this.store.subscribe(() => {
      this.render();
    });
  }

  /**
   * Searches the Unsplash API for the query provided in the window input
   * @param query the search string provided upon activation
   */
  async handleSearch(query: string) {
    this.store.setState({ view: "loading" });

    try {
      const { images, totalPages } = await searchImages(query);
      this.store.updateCache(query, images, totalPages);
      this.store.setState({ query, totalPages, page: 1, view: "list" });
    } catch (error) {
      this.store.setState({ view: "error" });
      console.error(error);
    }
  }

  /**
   * Paginates the search results of the !nsplash API
   * @param direction
   */
  async handlePagination(direction: "next" | "prev") {
    const state = this.store.getState();

    if (direction === "prev") {
      this.store.setState({ page: Math.max(1, state.page - 1), view: "list" });
    } else {
      if (state.page === state.totalPages) {
        return;
      }

      const newPage = Math.min(state.totalPages, state.page + 1);
      this.store.setState({ view: "loading" });

      try {
        const { images } = await searchImages(state.query, newPage);
        this.store.updateCache(state.query, images, state.totalPages);
        this.store.setState({ page: newPage, view: "list" });
      } catch (error) {
        this.store.setState({ view: "error" });
        console.error(error);
      }
    }
  }

  /**
   * Given an iamgeId from the `data-imageid` attribute, render the image selection page
   * @param imageId the id found in the `data-imageid` attribute
   */
  handleImageSelection(imageId: string) {
    const state = this.store.getState();
    const image = state.cache[`${state.query}-${state.page}`].find(
      ({ id }: Partial<PhotoResponse>) => id === imageId
    );
    this.store.setState({ selectedImage: image, view: "image" });
  }

  handleBack() {
    this.store.setState({ selectedImage: null, view: "list" });
  }

  // Return content based on current view in state
  render() {
    const state = this.store.getState();
    let html = "";
    switch (state.view) {
      case "list":
        html = ImageList({
          query: state.query,
          images: state.cache[`${state.query}-${state.page}`] ?? [],
          page: state.page,
          totalPages: state.totalPages,
        });
        break;
      case "image":
        html = ImageDetail(state.selectedImage!); // Required for rendering
        break;
      case "loading":
        html = LoadingScreen({ page: state.page, pages: state.totalPages });
        break;
      case "error":
        html = ErrorScreen();
        break;
    }

    this.updateHtml(html);
  }
}
