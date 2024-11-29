import axios from 'axios';

// Configuração da API Unsplash
const API_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const BASE_URL = 'https://api.unsplash.com/search/photos';

// Configuração da API do Backend
const API_BASE_URL = 'http://localhost:5000'; // URL do backend

// Função para buscar imagens da API Unsplash
export const fetchImages = async (query: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
      params: {
        query: query,
        per_page: 20, // Limita a 20 imagens por consulta
      },
    });

    return response.data.results; // Retorna os resultados das imagens
  } catch (error) {
    console.error('Erro ao buscar imagens:', error);
    throw error;
  }
};

// Função para buscar favoritos do backend
export const fetchFavorites = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/favorites`);
    return response.data; // Retorna a lista de favoritos
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    throw error;
  }
};

// Função para adicionar uma imagem como favorita no backend
export const addFavorite = async (image: any) => {
  try {
    await axios.post(`${API_BASE_URL}/favorites`, image);
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    throw error;
  }
};

// Função para remover um favorito do backend
export const removeFavorite = async (id: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/favorites/${id}`);
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    throw error;
  }
};

export default axios;
