import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from '../../components/ui/form';
import DetailsSection from './DetailsSection';
import { Separator } from '../../components/ui/separator';
import CuisinesSection from './CuisinesSection';
import MenuSection from './MenuSection';
import ImageSection from './ImageSection';
import LoadingButton from '../../components/LoadingButton';
import { Button } from '../../components/ui/button';
import { Restaurant } from '../../types';
import { useEffect } from 'react';

const restaurantFormSchema = z.object({
    restaurantName: z.string({
        required_error: "Restaurant name is required"
    }),
    city: z.string({
        required_error: "City is required"
    }),
    country: z.string({
        required_error: "Country is required"
    }),
    deliveryPrice: z.coerce.number({
        required_error: "Delivery price is required",
        invalid_type_error: "Must be a valid number"
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "Estimated delivery time is required",
        invalid_type_error: "Must be a valid number"
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "Please select at least 1 item"
    }),
    menuItems: z.array(z.object({
        name: z.string().min(1, "Name is required"),
        price: z.coerce.number().min(1, "Price is required")
    })),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional()
}).refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image file must be provided",
    path: ["imageFile"]
});

type restaurantFormData = z.infer<typeof restaurantFormSchema>;

type Props = {
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
    restaurant?: Restaurant;
}

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
    const form = useForm<restaurantFormData>({
        resolver: zodResolver(restaurantFormSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }]
        }
    });

    useEffect(() => {
        if (!restaurant) {
            return;
        }

        const deliveryPriceFormatted = parseInt((restaurant.deliveryPrice / 2).toFixed(2));

        const menuItemsFormatted = restaurant.menuItems.map((item) => (
            {
                ...item,
                price: parseInt((item.price / 2).toFixed(2)),
            }
        ));

        const updatedRestaurant = {
            ...restaurant,
            deliveryPrice: deliveryPriceFormatted,
            menuItems: menuItemsFormatted
        }

        form.reset(updatedRestaurant);
    }, [form, restaurant]);

    const onSubmit = (formDataJson: restaurantFormData) => {
        const formData = new FormData();

        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);

        // Change the value 2 accordingly to Stripe lowest indian denomination
        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 2).toString());
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());

        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);
        });

        formDataJson.menuItems.forEach((item, index) => {
            formData.append(`menuItems[${index}][name]`, item.name);
            formData.append(`menuItems[${index}][price]`, (item.price * 2).toString());
        });

        if (formDataJson.imageFile) {
            formData.append('imageFile', formDataJson.imageFile);
        }

        onSave(formData);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 bg-gray-50 p-10 rounded-lg'>
                <DetailsSection />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                <Separator />

                {isLoading ? <LoadingButton /> : <Button type='submit'>Submit</Button>}
            </form>
        </Form>
    )
}

export default ManageRestaurantForm;
