import React from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import { UserI } from "../../src/types/user/user.model";

import ListItem from "../../src/pages/list/components/ListItem";

describe("ListItem Component", () => {
  const mockUser: UserI = {
    id: "1",
    name: "John Doe",
    createdAt: new Date().toUTCString(),
    avatar: "",
  };

  it("should render correctly", () => {
    const component = render(<ListItem data={mockUser} />);
    expect(component.container).toBeDefined();
  });

  it("should display the user name", () => {
    const { getByText } = render(<ListItem data={mockUser} />);

    expect(getByText(mockUser.name)).toBeTruthy();
  });

  it("should display the creation date", () => {
    const { getByText } = render(<ListItem data={mockUser} />);

    expect(
      getByText(new Date(mockUser.createdAt || "").toLocaleString()),
    ).toBeTruthy();
  });
});
