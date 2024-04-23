import React, { useState } from "react";
import { Card } from "../ui/card";
import Inputs from "../Inputs/Inputs";
import { MdDeleteOutline, MdDragIndicator } from "react-icons/md";
import { CiShare1 } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Reorder, useDragControls } from "framer-motion";

export function Header({ value }) {
  const dragControls = useDragControls();

  const startDrag = (e) => {
    dragControls.start(e, { snapToCursor: true });
    console.log("dwon");
  };
  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      dragControls={dragControls}
    >
      <Card className="bg-neutral-700 p-3 m-4 flex justify-between items-center ">
        <MdDragIndicator className="cursor-grab" onPointerDown={startDrag} />
        <div>
          <Inputs name="Header" />
        </div>
        <div className="flex flex-col justify-between  items-end gap-4">
          <Switch />

          <Button className="bg-transparent hover:bg-transparent text-white">
            <MdDeleteOutline />
          </Button>
        </div>
      </Card>
    </Reorder.Item>
  );
}
