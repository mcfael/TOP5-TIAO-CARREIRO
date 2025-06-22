import { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import apiModule from '../api/api'
import './Admin.css'

const { api } = apiModule

export default function Admin() {
  const { user } = useAuth()
  const [musicas, setMusicas] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ titulo: '', youtube_url: '', views: 0 })

  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  useEffect(() => {
    if (!user || !user.is_admin) return
    async function fetchSuggestions() {
      try {
        const res = await api.get(`/musicas?limit=20&page=${page}`)
        setMusicas(res.data.data)
        if (res.data.meta) {
          setLastPage(res.data.meta.last_page)
        }
      } catch (err) {
        console.error('Erro ao buscar músicas pendentes:', err)
      }
    }
    fetchSuggestions()
  }, [user, page])

  const handleApprove = async (id) => {
    const resp = await api.put(`/musicas/${id}`, { aprovada: true })
    if (resp.data.message === "Música atualizada com sucesso!") {
      alert(resp.data.message)
      setMusicas(musicas.filter(m => m.id !== id))
    }
  }

  const handleDelete = async (id) => {
    await api.delete(`/musicas/${id}`)
    setMusicas(musicas.filter(m => m.id !== id))
  }

  const handleEditInit = (m) => {
    setEditingId(m.id)
    setFormData({ titulo: m.titulo, youtube_url: m.youtube_url, views: m.views || 0 })
  }

  const handleEditSave = async (id) => {
    await api.put(`/musicas/${id}`, { ...formData })
    setEditingId(null)
    setMusicas(musicas.map(m => m.id === id ? { ...m, ...formData } : m))
  }

  if (!user || !user.is_admin) {
    return <p className="access-denied">Acesso negado</p>
  }

  return (
    <div className="admin-container">
      <h3>Sugestões Pendentes</h3>
      <ul className="admin-list">
        {musicas.map(m => (
          <li key={m.id} className="admin-item">
            {editingId === m.id ? (
              <>
                <input
                  value={formData.titulo}
                  onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                />
                <input
                  value={formData.youtube_url}
                  onChange={e => setFormData({ ...formData, youtube_url: e.target.value })}
                />
                <input
                  type="number"
                  value={formData.views}
                  onChange={e => setFormData({ ...formData, views: parseInt(e.target.value) || 0 })}
                  placeholder="Views"
                />
                <button onClick={() => handleEditSave(m.id)}>Salvar</button>
                <button onClick={() => setEditingId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <span className="admin-title">{m.titulo}</span>
                <a href={m.youtube_url} target="_blank" rel="noopener noreferrer">
                  Ver
                </a>
                {!m.aprovada && (
                  <button onClick={() => handleApprove(m.id)}>Aprovar</button>
                )}
                <button onClick={() => handleEditInit(m)}>Editar</button>
                <button onClick={() => handleDelete(m.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Paginação */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
          Anterior
        </button>
        <span style={{ margin: '0 10px' }}>Página {page} de {lastPage}</span>
        <button onClick={() => setPage(p => Math.min(lastPage, p + 1))} disabled={page === lastPage}>
          Próxima
        </button>
      </div>
    </div>
  )
}
