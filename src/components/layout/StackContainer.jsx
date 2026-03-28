
import { motion } from "framer-motion";

export default function StackContainer({ panels }) {
  return (
    <div className="relative w-full">
      {panels.map(({ bg, children }, i) => (
        <section
          key={i}
          style={{
            backgroundColor: bg,
            zIndex: 10 + i,
            position: "sticky",
            top: "64px", // Matches Navbar height
            height: "calc(100vh - 64px)",
            boxShadow: i > 0 ? "0 -30px 60px rgba(0,0,0,0.15)" : "none",
          }}
          className="w-full flex flex-col overflow-hidden"
        >
          <div className="flex-1 w-full overflow-y-auto md:overflow-hidden">
            {children}
          </div>
        </section>
      ))}
    </div>
  );
}
