import React from "react";

export default function Onboarding() {
  return (
    <div className="db-onboard db-container">
      <div className="db-card db-card-pad" style={{maxWidth: 520}}>
        <div className="db-logo">
          <div className="db-infinity" aria-hidden="true" />
        </div>
        <h1 className="db-title">Dobaara</h1>
        <p className="db-sub">Made for Each Other, Beyond Heavens</p>
        <div className="db-actions" style={{justifyContent:'center'}}>
          <a className="db-btn db-btn-primary" href="#/login">Get Started</a>
          <a className="db-btn db-btn-ghost" href="#/blog">Explore Blog</a>
        </div>
      </div>
    </div>
  );
} 