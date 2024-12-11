"use client";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useEffect, useState, useRef, useContext, Suspense } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
// import animationData from "../path/to/your/animation.json";
import pending from "@/assets/icons/email.png";
import Image from "next/image";
import { Cover } from "@/components/ui/cover";
import { TbMailFast } from "react-icons/tb";
import AuthContext from "@/context/auth";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import SiteContext from "@/context/site";
export const dynamic = "force-dynamic";
import {
  setEncodedCookie,
  decodeCookieValue,
  getDecodedCookie,
} from "@/utils/encoding";

export default function Verify() {
  const [status, setStatus] = useState("Verifying...");
  const [checked, setChecked] = useState(false);
  const [time, setTime] = useState(5);
  const router = useRouter();
  const token = useSearchParams().get("verifyToken");

  const { updateSite, sendVerifyToken, tokenSend, setTokenSent } =
    useContext(SiteContext);

  useEffect(() => {
    if (
      getDecodedCookie("authenticated") === false ||
      getDecodedCookie("authenticated") === undefined ||
      !getDecodedCookie("authenticated")
    ) {
      console.log("not exis");

      const currentUrl = window.location.pathname + window.location.search;
      const loginUrl = `/login?redirect=${encodeURIComponent(currentUrl)}`;

      router.push(loginUrl);
    } else {
      if (token) {
        const verifySite = async () => {
          try {
            const { data } = await axios.get(
              `${process.env.NEXT_PUBLIC_BASE_URL}/verify?verifyToken=${token}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );

            if (data?.alreadyVerified) {
              setStatus(data?.message);
              router.push("/admin");
            }
            setStatus("Verified !");
            setChecked(true);
            console.log(token, "succ");

            updateSite({ isActive: true });
          } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(token, "error");
            console.log(error);

            setStatus("Verification failed !");
            setChecked(false);
          }
        };

        verifySite();
      }
    }
  }, [token]);

  useEffect(() => {
    if (checked === true) {
      const timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            router.push("/admin");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [checked, router]);

  const render = () => {
    switch (checked) {
      case true:
        return (
          <CardDescription className="text-lg text-center">
            Congratulations ! . Your Email Verified Successfuly <br />
            You will be redirected to the home page automatically {time}
          </CardDescription>
        );

      case false:
        return (
          <CardDescription className="text-lg">
            Sorry ! . We were unable to verify your email
          </CardDescription>
        );

      default:
        return (
          <CardDescription className="text-lg">
            Your Information in the audit , please wait !
          </CardDescription>
        );
    }
  };

  return (
    <div className="flex items-center justify-center h-dvh bg-primary">
      <Card className="flex flex-col items-center justify-center space-y-8 w-[500px] h-[600px] bg-secondary">
        <CardHeader className="pb-0">
          <Cover className="w-[490px]">
            <TbMailFast className="text-[130px] text-primary m-auto" />
          </Cover>
        </CardHeader>
        <CardTitle className="text-3xl">{status}</CardTitle>
        {render()}
        {checked === false && (
          <CardContent>
            <Button onClick={() => sendVerifyToken()}>
              Resend Verification Link{" "}
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
