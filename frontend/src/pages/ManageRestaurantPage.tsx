import { useCreateMyRestaurant } from '../api/MyRestaurantAPI';
import ManageRestaurantForm from '../forms/manage-restaurant-form/ManageRestaurantForm';

export default function ManageRestaurantPage() {
    const { createRestaurant, isLoading } = useCreateMyRestaurant();

    return (
        <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} />
    )
}
