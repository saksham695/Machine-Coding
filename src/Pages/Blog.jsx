import React from "react";
import { BLOGS } from "../constants/blogs";

export default function Blog() {
  return (
    <div className="db-container">
      <div className="db-topbar">
        <div>
          <div className="db-brand">Dobaara Blog</div>
          <div className="db-tagline">Gentle reads on growth and connection</div>
        </div>
      </div>

      <div className="db-grid">
        {BLOGS.map(b => (
          <div key={b.id} className="db-card">
            <img src={b.cover} alt={b.title} style={{width:'100%', height:140, objectFit:'cover'}} />
            <div className="db-card-pad">
              <div style={{fontWeight:800}}>{b.title}</div>
              <p className="db-sub" style={{marginTop:6}}>{b.summary}</p>
              <button className="db-btn">Read</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 