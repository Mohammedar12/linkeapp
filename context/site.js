"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "@/utils/axios";
import { getCookie } from "cookies-next";
import AuthContext from "@/context/auth";
import { useParams } from "next/navigation";

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [userSite, setUserSite] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { userData } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const param = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${process.env.base_url}/sites/site`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(data);
      setItems(data.links.sort((a, b) => a.index - b.index));
      localStorage.setItem("userSite", JSON.stringify(data));
      setUserSite(JSON.parse(localStorage.getItem("userSite")));
    } catch (error) {
      console.error(error, "here");
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
      toast.error(error);

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
      //   localStorage.setItem("userSite", JSON.stringify(data));
      //   setUserSite(JSON.parse(localStorage.getItem("userSite")));
      setLoading(false);
    } catch (error) {
      toast.error(error);

      setLoading(false);
      setError(error);
    }
  };

  const newHeader = async (header) => {
    try {
      const { data } = await axios.post(
        `${process.env.base_url}/headers/new`,
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
        `${process.env.base_url}/sites/addHeaders`,
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
        `${process.env.base_url}/links/new`,
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
        `${process.env.base_url}/sites/addLinks`,
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
        `${process.env.base_url}/links/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { data: removeFromSites } = await axios.delete(
        `${process.env.base_url}/sites/remove`,
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
        `${process.env.base_url}/sites/reorder`,
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
  // const reorder = (newOrder) => {
  //   console.log(newOrder);
  //   axios.put(`${process.env.base_url}/sites/reorder`, { newOrder: newOrder });
  // };

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
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export default SiteContext;
