import React, { useState } from 'react';
import SkillsAssessment from './components/SkillsAssessment';
import RoadmapDashboard from './components/RoadmapDashboard';
import './App.css';

export interface RoadmapData {
  estimated_time: string;
  target_role: string;
  skill_gap_score: number;
  phases: Phase[];
  certifications: Certification[];
  fort_worth_resources: FortWorthResource[];
  quick_wins: string[];
}
export interface Phase {
  phase: number; title: string; duration: string;
  skills: string[]; resources: Resource[]; milestone: string;
}
export interface Resource { name: string; type: string; url: string; description: string; }
export interface Certification { name: string; provider: string; estimated_cost: string; priority: string; }
export interface FortWorthResource { name: string; type: string; description: string; }

function App() {
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateRoadmap = async (formData: any) => {
    setLoading(true); setError('');
    try {
      const response = await fetch('http://localhost:8080/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.status === 'success') { setRoadmap(data.roadmap); }
      else { setError('Failed to generate roadmap. Please try again.'); }
    } catch (err) {
      setError('Cannot connect to backend. Make sure the Python server is running on port 5000.');
    } finally { setLoading(false); }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🛡️</span>
            <div><h1>CyberPath AI</h1><p>Your personalized cybersecurity career roadmap</p></div>
          </div>
          <div className="header-badge">Fort Worth Cyber Workforce Initiative</div>
        </div>
      </header>
      <main className="app-main">
        {error && <div className="error-banner">⚠️ {error}</div>}
        {!roadmap
          ? <SkillsAssessment onSubmit={handleGenerateRoadmap} loading={loading} />
          : <RoadmapDashboard roadmap={roadmap} onReset={() => { setRoadmap(null); setError(''); }} />
        }
      </main>
      <footer className="app-footer">
        <p>Built for HackFW 2026 · Fostering Cyber Workforce Development in Fort Worth, TX</p>
      </footer>
    </div>
  );
}
export default App;
