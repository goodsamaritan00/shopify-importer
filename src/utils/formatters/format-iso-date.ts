import { format, parseISO } from "date-fns";

export const formatIsoDateAndTime = (date?: string) => {
  if (!date) return ""; // or return 'N/A', or whatever fallback you want
  const formattedDate = format(parseISO(date), "dd MMM yyyy, HH:mm");
  return formattedDate;
};

export const formatIsoDate = (date?: string) => {
  if (!date) return ""; // or return 'N/A', or whatever fallback you want
  const formattedDate = format(parseISO(date), "dd MMM yyyy");
  return formattedDate;
};
