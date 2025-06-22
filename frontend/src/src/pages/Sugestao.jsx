import { useState } from 'react';
import apiModule from '../api/api';  // Agora você importa como default
const { api, csrfApi } = apiModule;  // Desestruturando do objeto exportado

export default function Sugestao() {
  const [titulo, setTitulo] = useState('');
  const [url, setUrl] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post('/musicas', {
      titulo,
      youtube_url: url
    });
    alert('Sugestão enviada!');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sugerir Música</h2>
      <input placeholder="Título" onChange={e => setTitulo(e.target.value)} />
      <input placeholder="Link do YouTube" onChange={e => setUrl(e.target.value)} />
      <button type="submit">Enviar Sugestão</button>
    </form>
  );
}
