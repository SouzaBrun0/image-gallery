import axios from 'axios';

const API_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const BASE_URL = 'https://api.unsplash.com/search/photos';

export const fetchImages = async (query: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
      params: {
        query: query,
        per_page: 20, 
      },
    });

    return response.data.results; 
  } catch (error) {
    console.error('Erro ao buscar imagens:', error);
    throw error;
  }
};
