import React, { useEffect, useMemo, useState } from "react";
import { EVENTS } from "../constants/events";

export default function Events() {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const u = localStorage.getItem("dobaara_user");
    if (u) setUser(JSON.parse(u));
  },[]);

  const recommended = useMemo(()=>{
    if (!user) return EVENTS;
    return EVENTS.filter(e => e.tags.some(t => user.interests?.includes(t)));
  }, [user]);

  return (
    <div className="db-container">
      <div className="db-topbar">
        <div>
          <div className="db-brand">Events</div>
          <div className="db-tagline">Meet by shared interests</div>
        </div>
      </div>

      <div className="db-grid">
        {recommended.map(ev => (
          <div key={ev.id} className="db-card">
            <img src={ev.cover} alt={ev.title} style={{width:'100%', height:140, objectFit:'cover'}} />
            <div className="db-card-pad">
              <div style={{fontWeight:800}}>{ev.title}</div>
              <div className="db-sub">{ev.date} • {ev.tags.join(', ')}</div>
              <p style={{marginTop:8}}>{ev.description}</p>
              <button className="db-btn db-btn-primary">I'm Interested</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 