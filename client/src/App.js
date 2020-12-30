import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";

import Nav from "./components/layout/Nav";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import Footer from "./components/layout/Footer";

import "./tailwind.output.css";

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <Router>
      {/* arrange components in a flex-column that spans 100vh */}
      <div className="bg-gradient-to-b from-purple-400 to-blue-400 flex flex-col justify-between min-h-screen">
        <header>
          <Nav />
        </header>

        {/* main component fills space b/w header and footer, centered vertically */}
        <main className="flex-grow flex flex-col justify-around p-5">
          {isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
