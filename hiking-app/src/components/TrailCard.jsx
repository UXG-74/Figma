const difficultyColor = {
  Easy: "#22c55e",
  Moderate: "#f59e0b",
  Hard: "#ef4444",
};

export default function TrailCard({ trail, onClick }) {
  return (
    <div className="trail-card" onClick={() => onClick(trail)}>
      <div className="trail-card-img-wrap">
        <img src={trail.image} alt={trail.name} className="trail-card-img" />
        <span
          className="difficulty-badge"
          style={{ background: difficultyColor[trail.difficulty] }}
        >
          {trail.difficulty}
        </span>
      </div>
      <div className="trail-card-body">
        <h3 className="trail-card-name">{trail.name}</h3>
        <p className="trail-card-location">📍 {trail.location}</p>
        <div className="trail-card-stats">
          <span>🥾 {trail.distance} mi</span>
          <span>⬆ {trail.elevationGain.toLocaleString()} ft</span>
          <span>⏱ {trail.duration}</span>
        </div>
        <div className="trail-card-footer">
          <span className="trail-rating">⭐ {trail.rating}</span>
          <span className="trail-reviews">{trail.reviews} reviews</span>
          <div className="trail-tags">
            {trail.tags.slice(0, 2).map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
