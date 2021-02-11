import { toast } from "react-toastify";

const Toast = {
  error: (message) => toast.error(message),
  info: (message) => toast.info(message),
  success: (message) => toast.success(message),
};

export default Toast;
