import { useParams } from "react-router-dom"
import { useSearchRestaurants } from "../api/RestaurantAPI";
import SearchResultInfo from "../components/SearchResultInfo";
import SearchResultCard from "../components/SerahcResultCard";
import { useState } from "react";
import SearchBar, { SearchForm } from "../components/SearchBar";
import PaginationSelectore from "../components/PaginationSelectore";

export type SearchState = {
    searchQuery: string;
    page: number;
}

export default function SearchPage() {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1
    });
    const { results, isLoading } = useSearchRestaurants(searchState, city);

    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState, page
        }));
    }

    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState, searchQuery: searchFormData.searchQuery
        }));
    }

    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState, searchQuery: ""
        }));
    }

    if (isLoading) {
        return (
            <span>Loading...</span>
        )
    }

    if (!results?.data || !city) {
        return (
            <span>No results found!</span>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                Insert cuisines here
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar placeHolder="Search by cuisine or restaurant name" onSubmit={setSearchQuery} onReset={resetSearch}
                    searchQuery={searchState.searchQuery} />
                <SearchResultInfo total={results.pagination.total} city={city} />
                {results.data.map((restaurant, index) => (
                    <SearchResultCard restaurant={restaurant} key={index} />
                ))}
                <PaginationSelectore page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage} />
            </div>
        </div>
    )
}
