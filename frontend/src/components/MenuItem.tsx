import { MenuItem } from "../types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
    menuItem: MenuItem;
    addToCart: () => void;
}

export default function MenuItemComponent({ menuItem, addToCart }: Props) {
    return (
        <Card className="cursor-pointer hover:shadow-xl transition-all" onClick={addToCart}>
            <CardHeader>
                <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent className="font-bold">
                ₹{(menuItem.price / 2).toFixed(2)}
            </CardContent>
        </Card>
    )
}
