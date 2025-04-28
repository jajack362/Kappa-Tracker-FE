declare type QuestItem = {
    id: number;
    quest: {
        id: number;
        name: string;
        levelRequired: number;
        wikiLink: string;
        trader: {
            id: number;
            name: string;
        };
    };
    item: {
        id: number;
        name: string;
        imageLink: string;
        wikiLink: string;
        hideoutModule?: {
            id: number;
            name: string;
        } | null;
    };
    quantity: number;
};