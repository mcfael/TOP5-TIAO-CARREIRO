import { useEffect, useState } from 'react';
import api from '../api/api';

export default function Admin() {
  const [sugestoes, setSugestoes] = useState([]);

  const fetchSugestoes = async () => {
    const res = await api.get('/sugestoes');
    setSugestoes(res.data);
  };

  const aprovar = async (id) => {
    await api.put(`/sugestoes/${id}/approve`);
    fetchSugestoes();
  };

  useEffect(() => {
    fetchSugestoes();
  }, []);

  return (
    <div>
      <h2>📥 Sugestões pendentes</h2>
      {sugestoes.map(s => (
        <div key={s.id}>
          {s.titulo} - {s.artista}
          <button onClick={() => aprovar(s.id)}>Aprovar</button>
        </div>
      ))}
    </div>
  );
}
