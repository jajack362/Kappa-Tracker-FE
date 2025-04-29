const API_BASE_URL = process.env.BE_API_URL;

export const api = {
    async fetchTraderQuestItems() {
        const response = await fetch(`${API_BASE_URL}/quest-items-by-trader`);
        if (!response.ok) {
            throw new Error('Failed to fetch quest items');
        }
        return response.json();

    }
};
