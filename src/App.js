import React from "react";
import "./dobaara.css";
import Onboarding from "./Pages/Onboarding";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Swipe from "./Pages/Swipe";
import Events from "./Pages/Events";
import Chat from "./Pages/Chat";
import Chats from "./Pages/Chats";
import Blog from "./Pages/Blog";
import Settings from "./Pages/Settings";
import NavBar from "./components/NavBar";

function useRoute() {
  const getHash = () => window.location.hash || "#/";
  const [route, setRoute] = React.useState(getHash());
  React.useEffect(()=>{
    const onChange = ()=> setRoute(getHash());
    window.addEventListener('hashchange', onChange);
    return ()=> window.removeEventListener('hashchange', onChange);
  },[]);
  return route;
}

function App() {
  const route = useRoute();
  const showNav = !["#/", "#/login"].includes(route);

  let Screen = null;
  if (route === "#/") Screen = Onboarding;
  else if (route === "#/login") Screen = Login;
  else if (route === "#/profile") Screen = Profile;
  else if (route === "#/swipe") Screen = Swipe;
  else if (route === "#/events") Screen = Events;
  else if (route === "#/chat") Screen = Chats; // list view
  else if (route.startsWith("#/chat/")) Screen = Chat; // single chat
  else if (route === "#/blog") Screen = Blog;
  else if (route === "#/settings") Screen = Settings;
  else Screen = Onboarding;

  return (
    <div className="db-shell">
      <div className="db-device">
        <div className="db-device-body">
          <Screen />
        </div>
        {showNav && <NavBar current={route} />}
      </div>
    </div>
  );
}

export default App;
