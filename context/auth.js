"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { setCookie, deleteCookie } from "cookies-next";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [erorr, setErorr] = useState(null);
  const [isOk, setIsOk] = useState();

  const router = useRouter();

  // useEffect(() => {
  //   getUser();
  // }, []);

  const registerUser = async ({ username, phone, password }) => {
    try {
      const { data } = await axios.post(
        `${process.env.base_url}/sing-up`,
        {
          name,
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

  const loginUser = async ({ username, password }) => {
    try {
      const { data } = await axios.post(
        `${process.env.base_url}/login`,
        {
          username,
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
        toast.success('"Logged in Successfully"');
      }
    } catch (err) {
      setErorr(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    }
  };

  const logoutUser = async () => {
    try {
      const { data } = await axios.get(`${process.env.base_url}/logout`, {
        headers: {
          "Content-Type": "application/json",
          token: process.env.TOKEN,
        },
        withCredentials: true,
      });

      if (data) {
        deleteCookie("user");
        setUser(false);
        localStorage.removeItem("userID");
        localStorage.removeItem("userData");

        router.push("/");
        toast.success('"Logged Out Successfully"');
      }
    } catch (error) {
      setErorr(error?.response?.data?.message);
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
            token: process.env.TOKEN,
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
          token: process.env.TOKEN,
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
