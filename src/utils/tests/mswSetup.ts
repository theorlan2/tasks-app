import "@testing-library/dom";
import { delay, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from "vitest";

export const handlers = [
  http.get("http://localhost:5173/api/elements", async () => {
    await delay(150);
    return HttpResponse.json([
      {
        createdAt: "2021-10-22T12:13:22.338Z",
        name: "Pauline Blanda",
        avatar: "https://cdn.fakercloud.com/avatars/mkginfo_128.jpg",
        id: "1",
      },
    ]);
  }),
];

export const server = setupServer(...handlers);

// Enable the API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable the API mocking after the tests finished.
afterAll(() => server.close());
