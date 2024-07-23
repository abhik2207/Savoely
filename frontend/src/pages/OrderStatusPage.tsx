import { useGetMyOrders } from "../api/OrderAPI"
import OrderStatusDetail from "../components/OrderStatusDetail";
import OrderStatusHeader from "../components/OrderStatusHeader";
import { AspectRatio } from "../components/ui/aspect-ratio";

export default function OrderStatusPage() {
    const { isLoading, orders } = useGetMyOrders();

    if (isLoading) {
        return (
            <span>Loading...</span>
        )
    }

    if (!orders || orders.length === 0) {
        return (
            <span>No orders found</span>
        )
    }

    return (
        <div className="space-y-10">
            {orders.map((order, index) => (
                <div className="space-y-10 bg-gray-50 p-10 rounded-lg" key={index}>
                    <OrderStatusHeader order={order} />
                    <div className="grid gap-10 md:grid-cols-2">
                        <OrderStatusDetail order={order} />
                        <AspectRatio ratio={16 / 9}>
                            <img src={order.restaurant.imageUrl} className="rounded-md h-full w-full object-cover" alt="Restaurant image" />
                        </AspectRatio>
                    </div>
                </div>
            ))}
        </div>
    )
}
