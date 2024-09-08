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
import _ from "lodash";
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
    bgImage,
    skills,
    setSkills,
    theme,
    setTheme,
    bgOpacity,
    setbgOpacity,
    location,
    setLocation,
    experience,
    setExperience,
  } = useContext(AppearanceContext);

  const [bgColor, setBgColor] = useState(theme?.bgColor || "#3B82F6");
  const [avatarBgColor, setAvatarBgColor] = useState(
    theme?.AvatarBgColor || userSite?.theme?.AvatarBgColor || "#000000"
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

  const submitHandler = (event) => {
    event.preventDefault();
    const payload = convertValuesToPayload(socials);

    if (avatar && avatar.image) {
      console.log("Avatar File:", avatar.image);
    } else {
      console.log("No avatar file provided or avatar.image is empty.");
    }
    if (bgImage && bgImage.image) {
      console.log("bgImage File:", bgImage.image);
    } else {
      console.log("No bgImage file provided or bgImage.image is empty.");
    }

    const newProfile = {
      skills,
      title: profileTitle,
      theme,
      social: payload,
      about,
      avatar: avatar.image,
      bgImage: bgImage.image,
    };

    const changedFields = _.omitBy(newProfile, (value, key) => {
      return _.isEqual(value, _.get(userSite, key));
    });

    console.log("Changed Fields:", changedFields);

    const formData = new FormData();

    _.forOwn(changedFields, (value, key) => {
      if (key === "theme") {
        // Handle theme object separately
        _.forOwn(value, (themeValue, themeKey) => {
          if (themeKey === "bgImage" && themeValue instanceof File) {
            formData.append("bgImage", themeValue, themeValue.name);
          } else {
            formData.append(`theme[${themeKey}]`, themeValue);
          }
        });
      } else if (value instanceof File) {
        formData.append(key, value, value.name);
      } else if (_.isObject(value) && !(value instanceof File)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    // Log the FormData content, including the file details
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}:`, value.name);
      } else {
        console.log(`${key}: ${value}`);
      }
    }
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
                      src={
                        avatar.preview ? avatar.preview : avatar.image || user1
                      }
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
                      onChange={avatar.handleImageChange}
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
                  Experience
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add your experience years.
                </p>
              </div>
              <Input
                type="number"
                className="w-full py-6 text-white dark:bg-slate-900"
                placeholder="Enter your  Profile Title..."
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                  Location
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add your location if you want.
                </p>
              </div>
              <Input
                type="number"
                className="w-full py-6 text-white dark:bg-slate-900"
                placeholder="Enter your  Profile Title..."
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              />
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
                <AccordionTrigger className="text-lg">
                  Background
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="space-y-4">
                    <h2 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      Background Image
                    </h2>
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20 rounded-md ">
                        <AvatarImage
                          alt="@shadcn"
                          src={
                            bgImage.preview
                              ? bgImage.preview
                              : bgImage.image || user1
                          }
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
                          onChange={bgImage.handleImageChange}
                        />
                        Upload
                      </Label>
                      {/* <Input type="file" /> */}
                    </div>
                  </div>
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
                <AccordionTrigger className="text-lg">
                  {" "}
                  Avatar Border Color
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <PickColor
                    color={avatarBgColor}
                    setColor={setAvatarBgColor}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg">
                  {" "}
                  Particles
                </AccordionTrigger>
                <AccordionContent className="flex items-center justify-between px-4">
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
