"use client";
import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { MainNav } from "@/components/Admin/main-nav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export default function Dashboard() {
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState("");

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
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className="font-semibold text-primary">
              General
            </Link>
            <Link href="#">Security</Link>
            <Link href="#">Integrations</Link>
            <Link href="#">Support</Link>
            <Link href="#">Organizations</Link>
            <Link href="#">Advanced</Link>
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Profile Title</CardTitle>
                <CardDescription>
                  Used to identify your profile .
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Input placeholder="Profile Title" />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>
                  Tell Your Audience About Your Self
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input placeholder="About" />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Add Your Skills</CardDescription>
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
                    <Button
                      type="submit"
                      disabled={skills?.length >= 3 || !newSkill}
                    >
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

              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>Add Your Location</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input placeholder="Location" />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
