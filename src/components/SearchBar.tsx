import React from 'react';

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleSearch = () => {
    onSearch(query); 
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite para buscar imagens..."
        style={{
          padding: '10px',
          width: '300px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          marginLeft: '10px',
          padding: '10px',
          border: 'none',
          backgroundColor: '#007BFF',
          color: 'white',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
