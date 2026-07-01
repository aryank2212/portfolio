"use client";

import { useState } from "react";
import Preloader from "./components/system/Preloader";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import Registry from "./components/sections/Registry";
import Workloads from "./components/sections/Workloads";
import Interlude from "./components/sections/Interlude";
import Runtime from "./components/sections/Runtime";
import Changelog from "./components/sections/Changelog";
import Docs from "./components/sections/Docs";
import PeerReviews from "./components/sections/PeerReviews";
import Connect from "./components/sections/Connect";
import Footer from "./components/sections/Footer";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setBooted(true)} />
      
      {/* Hide content until boot sequence completes, but render it so DOM is ready */}
      <div 
        id="main-content"
        className={`transition-opacity duration-700 ease-out ${booted ? "opacity-100" : "opacity-0"}`}
      >
        <Navbar />
        
        <main>
          <Hero />
          <div className="scanline-divider" />
          <Registry />
          <div className="scanline-divider" />
          <Workloads />
          <Interlude />
          <Runtime />
          <div className="scanline-divider" />
          <Changelog />
          <div className="scanline-divider" />
          <Docs />
          <PeerReviews />
          <Connect />
        </main>
        
        <Footer />
      </div>
    </>
  );
}