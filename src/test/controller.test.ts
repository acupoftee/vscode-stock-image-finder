import * as assert from "assert";
import * as vscode from "vscode";
import { beforeEach, afterEach, describe, it } from "mocha";
import sinon from "sinon";
import { Store } from "../store/Store";
import { StockImageFinderController } from "../controller/Controller";
import { mockResponse } from "./mocks";
import * as api from "../api/Api";
import * as view from "../views/ImageListView";
import * as viewWrapper from "../views/ViewWrapper";
import * as errorView from "../views/ErrorView";

suite("Controller Test Suite", () => {
  let controller: StockImageFinderController;
  let updateHtmlStub: sinon.SinonStub;
  let store: Store;
  let mockUri: vscode.Uri;
  let mockWebview: vscode.Webview;

  // 1. Stub an update method for the controller
  // 2. Get an instance of the store
  // 3. Set default state to clear state for each test
  // 4. Instantiate a controller
  beforeEach(() => {
    mockWebview = {
      html: "",
      options: {},
      onDidReceiveMessage: sinon.stub(),
      postMessage: sinon.stub(),
      asWebviewUri: sinon.stub(),
      cspSource: "https://*.fake-cdn.net",
    };
    updateHtmlStub = sinon.stub();

    store = Store.getInstance();
    store.setState({
      view: "loading",
      query: "",
      page: 1,
      totalPages: 1,
      cache: {},
      selectedImage: null,
    });

    mockUri = vscode.Uri.parse("file://fake");
    controller = new StockImageFinderController(
      mockUri,
      mockWebview,
      updateHtmlStub
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("handleSearch", () => {
    it("should update state, and render images successfully", async () => {
      // 1. Stub out the searchImages method, return a mock response
      const searchStub = sinon.stub(api, "searchImages").resolves(mockResponse);
      const imageListStub = sinon
        .stub(view, "ImageList")
        .returns("<div>Images</div>");
      const viewWrapperStub = sinon
        .stub(viewWrapper, "ViewWrapper")
        .returns("<div><div>Images</div></div>");

      await controller.handleSearch("cats");
      assert.ok(searchStub.calledOnceWith("cats"));

      // Check the state and total pages
      const state = store.getState();
      const expected = {
        view: "list",
        query: "cats",
        page: 1,
        totalPages: mockResponse.totalPages,
        cache: {
          "cats-1": mockResponse.images,
        },
        selectedImage: null,
      };
      assert.deepStrictEqual(state, expected);
      assert.ok(imageListStub.called);
      assert.ok(viewWrapperStub.called);
      assert.ok(updateHtmlStub.calledWith("<div><div>Images</div></div>"));
    });

    it("should show the error page when unable to fetch images", async () => {
      const searchStub = sinon
        .stub(api, "searchImages")
        .rejects(new Error("API down"));
      const error = sinon
        .stub(errorView, "ErrorScreen")
        .returns("<div>Error</div>");
      const viewWrapperStub = sinon
        .stub(viewWrapper, "ViewWrapper")
        .returns("<div><div>Error</div></div>");

      await controller.handleSearch("error");

      assert.ok(searchStub.throwsException);
      assert.ok(error.called);
      assert.ok(viewWrapperStub.called);
      assert.ok(updateHtmlStub.calledWith("<div><div>Error</div></div>"));

      const state = store.getState();
      assert.strictEqual(state.view, "error");
    });
  });

  describe("handlePaginate", () => {
    it("should update state, render to next page of search results", async () => {
      const searchStub = sinon.stub(api, "searchImages").resolves(mockResponse);
      store.setState({
        view: "list",
        query: "cats",
        page: 1,
        totalPages: mockResponse.totalPages,
        cache: {
          "cats-1": mockResponse.images,
        },
        selectedImage: null,
      });

      await controller.handlePagination("next");
      assert.ok(searchStub.calledWith("cats", 2));

      const expected = {
        view: "list",
        query: "cats",
        page: 2,
        totalPages: mockResponse.totalPages,
        cache: {
          "cats-1": mockResponse.images,
          "cats-2": mockResponse.images,
        },
        selectedImage: null,
      };
      assert.deepStrictEqual(store.getState(), expected);
    });
    it("should return if the current page is equal to the total page", async () => {
      const searchStub = sinon.stub(api, "searchImages").resolves(mockResponse);
      store.setState({
        view: "list",
        query: "cats",
        page: 3,
        totalPages: mockResponse.totalPages,
        cache: {
          "cats-1": mockResponse.images,
          "cats-2": mockResponse.images,
          "cats-3": mockResponse.images,
        },
        selectedImage: null,
      });

      await controller.handlePagination("next");
      assert.ok(searchStub.notCalled);
    });
    it("should update state, render to previous page of search results (without an API call)", async () => {
      const searchStub = sinon.stub(api, "searchImages").resolves(mockResponse);
      store.setState({
        view: "list",
        query: "cats",
        page: 2,
        totalPages: mockResponse.totalPages,
        cache: {
          "cats-1": mockResponse.images,
          "cats-2": mockResponse.images,
        },
        selectedImage: null,
      });

      await controller.handlePagination("prev");
      assert.ok(searchStub.notCalled);

      const expected = {
        view: "list",
        query: "cats",
        page: 1,
        totalPages: mockResponse.totalPages,
        cache: {
          "cats-1": mockResponse.images,
          "cats-2": mockResponse.images,
        },
        selectedImage: null,
      };
      assert.deepStrictEqual(store.getState(), expected);
    });
    it("should return the first page if the previous page is negative (without an API call)", async () => {
      const searchStub = sinon.stub(api, "searchImages").resolves(mockResponse);
      store.setState({
        view: "list",
        query: "cats",
        page: 1,
        totalPages: mockResponse.totalPages,
        cache: {
          "cats-1": mockResponse.images,
          "cats-2": mockResponse.images,
        },
        selectedImage: null,
      });

      await controller.handlePagination("prev");
      assert.ok(searchStub.notCalled);
      assert.strictEqual(store.getState().page, 1);
    });
  });
});
