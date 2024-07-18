import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type Props = {
    onChange: (value: string) => void;
    sortOptions: string;
}

const SORT_OPTIONS = [
    {
        label: "Best match",
        value: "bestMatch"
    },
    {
        label: "Delivery price",
        value: "deliveryPrice"
    },
    {
        label: "Estimated delivery time",
        value: "estimatedDeliveryTime"
    }
]

export default function SortOptionsDropdown({ onChange, sortOptions }: Props) {
    const selectedSortLabel = SORT_OPTIONS.find((option) => option.value === sortOptions)?.label || SORT_OPTIONS[0].label;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <Button variant="outline" className="w-full">
                    Sorted by: {selectedSortLabel}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {SORT_OPTIONS.map((option, index) => (
                    <DropdownMenuItem onClick={() => onChange(option.value)} className="cursor-pointer" key={index}>
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

