"use client";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {useEffect, useState} from "react";
import TraderColumn from "@/components/TraderColumn";

export default function Columns() {
    const [traders, setTraders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTraders = async () => {
            try {
                const res = await fetch('http://localhost:8080/traders');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setTraders(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTraders();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <ResizablePanelGroup direction="horizontal">
                {traders.map((trader: any, index: number) => (
                    <div key={trader.id} className="flex items-stretch">
                        <ResizablePanel>
                            <TraderColumn name={trader.name} id={trader.id} />
                        </ResizablePanel>
                        {index !== traders.length - 1 && <ResizableHandle />}
                    </div>
                ))}
            </ResizablePanelGroup>
        </div>
    );
}