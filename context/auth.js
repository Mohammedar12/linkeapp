"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { setCookie, deleteCookie } from "cookies-next";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("user");
  }
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [erorr, setErorr] = useState(null);
  const [isOk, setIsOk] = useState();

  const router = useRouter();

  // useEffect(() => {
  //   getUser();
  // }, []);

  const registerUser = async ({ email, phone, password }) => {
    try {
      const { data } = await axios.post(
        `${process.env.base_url}/sing-up`,
        {
          email,
          phone,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: process.env.TOKEN,
          },
          withCredentials: true,
        }
      );

      if (data) {
        setUser(true);
        getUser();
        setCookie("user", data?.token);
        localStorage.setItem("userID", data?.userId);

        router.push("/");
      }
    } catch (err) {
      setErorr(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    }
  };

  const loginUser = async ({ email, password }) => {
    try {
      const { data } = await axios.post(
        `${process.env.base_url}/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: process.env.TOKEN,
          },
          withCredentials: true,
        }
      );

      if (data) {
        setUser(true);
        getUser();
        setCookie("jwtt", data.token);
        console.log(data);
        router.push("/");
        toast.success('"Logged in Successfully"');
      }
    } catch (err) {
      setErorr(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    }
  };

  const logoutUser = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.base_url}/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      deleteCookie("jwtt");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${process.env.base_url}/profile/update?id=${userData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
          withCredentials: true,
        }
      );

      if (data) {
        setLoading(false);
        setUser(true);
        getUser();
      }
    } catch (error) {
      setLoading(false);
      setErorr(error);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${process.env.base_url}/user`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `${token}`,
        },
        withCredentials: true,
      });
      setUserData(data);
    } catch (error) {
      setErorr(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        user,
        setUser,
        setUserData,
        userData,
        erorr,
        setIsOk,
        isOk,
        loading,
        clearErrors,
        updateProfile,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
