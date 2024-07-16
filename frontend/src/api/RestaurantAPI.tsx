import { useQuery } from "react-query";
import { RestaurantSearchResponse } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (city?: string) => {
    const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
        const resposne = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}`);

        if (!resposne.ok) {
            throw new Error("Failed to search for restaurants!");
        }

        return resposne.json();
    }

    const { data: results, isLoading } = useQuery(
        ["searchRestaurants"],
        createSearchRequest,
        { enabled: !!city }
    );

    return { results, isLoading };
}