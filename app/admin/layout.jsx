"use client";
import { useContext, useState } from "react";

import { UserNav } from "@/components/Admin/user-nav";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useParams, usePathname } from "next/navigation";
import AuthContext from "@/context/auth";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import SiteContext from "@/context/site";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function UserLayout({ children }) {
  const { userData, verify } = useContext(AuthContext);
  const { sendVerifyToken, tokenSend, loading, iFrameReload, setIframReload } =
    useContext(SiteContext);

  const [alert, setAlert] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (verify) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  }, []);

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
              <div className="flex items-center ml-auto space-x-4">
                {/* <Search /> */}
                <UserNav />
              </div>
            </div>
          </div>
          <div className="w-full ">{children}</div>
        </div>
      </>
    );
  }

  if (pathname === "/admin/verify") {
    return <> {children}</>;
  }

  const Iframe = () => {
    return (
      <iframe
        className="w-full h-full rounded-md "
        src={`${process.env.NEXT_PUBLIC_CLIENT_URL}/${userData?.username}`}
      />
    );
  };

  return (
    <>
      <div className="flex flex-col h-screen md:flex-row">
        {/* Sidebar */}

        <UserNav />

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto xl:mt-32 ">
          <div className="max-w-3xl py-8 mx-4 mt-4 md:mx-auto  md:w-[clamp(400px,80%,740px)]  ">
            {children}{" "}
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  className="block m-auto mt-5 xl:hidden bg-primary"
                  variant="outline"
                >
                  Preview Site
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="w-full max-w-sm mx-auto">
                  <DrawerHeader>
                    {/* <DrawerTitle>Move Goal</DrawerTitle> */}
                  </DrawerHeader>
                  <div className="p-4 pb-0">
                    <div className="my-10">
                      <div className=" h-[650px] ">{/* <Iframe /> */}</div>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        {/* Iframe container */}
        <div className="items-center justify-center hidden w-1/3 xl:flex">
          <div className=" w-[393px] xl:flex items-center justify-center">
            <div className="w-[393px] h-[650px] pl-8">
              <iframe
                className="w-full h-full rounded-md "
                src={`${process.env.NEXT_PUBLIC_CLIENT_URL}/${userData?.username}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
