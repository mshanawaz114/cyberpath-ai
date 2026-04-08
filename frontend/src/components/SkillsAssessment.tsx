import React, { useState } from 'react';

interface Props { onSubmit: (data: any) => void; loading: boolean; }

const SKILL_OPTIONS = ['Networking Basics','Linux','Windows Administration','Python','JavaScript','SQL','Cloud (AWS/Azure/GCP)','Scripting/Bash','IT Support','Hardware Knowledge','Virtualization','Active Directory'];
const EXPERIENCE_LEVELS = [
  { value: 'beginner', label: '🌱 Beginner', desc: 'No tech background' },
  { value: 'intermediate', label: '⚡ Intermediate', desc: '1-3 years in IT' },
  { value: 'advanced', label: '🚀 Advanced', desc: '3+ years in tech' },
];
const ROLES = [
  { value: 'soc_analyst', label: '🔍 SOC Analyst', desc: 'Monitor & respond to threats' },
  { value: 'penetration_tester', label: '🎯 Pen Tester', desc: 'Ethical hacking' },
  { value: 'security_engineer', label: '🔧 Security Engineer', desc: 'Build secure systems' },
  { value: 'incident_responder', label: '🚨 Incident Responder', desc: 'Handle cyber attacks' },
  { value: 'cloud_security', label: '☁️ Cloud Security', desc: 'Secure cloud infrastructure' },
  { value: 'forensics', label: '🔬 Digital Forensics', desc: 'Investigate cyber crimes' },
  { value: 'compliance', label: '📋 Compliance Analyst', desc: 'Policies & regulations' },
];

const SkillsAssessment: React.FC<Props> = ({ onSubmit, loading }) => {
  const [step, setStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [background, setBackground] = useState('');
  const toggleSkill = (skill: string) => setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);

  return (
    <div className="assessment-container">
      <div className="progress-bar"><div className="progress-fill" style={{ width: `${(step/3)*100}%` }} /></div>
      <p className="progress-text">Step {step} of 3</p>
      {step === 1 && (
        <div className="step-card">
          <h2>What's your experience level?</h2>
          <p className="step-desc">This helps us calibrate your roadmap timeline</p>
          <div className="option-grid">
            {EXPERIENCE_LEVELS.map(l => (
              <button key={l.value} className={`option-card ${experience===l.value?'selected':''}`} onClick={()=>setExperience(l.value)}>
                <span className="option-label">{l.label}</span><span className="option-desc">{l.desc}</span>
              </button>
            ))}
          </div>
          <div className="background-section">
            <label>Tell us about your background (optional)</label>
            <textarea value={background} onChange={e=>setBackground(e.target.value)} placeholder="e.g. I work in retail and want to switch to cybersecurity..." rows={3} />
          </div>
          <button className="btn-primary" onClick={()=>setStep(2)} disabled={!experience}>Next →</button>
        </div>
      )}
      {step === 2 && (
        <div className="step-card">
          <h2>What skills do you already have?</h2>
          <p className="step-desc">Select all that apply — even basic knowledge counts!</p>
          <div className="skills-grid">
            {SKILL_OPTIONS.map(skill => (
              <button key={skill} className={`skill-chip ${selectedSkills.includes(skill)?'selected':''}`} onClick={()=>toggleSkill(skill)}>
                {selectedSkills.includes(skill)?'✓ ':''}{skill}
              </button>
            ))}
          </div>
          <p className="skills-count">{selectedSkills.length} skills selected</p>
          <div className="btn-row">
            <button className="btn-secondary" onClick={()=>setStep(1)}>← Back</button>
            <button className="btn-primary" onClick={()=>setStep(3)}>Next →</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="step-card">
          <h2>What's your target cybersecurity role?</h2>
          <p className="step-desc">We'll build your roadmap specifically for this career path</p>
          <div className="roles-grid">
            {ROLES.map(role => (
              <button key={role.value} className={`role-card ${targetRole===role.value?'selected':''}`} onClick={()=>setTargetRole(role.value)}>
                <span className="role-icon">{role.label.split(' ')[0]}</span>
                <div><span className="role-label">{role.label.split(' ').slice(1).join(' ')}</span><span className="role-desc">{role.desc}</span></div>
              </button>
            ))}
          </div>
          <div className="btn-row">
            <button className="btn-secondary" onClick={()=>setStep(2)}>← Back</button>
            <button className="btn-primary btn-generate" onClick={()=>onSubmit({skills:selectedSkills,experience,target_role:targetRole,background})} disabled={!targetRole||loading}>
              {loading ? '⚙️ Generating your roadmap...' : '🚀 Generate My Roadmap'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default SkillsAssessment;
