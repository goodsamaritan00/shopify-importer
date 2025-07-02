import { ClipLoader } from 'react-spinners'

interface ILoaderProps {
  size: number,
  color: string
}

export default function Loader({ size, color }: ILoaderProps) {
  return (
    <ClipLoader size={size} color={color} />
  )
}
