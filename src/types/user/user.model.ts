import { GenericEntity } from "@/types/shared/shared.model";

export interface UserI<T = number | string> extends GenericEntity<T> {
  name: string;
  avatar: string;
}
