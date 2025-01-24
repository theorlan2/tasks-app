import { Link } from "react-router";

const Header = () => {
  return (
    <header className="flex w-full shadow-sm mb-2 py-2 border-b border-gray-50 dark:border-white">
      <div className="container mx-auto px-4 xl:px-0">
        <div className="flex w-full py-1 justify-between items-center">
          <Link to={"/"}>
            <img className="max-w-20" src="/vite.svg" alt="Vite.js logo" />
          </Link>
          <Link to={"/"}>Home</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
