import React from "react";
import { MemoryRouter } from "react-router";

import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";

import HomePage from "../src/pages/Home";

describe("HomePage", () => {
  let container: HTMLElement;

  beforeEach(() => {
    const result = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    container = result.container;
  });

  it("should render without errors", () => {
    expect(container).toBeTruthy();
  });

  it("should contain links to tasks and list pages", () => {
    // Check for two link elements
    const links = container.querySelectorAll("a");
    expect(links.length).toBe(2);

    const tasksLink = links[0];
    expect(tasksLink.getAttribute("href")).toBe("/tasks");

    const listLink = links[1];
    expect(listLink.getAttribute("href")).toBe("/list");
  });
});
