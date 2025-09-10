import React, { useEffect, useMemo, useState } from "react";
import { PROFILES } from "../constants/profiles";

export default function Swipe() {
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const u = localStorage.getItem("dobaara_user");
    if (u) setUser(JSON.parse(u));
  },[]);

  const profile = PROFILES[index];
  const onLike = () => {
    const liked = JSON.parse(localStorage.getItem("dobaara_likes") || "[]");
    if (!liked.includes(profile.id)) {
      liked.push(profile.id);
      localStorage.setItem("dobaara_likes", JSON.stringify(liked));
    }
    setIndex((i)=> (i+1) % PROFILES.length);
  };
  const onSkip = () => setIndex((i)=> (i+1) % PROFILES.length);

  if (!profile) return null;

  return (
    <div className="db-container">
      <div className="db-topbar">
        <div>
          <div className="db-brand">Discover</div>
          <div className="db-tagline">People you'll vibe with</div>
        </div>
        <a className="db-btn db-btn-ghost" href="#/chat">Go to Chats</a>
      </div>

      <div className="db-swipe">
        <div className="db-swipe-card db-card">
          <img src={profile.photo} alt={profile.name} />
          <div className="db-swipe-info">
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{fontWeight:800, fontSize:22}}>{profile.name}, {profile.age}</div>
              <div style={{opacity:.9}}>{profile.distanceKm} km</div>
            </div>
            <div style={{marginTop:6}}>
              {profile.interests.slice(0,4).map(tag => <span key={tag} className="db-chip">{tag}</span>)}
            </div>
          </div>
        </div>

        <div className="db-swipe-actions">
          <button className="db-btn" onClick={onSkip}>Skip</button>
          <button className="db-btn db-btn-primary" onClick={onLike}>Like</button>
        </div>
      </div>
    </div>
  );
} 