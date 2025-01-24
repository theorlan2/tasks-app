import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "@headlessui/react";
import { toast } from "sonner";

import {
  selectTasks,
  addTask,
  updateTaskData,
  deleteTaskById,
} from "@/store/features/tasks/tasks.slice";

import CreateOrUpdateTaskDialog from "./components/CreateOrUpdateTaskDialog";
import TasksTabs from "./components/TasksTabs";

import { Task } from "@/types/task/task.model";

const TasksPage = () => {
  const [isOpenCreateOrEditDialog, setIsOpenCreateOrEditDialog] =
    useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task>();
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  async function sendTask(data: Task) {
    if (data.id) {
      try {
        dispatch(updateTaskData(data));
        toast.success("Task updated");
        setIsOpenCreateOrEditDialog(false);
      } catch (e) {
        console.error("Error updating task:", e);
        toast.error("Error updating task");
      }
    } else {
      try {
        const id = Date.now().toString();
        dispatch(addTask({ id, ...data }));
        toast.success("Task created");
        setIsOpenCreateOrEditDialog(false);
      } catch (e) {
        console.error("Error creating task:", e);
        toast.error("Error creating task");
      }
    }
  }
  async function deleteTask(data?: Task) {
    if (data) {
      try {
        dispatch(deleteTaskById(data.id));
        toast.success("Task deleted");
      } catch (e) {
        console.error("Error deleting task:", e);
        toast.error("Error deleting task");
      }
    }
  }

  function editTask(data: Task) {
    if (data) {
      setTaskToEdit(data);
      setIsOpenCreateOrEditDialog(true);
    }
  }
  function closeDialogToCreateOrEdit() {
    setTaskToEdit(undefined);
    setIsOpenCreateOrEditDialog(false);
  }

  return (
    <div className="my-4  w-full">
      <div className="container mx-auto">
        <div className="w-full flex flex-col gap-8 row-start-2 items-center">
          <div className="w-full  max-w-xl">
            <h3 className="text-xl mb-2">Tasks </h3>
            <div className="border border-gray-200 dark:border-white/35 rounded-lg p-2 sm:p-4">
              <TasksTabs
                tasks={tasks}
                onSubmitDelete={deleteTask}
                onEdit={editTask}
              />
            </div>
          </div>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Button
              onClick={() => setIsOpenCreateOrEditDialog(true)}
              className="rounded-full border border-solid border-#[383838] hover:text-white transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              Add task
              <i className="ri-add-line"></i>
            </Button>
          </div>
          <CreateOrUpdateTaskDialog
            dataTask={taskToEdit}
            isOpen={isOpenCreateOrEditDialog}
            setIsOpen={(v: boolean) =>
              v ? setIsOpenCreateOrEditDialog(v) : closeDialogToCreateOrEdit()
            }
            onSubmit={sendTask}
          />
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
