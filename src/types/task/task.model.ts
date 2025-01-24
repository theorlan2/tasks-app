import { GenericEntity } from "@/types/shared/shared.model";
import { TaskStatusEnum } from "./task.enum";

export interface Task extends GenericEntity {
  title: string;
  description: string;
  status: TaskStatusEnum;
}
