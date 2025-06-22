import React from 'react';
import './MusicCard.css';

export default function MusicCard({ rank, title, views, thumbnail, url }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className="music-card">
        <div className="rank">{rank}</div>
        <div className="music-info">
          <div className="music-title">{title}</div>
          <div className="views">{views} visualizações</div>
        </div>
        <img className="thumbnail" src={thumbnail} alt={`Thumbnail ${title}`} />
      </div>
    </a>
  );
}