import * as assert from "assert";
import * as sinon from "sinon";
import { beforeEach, afterEach, describe, it } from "mocha";
import { Store } from "../store/Store";

type Listener = () => void;

suite("Store Test Suite", () => {
  let store: Store;
  // Spying on notify to get information about the call to the listeners
  let notifySpy: sinon.SinonSpy;

  beforeEach(() => {
    // Resets the singleton instance to ensure state is clean for all tests
    (Store as any).instance = undefined; // Prevents private property from being accessed
    store = Store.getInstance();
    notifySpy = sinon.spy(store as any, "notify"); // Prevents private method from being accessed
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("getInstance", () => {
    it("should return a Store singleton", () => {
      const instance1 = Store.getInstance();
      const instance2 = Store.getInstance();
      assert.strictEqual(instance1, instance2);
    });
  });

  describe("getState", () => {
    it("should return the current state", () => {
      const actual = store.getState();
      const expected = {
        view: "loading",
        query: "",
        page: 1,
        totalPages: 1,
        cache: {},
        selectedImage: null,
      };
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("setState", () => {
    it("should update state with partial data", () => {
      store.setState({ query: "cats" });
      assert.strictEqual(store.getState().query, "cats");

      // set another partial, without overwriting the
      store.setState({ page: 2 });
      assert.strictEqual(store.getState().page, 2);
      assert.strictEqual(store.getState().query, "cats");
    });
  });
  describe("subscribe", () => {
    it("should add subscription functions", () => {
      // test to see if subscriber functions are called
      const sub1: Listener = () => {};
      const sub2: Listener = () => {};

      store.subscribe(sub1);
      store.subscribe(sub2);

      assert.strictEqual((store as any).listeners.length, 2);
    });
  });
  describe("unsubscribe", () => {
    it("should clear all subscriptions", () => {
      const sub1: Listener = () => {};
      const sub2: Listener = () => {};

      store.subscribe(sub1);
      store.subscribe(sub2);

      store.unsubscribe();

      assert.strictEqual((store as any).listeners.length, 0);
    });
  });
  describe("notify (internal)", () => {
    // test to see if subscriptions
    it("should call subscription functions on state change", () => {
      // test to see if subscriber functions are called
      const sub1: Listener = () => {};
      const sub2: Listener = () => {};

      store.subscribe(sub1);
      store.subscribe(sub2);

      store.setState({ query: "cats" });

      assert.equal(notifySpy.called, true);
    });
  });
});
