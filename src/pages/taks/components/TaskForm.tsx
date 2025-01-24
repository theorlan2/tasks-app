"use client";
import { useEffect } from "react";

import { Button, Field, Label, Textarea } from "@headlessui/react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";

import { TaskStatusEnum } from "@/types/task/task.enum";
import { Task } from "@/types/task/task.model";

type Props = {
  dataTask?: Task;
  isLoading: boolean;
  isError?: boolean;
  onSubmit?: (v: Task) => void;
  setIsOpen: (v: boolean) => void;
};

const taskSchema = yup.object().shape({
  id: yup.string().optional().optional(),
  title: yup.string().required(),
  description: yup.string().optional().nullable(),
  status: yup.string().required(),
  createdAt: yup.string().optional().nullable(),
});

const TaskForm = ({
  dataTask,
  isLoading,
  isError,
  onSubmit,
  setIsOpen,
}: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {},
    resolver: yupResolver<Task>(taskSchema),
  });

  const statusOptions = [
    { value: "TODO", title: "Todo" },
    { value: "PROGRESS", title: "In Progress" },
    { value: "DONE", title: "Done" },
  ];

  function close() {
    setIsOpen(false);
  }

  function onSubmitForm(data: Task) {
    if (onSubmit) {
      onSubmit(data);
    }
  }

  useEffect(() => {
    if (dataTask) {
      console.log("dataTask", dataTask);
      reset(dataTask);
    } else {
      reset({
        title: "",
        description: "",
        status: TaskStatusEnum.TODO,
      });
    }
  }, [dataTask, reset]);

  return (
    <form role="form" onSubmit={handleSubmit(onSubmitForm)}>
      <div className=" w-full flex justify-between   ">
        <div className=" w-full ">
          <Field>
            <Label
              htmlFor="input-title"
              className="text-sm/6 font-medium text-primary-black"
            >
              Title
            </Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  id="input-title"
                  disabled={isLoading}
                  role="input"
                  className={
                    "mt-1 block w-full rounded-lg border-borders-gray border-[1px] shadow-sm bg-white/5 py-1.5 px-3 text-sm/6 text-primary-black  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  }
                  error={errors.title}
                />
              )}
            />
          </Field>
        </div>
      </div>

      <div className="w-full  my-2 sm:gap-4">
        <Field>
          <Label
            htmlFor="textarea-description"
            className=" text-sm font-medium text-gray-700 dark:text-white"
          >
            Description
          </Label>
          <div className="w-full ">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="textarea-description"
                  value={field.value ?? ""}
                  placeholder="Description"
                  role="textarea"
                  disabled={isLoading}
                  className={
                    "mt-1 block w-full  rounded-lg border-borders-gray border-[1px] shadow-sm bg-white/5 py-1.5 px-3 text-sm/6 text-primary-black  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  }
                />
              )}
            />

            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </Field>
      </div>

      <div className=" w-full mt-3 ">
        <Field>
          <Label
            htmlFor="select-status"
            className="text-sm/6 font-medium text-primary-black"
          >
            Status
          </Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                id="select-status"
                role="combobox"
                disabled={isLoading}
                className="mt-1  block w-full rounded-lg border-borders-gray border-[1px] shadow-sm bg-white/5 py-1.5 px-3 text-sm/6 text-primary-black  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/2 dark:bg-white dark:text-black"
                options={statusOptions}
              />
            )}
          />
        </Field>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          type="button"
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] dark:hover:text-white hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          disabled={isLoading}
          onClick={close}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="rounded-full dark:bg-white text-black transition-colors flex gap-2 items-center justify-center bg-gray-300 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] dark:hover:text-white hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        >
          {dataTask ? `Update` : `Create`}
          <i className="ri-save-line"></i>
        </Button>
      </div>
      <div className="w-full">
        {isError && (
          <p className="text-xs text-red-500">
            An unexpected error has occurred, please try again later.
          </p>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
