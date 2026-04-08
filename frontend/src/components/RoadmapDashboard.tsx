import React, { useState } from 'react';
import { RoadmapData } from '../App';

interface Props { roadmap: RoadmapData; onReset: () => void; }

const RoadmapDashboard: React.FC<Props> = ({ roadmap, onReset }) => {
  const [activePhase, setActivePhase] = useState(0);
  const scoreColor = roadmap.skill_gap_score>=70?'#22c55e':roadmap.skill_gap_score>=40?'#f59e0b':'#ef4444';
  const priorityColor = (p:string) => p==='high'?'#ef4444':p==='medium'?'#f59e0b':'#22c55e';

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div className="hero-left">
          <h2>Your CyberPath Roadmap</h2>
          <h3>{roadmap.target_role}</h3>
          <p>Estimated time to job-ready: <strong>{roadmap.estimated_time}</strong></p>
        </div>
        <div className="hero-score">
          <svg viewBox="0 0 120 120" className="score-ring">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#1e293b" strokeWidth="10"/>
            <circle cx="60" cy="60" r="50" fill="none" stroke={scoreColor} strokeWidth="10"
              strokeDasharray={`${roadmap.skill_gap_score*3.14} 314`} strokeLinecap="round" transform="rotate(-90 60 60)"/>
          </svg>
          <div className="score-text">
            <span className="score-number" style={{color:scoreColor}}>{roadmap.skill_gap_score}</span>
            <span className="score-label">Readiness Score</span>
          </div>
        </div>
      </div>
      <div className="section">
        <h3>⚡ Quick Wins — Start Today</h3>
        <div className="quick-wins">
          {roadmap.quick_wins.map((win,i) => (
            <div key={i} className="quick-win-item">
              <span className="win-number">{i+1}</span><span>{win}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h3>🗺️ Learning Phases</h3>
        <div className="phase-tabs">
          {roadmap.phases.map((phase,i) => (
            <button key={i} className={`phase-tab ${activePhase===i?'active':''}`} onClick={()=>setActivePhase(i)}>
              Phase {phase.phase}: {phase.title}
            </button>
          ))}
        </div>
        {roadmap.phases[activePhase] && (
          <div className="phase-card">
            <div className="phase-header">
              <div><h4>{roadmap.phases[activePhase].title}</h4><span className="phase-duration">⏱ {roadmap.phases[activePhase].duration}</span></div>
              <div className="milestone-badge">🎯 {roadmap.phases[activePhase].milestone}</div>
            </div>
            <div className="phase-skills">
              <p><strong>Skills to learn:</strong></p>
              <div className="skills-list">{roadmap.phases[activePhase].skills.map((s,i)=><span key={i} className="skill-tag">{s}</span>)}</div>
            </div>
            <div className="phase-resources">
              <p><strong>Resources:</strong></p>
              {roadmap.phases[activePhase].resources.map((res,i)=>(
                <a key={i} href={res.url} target="_blank" rel="noreferrer" className="resource-item">
                  <div><span className="resource-name">{res.name}</span><span className="resource-desc">{res.description}</span></div>
                  <span className={`resource-type ${res.type}`}>{res.type}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="section">
        <h3>🏆 Recommended Certifications</h3>
        <div className="certs-grid">
          {roadmap.certifications.map((cert,i)=>(
            <div key={i} className="cert-card">
              <div className="cert-priority" style={{backgroundColor:priorityColor(cert.priority)}}>{cert.priority} priority</div>
              <h4>{cert.name}</h4><p>{cert.provider}</p><span className="cert-cost">{cert.estimated_cost}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="section fort-worth-section">
        <h3>📍 Fort Worth Local Resources</h3>
        <div className="fw-resources">
          {roadmap.fort_worth_resources.map((res,i)=>(
            <div key={i} className="fw-resource-item">
              <span className={`fw-type ${res.type}`}>{res.type}</span>
              <div><strong>{res.name}</strong><p>{res.description}</p></div>
            </div>
          ))}
        </div>
      </div>
      <button className="btn-secondary btn-reset" onClick={onReset}>← Generate a New Roadmap</button>
    </div>
  );
};
export default RoadmapDashboard;
