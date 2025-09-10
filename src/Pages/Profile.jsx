import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({});

  useEffect(()=>{
    const u = localStorage.getItem("dobaara_user");
    if (u) {
      const parsed = JSON.parse(u);
      setUser(parsed);
      setDraft({ bio: parsed.bio });
    } else {
      window.location.hash = "#/login";
    }
  },[]);

  if (!user) return null;

  const save = () => {
    const updated = { ...user, bio: draft.bio };
    setUser(updated);
    localStorage.setItem("dobaara_user", JSON.stringify(updated));
    setEditing(false);
  };

  return (
    <div className="db-container">
      <div className="db-topbar">
        <div>
          <div className="db-brand">Dobaara</div>
          <div className="db-tagline">Made for Each Other, Beyond Heavens</div>
        </div>
        <a className="db-btn db-btn-ghost" href="#/settings">Settings</a>
      </div>

      <div className="db-card db-card-pad" style={{maxWidth: 720, margin: '0 auto'}}>
        <div style={{display:'flex', gap:16, alignItems:'center'}}>
          <img src={user.photo} alt={user.name} style={{width:96, height:96, objectFit:'cover', borderRadius:16}} />
          <div>
            <h2 className="db-title" style={{marginBottom:4}}>{user.name}, {user.age}</h2>
            <div className="db-sub">{user.interests?.join(' • ')}</div>
          </div>
        </div>

        <div style={{marginTop:16}}>
          {!editing ? (
            <p className="db-sub" style={{color:'#374151'}}>{user.bio}</p>
          ) : (
            <textarea className="db-input" rows={3} value={draft.bio} onChange={(e)=>setDraft({...draft, bio: e.target.value})} />
          )}
        </div>

        <div className="db-actions" style={{marginTop:12}}>
          {!editing ? (
            <button className="db-btn" onClick={()=>setEditing(true)}>Edit</button>
          ) : (
            <>
              <button className="db-btn db-btn-primary" onClick={save}>Save</button>
              <button className="db-btn" onClick={()=>setEditing(false)}>Cancel</button>
            </>
          )}
          <a className="db-btn db-btn-primary" href="#/swipe" style={{marginLeft:'auto'}}>Start Discovering</a>
        </div>
      </div>
    </div>
  );
} 