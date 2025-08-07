import * as assert from "assert";
import * as vscode from "vscode";
import { beforeEach, afterEach, describe, it } from "mocha";
import sinon from "sinon";
import { StockImageFinderController } from "../controller/Controller";
import { StockImageFinderPanel } from "../panel";

suite("Panel Test Suite", () => {
  let controller: sinon.SinonStubbedInstance<StockImageFinderController>;
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
  });
});
