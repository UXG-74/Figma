import { stats, trails } from "../data/trails";

const recentHikes = [
  { trail: trails[0], date: "Apr 20, 2026", duration: "7h 12m", distance: 12.4 },
  { trail: trails[2], date: "Apr 13, 2026", duration: "3h 45m", distance: 7.8 },
  { trail: trails[4], date: "Apr 6, 2026", duration: "2h 30m", distance: 4.5 },
];

export default function Dashboard() {
  return (
    <div className="page dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>My Hike Stats</h1>
          <p>Track your progress and milestones</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stats-card accent-green">
          <span className="stats-icon">🥾</span>
          <span className="stats-value">{stats.totalHikes}</span>
          <span className="stats-label">Total Hikes</span>
        </div>
        <div className="stats-card accent-blue">
          <span className="stats-icon">📏</span>
          <span className="stats-value">{stats.totalMiles}</span>
          <span className="stats-label">Miles Hiked</span>
        </div>
        <div className="stats-card accent-orange">
          <span className="stats-icon">⬆</span>
          <span className="stats-value">{stats.totalElevation.toLocaleString()}</span>
          <span className="stats-label">Feet Climbed</span>
        </div>
        <div className="stats-card accent-purple">
          <span className="stats-icon">🏅</span>
          <span className="stats-value">{stats.badges.length}</span>
          <span className="stats-label">Badges Earned</span>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>Recent Hikes</h2>
          <div className="recent-list">
            {recentHikes.map(({ trail, date, duration, distance }) => (
              <div key={trail.id} className="recent-item">
                <img src={trail.image} alt={trail.name} className="recent-img" />
                <div className="recent-info">
                  <h3>{trail.name}</h3>
                  <p>📍 {trail.location}</p>
                  <div className="recent-meta">
                    <span>📅 {date}</span>
                    <span>⏱ {duration}</span>
                    <span>🥾 {distance} mi</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Badges</h2>
          <div className="badges-grid">
            {stats.badges.map((badge) => (
              <div key={badge} className="badge-item">
                <span className="badge-icon">🏅</span>
                <span className="badge-name">{badge}</span>
              </div>
            ))}
            <div className="badge-item locked">
              <span className="badge-icon">🔒</span>
              <span className="badge-name">Summit Seeker</span>
            </div>
            <div className="badge-item locked">
              <span className="badge-icon">🔒</span>
              <span className="badge-name">Night Hiker</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
