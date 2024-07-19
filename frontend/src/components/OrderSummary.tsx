import { Trash } from "lucide-react";
import { CartItem } from "../pages/DetailsPage";
import { Restaurant } from "../types"
import { Badge } from "./ui/badge";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

type Props = {
    restaurant: Restaurant;
    cartItems: CartItem[];
    removeFromCart: (cartItem: CartItem) => void;
}

export default function OrderSummary({ restaurant, cartItems, removeFromCart }: Props) {
    const getTotalCost = () => {
        const totalCartValue = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        const totalPrice = totalCartValue + restaurant.deliveryPrice;

        return (totalPrice / 2).toFixed(2);
    }

    return (
        <>
            <CardHeader>
                <CardTitle className="flex justify-between text-2xl font-bold tracking-tight">
                    <span>Your order</span>
                    <span>₹{getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between">
                        <span>
                            <Badge variant="outline" className="mr-2">{item.quantity}</Badge>
                            {item.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Trash onClick={() => removeFromCart(item)} className="cursor-pointer" size={20} color="red" />
                            ₹{((item.price * item.quantity) / 2).toFixed(2)}
                        </span>
                    </div>
                ))}
                <Separator />

                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>₹{(restaurant.deliveryPrice / 2).toFixed(2)}</span>
                </div>
                <Separator />
            </CardContent>
        </>
    )
}
