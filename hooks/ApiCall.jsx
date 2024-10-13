import axios from "@/utils/axios";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";

const useApiCall = () => {
  const [items, setItems] = useState([]);

  const fetchData = async (url) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${url}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const newHeader = async (header) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/headers/new`,
        {
          header: header,
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

  const newLink = async (url) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/links/new`,
        {
          url: url,
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

  const remove = async (url, id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${url}/${id}`,
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

  //   const updateData = async (url, id, data) => {
  //     try {
  //       const result = await axios.put(`/${url}/${id}`);

  //       setItems((prevItems) => [...prevItems, result.data]);
  //       console.log(result.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   const removeData = async (url, id) => {
  //     try {
  //       const result = await axios.delete(`/${url}/${id}`);

  //       setItems((prevItems) => prevItems.filter((item) => item._id !== id));

  //       console.log(result.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  return { setItems, items, fetchData, newHeader, newLink, remove };
};

export default useApiCall;
