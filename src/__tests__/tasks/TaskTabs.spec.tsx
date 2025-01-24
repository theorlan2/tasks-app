import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TaskStatusEnum } from "@/types/task/task.enum";
import TasksTabs from "@/pages/taks/components/TasksTabs";
import useFilterTaskByStatus from "@/hooks/useFilterTaskByStatus";
import { Task } from "@/types/task/task.model";

describe("TasksTabs", () => {
  const mockTask1 = {
    id: "1",
    title: "Test Task 1",
    status: TaskStatusEnum.TODO,
  } as Task;

  const mockTask2 = {
    id: "2",
    title: "Test Task 2",
    status: TaskStatusEnum.PROGRESS,
  } as Task;

  const mockTask3 = {
    id: "3",
    title: "Test Task 3",
    status: TaskStatusEnum.DONE,
  } as Task;

  it("renders without errors", () => {
    render(
      <TasksTabs
        tasks={[mockTask1, mockTask2, mockTask3]}
        onSubmitDelete={() => {}}
        onEdit={() => {}}
      />,
    );
    expect(screen.getAllByRole("tab")).toHaveLength(3);
  });

  it("displays 'No tasks here' when there are no tasks in a tab", () => {
    render(
      <TasksTabs tasks={[]} onSubmitDelete={() => {}} onEdit={() => {}} />,
    );
    waitFor(async () => {
      const rgxText = new RegExp("No tasks here", "i");
      expect(screen.findByText(rgxText)).toBeDefined();
    });
  });

  it("displays correct tasks based on their status", () => {
    const { container } = render(
      <TasksTabs
        tasks={[mockTask1, mockTask2, mockTask3]}
        onSubmitDelete={() => {}}
        onEdit={() => {}}
      />,
    );
    vi.mocked(useFilterTaskByStatus);

    vi.waitFor(() => {
      const todoTab = container.querySelector(":first-child");
      expect(todoTab).toContain("Test Task 1");

      const progressTab = container.querySelectorAll(":nth-child(2)")[0];
      expect(progressTab).toContain("Test Task 2");

      const doneTab = container.querySelectorAll(":nth-child(3)")[0];
      expect(doneTab).toContain("Test Task 3");
    });
  });

  it("opens and closes the delete dialog when clicking on delete button", () => {
    const { getByRole, queryByRole } = render(
      <TasksTabs
        tasks={[mockTask1]}
        onSubmitDelete={() => {}}
        onEdit={() => {}}
      />,
    );

    // Click on the delete button of Task 1
    const deleteButton = getByRole("button", { name: /delete/i });
    userEvent.click(deleteButton);

    // Check if dialog is open
    expect(queryByRole("dialog")).toBeDefined();

    // Close the dialog
    const cancelBtn = queryByRole("button", { name: /cancel/i });
    userEvent.click(cancelBtn);
  });
});
