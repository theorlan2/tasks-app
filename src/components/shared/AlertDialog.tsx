import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onIsOk: () => void;
  title?: string;
  description?: string;
};

export default function AlertDialog({
  isOpen,
  setIsOpen,
  onIsOk,
  title,
  description,
}: Props) {
  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md  rounded-xl bg-white dark:bg-gray-700 p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-lg font-medium text-black dark:text-white"
              >
                {title || "Are you sure you want to delete this element?"}
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-black/50 dark:text-white/50">
                {description || "This action cannot be undone."}
              </p>
              <div className="mt-4 flex justify-end gap-3">
                <Button
                  className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] dark:hover:text-white hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 dark:bg-white dark:text-gray-700"
                  onClick={close}
                >
                  Cancel
                </Button>
                <Button
                  className="rounded-full border border-solid border-red-400 text-red-400 dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-red-500 dark:hover:text-white hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                  role="button"
                  onClick={() => {
                    close();
                    onIsOk();
                  }}
                >
                  Delete
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
