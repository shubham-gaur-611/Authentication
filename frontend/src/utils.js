import { toast } from "react-toastify";


export const handelSuccess = (message) => toast.success(message, { autoClose: 2000, position: "top-right" });

export const handelError = (message) => toast.error(message, { autoClose: 2000, position: "top-right" });