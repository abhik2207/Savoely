import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

function MobileNavLInks() {
    const { logout } = useAuth0();
    return (
        <>
            <Link to="/user-profile" className="flex text-black bg-white items-center font-bold hover:text-orange-500 transition-all">
                User profile
            </Link>
            <Link to="/order-status" className="flex text-black bg-white items-center font-bold hover:text-orange-500 transition-all">
                Order Status
            </Link>
            <Link to="/manage-restaurant" className="flex text-black bg-white items-center font-bold hover:text-orange-500 transition-all">
                My Restaurant
            </Link>
            <Button className="flex items-center font-bold px-3 hover:bg-orange-500" onClick={() => logout()}>
                Log out
            </Button>
        </>
    )
}

export default MobileNavLInks;
