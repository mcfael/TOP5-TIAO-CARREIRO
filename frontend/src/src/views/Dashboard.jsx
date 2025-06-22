import { useState } from 'react'
import apiModule from '../api/api'
import './Dashboard.css'

const { api, csrfApi } = apiModule

export default function Dashboard() {
  const [titulo, setTitulo] = useState('')
  const [url, setUrl] = useState('')
  const [viewsInput, setViewsInput] = useState('') // Armazena o input do usuário
  const [error, setError] = useState('')

  // Função para formatar e extrair apenas números
  const handleViewsChange = (e) => {
    const rawValue = e.target.value;
    // Remove todos os caracteres não numéricos
    const numericValue = rawValue.replace(/\D/g, '');
    setViewsInput(rawValue); // Mantém o input original para exibição
  }

  // Função para obter o valor numérico limpo
  const getCleanViews = () => {
    return parseInt(viewsInput.replace(/\D/g, '')) || 0;
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    
    try {
      await csrfApi.get('/sanctum/csrf-cookie')
      
      const response = await api.post('/musicas', {
        titulo,
        youtube_url: url,
        views: getCleanViews() // Envia apenas os números
      })
      console.log(response);
      if (response.status === 201) {
        alert('Música cadastrada com sucesso!')
        setTitulo('')
        setUrl('')
        setViewsInput('')
      }
      
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar música')
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="submit-form">
        <h3>Sugerir Nova Música</h3>
        
        {error && <div className="error-message">{error}</div>}

        <div className="input-group">
          <label>Título*</label>
          <input
            type="text"
            placeholder="Nome da música"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>URL do YouTube*</label>
          <input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Número de Visualizações</label>
          <input
            type="text"
            placeholder="Ex: 16.182.184"
            value={viewsInput}
            onChange={handleViewsChange}
            inputMode="numeric" // Teclado numérico em dispositivos móveis
          />
          <div className="hint">
            Valor enviado: {getCleanViews().toLocaleString()} visualizações
          </div>
        </div>

        <button type="submit" className="submit-button">
          Cadastrar Música
        </button>
      </form>
    </div>
  )
}