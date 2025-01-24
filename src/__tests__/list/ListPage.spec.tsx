import React from "react";
import { describe, it, expect } from "vitest";

import { MemoryRouter } from "react-router";
import { waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";

import { renderWithProviders } from "@/utils/tests/StoreProviderToTest";
import { server } from "@/utils/tests/mswSetup";

import ListUsersPage from "@/pages/list/ListUsersPage";

describe("ListUsersPage", () => {
  it("Before the fetches ", async () => {
    const { queryByText, getByText } = renderWithProviders(
      <MemoryRouter>
        <ListUsersPage />
      </MemoryRouter>,
    );

    expect(getByText("No data available")).toBeTruthy();
    expect(queryByText(/Fetching user\.\.\./i)).toBeFalsy();
  });

  it("fetches & receives a user after enter to the page", async () => {
    const { findByText, getByText } = renderWithProviders(
      <MemoryRouter>
        <ListUsersPage />
      </MemoryRouter>,
    );
    expect(await findByText(/Loading.../i)).toBeTruthy();
    await waitFor(() => {
      const rgxName = new RegExp("Pauline Blanda", "i");
      expect(getByText(rgxName)).toBeTruthy();
    });
  });

  it("fetches and receives a error", async () => {
    server.use(
      http.get("http://localhost:5173/api/elements", async () => {
        return new HttpResponse("Have an error", {
          status: 500,
        });
      }),
    );
    const { getByText } = renderWithProviders(
      <MemoryRouter>
        <ListUsersPage />
      </MemoryRouter>,
    );
    await waitFor(async () => {
      const rgxText = new RegExp("Oh no, there was an error", "i");
      expect(getByText(rgxText)).toBeTruthy();
    });
  });
});
