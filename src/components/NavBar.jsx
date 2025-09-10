import React from "react";

const tabs = [
  { key: "swipe", label: "Discover", hash: "#/swipe" },
  { key: "events", label: "Events", hash: "#/events" },
  { key: "chat", label: "Chats", hash: "#/chat" },
  { key: "blog", label: "Blog", hash: "#/blog" },
  { key: "settings", label: "Settings", hash: "#/settings" },
  { key: "profile", label: "Me", hash: "#/profile" },
];

export default function NavBar({ current }) {
  return (
    <nav className="db-nav">
      {tabs.map((t) => (
        <a
          key={t.key}
          href={t.hash}
          className={`db-tab ${current?.includes(t.hash.replace('#','')) ? 'active' : ''}`}
        >
          <span className="db-tab-icon">●</span>
          <span className="db-tab-label">{t.label}</span>
        </a>
      ))}
    </nav>
  );
} 