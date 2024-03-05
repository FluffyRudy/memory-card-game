import axios from "axios";
import random from "./random";
import cards from "./data";

export async function requests() {
    const limit = 25;
    const offsets = [0, 10, 20, 30, 40, 50, 60];
    const query = random.choice(cards);
    try {
        const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
            params: {
                api_key: import.meta.env.VITE_API_KEY,
                q: query,
                limit: limit,
                offset: random.choice(offsets)
            }
        })
        return response;
    } catch(error) {
        console.error(error);
        return null;
    }
}

