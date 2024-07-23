import { useEffect, useState } from "react";
import { useUpdateMyRestaurantOrder } from "../api/MyRestaurantAPI";
import { ORDER_STATUS } from "../config/order-status-config";
import { Order, OrderStatus } from "../types"
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";

type Props = {
    order: Order;
}

export default function OrderItemCard({ order }: Props) {
    const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();
    const [status, setStatus] = useState<OrderStatus>(order.status);

    useEffect(() => {
        setStatus(order.status);
    }, [order.status]);

    const handleStatusChange = async (newStatus: OrderStatus) => {
        await updateRestaurantStatus({ orderId: order._id as string, status: newStatus });
        setStatus(newStatus);
    }

    const getTime = () => {
        const orderDateTime = new Date(order.createdAt);

        const hours = orderDateTime.getHours();
        const minutes = orderDateTime.getMinutes();

        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
                    <div>Customer: <span className="ml-2 font-normal">{order.deliveryDetails.name}</span></div>
                    <div>Address: <span className="ml-2 font-normal">{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city} - {order.deliveryDetails.country}</span></div>
                    <div className="text-right">Time: <span className="ml-2 font-normal">{getTime()}</span></div>
                    <div className="text-right">Cost: <span className="ml-2 font-normal">₹{(order.totalAmount / 100).toFixed(2)}</span></div>
                </CardTitle>
                <Separator />
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    {order.cartItems.map((item, index) =>
                        <span key={index}>
                            <Badge variant='outline' className="mr-2">{item.quantity}</Badge>
                            {item.name}
                        </span>)}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor='status'>What is the status of this order?</Label>
                    <Select value={status} disabled={isLoading} onValueChange={(value) => handleStatusChange(value as OrderStatus)}>
                        <SelectTrigger id='status'>
                            <SelectValue placeholder='Status' />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {ORDER_STATUS.map((status, index) => (
                                <SelectItem key={index} value={status.value} className="cursor-pointer">{status.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}
