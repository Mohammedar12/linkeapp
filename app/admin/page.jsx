"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Links } from "@/components/Link/Link";

import { useCallback, useContext, useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { IoIosAdd } from "react-icons/io";
import SiteContext from "@/context/site";

import IframeResizer from "@iframe-resizer/react";
import axios from "axios";

export default function DashboardPage() {
  const [url, setUrl] = useState("");

  const {
    items,
    setItems,
    fetchData,
    newHeader,
    newLink,
    remove,
    reorder,
    userSite,
    setUserSite,
  } = useContext(SiteContext);

  const placeholders = [
    "Add Your Link Here !",
    "Have A Store ? Add The Link Here !",
    "mysite.com !",
  ];

  const updateBackend = useCallback(async (updatedItems) => {
    try {
      const response = await axios.put(
        `${process.env.base_url}/sites/reorder`,
        {
          links: updatedItems.map((item, index) => ({
            id: item._id,
            index: index,
          })),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Order updated in backend", response.data);
      // Update local state if necessary
      // setItems(response.data.site.links);
    } catch (error) {
      console.error("Error updating order in backend", error);
    }
  }, []);
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (items.length > 0) {
        updateBackend(items);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [items, updateBackend]);

  const handleReorder = (newOrder) => {
    const updatedOrder = newOrder.map((item, index) => ({
      ...item,
      index: index,
    }));
    console.log(updatedOrder, "updatedOrder");
    setItems(updatedOrder);
  };
  return (
    <>
      <Card className="col-span-4 ">
        <CardHeader>
          <CardTitle>Links</CardTitle>
          <CardDescription>Add Some Links</CardDescription>
        </CardHeader>

        <CardContent className="pl-2 min-w-[700px]">
          <Card className="border-none m-4 px-8 py-5">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              className=" w-full border-b-2 border-primary rounded-none  text-xl text-secondary-foreground py-6 "
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onSubmit={() => {
                newLink(url, "Link");
                setUrl("");
              }}
            />

            <Button
              onClick={() => {
                newLink("", "Header");
              }}
              className="w-1/5 py-6 bg-primary text-primary-foreground my-3"
            >
              <IoIosAdd /> Add Header
            </Button>
          </Card>

          {items && (
            <Reorder.Group axis="y" values={items} onReorder={handleReorder}>
              {items?.map((item, i) => (
                <Links
                  key={item._id}
                  value={item}
                  type={item.type}
                  index={item.index}
                  remove={remove}
                  items={items}
                  setItems={setItems}
                  reorder={updateBackend}
                />
              ))}
            </Reorder.Group>
          )}
        </CardContent>
      </Card>
    </>
  );
}
