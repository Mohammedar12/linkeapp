"use client";

import React, { useContext, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import AuthContext from "@/context/auth";
import { cn } from "@/lib/utils";
export default function Appearance(props) {
  const {
    prevStep,
    submitHandler,
    profileTitle,
    setProfileTitle,
    about,
    setAbout,
    onAvatarChange,
    avatar,
    setAvatar,
    loading,
    genreate,
    className,
  } = props;

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-3xl space-y-8 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800 sm:p-10 md:p-12 lg:p-14",
        className
      )}
    >
      <form onSubmit={submitHandler} className="space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Appearance
          </h1>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => prevStep()}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              variant="outline"
            >
              Previous
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white"
              variant="outline"
            >
              Continue
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                Avatar
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Update your profile picture.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage alt="@shadcn" src={avatar} />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <Label
                htmlFor="file"
                className="p-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
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
                Background Color
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose a new background color.
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-500 dark:bg-gray-700" />
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
            className=" py-6 w-full dark:bg-slate-900 text-white"
            placeholder="Enter your  Profile Title..."
            onChange={(e) => setProfileTitle(e.target.value)}
            value={profileTitle}
          />
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
            placeholder={loading ? "loading8..." : "Enter your description..."}
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            disabled={loading ? true : false}
          />
          {about && (
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={genreate}
            >
              Genreate
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
