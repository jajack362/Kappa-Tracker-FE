'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { EyeOff, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export type FilterOptions = {
    hideHandedIn: boolean;
    hideMaxQuantity: boolean;
};

interface QuestFiltersProps {
    onChange: (filters: FilterOptions) => void;
}

const useLocalStorageState = (key: string, initialValue: any) => {
    // State to store our value
    const [storedValue, setStoredValue] = useState(initialValue);

    // Flag to check if component is mounted
    const [isMounted, setIsMounted] = useState(false);

    // Effect for setting isMounted to true
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Initialize the state
    useEffect(() => {
        if (typeof window === 'undefined' || !isMounted) return;

        try {
            const item = localStorage.getItem(key);
            if (item) {
                const parsedValue = JSON.parse(item);
                setStoredValue(parsedValue);
            }
        } catch (error) {
            //console.log(error);
        }
    }, [key, isMounted]);

    // Return a wrapped version of useState's setter function that persists the new value to localStorage
    const setValue = (value: any) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            // Save state
            setStoredValue(valueToStore);

            // Save to localStorage
            if (typeof window !== 'undefined' && isMounted) {
                localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            //console.log(error);
        }
    };

    return [storedValue, setValue, isMounted];
};

export default function QuestFilters({ onChange }: QuestFiltersProps) {
    const [filters, setFilters, isMounted] = useLocalStorageState('questFilters', {
        hideHandedIn: false,
        hideMaxQuantity: false,
    });

    // Notify parent component when filters change or when initially loaded
    useEffect(() => {
        if (isMounted) {
            onChange(filters);
        }
    }, [filters, onChange, isMounted]);

    // Skip rendering until client-side hydration is complete
    if (!isMounted) {
        return <div className="animate-pulse bg-accent/20 h-16 w-full rounded-lg mb-6"></div>;
    }

    const handleFilterChange = (key: keyof FilterOptions, value: boolean) => {
        setFilters({ ...filters, [key]: value });
    };

    const isFiltering = filters.hideHandedIn || filters.hideMaxQuantity;

    return (
        <div className="relative mb-6 w-full">
            {/* Filter header with icon and active indicator */}
            <div className="flex items-center mb-3">
                <div className="flex items-center gap-2 text-primary text-lg font-medium">
                    <Filter className="w-5 h-5" />
                    <span>Filters</span>
                </div>

                {isFiltering && (
                    <div className="ml-3 px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-full">
                        Active
                    </div>
                )}
            </div>

            <div className={cn(
                "flex flex-wrap gap-4 p-4 rounded-lg transition-all",
                "border border-border bg-card/50 backdrop-blur-sm shadow-sm",
                isFiltering && "border-primary/50 shadow-lg shadow-primary/5"
            )}>
                {/* Filter option 1 */}
                <div className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-md transition-all",
                    "border border-transparent",
                    filters.hideHandedIn && "border-primary/40 bg-primary/5"
                )}>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="hide-handed-in"
                            checked={filters.hideHandedIn}
                            onCheckedChange={(checked) =>
                                handleFilterChange('hideHandedIn', checked === true)
                            }
                            className={cn(
                                filters.hideHandedIn ? "border-primary" : "border-accent"
                            )}
                        />
                        <label
                            htmlFor="hide-handed-in"
                            className={cn(
                                "text-sm font-medium cursor-pointer transition-colors",
                                filters.hideHandedIn ? "text-primary" : "text-card-foreground"
                            )}
                        >
                            Hide handed in
                        </label>
                    </div>

                    <EyeOff className={cn(
                        "w-4 h-4 transition-opacity",
                        filters.hideHandedIn ? "opacity-100 text-primary" : "opacity-30"
                    )} />
                </div>

                {/* Filter option 2 */}
                <div className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-md transition-all",
                    "border border-transparent",
                    filters.hideMaxQuantity && "border-primary/40 bg-primary/5"
                )}>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="hide-max-quantity"
                            checked={filters.hideMaxQuantity}
                            onCheckedChange={(checked) =>
                                handleFilterChange('hideMaxQuantity', checked === true)
                            }
                            className={cn(
                                filters.hideMaxQuantity ? "border-primary" : "border-accent"
                            )}
                        />
                        <label
                            htmlFor="hide-max-quantity"
                            className={cn(
                                "text-sm font-medium cursor-pointer transition-colors",
                                filters.hideMaxQuantity ? "text-primary" : "text-card-foreground"
                            )}
                        >
                            Hide max quantity
                        </label>
                    </div>

                    <EyeOff className={cn(
                        "w-4 h-4 transition-opacity",
                        filters.hideMaxQuantity ? "opacity-100 text-primary" : "opacity-30"
                    )} />
                </div>
            </div>
        </div>
    );
}