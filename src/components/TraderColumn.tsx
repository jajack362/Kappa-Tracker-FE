import QuestItemsBox from "@/components/QuestItemsBox";

export default function TraderColumn({ name, questItems } : { name: string, questItems: QuestItem[] }) {
    return (
        <div className="ml-2 mr-2">
            <h1>{name}</h1>
            {questItems.map((questItem: QuestItem) => (
                <div key={questItem.id}>
                    <QuestItemsBox questItem={questItem} max={questItem.quantity}>
                    </QuestItemsBox>
                </div>
            ))}
        </div>
    );
}