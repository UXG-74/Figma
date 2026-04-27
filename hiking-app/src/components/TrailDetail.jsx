const difficultyColor = {
  Easy: "#22c55e",
  Moderate: "#f59e0b",
  Hard: "#ef4444",
};

export default function TrailDetail({ trail, onBack }) {
  return (
    <div className="trail-detail">
      <button className="back-btn" onClick={onBack}>
        ← Back to Trails
      </button>

      <div className="detail-hero">
        <img src={trail.image} alt={trail.name} className="detail-hero-img" />
        <div className="detail-hero-overlay">
          <span
            className="difficulty-badge large"
            style={{ background: difficultyColor[trail.difficulty] }}
          >
            {trail.difficulty}
          </span>
          <h1 className="detail-title">{trail.name}</h1>
          <p className="detail-location">📍 {trail.location}</p>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-stats-row">
          <div className="stat-box">
            <span className="stat-icon">🥾</span>
            <span className="stat-value">{trail.distance} mi</span>
            <span className="stat-label">Distance</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon">⬆</span>
            <span className="stat-value">{trail.elevationGain.toLocaleString()} ft</span>
            <span className="stat-label">Elevation Gain</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon">⏱</span>
            <span className="stat-value">{trail.duration}</span>
            <span className="stat-label">Est. Duration</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon">⭐</span>
            <span className="stat-value">{trail.rating}</span>
            <span className="stat-label">{trail.reviews} Reviews</span>
          </div>
        </div>

        <div className="detail-section">
          <h2>About this Trail</h2>
          <p>{trail.description}</p>
        </div>

        <div className="detail-section">
          <h2>Highlights</h2>
          <ul className="highlights-list">
            {trail.highlights.map((h) => (
              <li key={h}>
                <span className="highlight-dot" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="detail-section">
          <h2>Tags</h2>
          <div className="trail-tags">
            {trail.tags.map((t) => (
              <span key={t} className="tag large">
                {t}
              </span>
            ))}
          </div>
        </div>

        <button className="cta-btn">Start Hike</button>
      </div>
    </div>
  );
}
