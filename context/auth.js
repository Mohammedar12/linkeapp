"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { setCookie, deleteCookie } from "cookies-next";
import { Toaster, toast } from "sonner";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [error, setError] = useState(null);
  const [isOk, setIsOk] = useState();
  useEffect(() => {
    if (localStorage.getItem("userdata")) {
      getUser();
    }
  }, []);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${process.env.base_url}/user`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      localStorage.setItem("userdata", JSON.stringify(data));
      setUserData(JSON.parse(localStorage.getItem("userdata")));

      setUser(true);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  // Register user
  const registerUser = async ({ username, email, password }) => {
    try {
      const { data } = await axios.post(
        `${process.env.base_url}/sign-up`,
        { email, username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setUser(true);
      getUser();
      setCookie("user", data?.token);
      setUserData(data);
      localStorage.setItem("userID", data?.userId);
      router.push("/signup/appearance");
    } catch (err) {
      toast.error("Wrong Values");
      console.log(err);
      setError(err);
    }
  };

  // Login user
  const loginUser = async ({ email, password }) => {
    try {
      const { data } = await axios.post(
        `${process.env.base_url}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setUser(true);
      getUser();
      setCookie("jwt", data.token);
      router.push("/admin");
      toast.success("Logged in Successfully");
    } catch (err) {
      setError(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    }
  };

  // Logout user
  const logoutUser = async () => {
    try {
      await axios.post(
        `${process.env.base_url}/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      deleteCookie("jwt");
      setUser(null);
      setUserData("");
      localStorage.removeItem("userdata");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const createSite = async (formData) => {
    try {
      const { data } = await axios.post(
        `${process.env.base_url}/sites/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setLoading(false);
      router.push("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message);

      setLoading(false);
      setError(error);
    }
  };

  const updateSite = async (formData) => {
    try {
      const { data } = await axios.put(
        `${process.env.base_url}/sites/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message);

      setLoading(false);
      setError(error);
    }
  };

  // Update user profile
  const updateProfile = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${process.env.base_url}/profile/update?id=${userData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setLoading(false);
      setUser(true);
      getUser();
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  // Clear errors
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
        error,
        setIsOk,
        isOk,
        loading,
        clearErrors,
        updateProfile,
        logoutUser,
        createSite,
        updateSite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
