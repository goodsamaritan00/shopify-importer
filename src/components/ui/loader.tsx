import { ClipLoader } from "react-spinners";

interface ILoaderProps {
  size: number;
  color: string;
  className?: string;
}

export default function Loader({ size, color, className }: ILoaderProps) {
  return <ClipLoader className={` ${className}`} size={size} color={color} />;
}
