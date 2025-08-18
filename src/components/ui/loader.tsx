import { ClipLoader } from "react-spinners";

interface ILoaderProps {
  size: number;
  color: string;
  className?: string;
}

export default function Loader({ size, color, className }: ILoaderProps) {
return (
  <ClipLoader
    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
    size={size}
    color={color}
  />
);
}
