import { useEffect, useState } from 'react'
import MusicCard from '../components/MusicCard'
import apiModule from '../api/api'
const { api } = apiModule

function getVideoId(url) {
  try {
    const u = new URL(url)
    return u.searchParams.get('v') || u.pathname.split('/').pop()
  } catch {
    return null
  }
}

async function getYouTubeInfo(videoId) {
  try {
    const oEmbedRes = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    )
    const oEmbedData = await oEmbedRes.json()
    return {
      title: oEmbedData.title,
      thumbnail: oEmbedData.thumbnail_url,
    }
  } catch (error) {
    console.error('Erro ao buscar info do YouTube:', error)
    return null
  }
}

export default function Home() {
  const [musicas, setMusicas] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/musicas?limit=5&page=${page}&aprovada=true`)
        const { data, meta } = res.data

        const enriched = await Promise.all(
          data.map(async (m, idx) => {
            const vid = getVideoId(m.youtube_url)
            let youtubeInfo = {}

            if (vid) {
              youtubeInfo = await getYouTubeInfo(vid) || {}
            }

            return {
              id: m.id,
              titulo: youtubeInfo.title || m.titulo,
              youtube_url: m.youtube_url,
              rank: (meta.per_page * (meta.current_page - 1)) + idx + 1,
              thumbnail_url: youtubeInfo.thumbnail || 
                (vid ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg` : ''),
              views: m.views
            }
          })
        )

        setMusicas(enriched)
        setLastPage(meta.last_page)
      } catch (err) {
        console.error('Erro ao buscar músicas:', err)
      }
    }

    fetchData()
  }, [page])

  return (
    <>
      <h3 className="section-title">Ranking Atual</h3>
      {musicas.map((m) => (
        <MusicCard
          key={m.id}
          rank={m.rank}
          title={m.titulo}
          thumbnail={m.thumbnail_url}
          url={m.youtube_url}
          views={m.views}
        />
      ))}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
          Anterior
        </button>
        <span style={{ margin: '0 10px' }}>Página {page} de {lastPage}</span>
        <button onClick={() => setPage(p => Math.min(lastPage, p + 1))} disabled={page === lastPage}>
          Próxima
        </button>
      </div>
    </>
  )
}
