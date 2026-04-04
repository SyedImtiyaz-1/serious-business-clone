import { useLayoutEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/sections/Footer";
import ClientWrapper from "./components/layout/ClientWrapper";
import CustomCursor from "./components/ui/CustomCursor";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import Clients from "./pages/Clients";
import WorkDetail from "./pages/WorkDetail";
import ComingSoon from "./pages/ComingSoon";

gsap.registerPlugin(ScrollTrigger);

// Kills all GSAP ScrollTriggers (including pin spacers) and resets body styles
// synchronously before the browser paints the new route.
function RouteChangeHandler() {
  const location = useLocation();
  useLayoutEffect(() => {
    // Revert (not just kill) each trigger so pin spacers are removed
    // and position:fixed is cleared before the new page paints.
    ScrollTrigger.getAll().forEach(t => t.kill(true));
    gsap.killTweensOf(document.body);
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
    document.body.style.removeProperty("--accent-color");
    document.body.style.removeProperty("--accent-bg");
  }, [location.pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <RouteChangeHandler />
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
    </Router>
  );
}

