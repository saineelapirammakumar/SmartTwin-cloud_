import { NavLink, Route, Routes } from "react-router-dom";
import { API_BASE } from "./api";
import Alerts from "./pages/Alerts.jsx";
import Charts from "./pages/Charts.jsx";
import CloudStatus from "./pages/CloudStatus.jsx";
import Locations from "./pages/Locations.jsx";
import Overview from "./pages/Overview.jsx";
import SensorDetail from "./pages/SensorDetail.jsx";
import Sensors from "./pages/Sensors.jsx";
import Upload from "./pages/Upload.jsx";

const LINKS = [
  ["/", "Overview"],
  ["/locations", "Locations"],
  ["/sensors", "Sensors"],
  ["/alerts", "Alerts"],
  ["/charts", "Monitoring charts"],
  ["/upload", "Image upload"],
  ["/cloud", "Cloud status"],
];

export default function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <strong>SmartTwin Cloud</strong>
          <span>Chennai city monitoring</span>
        </div>
        <nav>
          {LINKS.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>{label}</NavLink>
          ))}
        </nav>
        <p className="api-note">API: {API_BASE}</p>
      </aside>
      <main className="content">
        <div className="sim-banner">
          Sensor readings in this demo are <strong>simulated</strong>. They are not real measurements.
        </div>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/sensors" element={<Sensors />} />
          <Route path="/sensors/:id" element={<SensorDetail />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/cloud" element={<CloudStatus />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </div>
  );
}
