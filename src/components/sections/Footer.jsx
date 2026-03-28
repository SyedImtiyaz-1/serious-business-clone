import TransitionLink from "../ui/TransitionLink";
import Reveal from "../ui/Reveal";

export default function Footer() {
  return (
    <footer className="w-full pt-20 pb-6 px-6 relative overflow-hidden z-50">

      {/* Grid Links Section */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between mb-16 md:mb-32 text-base font-medium tracking-tight">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 flex-1">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <h4 className="text-[10px] uppercase font-bold tracking-widest mt-2 opacity-50">Explore</h4>
            <ul className="space-y-1">
              <li><TransitionLink to="/work" className="text-[1.8rem] sm:text-[2.5rem] md:text-[2rem] font-bold tracking-tight hover:opacity-60 transition-opacity leading-tight">Work</TransitionLink></li>
              <li><TransitionLink to="/about" className="text-[1.8rem] sm:text-[2.5rem] md:text-[2rem] font-bold tracking-tight hover:opacity-60 transition-opacity leading-tight">About</TransitionLink></li>
              <li><TransitionLink to="/services" className="text-[1.8rem] sm:text-[2.5rem] md:text-[2rem] font-bold tracking-tight hover:opacity-60 transition-opacity leading-tight">Services</TransitionLink></li>
              <li><TransitionLink to="/contact" className="text-[1.8rem] sm:text-[2.5rem] md:text-[2rem] font-bold tracking-tight hover:opacity-60 transition-opacity leading-tight">Contact</TransitionLink></li>
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
            <a href="mailto:newbiz@marshallhaber.com" className="text-[1.5rem] md:text-[1.3rem] font-semibold hover:opacity-60 transition-opacity">newbiz@marshallhaber.com</a>
          </div>
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest mb-2 opacity-50">Exceptional talent?</h4>
            <a href="mailto:apply@marshallhaber.com" className="text-[1.5rem] md:text-[1.3rem] font-semibold hover:opacity-60 transition-opacity">apply@marshallhaber.com</a>
          </div>
        </div>
      </div>

      {/* Bottom Massive Logo */}
      <div className="w-full flex justify-center items-center mb-12 md:mb-6 mt-16 md:mt-0">
        <img src="/logonewlong.png" alt="Marshall Haber Creative Group" className="h-[12vw] md:h-[6vw] lg:h-[5.5vw] xl:h-[7vw] w-auto" />
      </div>

      {/* Bottom Legal Links */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest px-4 border-t border-current pt-4">
        <p>© Marshall Haber Creative Group</p>
        <p className="mt-2 md:mt-0 font-playfair lowercase tracking-normal text-sm font-normal">99 Wall Street +1467, New York, NY 10005</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:opacity-60 transition-opacity">Imprint</a>
          <span>|</span>
          <a href="#" className="hover:opacity-60 transition-opacity">Privacy</a>
          <span>|</span>
          <a href="#" className="hover:opacity-60 transition-opacity">Press</a>
        </div>
      </div>
    </footer>
  );
}
