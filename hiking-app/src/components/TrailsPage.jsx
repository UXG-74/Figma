import { useState } from "react";
import { trails } from "../data/trails";
import TrailCard from "./TrailCard";
import TrailDetail from "./TrailDetail";

const DIFFICULTIES = ["All", "Easy", "Moderate", "Hard"];

export default function TrailsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  if (selected) {
    return <TrailDetail trail={selected} onBack={() => setSelected(null)} />;
  }

  const filtered = trails.filter((t) => {
    const matchDiff = filter === "All" || t.difficulty === filter;
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase());
    return matchDiff && matchSearch;
  });

  return (
    <div className="page trails-page">
      <div className="trails-hero">
        <h1>Discover Your Next Adventure</h1>
        <p>Explore {trails.length} curated trails across North America</p>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search trails or locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="trails-controls">
        <div className="filter-chips">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              className={`chip ${filter === d ? "active" : ""}`}
              onClick={() => setFilter(d)}
            >
              {d}
            </button>
          ))}
        </div>
        <span className="results-count">{filtered.length} trails found</span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No trails match your search. Try different filters.</p>
        </div>
      ) : (
        <div className="trail-grid">
          {filtered.map((trail) => (
            <TrailCard key={trail.id} trail={trail} onClick={setSelected} />
          ))}
        </div>
      )}
    </div>
  );
}
