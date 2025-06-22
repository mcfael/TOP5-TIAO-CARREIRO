import { useEffect, useState } from 'react';
import apiModule from '../api/api';  // Agora você importa como default
const { api, csrfApi } = apiModule;  // Desestruturando do objeto exportado

export default function Musicas() {
  const [musicas, setMusicas] = useState([]);

  useEffect(() => {
    async function fetchMusicas() {
      const res = await api.get('/musicas?limit=5');
      setMusicas(res.data.data); // paginado
    }
    fetchMusicas();
  }, []);

  return (
    <div>
      <h2>Músicas mais tocadas</h2>
      <ul>
        {musicas.map(musica => (
          <li key={musica.id}>
            <strong>{musica.titulo}</strong><br />
            <a href={musica.youtube_url} target="_blank">Ver no YouTube</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
