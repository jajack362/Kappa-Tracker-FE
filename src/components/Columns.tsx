'use client';

import { useState, useEffect } from 'react';
import TraderColumn from "@/components/TraderColumn";
import QuestFilters, { FilterOptions } from "@/components/QuestFilters";

export default function Columns({
                                    tradersWithQuestItems
                                }: {
    tradersWithQuestItems: TraderQuestItem[]
}) {
    const [filters, setFilters] = useState<FilterOptions>({
        hideHandedIn: false,
        hideMaxQuantity: false,
    });

    // This will sync the initial state from localStorage if it exists
    useEffect(() => {
        // Only run in browser environment
        if (typeof window === 'undefined') return;

        try {
            const savedFilters = localStorage.getItem('questFilters');
            if (savedFilters) {
                setFilters(JSON.parse(savedFilters));
            }
        } catch (error) {
            console.error('Error loading filters in Columns component:', error);
        }
    }, []);

    const handleFilterChange = (newFilters: FilterOptions) => {
        setFilters(newFilters);
    };

    return (
        <div className="flex flex-col w-full">
            <QuestFilters onChange={handleFilterChange} />

            <div className="grid grid-cols-6 w-full">
                {tradersWithQuestItems.map((traderQuestItem: TraderQuestItem) => (
                    <div key={traderQuestItem.traderId} className="w-full flex">
                        <TraderColumn
                            name={traderQuestItem.traderName}
                            questItems={traderQuestItem.questItems}
                            filters={filters}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}