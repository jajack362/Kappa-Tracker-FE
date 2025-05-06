"use client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Stepper from "@/components/Stepper";
import { Wrench, ExternalLink } from "lucide-react";
import React, {useEffect, useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";
import Image from 'next/image';

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
                setStoredValue(JSON.parse(item));
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

export default function QuestItemsBox({ questItem, max }: { questItem: QuestItem, max: number }) {
    // Use custom hooks for localStorage state
    const [value, setValue, isMounted] = useLocalStorageState(`stepperValue${questItem.id}`, 0);
    const [checked, setChecked] = useLocalStorageState(`handedIn${questItem.id}`, false);
    const [prevValue, setPrevValue] = useLocalStorageState(`stepperPrevValue${questItem.id}`, 0);

    // Skip rendering until client-side hydration is complete
    if (!isMounted) {
        return <div className="animate-pulse bg-accent/20 h-40 rounded-lg m-2"></div>;
    }

    const handleCheckboxChange = (isChecked: boolean) => {
        if (isChecked) {
            setPrevValue(value);
            setValue(max);
        } else {
            setValue(prevValue);
        }
        setChecked(isChecked);
    };

    return (
        <div>
            <Card className="relative py-1.5 w-75 m-2">
                <CardHeader>
                    <CardTitle className="relative flex items-center justify-center py-3">
                        <span className="absolute left-0 right-0 text-center">{questItem.item.name}</span>
                        {(questItem.item.hideoutModule != null ? (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center absolute right-0">
                                            <Wrench className="w-4 h-4 text-black"/>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Craftable at {questItem.item.hideoutModule.name}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ) : undefined) as React.ReactNode}
                    </CardTitle>
                    <CardDescription>
                        <a
                            href={questItem.quest.wikiLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1.5 inline-flex items-center gap-1 text-muted-foreground text-sm hover:underline"
                        >
                            {questItem.quest.name}
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        {/* Image centered on top line */}
                        <div className="flex justify-center mb-4">
                            <a
                                href={questItem.item.wikiLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src={questItem.item.imageLink}
                                    alt="Custom Image"
                                    width={300}
                                    height={50}
                                    style={{
                                        maxWidth: "300px",
                                        maxHeight: "50px",
                                        width: "auto",
                                        height: "auto",
                                        objectFit: "contain"
                                    }}
                                />
                            </a>
                        </div>

                        {/* Stepper and checkbox on same line */}
                        <div className="flex items-center justify-between">
                            {/* Stepper anchored to bottom left */}
                            <div>
                                <Stepper
                                    min={0}
                                    max={questItem.quantity}
                                    value={checked ? max : value}
                                    setValue={setValue}
                                    disabled={checked}
                                />
                            </div>

                            {/* Checkbox anchored to bottom right */}
                            <div className="flex items-center gap-2">
                                <label
                                    htmlFor={`handed-in-${questItem.id}`}
                                    className="text-sm"
                                >
                                    Handed in?
                                </label>
                                <Checkbox
                                    id={`handed-in-${questItem.id}`}
                                    checked={checked}
                                    onCheckedChange={handleCheckboxChange}
                                />
                            </div>
                        </div>
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    );
}