import { DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent } from "./ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

function UsernameMenu() {
    const { user, logout } = useAuth0();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2 transition-all">
                <CircleUserRound className="text-orange-500" />
                {user?.email}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-2 py-2 px-2 pt-4">
                <DropdownMenuItem>
                    <Link to="/user-profile" className="font-bold hover:text-orange-500 transition-all">User profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to="/manage-restaurant" className="font-bold hover:text-orange-500 transition-all">Manage Restaurant</Link>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem>
                    <Button className="flex flex-1 font-bold bg-orange-500 w-full" onClick={() => logout()}>Log out</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UsernameMenu;
