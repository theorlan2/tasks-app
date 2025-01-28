import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TaskForm from "../../src/pages/taks/components/TaskForm";

import { Task } from "../../src/types/task/task.model";
import { TaskStatusEnum } from "../../src/types/task/task.enum";

describe("TaskForm", () => {
  const onSubmitMock = vi.fn();
  const setIsOpenMock = vi.fn();

  const renderComponent = (dataTask?: Task, isLoading = false) => {
    const taskFormProps = {
      dataTask,
      isLoading,
      onSubmit: onSubmitMock,
      setIsOpen: setIsOpenMock,
    };

    render(<TaskForm {...taskFormProps} />);
  };

  it("renders the form correctly with initial values", () => {
    const defaultData = {
      title: "Test Task",
      description: "Test Description",
      status: TaskStatusEnum.DONE,
      userId: 1,
    };

    renderComponent(defaultData);

    expect(screen.getByLabelText(/title/i)).toHaveProperty(
      "value",
      defaultData.title,
    );
    expect(screen.getByLabelText(/description/i)).toHaveProperty(
      "value",
      defaultData.description,
    );
    expect(
      screen.getByRole("combobox", { value: TaskStatusEnum.DONE }),
    ).toBeTruthy();
  });

  it("renders the form correctly with empty values and default status when no data is provided", () => {
    renderComponent();

    expect(screen.getByLabelText(/title/i)).toHaveProperty("value", "");
    expect(screen.getByLabelText(/description/i)).toHaveProperty("value", "");
    expect(
      screen.getByRole("combobox", { value: TaskStatusEnum.TODO }),
    ).toBeTruthy();
  });

  it("submits the form with valid data and calls onSubmit function", () => {
    const newTask = {
      title: "New Task",
      description: "New Description",
      status: TaskStatusEnum.PROGRESS,
      userId: 2,
    };

    renderComponent(newTask);
    screen.getByRole("form").onsubmit = onSubmitMock;

    waitFor(async () => {
      await userEvent.type(screen.getByLabelText(/Title/i), "New Task");
      userEvent.type(screen.getByLabelText(/Description/i), "New Description");
      userEvent.selectOptions(
        screen.getByRole("combobox"),
        TaskStatusEnum.PROGRESS,
      );
    });
    fireEvent.click(screen.getByText("Update"));
    expect(onSubmitMock).toHaveBeenCalled();
  });
});
