import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { Task } from "@/types/task/task.model";
import TaskForm from "./TaskForm";

type Props = {
  isOpen: boolean;
  dataTask?: Task;
  setIsOpen: (v: boolean) => void;
  onSubmit?: (v: Task) => void;
};

const CreateOrUpdateTaskDialog = ({
  isOpen,
  setIsOpen,
  onSubmit,
  dataTask,
}: Props) => {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center bg-black/50 p-4">
            <DialogPanel
              transition
              className="w-full max-w-xl rounded-xl bg-white dark:bg-gray-700 p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-lg font-medium text-gray-600 dark:text-white"
              >
                {dataTask ? ` Update task` : `Create a new task`}
              </DialogTitle>

              <div className="mt-2">
                <TaskForm
                  dataTask={dataTask}
                  onSubmit={onSubmit}
                  setIsOpen={setIsOpen}
                  isLoading={false}
                />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateOrUpdateTaskDialog;
