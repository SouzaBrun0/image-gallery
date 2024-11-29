import axios from 'axios';

const API_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const BASE_URL = 'https://api.unsplash.com/search/photos';

const API_BASE_URL = 'http://localhost:5000'; 

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

export const fetchFavorites = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/favorites`);
    return response.data; 
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    throw error;
  }
};

export const addFavorite = async (image: any) => {
  try {
    await axios.post(`${API_BASE_URL}/favorites`, image);
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    throw error;
  }
};

export const removeFavorite = async (id: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/favorites/${id}`);
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    throw error;
  }
};

export default axios;
