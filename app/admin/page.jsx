"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MainNav } from "@/components/Admin/main-nav";
import { Links } from "@/components/Link/Link";

import { UserNav } from "@/components/Admin/user-nav";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { motion, Reorder } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IoIosAdd } from "react-icons/io";
import useApiCall from "@/hooks/ApiCall";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const container = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: 100,
      transition: {
        duration: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      },
    },
  };

  const [url, setUrl] = useState("");
  const [header, setHeader] = useState();

  const { items, setItems, fetchData, newHeader, newLink, remove } =
    useApiCall();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const linksData = await fetchData("links");
        const headersData = await fetchData("headers");
        if (linksData && headersData) {
          setItems([...linksData, ...headersData]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      <div className=" flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              {/* <Search /> */}
              <UserNav />
            </div>
          </div>
        </div>

        <div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 ">
              <div>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Set up your Appearance</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <Card className="border-none m-4 px-8 py-5">
                    <Button
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full py-6 bg-neutral-300"
                    >
                      <IoIosAdd /> Add Links
                    </Button>
                    <motion.div
                      variants={container}
                      initial="hidden"
                      animate={isOpen ? "show" : "hidden"}
                      className={`  rounded-md px-8 overflow-hidden `}
                    >
                      <div className="w-full m-3 flex justify-center items-baseline gap-6 ">
                        <Input
                          className=" w-full border-b-2 rounded-none  m-3 text-xl text-neutral-300 py-6 "
                          placeholder={"Enter URL"}
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />
                        <Button
                          onClick={() => {
                            newLink(url);
                            setUrl("");
                            setIsOpen(!isOpen);
                          }}
                          className="rounded-md w-1/4 h-full py-5 bg-neutral-300 text-black  hover:bg-white "
                        >
                          <IoIosAdd /> Add
                        </Button>
                      </div>
                    </motion.div>

                    <Button
                      onClick={() => {
                        newHeader("");
                        setHeader("");
                      }}
                      className="w-1/5 py-6 bg-neutral-300 my-3"
                    >
                      <IoIosAdd /> Add Header
                    </Button>
                  </Card>

                  {items && (
                    <Reorder.Group axis="y" values={items} onReorder={setItems}>
                      {items?.map((item, i) => (
                        <Links
                          key={item._id}
                          id={item._id}
                          value={item}
                          type={item.type}
                          remove={remove}
                        />
                      ))}
                    </Reorder.Group>
                  )}
                </CardContent>
              </div>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent>{/* <RecentSales /> */}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
