import { Button } from "@headlessui/react";

import { Task } from "@/types/task/task.model";

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

const TaskItem = ({ task, onEdit, onDelete }: Props) => {
  return (
    <div className="relative rounded-md p-3 text-sm/6 transition border border-gray-200 hover:bg-gray-400/20 dark:hover:bg-white/10 my-2">
      <h3
        role="heading"
        className="font-semibold text-lg text-black dark:text-white"
      >
        {task?.title ?? ""}
      </h3>
      <div className="w-full border-b border-gray-100 my-2"></div>
      <span className="text-xs text-gray-500 dark:text-white ">
        Description:
      </span>
      <p className="text-sm opacity-70">{task?.description ?? ""}</p>

      <div className="flex mt-2 sm:justify-end gap-2">
        <Button
          role="button"
          onClick={() => onEdit(task)}
          className="rounded-full w-full sm:w-auto border border-solid border-gray-200 transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-gray-400 dark:hover:bg-gray-400 text-sm sm:text-base h-8 sm:h-10 px-2 sm:px-3"
        >
          Edit
          <i className="ri-pencil-line"></i>
        </Button>

        <Button
          role="button"
          onClick={() => onDelete(task)}
          className="rounded-full w-full sm:w-auto border border-solid border-red-200 transition-colors flex items-center justify-center text-red-400 gap-2 hover:bg-red-500 hover:text-white text-sm sm:text-base h-8 sm:h-10 px-2 sm:px-3"
        >
          Delete
          <i className="ri-delete-bin-line"></i>
        </Button>
      </div>
    </div>
  );
};
export default TaskItem;
