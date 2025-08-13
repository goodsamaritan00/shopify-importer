import { ClipLoader } from "react-spinners";

interface ILoaderProps {
  size: number;
  color: string;
}

export default function Loader({ size, color }: ILoaderProps) {
  return <ClipLoader className="absolute top-1/2 left-1/2" size={size} color={color} />;
}
