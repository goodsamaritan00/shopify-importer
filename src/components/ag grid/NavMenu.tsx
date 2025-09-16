import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useLogout } from "../../hooks/useAuth";
import useAuthContext from "../../hooks/useAuthContext";
import { MdArrowDropDown } from "react-icons/md";
import { useState } from "react";
import logo from "../../assets/3plogo.png";

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { dispatch } = useAuthContext();
  const { logout } = useLogout();

  const { user } = useAuthContext();

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        const isOpen = open ? true : false;
        setIsMenuOpen(isOpen);
      }}
    >
      <DropdownMenuTrigger className="hover:bg-white/20 rounded-md py-1 px-2 flex items-center gap-3">
        <img src={logo} className="h-[50px]" />
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold">{user?.email}</span>
          <small className="text-neutral-500">Admin</small>
        </div>
        <MdArrowDropDown
          className={`transition duration-500 text-2xl ${isMenuOpen && "rotate-[180deg]"}`}
        />
        {/* <Button size='sm' className="ml-4 relative">
          <IoIosNotifications className=" text-2xl" />
          <span className="absolute text-blue-400 bg-white rounded-full border border-blue-400 -top-3 -right-2 w-[25px] h-[25px] text-sm rounded-full">2</span>
        </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Search Products</DropdownMenuItem>
        <DropdownMenuItem>Imported Products</DropdownMenuItem>
        <DropdownMenuItem>Logs</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout(dispatch)}>
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
