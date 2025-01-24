import { Link } from "react-router";

const HomePage = () => {
  return (
    <div className="my-4  w-full">
      <div className="flex flex-col sm:flex-row gap-2 justify-center space-x-4">
        <Link
          to={"/tasks"}
          className=" w-full max-w-sm text-white rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground bg-gray-600 dark:bg-white dark:text-black gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          <i className="ri-list-check-3"></i>
          Tasks
        </Link>
        <Link
          to={"/list"}
          className="w-full max-w-sm text-white rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground bg-gray-600 dark:bg-white dark:text-black gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          <i className="ri-contacts-book-line"></i>
          List
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
