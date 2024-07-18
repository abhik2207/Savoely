import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cuisineList } from "../config/restaurant-options-config";
import { Label } from "./ui/label";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
    onChange: (cuisines: string[]) => void;
    selectedCuisines: string[];
    isExpanded: boolean;
    onExpandedClicked: () => void;
}

export default function CuisinesFilter({ onChange, selectedCuisines, isExpanded, onExpandedClicked }: Props) {
    const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const clickedCuisine = event.target.value;
        const isChecked = event.target.checked;

        const newCuisinesList = isChecked ? [...selectedCuisines, clickedCuisine] : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);
        onChange(newCuisinesList);
    }

    return (
        <>
            <div className="flex justify-between items-center px-2">
                <div className="text-md font-semibold mb-2">Filter by Cuisine</div>
                <div onClick={() => onChange([])} className="text-sm font-semibold mb-2 cursor-pointer bg-orange-500 text-white px-3 py-1 rounded-full">Reset</div>
            </div>
            <div className="space-y-2 flex flex-col">
                {cuisineList.slice(0, isExpanded ? cuisineList.length : 7).map((cuisine, index) => {
                    const isSelected = selectedCuisines.includes(cuisine);

                    return (
                        <div className="flex" key={index}>
                            <input id={`cuisine_${cuisine}`} type="checkbox" className="hidden"
                                value={cuisine} checked={isSelected} onChange={handleCuisinesChange} />
                            <Label htmlFor={`cuisine_${cuisine}`}
                                className={`flex flex-1 gap-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${isSelected ? "border border-green-600 text-green-600" : "border border-slate-300"}`}>
                                {isSelected && <Check size={20} strokeWidth={3} className="text-green-600" />}
                                {cuisine}
                            </Label>
                        </div>
                    );
                })}

                <Button onClick={onExpandedClicked} variant='link' className="mt-4 flex-1">{isExpanded ? (
                    <span className="flex flex-row items-center gap-1">View less <ChevronUp /></span>
                ) : (
                    <span className="flex flex-row items-center gap-1">View more <ChevronDown /></span>
                )}</Button>
            </div>
        </>
    )
}
