'use client';

import { useState, useEffect } from 'react';
import QuestItemsBox from "@/components/QuestItemsBox";
import { FilterOptions } from "@/components/QuestFilters";

export default function TraderColumn(
    {
        name,
        questItems,
        filters = {
            hideHandedIn: false,
            hideMaxQuantity: false
        }
    }: {
        name: string,
        questItems: QuestItem[],
        filters?: FilterOptions
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [itemVisibility, setItemVisibility] = useState<Record<string, boolean>>({});

    // Mark component as mounted
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Update visibility when filters change or when component mounts
    useEffect(() => {
        if (!isMounted) return;

        const newVisibility: Record<string, boolean> = {};

        questItems.forEach(item => {
            try {
                // Only access localStorage on client side
                const isHandedIn = localStorage.getItem(`handedIn${item.id}`) === "true";
                const currentValueStr = localStorage.getItem(`stepperValue${item.id}`);
                const currentValue = currentValueStr ? parseInt(currentValueStr) : 0;
                const isMaxQuantity = currentValue >= item.quantity;

                // Apply filters
                let shouldShow = true;
                if (filters.hideHandedIn && isHandedIn) shouldShow = false;
                if (filters.hideMaxQuantity && isMaxQuantity) shouldShow = false;

                newVisibility[item.id] = shouldShow;
            } catch (e) {
                // Default to showing items if we encounter errors
                newVisibility[item.id] = true;
            }
        });

        setItemVisibility(newVisibility);
    }, [questItems, filters, isMounted]);

    // During server-side rendering or before hydration, show a loading placeholder
    if (!isMounted) {
        return (
            <div className="ml-2 mr-2">
                <h1>{name}</h1>
                {questItems.map(item => (
                    <div key={item.id} className="animate-pulse bg-accent/20 h-40 rounded-lg m-2" />
                ))}
            </div>
        );
    }

    return (
        <div className="ml-2 mr-2">
            <h1>{name}</h1>
            {questItems.map((questItem: QuestItem) => {
                const isVisible = itemVisibility[questItem.id]; // Default to visible

                return (
                    <div
                        key={questItem.id}
                        className={isVisible ? "block" : "hidden"}
                    >
                        <QuestItemsBox
                            questItem={questItem}
                            max={questItem.quantity}
                        />
                    </div>
                );
            })}
        </div>
    );
}