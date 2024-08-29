import React, { useState, useRef, useEffect } from "react";
import { Card } from "../ui/card";
import Inputs from "../Inputs/Inputs";
import { MdDeleteOutline, MdDragIndicator } from "react-icons/md";
import { CiShare1 } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Reorder, useDragControls } from "framer-motion";
import axios from "axios";

export function Links({
  value,
  type,
  id,
  remove,
  items,
  index,
  setItems,
  reorder,
}) {
  const [checked, setChecked] = useState(value?.display);
  const [disabled, setDisabled] = useState(!value?.title);
  const [header, setHeader] = useState(value?.title);
  const [title, setTitle] = useState(value?.title);
  const [URL, setURL] = useState(value?.url);

  useEffect(() => {
    setDisabled(header === "");
    setDisabled(URL === "");
  }, []);

  const editHeader = async (title, id, display) => {
    console.log(value);
    try {
      const { data } = await axios.put(
        `${process.env.base_url}/headers/${id}`,
        {
          title,
          display,
          index,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: process.env.TOKEN,
          },
          withCredentials: true,
        }
      );
      setHeader(data.title);
      setChecked(data?.display);
    } catch (error) {
      console.log(error);
    }
  };

  const editLink = async (url, id, title, display) => {
    try {
      const { data } = await axios.put(
        `${process.env.base_url}/links/${id}`,
        {
          url: url,
          title: title,
          display,
          index,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: process.env.TOKEN,
          },
          withCredentials: true,
        }
      );

      setURL(data?.url);
      setTitle(data?.title);
      setChecked(data?.display);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSwitchChange = async (id) => {
    const newChecked = !checked;
    setChecked(newChecked);
    await editHeader(header, id, newChecked);
  };

  const dragControls = useDragControls();
  const [order, setOrder] = useState(items);
  const startDrag = (e) => {
    dragControls.start(e, { snapToCursor: true });
  };

  useEffect(() => {
    setItems(order);
  }, [order]);

  const updateItems = () => {
    const updatedItems = items.map((item, idx) => ({ ...item, index: idx }));
    console.log(updatedItems);
    setItems(updatedItems);
    reorder(updatedItems);
  };
  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      dragControls={dragControls}
      onDragEnd={updateItems}
    >
      {type === "Header" ? (
        <Card
          className={`dark:bg-secondary bg-background p-3 m-4 ${
            index === 0 ? "my-4 mb-14" : "my-14"
          } flex justify-between items-center`}
        >
          <MdDragIndicator className="cursor-grab" onPointerDown={startDrag} />

          <Inputs
            name={title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Headline title"
            blur={() => editLink("", value?._id, title)}
            type={value?.type}
          />
          <div className="flex flex-col items-end justify-between gap-4">
            <div className="flex gap-3">
              <Button className="text-white bg-transparent hover:bg-transparent">
                <CiShare1 />
              </Button>
              <Switch
                checked={checked}
                onChange={() => handleSwitchChange(id)}
                disabled={disabled}
                onClick={() => handleSwitchChange(id)}
              />
            </div>
            <Button
              onClick={() => remove(value?._id)}
              className="text-white bg-transparent hover:bg-transparent"
            >
              <MdDeleteOutline />
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="flex items-center justify-between p-3 m-4 dark:bg-secondary bg-background ">
          <MdDragIndicator className="cursor-grab" onPointerDown={startDrag} />

          <Inputs
            onChange={(e) => setTitle(e.target.value)}
            blur={() => editLink(URL, value?._id, title)}
            name={title}
            value={title}
            placeholder="Title"
          />
          <Inputs
            onChange={(e) => setURL(e.target.value)}
            blur={() => editLink(URL, value?._id)}
            name={URL}
            value={URL}
            placeholder="URL"
          />

          <div className="flex flex-col items-end justify-between gap-4">
            <div className="flex gap-3">
              <Button className="text-white bg-transparent hover:bg-transparent">
                <CiShare1 />
              </Button>
              <Switch
                checked={checked}
                onChange={handleSwitchChange}
                disabled={disabled}
                onClick={(e) => setChecked(!checked)}
                // type={value?.type}
              />
            </div>
            <Button
              onClick={() => remove(value?._id)}
              className="text-white bg-transparent hover:bg-transparent"
            >
              <MdDeleteOutline />
            </Button>
          </div>
        </Card>
      )}
    </Reorder.Item>
  );
}
