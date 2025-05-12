import React, { useState, useEffect } from 'react';
import { useAuth } from '../Components/useAuth';
import axios from 'axios';

export const Home = () => {
  const { user, logout } = useAuth();
  const [dogs, setDogs] = useState([]);

  const fetchDogs = async () => {
    try {
      const requests = Array.from({ length: 5 }, () =>
        axios.get('https://dog.ceo/api/breeds/image/random')
      );
      const responses = await Promise.all(requests);
      const dogData = responses.map((res) => {
        const imageUrl = res.data.message;
        const breed = imageUrl.split('/')[4];
        return { imageUrl, breed };
      });
      setDogs(dogData);
    } catch (error) {
      console.error('Erro ao buscar imagens de cachorro:', error);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <div>
      <h1>Bem-vindo, {user ? user.username : 'Visitante'}</h1>
      {user && <button onClick={logout}>Sair</button>}

      <h2>Imagens Aleatórias de Cachorro</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {dogs.length > 0 ? (
          dogs.map((dog, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
              <img src={dog.imageUrl} alt="Cachorro" style={{ width: '200px', height: 'auto' }} />
              <p>Raça: {dog.breed}</p>
            </div>
          ))
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
};
