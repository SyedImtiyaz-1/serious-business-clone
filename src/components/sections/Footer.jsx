import { useLocation } from "react-router-dom";
import TransitionLink from "../ui/TransitionLink";

export default function Footer() {
  const { pathname } = useLocation();
  const creamPaths = ["/about", "/contact", "/services", "/clients", "/work", "/legal"];
  const isCreamPage =
    creamPaths.includes(pathname) || pathname.startsWith("/work/");

  const bgClass = isCreamPage ? "bg-[#fbf0f2] text-[#020817]" : "bg-[#020817] text-[#fbf0f2]";
  const borderClass = isCreamPage ? "border-[#020817]/20" : "border-[#fbf0f2]/20";
  const logoSrc = isCreamPage ? "/footerLogoBlack.png" : "/logonewlong.png";

  return (
    <footer id="main-footer" className={`w-full pt-20 pb-6 px-6 relative overflow-hidden z-50 ${bgClass}`}>

      {/* Grid Links Section */}
      <div className="w-full flex flex-col md:flex-row justify-between mb-16 md:mb-32 text-base font-medium tracking-tight">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 flex-1">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <h4 className="text-[10px] uppercase font-bold tracking-widest mt-2 opacity-50">Explore</h4>
            <ul className="space-y-1">
              <li><TransitionLink to="/services" className="text-[1.8rem] sm:text-[2.5rem] md:text-[2rem] font-bold tracking-tight hover:opacity-60 transition-opacity leading-tight">Services</TransitionLink></li>
              <li><TransitionLink to="/work" className="text-[1.8rem] sm:text-[2.5rem] md:text-[2rem] font-bold tracking-tight hover:opacity-60 transition-opacity leading-tight">Work</TransitionLink></li>
              <li><TransitionLink to="/about" className="text-[1.8rem] sm:text-[2.5rem] md:text-[2rem] font-bold tracking-tight hover:opacity-60 transition-opacity leading-tight">About</TransitionLink></li>
              <li><TransitionLink to="/clients" className="text-[1.8rem] sm:text-[2.5rem] md:text-[2rem] font-bold tracking-tight hover:opacity-60 transition-opacity leading-tight">Clients</TransitionLink></li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <h4 className="text-[10px] uppercase font-bold tracking-widest mt-2 opacity-50">Stalk us</h4>
            <ul className="space-y-1">
              <li><a href="#" className="text-[1.8rem] sm:text-[2.5rem] md:text-[2rem] font-bold tracking-tight hover:opacity-60 transition-opacity leading-tight">LinkedIn</a></li>
              <li><a href="#" className="text-[1.8rem] sm:text-[2.5rem] md:text-[2rem] font-bold tracking-tight hover:opacity-60 transition-opacity leading-tight">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:gap-10 text-left md:text-right mt-10 md:mt-0">
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest mb-2 opacity-50">Say Hello</h4>
            <a href="mailto:studio@marshallhaber.com" className="text-[1.5rem] md:text-[1.3rem] font-semibold hover:opacity-60 transition-opacity">studio@marshallhaber.com</a>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center mb-12 md:mb-6 mt-16 md:mt-0">
        <img src={logoSrc} alt="Marshall Haber Creative Group" className="h-[12vw] md:h-[6vw] lg:h-[5.5vw] xl:h-[7vw] w-auto" />
      </div>

      {/* Bottom Legal Links */}
      <div className={`w-full flex justify-center items-center text-[10px] font-bold uppercase tracking-widest px-4 border-t ${borderClass} pt-8 mt-12`}>
        <div className="flex items-center gap-4">
          <p>© 2015—2026 Marshall Haber Creative Group</p>
          <span aria-hidden="true" className="opacity-40">|</span>
          <TransitionLink to="/legal" className="hover:opacity-60 transition-opacity">Legal</TransitionLink>
        </div>
      </div>
    </footer>
  );
}
