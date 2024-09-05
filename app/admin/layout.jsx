"use client";
import { useContext } from "react";
import { MainNav } from "@/components/Admin/main-nav";
import { UserNav } from "@/components/Admin/user-nav";
import { Button } from "@/components/ui/button";
import { MdOutlineWbSunny } from "react-icons/md";
import { RiMoonClearLine } from "react-icons/ri";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import AuthContext from "@/context/auth";

export default function UserLayout({ children }) {
  const { userData } = useContext(AuthContext);

  const { theme, themes, setTheme } = useTheme();

  const pathname = usePathname();

  // Check if the current page is the settings page
  const isSettingsPage =
    pathname === "/admin/settings" || pathname === "/admin/overview";

  if (isSettingsPage) {
    // If it's the settings page, render only the children without the layout UI
    return (
      <>
        {" "}
        <div className="flex-col md:flex">
          <div className="border-b">
            <div className="flex items-center h-16 px-4">
              <MainNav className="mx-6" />
              <div className="flex items-center ml-auto space-x-4">
                {/* <Search /> */}
                <UserNav />
                <Button
                  className="bg-transparent hover:bg-transparent  text-primary text-[15px]"
                  onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
                >
                  {theme == "dark" ? <RiMoonClearLine /> : <MdOutlineWbSunny />}
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full ">{children}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className=" flex-col gap-[5.5rem] md:flex ">
        <div className="border-b">
          <div className="flex items-center h-16 px-4">
            <MainNav className="mx-6" />
            <div className="flex items-center ml-auto space-x-4">
              {/* <Search /> */}
              <UserNav />
              <Button
                className="bg-transparent hover:bg-transparent  text-primary text-[15px]"
                onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
              >
                {theme == "dark" ? <RiMoonClearLine /> : <MdOutlineWbSunny />}
              </Button>
            </div>
          </div>
        </div>
        <div className="grid gap-4 px-5 md:grid-cols-1 xl:grid-cols-6 justify-items-center ">
          {children}
          <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[348px] shadow-xl">
            <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className=" relative rounded-[2rem] overflow-hidden w-[320px] h-[572px] bg-white dark:bg-gray-800">
              <iframe
                // key={key}
                className="absolute top-0 left-0 w-full h-full m-auto border-4 rounded-md "
                src={`http://localhost:3000/${userData?.username}`}
                style={{ width: "320px", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
