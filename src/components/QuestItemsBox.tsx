import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Stepper from "@/components/Stepper";
import { Wrench, ExternalLink } from "lucide-react";
import React, {useEffect, useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";
import Image from 'next/image';


export default function QuestItemsBox({ questItem, max }: { questItem: QuestItem, max: number }) {

    const [value, setValue] = useState<number>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("stepperValue" + questItem.id);
            const parsed = stored ? parseInt(stored) : 0;
            return isNaN(parsed) ? 0 : parsed;
        }
        return 0;
    });

    const [checked, setChecked] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("handedIn" + questItem.id) === "true";
        }
        return false;
    });

    const handleCheckboxChange = (checked: boolean) => {
        setChecked(checked);
        if (checked) {
            setValue(max);
        } else {
            setValue(0); // or keep it unchanged if you prefer
        }
    };

    useEffect(() => {
        localStorage.setItem("handedIn" + questItem.id, String(checked));
    }, [checked, questItem.id]);


    return (
        <div>
            <Card className="relative py-1.5 w-45 m-2">
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
                        <div className="flex items-center gap-4">
                            <a
                                href={questItem.item.wikiLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src={questItem.item.imageLink}
                                    alt="Custom Image"
                                    width={50} // pixels
                                    height={50} // pixels
                                    style={{ objectFit: "contain" }}
                                />
                            </a>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center">
                                    <Stepper id={questItem.id} max={questItem.quantity} value={(checked ? questItem.quantity : value)} setValue={setValue} disabled={checked}/>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label htmlFor="handed-in" className="text-sm">
                                        Handed in?
                                    </label>
                                    <Checkbox
                                        id="handed-in"
                                        checked={checked}
                                        onCheckedChange={handleCheckboxChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    )
}