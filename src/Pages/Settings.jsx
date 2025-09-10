import React, { useEffect, useState } from "react";

const ALL_INTERESTS = ["Books","Hiking","Art","Yoga","Trekking","Design","Tea","Photography","Music","Meditation"];

export default function Settings() {
  const [distance, setDistance] = useState(10);
  const [ageMin, setAgeMin] = useState(22);
  const [ageMax, setAgeMax] = useState(35);
  const [interests, setInterests] = useState([]);

  useEffect(()=>{
    const saved = JSON.parse(localStorage.getItem('dobaara_settings') || '{}');
    if (saved.distance) setDistance(saved.distance);
    if (saved.ageMin) setAgeMin(saved.ageMin);
    if (saved.ageMax) setAgeMax(saved.ageMax);
    if (saved.interests) setInterests(saved.interests);
  },[]);

  const toggle = (i) => {
    setInterests((prev)=> prev.includes(i) ? prev.filter(x=>x!==i) : [...prev, i]);
  };

  const save = () => {
    const data = { distance, ageMin, ageMax, interests };
    localStorage.setItem('dobaara_settings', JSON.stringify(data));
    window.alert('Preferences saved');
    window.location.hash = '#/swipe';
  };

  const logout = () => {
    try {
      localStorage.removeItem('dobaara_user');
      localStorage.removeItem('dobaara_likes');
      Object.keys(localStorage).forEach((k)=>{ if (k.startsWith('dobaara_chat_')) localStorage.removeItem(k); });
    } catch (e) {}
    window.location.hash = '#/login';
  };

  return (
    <div className="db-container">
      <div className="db-topbar">
        <div>
          <div className="db-brand">Settings</div>
          <div className="db-tagline">Tune your preferences</div>
        </div>
      </div>

      <div className="db-card db-card-pad" style={{maxWidth:720, margin:'0 auto'}}>
        <div className="db-list">
          <label>Distance: {distance} km</label>
          <input type="range" min="1" max="100" value={distance} onChange={(e)=>setDistance(Number(e.target.value))} />

          <div className="db-row">
            <div>
              <label>Min Age: {ageMin}</label>
              <input type="range" min="18" max={ageMax} value={ageMin} onChange={(e)=>setAgeMin(Number(e.target.value))} />
            </div>
            <div>
              <label>Max Age: {ageMax}</label>
              <input type="range" min={ageMin} max="60" value={ageMax} onChange={(e)=>setAgeMax(Number(e.target.value))} />
            </div>
          </div>

          <div>
            <label>Interests</label>
            <div style={{display:'flex', flexWrap:'wrap', gap:8, marginTop:8}}>
              {ALL_INTERESTS.map(i => (
                <button type="button" key={i} className="db-btn" onClick={()=>toggle(i)} style={{background: interests.includes(i) ? 'linear-gradient(135deg, #fde68a, #f0abfc)' : 'rgba(255,255,255,0.06)'}}>
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div className="db-actions" style={{marginTop:8}}>
            <button className="db-btn db-btn-primary" onClick={save}>Save</button>
          </div>

          <hr style={{border:'none', borderTop:'1px solid rgba(255,255,255,0.08)', margin:'12px 0'}} />
          <div>
            <label>Account</label>
            <div className="db-actions" style={{marginTop:8}}>
              <button className="db-btn" onClick={logout} style={{background:'linear-gradient(135deg, #fecaca, #fda4af)', color:'#0b1020', fontWeight:800}}>Log out</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
} 