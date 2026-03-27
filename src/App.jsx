import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/sections/Footer";
import ClientWrapper from "./components/layout/ClientWrapper";
import CustomCursor from "./components/ui/CustomCursor";
import { TransitionProvider } from "./components/ui/PageTransition";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import WorkDetail from "./pages/WorkDetail";

export default function App() {
  return (
    <Router>
      <TransitionProvider>
      <CustomCursor />
      <ClientWrapper>
        <main className="font-sans antialiased">
          <div className="relative w-full">
            <div className="sticky top-0 w-full z-[100] h-0">
              <Navbar />
            </div>
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<WorkDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>

            <Footer />
          </div>
        </main>
      </ClientWrapper>
      </TransitionProvider>
    </Router>
  );
}

