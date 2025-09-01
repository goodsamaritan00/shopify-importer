import { toast } from "react-toastify";

interface ISuccess {
  message: string;
  id?: string;
}

export const notifySuccess = ({ message, id }: ISuccess) => {
  toast.success(message);
  toast.clearWaitingQueue({ containerId: id });
};

export const notifyError = (message: string) => {
  toast.error(message);
  toast.clearWaitingQueue();
};
