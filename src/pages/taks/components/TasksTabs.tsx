import { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import useFilterTaskByStatus from "@/hooks/useFilterTaskByStatus";

import TaskItem from "./TaskItem";

import AlertDialog from "@/components/shared/AlertDialog";

import { TaskStatusEnum } from "@/types/task/task.enum";
import { Task } from "@/types/task/task.model";

export type Props = {
  tasks: Task[];
  onSubmitDelete: (task?: Task) => void;
  onEdit: (task: Task) => void;
};

const TasksTabs = ({ tasks, onSubmitDelete, onEdit }: Props) => {
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);
  const [temporalTask, setTemporalTask] = useState<Task>();

  const taskInTodo = useFilterTaskByStatus(tasks, TaskStatusEnum.TODO);
  const taskInProgress = useFilterTaskByStatus(tasks, TaskStatusEnum.PROGRESS);
  const taskDone = useFilterTaskByStatus(tasks, TaskStatusEnum.DONE);

  function openDialogAlert(data: Task) {
    setTemporalTask(data);
    setIsOpenAlertDialog(true);
  }

  return (
    <div className="w-full">
      <TabGroup>
        <TabList className="flex gap-4 justify-between w-full bg-black dark:bg-white/5 rounded-full p-1">
          <Tab
            aria-label="To Do"
            className="flex justify-center w-full rounded-full py-1 px-3 text-sm/6 font-semibold text-white data-[selected]:border border-white dark:border-0 focus:outline-none data-[selected]:bg-white data-[selected]:text-black  data-[hover]:bg-white/20 data-[selected]:data-[hover]:bg-white/70  data-[focus]:outline-1 data-[focus]:outline-white"
          >
            To Do
          </Tab>
          <Tab
            aria-label="Progress"
            className="flex justify-center w-full rounded-full py-1 px-3 text-sm/6 font-semibold text-white data-[selected]:border border-white dark:border-0 focus:outline-none data-[selected]:bg-white data-[selected]:text-black  data-[hover]:bg-white/20 data-[selected]:data-[hover]:bg-white/70  data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Progress
          </Tab>
          <Tab
            aria-label="Completed"
            className="flex justify-center w-full rounded-full py-1 px-3 text-sm/6 font-semibold text-white data-[selected]:border border-white dark:border-0 focus:outline-none data-[selected]:bg-white data-[selected]:text-black  data-[hover]:bg-white/20 data-[selected]:data-[hover]:bg-white/70  data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Completed
          </Tab>
        </TabList>
        <TabPanels className="mt-3">
          <TabPanel className="rounded-xl bg-white/5 sm:p-3">
            <div className="h-full">
              {taskInTodo.length === 0 ? (
                <div className="flex items-center justify-center h-full p-4 text-gray-400">
                  <p>No tasks here</p>
                </div>
              ) : (
                <ul>
                  {taskInTodo.map((task) => (
                    <li key={task.id} className="relative">
                      <TaskItem
                        task={task}
                        onEdit={onEdit}
                        onDelete={openDialogAlert}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </TabPanel>
          <TabPanel className="rounded-xl bg-white/5 sm:p-3">
            <div className="h-full">
              {taskInProgress.length === 0 ? (
                <div className="flex items-center justify-center h-full p-4 text-gray-400">
                  <p>No tasks here</p>
                </div>
              ) : (
                <ul>
                  {taskInProgress.map((task) => (
                    <li key={task.id} className="relative">
                      <TaskItem
                        task={task}
                        onEdit={onEdit}
                        onDelete={openDialogAlert}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </TabPanel>
          <TabPanel className="rounded-xl bg-white/5 sm:p-3">
            <div className="h-full">
              {taskDone.length === 0 ? (
                <div className="flex items-center justify-center h-full p-4 text-gray-400">
                  <p>No tasks here</p>
                </div>
              ) : (
                <ul>
                  {taskDone.map((task) => (
                    <li key={task.id} className="relative">
                      <TaskItem
                        task={task}
                        onEdit={onEdit}
                        onDelete={openDialogAlert}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <AlertDialog
        isOpen={isOpenAlertDialog}
        setIsOpen={setIsOpenAlertDialog}
        onIsOk={() => onSubmitDelete(temporalTask)}
      />
    </div>
  );
};

export default TasksTabs;
