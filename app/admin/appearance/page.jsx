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
import { useState } from "react";
import { motion, Reorder, useDragControls } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IoIosAdd } from "react-icons/io";

export default function Appearance() {
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
  const [items, setItems] = useState([0, 1, 2]);
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
            <Card className="col-span-4">
              <div>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Set up your Appearance</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <Card className="bg-neutral-700  m-4 px-8 py-5">
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
                        />
                        <Button
                          onClick={() => setIsOpen(!isOpen)}
                          className="rounded-md w-1/4 h-full py-5 bg-neutral-300 text-black  hover:bg-white "
                        >
                          <IoIosAdd /> Add
                        </Button>
                      </div>
                    </motion.div>
                  </Card>
                  <Reorder.Group axis="y" values={items} onReorder={setItems}>
                    {items.map((item) => (
                      <Links key={item} value={item} />
                    ))}
                  </Reorder.Group>
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
