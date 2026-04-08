from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import os
import json
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(api_key=os.getenv('GROQ_API_KEY'))

CYBERSECURITY_ROLES = {
    "soc_analyst": "SOC Analyst (Security Operations Center)",
    "penetration_tester": "Penetration Tester / Ethical Hacker",
    "security_engineer": "Security Engineer",
    "incident_responder": "Incident Responder",
    "cloud_security": "Cloud Security Specialist",
    "forensics": "Digital Forensics Analyst",
    "compliance": "Cybersecurity Compliance Analyst"
}

@app.route('/api/generate-roadmap', methods=['POST'])
def generate_roadmap():
    data = request.json
    current_skills = data.get('skills', [])
    experience_level = data.get('experience', 'beginner')
    target_role = data.get('target_role', 'soc_analyst')
    background = data.get('background', '')

    prompt = f"""You are a cybersecurity career advisor helping Fort Worth, Texas residents break into the cybersecurity workforce.

A person with the following profile needs a personalized roadmap:
- Current skills: {', '.join(current_skills) if current_skills else 'No prior tech skills'}
- Experience level: {experience_level}
- Target role: {CYBERSECURITY_ROLES.get(target_role, target_role)}
- Background: {background}

Generate a detailed, actionable cybersecurity career roadmap in JSON format with this exact structure:
{{
  "estimated_time": "X months",
  "target_role": "role name",
  "skill_gap_score": 0,
  "phases": [
    {{
      "phase": 1,
      "title": "Foundation",
      "duration": "X weeks",
      "skills": ["skill1", "skill2"],
      "resources": [
        {{"name": "resource name", "type": "free", "url": "https://example.com", "description": "brief desc"}}
      ],
      "milestone": "what they can do after this phase"
    }}
  ],
  "certifications": [
    {{"name": "cert name", "provider": "provider", "estimated_cost": "$X", "priority": "high"}}
  ],
  "fort_worth_resources": [
    {{"name": "local resource", "type": "training", "description": "description"}}
  ],
  "quick_wins": ["immediate action 1", "immediate action 2", "immediate action 3"]
}}

skill_gap_score should be a number from 0-100. Include 3-4 phases, 3-5 certifications, and 3+ Fort Worth specific resources like TCC Trinity River Campus, UTA, local employers, Fort Worth DA cyber initiatives."""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )

    roadmap_str = response.choices[0].message.content
    roadmap = json.loads(roadmap_str)
    return jsonify({"roadmap": roadmap, "status": "success"})


@app.route('/api/roles', methods=['GET'])
def get_roles():
    return jsonify({"roles": CYBERSECURITY_ROLES})


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "message": "CyberPath AI backend is running"})


if __name__ == '__main__':
    app.run(debug=True, port=8080)
