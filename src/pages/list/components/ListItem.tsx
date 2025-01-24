import { UserI } from "@/types/user/user.model";

type Props = {
  data: UserI;
};

const ListItem = ({ data }: Props) => {
  return (
    <div className=" flex flex-col-reverse gap-2 sm:flex-row relative justify-between rounded-md p-3 text-sm/6 transition border border-gray-200 hover:bg-gray-400/20 dark:hover:bg-white/10 my-2">
      <div className="flex flex-col w-full ">
        <p className="font-semibold text-lg text-black dark:text-white mb-0">
          {data.name}
        </p>
        <div className="w-full border-b  border-gray-100 dark:border-gray-50/30 my-2"></div>
        <span className="text-xs text-gray-500 dark:text-white ">
          {data.createdAt
            ? new Date(data.createdAt).toLocaleString()
            : "No date"}
        </span>
      </div>
      <div className="w-full sm:w-9 flex items-center ">
        <i className="ri-account-circle-line text-4xl "></i>
        {/* <img className="max-w-9" src={data.avatar} alt="Avatar" /> */}
      </div>
    </div>
  );
};
export default ListItem;
