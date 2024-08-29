"use client ";
import { useState } from "react";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export default function Skills(props) {
  const {
    nextStep,
    prevStep,
    skills,
    setSkills,
    // newSkill,
    // setNewSkill,
    // addSkill,
    // removeSkill,
  } = props;

  const [newSkill, setNewSkill] = useState("");

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill && skills?.length < 3 && !skills?.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills?.filter((skill) => skill !== skillToRemove));
  };

  return (
    <Card className="w-full max-w-md dark:bg-gray-800">
      <CardHeader className="pb-2">
        <CardTitle>Add Your Skills</CardTitle>
        <CardDescription>Enter 1-3 Skills.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col  gap-4">
        {skills?.length !== 3 && (
          <form onSubmit={addSkill} className="flex items-center gap-4">
            <Input
              placeholder="Skills"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              disabled={skills?.length >= 3}
            />
            <Button type="submit" disabled={skills?.length >= 3 || !newSkill}>
              Add
            </Button>
          </form>
        )}
        {skills?.length !== 0 && (
          <ul className="mx-4 mb-3 flex flex-wrap gap-2">
            {skills?.map((skill, index) => (
              <li
                key={index}
                className="bg-primary-foreground flex items-center gap-2 p-1 w-fit rounded-md px-2 text-sm"
              >
                {skill}
                <IoIosRemoveCircleOutline
                  onClick={() => removeSkill(skill)}
                  className="cursor-pointer"
                />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => prevStep()}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            variant="outline"
          >
            Previous
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            variant="outline"
            onClick={() => nextStep()}
          >
            Continue
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
