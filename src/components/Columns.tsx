import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import TraderColumn from "@/components/TraderColumn";
import {api} from "@/lib/api";

export default async function Columns() {
    const tradersWithQuestItems: TraderQuestItem[] = await api.fetchTraderQuestItems();

    return (
        <div>
            <ResizablePanelGroup direction="horizontal">
                {tradersWithQuestItems.map((traderQuestItem: TraderQuestItem, index: number) => (
                    <div key={traderQuestItem.traderId} className="flex items-stretch">
                        <ResizablePanel defaultSize={30}>
                            <TraderColumn name={traderQuestItem.traderName} questItems={traderQuestItem.questItems}/>
                        </ResizablePanel>
                        {index !== tradersWithQuestItems.length - 1 && <ResizableHandle />}
                    </div>
                ))}
            </ResizablePanelGroup>
        </div>
    );
}