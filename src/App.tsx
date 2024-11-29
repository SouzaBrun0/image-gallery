import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ImageModal from './components/ImageModal';
import { fetchImages, fetchFavorites, addFavorite, removeFavorite } from './services/api';

const App: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    try {
      const results = await fetchImages(query);
      setImages(results.slice(0, 20));
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
    }
  };

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await fetchFavorites();
        setFavorites(data);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    };
    loadFavorites();
  }, []);

  const handleAddFavorite = async (image: any) => {
    try {
      await addFavorite(image);
      setFavorites((prev) => [...prev, image]);
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
    }
  };

  const handleRemoveFavorite = async (imageId: string) => {
    try {
      await removeFavorite(imageId);
      setFavorites((prev) => prev.filter((fav) => fav.id !== imageId));
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  const handleOpenModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Galeria de Imagens</h1>
      <SearchBar onSearch={handleSearch} />
      <ImageModal isOpen={!!selectedImage} imageSrc={selectedImage} onClose={handleCloseModal} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '10px',
          padding: '10px',
        }}
      >
        {images.map((img) => (
          <div key={img.id} style={{ position: 'relative' }}>
            <img
              src={img.urls.small}
              alt={img.alt_description}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onClick={() => handleOpenModal(img.urls.full || img.urls.small)}
            />
            <button
              onClick={() => handleAddFavorite(img)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '50%',
                padding: '5px',
                cursor: 'pointer',
              }}
            >
              ❤️
            </button>
          </div>
        ))}
      </div>
      <h2 style={{ marginTop: '20px' }}>Favoritos</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '10px',
        }}
      >
        {favorites.map((fav) => (
          <div key={fav.id} style={{ position: 'relative' }}>
            <img
              src={fav.urls.small}
              alt={fav.alt_description}
              style={{ width: '100%', borderRadius: '8px', cursor: 'pointer' }}
              onClick={() => handleOpenModal(fav.urls.full || fav.urls.small)}
            />
            <button
              onClick={() => handleRemoveFavorite(fav.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '50%',
                padding: '5px',
                cursor: 'pointer',
              }}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
