import { useState } from "react";
import Header from "./components/Header";
import TrailsPage from "./components/TrailsPage";
import Dashboard from "./components/Dashboard";
import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("trails");

  return (
    <div className="app">
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main className="main">
        {activePage === "trails" ? <TrailsPage /> : <Dashboard />}
      </main>
    </div>
  );
}
