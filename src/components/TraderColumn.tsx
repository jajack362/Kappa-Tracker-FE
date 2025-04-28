"use client";
import {useEffect, useState} from "react";
import QuestItemsBox from "@/components/QuestItemsBox";

export default function TraderColumn({ name, id }) {
    const [traderQuestItems, setTraderQuestItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTraderQuestItems = async () => {
            try {
                const res = await fetch('http://localhost:8080/quest-items?traderId=' + id);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setTraderQuestItems(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTraderQuestItems();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="ml-2 mr-2">
            <h1>{name}</h1>
            {traderQuestItems.map((questItem: any) => (
                <div key={questItem.id}>
                    <QuestItemsBox questItem={questItem} max={questItem.quantity}>
                    </QuestItemsBox>
                </div>
            ))}
        </div>
    );
}