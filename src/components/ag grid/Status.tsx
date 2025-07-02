import React from "react";

type StatusType = "imported" | "notImported" | "warning";

interface IStatusProps {
  children: React.ReactNode;
  status: StatusType;
}

const styles: Record<StatusType, string> = {
  imported: "bg-green-50 text-green-500 border border-green-300",
  notImported: "bg-red-50 text-red-500 border border-red-300",
  warning: "bg-yellow-100 text-yellow-400 border border-yellow-300",
};

export default function Status({ children, status }: IStatusProps) {
  return (
    <div
      className={`relative flex  font-semibold items-center py-1 gap-5 px-2 rounded-xl ${styles[status]}`}
    >
      {children}
    </div>
  );
}
