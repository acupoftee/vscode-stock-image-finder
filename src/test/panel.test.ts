import * as assert from "assert";
import * as vscode from "vscode";
import { beforeEach, afterEach, describe, it } from "mocha";
import sinon from "sinon";
import { StockImageFinderController } from "../controller/Controller";
import { StockImageFinderPanel } from "../panel";
import { Store } from "../store/Store";
import { mockResponse } from "./mocks";
import * as api from "../api/Api";

suite("Panel Test Suite", () => {
  let controller: sinon.SinonStubbedInstance<StockImageFinderController>;
  let handleSearch: sinon.SinonStub;
  let mockWebviewPanel: vscode.WebviewPanel;
  let createWebviewPanelStub: sinon.SinonStub;

  beforeEach(() => {
    mockWebviewPanel = {
      viewType: "test-viewtype",
      title: "Stock Image Finder",
      webview: {
        html: "",
        options: { enableScripts: true },
        onDidReceiveMessage: sinon.stub(),
        postMessage: sinon.stub(),
        asWebviewUri: sinon.stub(),
        cspSource: "https://*.fake-cdn.net",
      },
      options: {},
      viewColumn: vscode.ViewColumn.Beside,
      active: false,
      visible: false,
      onDidChangeViewState: sinon.stub(),
      onDidDispose: sinon.stub(),
      reveal: sinon.stub(),
      dispose: sinon.stub(),
    };

    createWebviewPanelStub = sinon
      .stub(vscode.window, "createWebviewPanel")
      .returns(mockWebviewPanel);
    controller = sinon.createStubInstance(StockImageFinderController);
    handleSearch = sinon.stub(api, "searchImages").resolves(mockResponse);
  });

  afterEach(() => {
    sinon.restore();
  });

  // Test the creation logic
  describe("createOrShow", () => {
    it("should create a new webview panel if one does not exist", () => {
      const mockUri = vscode.Uri.parse("file://fake");
      StockImageFinderPanel.createOrShow(mockUri, "cats");

      assert.ok(createWebviewPanelStub.calledOnce);
      assert.ok(StockImageFinderPanel.currentPanel);
    });

    it("should reveal an existing webview panel", () => {
      const mockUri = vscode.Uri.parse("file://fake");

      StockImageFinderPanel.createOrShow(mockUri, "cats");
      assert.ok(handleSearch.calledWith("cats"));
      assert.ok(StockImageFinderPanel.currentPanel);

      // Confirm new webview is not created and instead invokes a search query for the existing panel
      StockImageFinderPanel.createOrShow(mockUri, "dogs");
      assert.strictEqual(Store.getInstance().getState().query, "dogs");
      assert.ok(createWebviewPanelStub.notCalled);
      assert.ok(handleSearch.calledWith("dogs"));
    });
  });
});
