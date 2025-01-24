import { fireEvent, waitFor } from "@testing-library/react";

import { renderWithProviders } from "@/utils/tests/StoreProviderToTest";

import { describe, expect, it } from "vitest";
import TasksPage from "@/pages/taks/TasksPage";

describe("Tasks page", () => {
  it("Render the page", () => {
    const { queryByText } = renderWithProviders(<TasksPage />);

    const task = queryByText("New Task");
    waitFor(() => {
      expect(task).not.toBeNull();
    });
  });

  it("opens CreateOrUpdateTaskDialog when the add task button is clicked", () => {
    const { getByText, queryByText } = renderWithProviders(<TasksPage />);

    // Simulate a click event on the Add Task button.
    const addTaskButton = getByText("Add task");
    fireEvent.click(addTaskButton);

    // Check if CreateOrUpdateTaskDialog is rendered.
    const dialogTitle = queryByText("Create a new task");
    waitFor(() => {
      expect(dialogTitle).not.toBeNull();
    });
  });
});
