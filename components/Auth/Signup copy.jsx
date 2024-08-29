"use client";

import React, { useState, useContext } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import AuthContext from "@/context/auth";
import { IoMailOutline } from "react-icons/io5";
import Link from "next/link";

export default function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const { registerUser } = useContext(AuthContext);

  const [email, setEmail] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    await registerUser({ username, email, password });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-slate-900 flex flex-col items-center justify-center",
        className
      )}
      {...props}
    >
      <form onSubmit={onSubmit} className="w-[350px]">
        <div className="grid gap-2 ">
          <div>
            <Label className="sr-only" htmlFor="username">
              Username Number
            </Label>
            <Input
              id="username"
              placeholder="Username"
              type="text"
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="off"
              disabled={isLoading}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-white w-full"
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="text"
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white w-full"
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white w-full text-black  "
            />
          </div>
          <Button disabled={isLoading}>
            {/* {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )} */}
            Sign Up
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      <Button disabled={isLoading} className="w-[350px]">
        {/* {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )} */}
        <Link href={"/login"}>Login To Your Account</Link>
      </Button>
    </div>
  );
}
