import { useEffect, useState } from "react";

import { Task } from "@/types/task/task.model";
import { TaskStatusEnum } from "@/types/task/task.enum";

const useFilterTaskByStatus = (
  tasks: Task[] | undefined,
  status: TaskStatusEnum,
) => {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([] as Task[]);

  useEffect(() => {
    if (tasks && Array.isArray(tasks)) {
      const filteredTasks = tasks.filter((task) => task.status === status);
      setFilteredTasks(filteredTasks);
    }
  }, [tasks, status]);

  return filteredTasks;
};

export default useFilterTaskByStatus;
