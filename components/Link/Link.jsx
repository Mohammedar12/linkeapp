import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
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
  const [checked, setChecked] = useState(value?.display || false);
  const [disabled, setDisabled] = useState(!value?.title);
  const [header, setHeader] = useState(value?.title);
  const [title, setTitle] = useState(value?.title);
  const [URL, setURL] = useState(value?.url);

  const editLink = async (id, updates) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/links/${id}`,
        {
          ...updates,
          index,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(data);

      // Update local state based on server response
      if (updates.url !== undefined) setURL(data.url);
      if (updates.title !== undefined) setTitle(data.title);
      if (updates.display !== undefined) setChecked(data.display);
    } catch (error) {
      console.log(error);
      // Optionally, revert the local state change if the server update fails
      if (updates.display !== undefined) setChecked(!updates.display);
    }
  };

  const dragControls = useDragControls();
  const [order, setOrder] = useState(items);
  const startDrag = (e) => {
    dragControls.start(e, { snapToCursor: true });
  };

  useEffect(() => {
    setItems(order);
  }, [order]);

  const updateItems = useCallback(() => {
    const updatedItems = items.map((item, idx) => ({ ...item, index: idx }));
    console.log(updatedItems);
    setItems(updatedItems);
    reorder(updatedItems);
  }, [items, setItems, reorder]);

  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      dragControls={dragControls}
      onDragEnd={updateItems}
    >
      {type === "Header" ? (
        <Card
          className={`  bg-card  border-none text-black p-3 m-4 ${
            index === 0 ? "my-4 mb-14" : "my-14"
          } flex justify-between items-center`}
        >
          <MdDragIndicator className="cursor-grab" onPointerDown={startDrag} />

          <Inputs
            name={title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Headline title"
            blur={() => editLink(value?._id, { title: title })}
            type={value?.type}
          />
          <div className="flex flex-col items-end justify-between gap-4">
            <div className="flex gap-3">
              <Switch
                onCheckedChange={(newCheckedValue) => {
                  setChecked(newCheckedValue);
                  editLink(value?._id, { display: newCheckedValue });
                }}
                checked={checked}
              />
            </div>
            <Button
              onClick={() => remove(value?._id)}
              className="text-black bg-transparent hover:bg-transparent"
            >
              <MdDeleteOutline />
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="flex items-center justify-between p-3 m-4 text-black border-none bg-card ">
          <MdDragIndicator className="cursor-grab" onPointerDown={startDrag} />

          <Inputs
            onChange={(e) => setTitle(e.target.value)}
            blur={() => editLink(value?._id, { URL: URL, title: title })}
            name={title}
            value={title}
            placeholder="Title"
          />
          <Inputs
            onChange={(e) => setURL(e.target.value)}
            blur={() => editLink(value?._id, { URL: URL })}
            name={URL}
            value={URL}
            placeholder="URL"
          />

          <div className="flex flex-col items-end justify-between gap-4">
            <div className="flex gap-3">
              <Switch
                onCheckedChange={(newCheckedValue) => {
                  setChecked(newCheckedValue);
                  editLink(value?._id, { display: newCheckedValue });
                }}
                checked={checked}
              />
            </div>
            <Button
              onClick={() => remove(value?._id)}
              className="text-black bg-transparent hover:bg-transparent"
            >
              <MdDeleteOutline />
            </Button>
          </div>
        </Card>
      )}
    </Reorder.Item>
  );
}
