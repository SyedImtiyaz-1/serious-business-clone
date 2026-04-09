
export default function ServicesStack({ panels }) {
  return (
    // Each panel is sticky with the same top offset — they stack on top of each other as you scroll
    <div className="relative">
      {panels.map(({ bg, children }, i) => (
        <section
          key={i}
          className="w-full sticky"
          style={{
            backgroundColor: bg,
            zIndex: 10 + i * 10,
            top: "60px",
            minHeight: "50vh",

          }}
        >
          {children}
        </section>
      ))}
    </div>
  );
}

