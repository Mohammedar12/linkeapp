import { AuthProvider } from "@/context/auth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function GlobalProvider({ children }) {
  return (
    <>
      {/* <ToastContainer position="bottom-right" /> */}
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
