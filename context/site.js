"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "@/utils/axios";
import { getCookie, setCookie } from "cookies-next";
import AuthContext from "@/context/auth";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  setEncodedCookie,
  decodeCookieValue,
  getDecodedCookie,
} from "@/utils/encoding";

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [userSite, setUserSite] = useState();
  const [loading, setLoading] = useState(true);
  const [tokenSend, setTokenSent] = useState(null);
  const [iframReload, setIframReload] = useState(0);
  const [error, setError] = useState(null);
  const { userData } = useContext(AuthContext);
  const [site, setSite] = useState();

  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sites/site`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setItems(data.links.sort((a, b) => a.index - b.index));
      localStorage.setItem("userSite", JSON.stringify(data));
      setUserSite(JSON.parse(localStorage.getItem("userSite")));
    } catch (error) {
      console.error(error, "here");
    }
  };

  const getSite = async (slug) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sites/site/${slug}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setSite(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createSite = async (formData) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sites/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setLoading(false);
      // setCookie("registerSteps", data.registerSteps);
      router.push("/admin");
    } catch (error) {
      toast.error(error);

      setLoading(false);
      setError(error);
    }
  };

  const updateSite = async (formData) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sites/update`,
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
      toast.error(error);

      setLoading(false);
      setError(error);
    }
  };

  const updateUser = async (registerSteps) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/updateuser`,
        registerSteps,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setLoading(false);
      // setCookie("registerSteps", data.registerSteps);
    } catch (error) {
      toast.error(error);

      setLoading(false);
      setError(error);
    }
  };

  const sendVerifyToken = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/send-verifyToken`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setTokenSent(data?.message);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
      console.log(error);
      setTokenSent(error?.response?.data?.message);
    }
  };

  const newHeader = async (header) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/headers/new`,
        {
          title: header,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const addToSite = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sites/addHeaders`,
        {
          headers: data._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setItems((prev) => [...items, data]);
      console.log(items);
    } catch (error) {
      console.log(error);
    }
  };

  const newLink = async (url, type) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/links/new`,
        {
          url: url,
          type,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const addToSite = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sites/addLinks`,
        {
          links: data._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setItems((prev) => [...items, data]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const remove = async (id) => {
    console.log(items);
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/links/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { data: removeFromSites } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sites/remove`,
        {
          data: { itemId: id },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const removed = items.filter((item) => item._id !== id);

      setItems((prev) => [...removed]);
    } catch (error) {
      console.log(error);
    }
  };

  const reorder = async (updatedItems) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sites/reorder`,
        {
          links: updatedItems.map((item, index) => ({
            id: item.id,
            index: index, // New index based on the order in the array
          })),
        }
      );
      console.log("Order updated in backend", response.data);
    } catch (error) {
      console.error("Error updating order in backend", error);
    }
  };

  return (
    <SiteContext.Provider
      value={{
        setItems,
        items,
        fetchData,
        newHeader,
        newLink,
        remove,
        reorder,
        error,
        loading,
        createSite,
        updateSite,
        setUserSite,
        userSite,
        updateUser,
        sendVerifyToken,
        tokenSend,
        setTokenSent,
        loading,
        setLoading,
        getSite,
        site,
        setSite,
        iframReload,
        setIframReload,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export default SiteContext;
