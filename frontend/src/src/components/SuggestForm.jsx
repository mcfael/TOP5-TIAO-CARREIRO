import React, { useState } from 'react';
import './SuggestForm.css';

export default function SuggestForm() {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui enviaremos para a API depois
    alert(`Link sugerido: ${url}`);
    setUrl('');
  };

  return (
    <div className="submit-form">
      <h3>Sugerir Nova Música</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="url"
            placeholder="Cole aqui o link do YouTube"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit" className="submit-button">Enviar Link</button>
        </div>
      </form>
    </div>
  );
}