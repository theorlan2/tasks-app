import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import TaskItem from "../../src/pages/taks/components/TaskItem";

import type { Task } from "../../src/types/task/task.model";
import { TaskStatusEnum } from "../../src/types/task/task.enum";

const mockTask: Task = {
  id: "1",
  title: "Test Task",
  description: "This is a test description.",
  status: TaskStatusEnum.TODO,
};

describe("TaskItem Component", () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();
  it("should render without throwing an error", () => {
    const component = render(
      <TaskItem task={undefined} onEdit={() => {}} onDelete={() => {}} />,
    );
    expect(component.debug).toBeDefined();
  });

  describe("Handles edit and delete actions", () => {
    it("should call onEdit when the edit button is clicked", async () => {
      const component = render(
        <TaskItem task={mockTask} onEdit={mockOnEdit} onDelete={() => {}} />,
      );

      await vi.waitFor(() =>
        userEvent.click(component.getByRole("button", { name: "Edit" })),
      );

      expect(mockOnEdit).toHaveBeenCalledWith(mockTask);
    });

    it("should call onDelete when the delete button is clicked", async () => {
      const component = render(
        <TaskItem
          task={mockTask}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />,
      );

      await vi.waitFor(() =>
        userEvent.click(component.getByRole("button", { name: "Delete" })),
      );

      expect(mockOnDelete).toHaveBeenCalledWith(mockTask);
    });
  });

  describe("UI Elements", () => {
    it("should display the task title correctly", () => {
      const component = render(
        <TaskItem task={mockTask} onEdit={mockOnEdit} onDelete={() => {}} />,
      );

      const rgxTitle = new RegExp(mockTask.title, "i");
      expect(component.getByText(rgxTitle)).toBeDefined();
    });

    it("should display the task description correctly", () => {
      const component = render(
        <TaskItem task={mockTask} onEdit={mockOnEdit} onDelete={() => {}} />,
      );

      const rgxText = new RegExp("Description:", "i");
      const rgxTextDescription = new RegExp(mockTask.description, "i");
      expect(component.getByText(rgxText)).toBeDefined();
      expect(component.getByText(rgxTextDescription)).toBeDefined();
    });
  });
});
