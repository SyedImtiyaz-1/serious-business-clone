import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/sections/Footer";
import ClientWrapper from "./components/layout/ClientWrapper";
import CustomCursor from "./components/ui/CustomCursor";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { TransitionProvider } from "./components/ui/PageTransition";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import Clients from "./pages/Clients";
import WorkDetail from "./pages/WorkDetail";
import ComingSoon from "./pages/ComingSoon";

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

              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/work/:slug" element={<WorkDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/clients" element={<Clients />} />

                  {/* Catch-all for undefined pages */}
                  <Route path="*" element={<ComingSoon />} />
                </Routes>
              </ErrorBoundary>

              <Footer />
            </div>
          </main>
        </ClientWrapper>
      </TransitionProvider>
    </Router>
  );
}

