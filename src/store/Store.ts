import { PhotoResponse } from "../api/types";

export type ExtensionState = {
  page: number;
  totalPages: number;
  query: string;
  cache: Record<string, PhotoResponse[]>;
  selectedImage: PhotoResponse | null;
  view: View;
};

type Listener = () => void;

type View = "loading" | "list" | "image" | "error";

export class Store {
  private static instance: Store;
  private state: ExtensionState = {
    view: "loading",
    query: "",
    page: 1,
    totalPages: 1,
    cache: {},
    selectedImage: null,
  };

  private listeners: Listener[] = [];

  private constructor() {}

  // Ensures there is only one usable instance of the global store to prevent unwarranted mutations
  static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  getState(): ExtensionState {
    return this.state;
  }

  setState(partial: Partial<ExtensionState>) {
    this.state = { ...this.state, ...partial };
    this.notify();
  }

  updateCache(query: string, images: PhotoResponse[], page: number) {
    this.state.cache[`${query}-${page}`] = images; // Requests are paginated via separate URLs
  }

  // Used for invoking a functino that is depending on a state change
  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  // Used for teardown once the panel has been disposed (i.e. dismissed)
  unsubscribe(listener: Listener) {
    this.listeners.filter((unsub) => unsub !== listener);
  }

  // Invokes functions subscribed to state changes in the controller
  private notify() {
    this.listeners.forEach((listener) => listener());
  }
}
