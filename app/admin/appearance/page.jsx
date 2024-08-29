"use client";

import { useContext, useEffect, useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Gradient from "@/components/ui/gradient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import Social from "@/components/Startup/socials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import AppearanceContext from "@/context/appearance";
import SiteContext from "@/context/site";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import AuthContext from "@/context/auth";
import user1 from "@/assets/user1.jpg";
import Skills from "@/components/Startup/skills";
import PickColor from "@/components/ui/pickColor";

export default function AppearancePage() {
  const { createSite, userSite, updateSite, fetchData, setUserSite } =
    useContext(SiteContext);
  const {
    handleInputChange,
    convertValuesToPayload,
    onAvatarChange,
    socials,
    platforms,
    initialSocialValues,
    profileTitle,
    setProfileTitle,
    about,
    setAbout,
    loading,
    avatar,
    avatarPreview,
    skills,
    setSkills,
    theme,
    setTheme,
  } = useContext(AppearanceContext);

  const [bgColor, setBgColor] = useState(theme?.bgColor || "#3B82F6");
  const [avatarBgColor, setAvatarBgColor] = useState(
    theme?.AvatarBgColor || userSite?.theme.AvatarBgColor || "#3B82F6"
  );

  const [isParticles, setIsParticles] = useState(theme?.isParticles || true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTheme({
      ...theme,
      bgColor: bgColor,
      AvatarBgColor: avatarBgColor,
      isParticles,
    });
  }, [bgColor, avatarBgColor, isParticles]);

  const [newSkill, setNewSkill] = useState("");

  const addSkill = (e) => {
    e.preventDefault();
    console.log("Current skills:", skills);
    if (newSkill && skills.length < 3 && !skills.includes(newSkill)) {
      console.log("Adding skill:", newSkill);
      setSkills((prevSkills) => {
        console.log("Previous skills:", prevSkills);
        return [...prevSkills, newSkill];
      });
      setNewSkill("");
    } else {
      console.log("Cannot add skill");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills?.filter((skill) => skill !== skillToRemove));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const payload = convertValuesToPayload(socials);

    const formData = new FormData();
    formData.set("skills", JSON.stringify(skills));
    formData.set("title", profileTitle);
    formData.set("theme", JSON.stringify(theme));
    formData.set("social", JSON.stringify(payload));
    formData.set("about", about);
    formData.set("avatar", avatar);

    updateSite(formData);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission if within a form
      addSkill(e); // Call your main function
    }
  };

  const handleSwitchChange = async () => {
    const newChecked = !isParticles;
    setIsParticles(newChecked);
  };

  return (
    <div className="w-full max-w-3xl col-span-4 p-8 mx-auto space-y-8 bg-white shadow-lg rounded-xl dark:bg-gray-800 sm:p-10 md:p-12 lg:p-14">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Appearance
        </h1>
      </div>
      <form onSubmit={submitHandler}>
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="themes">Themes</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                    Profile Picture
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Update your profile picture.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20 rounded-md ">
                    <AvatarImage
                      alt="@shadcn"
                      src={avatarPreview ? avatarPreview : avatar || user1}
                    />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <Label
                    htmlFor="file"
                    className="p-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    variant="outline"
                  >
                    <Input
                      id="file"
                      className="sr-only"
                      type="file"
                      onChange={onAvatarChange}
                    />
                    Upload Your Photo
                  </Label>
                  {/* <Input type="file" /> */}
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                    Profile Title
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Update your Profile Title.
                  </p>
                </div>
                <Input
                  className="w-full py-6 text-white dark:bg-slate-900"
                  placeholder="Enter your  Profile Title..."
                  onChange={(e) => setProfileTitle(e.target.value)}
                  value={profileTitle}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                  Description
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Update your profile description.
                </p>
              </div>

              <Textarea
                className="min-h-[120px] dark:bg-slate-900 text-white"
                placeholder={
                  loading ? "loading8..." : "Enter your description..."
                }
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                disabled={loading ? true : false}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                  Add Your Skills
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enter 1-3 Skills.
                </p>
              </div>

              <div className="flex items-center w-full gap-4">
                <div className="flex items-center flex-1 gap-4 dark:bg-slate-900">
                  {skills?.length !== 3 && (
                    <>
                      <Input
                        className="py-6 dark:bg-slate-900"
                        placeholder="Skills"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        disabled={skills?.length >= 3}
                        onKeyDown={handleKeyDown}
                      />
                    </>
                  )}
                  {skills?.length !== 0 && (
                    <ul className="flex items-center gap-2 py-3 mx-3">
                      {skills?.map((skill, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 p-1 px-2 text-sm rounded-md bg-primary-foreground w-max"
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
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                  Add Social Links
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enter your social links.
                </p>
              </div>

              <Social
                values={socials}
                platforms={platforms}
                initialSocialValues={initialSocialValues}
                handleInputChange={handleInputChange}
                page="appearance"
              />
            </div>
            <div className="space-y-4 ">
              <Button type="submit">Save</Button>
            </div>
          </TabsContent>
          <TabsContent value="colors">
            <div className="font-medium"></div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  {" "}
                  Background Color Style :{" "}
                  {theme?.isGradient ? " Gradient" : " Color"}
                </AccordionTrigger>
                <AccordionContent>
                  <Tabs defaultValue={`gradient`} className="space-y-6">
                    <TabsList className="mt-3">
                      <TabsTrigger
                        value="gradient"
                        onClick={() => setTheme({ ...theme, isGradient: true })}
                      >
                        Gradient
                      </TabsTrigger>
                      <TabsTrigger
                        value="color"
                        onClick={() =>
                          setTheme({ ...theme, isGradient: false })
                        }
                      >
                        color
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="gradient">
                      <Gradient />
                    </TabsContent>
                    <TabsContent value="color">
                      <PickColor color={theme?.bgColor} setColor={setBgColor} />
                    </TabsContent>
                  </Tabs>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger> Avatar Color</AccordionTrigger>
                <AccordionContent>
                  <PickColor
                    color={avatarBgColor}
                    setColor={setAvatarBgColor}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger> Particles</AccordionTrigger>
                <AccordionContent className="flex items-center justify-between">
                  <h3>Show Particles</h3>
                  <Switch onClick={handleSwitchChange} checked={isParticles} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="space-y-4 ">
              <Button type="submit">Save</Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
