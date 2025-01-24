import { Outlet } from "react-router";
//
import { Toaster } from "sonner";
//
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  className?: string;
};

const Layout = ({ className }: Props) => {
  return (
    <div className=" w-full">
      <Header />
      <main className={`flex w-full   ${className} `}>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
