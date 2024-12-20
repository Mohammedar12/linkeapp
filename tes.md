import React, { useState, useRef, useEffect } from "react";
import { Card } from "../ui/card";
import Inputs from "../Inputs/Inputs";
import { MdDeleteOutline, MdDragIndicator } from "react-icons/md";
import { CiShare1 } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Reorder, useDragControls } from "framer-motion";
import axios from "axios";

export function Links({ value, type, id, remove }) {
  const [checked, setChecked] = useState(value?.display);
  const [disabled, setDisabled] = useState(!value?.header);
  const [header, setHeader] = useState(value?.header);
  // const [url, setUrl] = useState(value?.url);
  // const [title, setTitle] = useState();
  const [URL, setURL] = useState({ url: value?.url, title: value?.title });

  useEffect(() => {
    // Update disabled state if header changes
    setDisabled(header === "");
    setDisabled(URL.url === "");
  }, []);

  const editHeader = async (header, id, display) => {
    try {
      const { data } = await axios.put(
        `${process.env.base_url}/headers/${id}`,
        {
          header,
          display,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: process.env.TOKEN,
          },
          withCredentials: true,
        }
      );
      setHeader(data.header);
      setChecked(data?.display);
      // setDisabled(header == "" ? true : false);
    } catch (error) {
      console.log(error);
    }
  };

  const editLink = async (url, id, display) => {
    try {
      const { data } = await axios.put(
        `${process.env.base_url}/links/${id}`,
        {
          url: url.url,
          title: url.title,
          display,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: process.env.TOKEN,
          },
          withCredentials: true,
        }
      );

      setURL({ url: data.url, title: value?.title });
      setChecked(data?.display);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSwitchChange = async (type) => {
    const newChecked = !checked;
    setChecked(newChecked);
    // await editHeader(header, value.id, newChecked);
  };

  const dragControls = useDragControls();

  const startDrag = (e) => {
    dragControls.start(e, { snapToCursor: true });
  };
  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      dragControls={dragControls}
    >
      {type === "Header" ? (
        <Card className="bg-neutral-700 p-3 m-4 flex justify-between items-center ">
          <MdDragIndicator className="cursor-grab" onPointerDown={startDrag} />

          <Inputs
            name={header}
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            placeholder="Headline title"
            blur={() => editHeader(header, id)}
            type={value?.type}
          />
          <div className="flex flex-col justify-between  items-end gap-4">
            <div className="flex gap-3">
              <Button className="bg-transparent hover:bg-transparent text-white">
                <CiShare1 />
              </Button>
              <Switch
                checked={checked}
                onChange={handleSwitchChange}
                disabled={disabled}
                onClick={(e) => setChecked(!checked)}
              />
            </div>
            <Button
              onClick={() => remove("headers", id)}
              className="bg-transparent hover:bg-transparent text-white"
            >
              <MdDeleteOutline />
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="bg-neutral-700 p-3 m-4 flex justify-between items-center ">
          <MdDragIndicator className="cursor-grab" onPointerDown={startDrag} />

          <Inputs
            onChange={(e) => setURL({ url: URL.url, title: e.target.value })}
            blur={() => editLink(URL, id)}
            name={URL.title}
            value={URL.title}
            placeholder="Title"
          />
          <Inputs
            onChange={(e) => setURL({ url: e.target.value, title: URL.title })}
            blur={() => editLink(URL, id)}
            name={URL.url}
            value={URL.url}
            placeholder="URL"
          />

          <div className="flex flex-col justify-between  items-end gap-4">
            <div className="flex gap-3">
              <Button className="bg-transparent hover:bg-transparent text-white">
                <CiShare1 />
              </Button>
              <Switch
                checked={checked}
                onChange={handleSwitchChange(value?.type)}
                disabled={disabled}
                onClick={(e) => setChecked(!checked)}
                // type={value?.type}
              />
            </div>
            <Button
              onClick={() => remove("links", id)}
              className="bg-transparent hover:bg-transparent text-white"
            >
              <MdDeleteOutline />
            </Button>
          </div>
        </Card>
      )}
    </Reorder.Item>
  );
}
