import { expect, afterEach, beforeEach, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { setupServer } from "msw/node";
import { handlers } from "../src/mocks/handlers";

global.window.matchMedia =
  global.window.matchMedia ||
  function () {
    return {
      addListener: function () {},
      removeListener: function () {},
    };
  };

expect.extend(matchers);

const server = setupServer(...handlers);

beforeEach(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
