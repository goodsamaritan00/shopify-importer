import { IoMdMenu } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useLogout } from "../../hooks/useAuth";
import useAuthContext from "../../hooks/useAuthContext";

export default function NavMenu() {
  const { dispatch } = useAuthContext();
  const { logout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-white/20 rounded-md py-1 px-2 flex items-center gap-2">
        <IoMdMenu className="text-3xl " />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Search Products</DropdownMenuItem>
        <DropdownMenuItem>Imported Products</DropdownMenuItem>
        <DropdownMenuItem>Graph</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout(dispatch)}>
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
