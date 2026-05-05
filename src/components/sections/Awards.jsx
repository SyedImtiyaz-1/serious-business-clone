import { motion } from "framer-motion";

const awards = [
  {
    abbr: "W.",
    name: "Awwwards.",
    achievements: ["2 x Agency of the year Nominee", "7 x Site of the day", "2 x Developer Award"],
  },
  {
    abbr: "L.",
    name: "The Lovie Awards",
    achievements: ["2 x Gold Lovie", "2 x Silver Lovie", "2 x People's choice"],
  },
  {
    abbr: "FWA",
    name: "The FWA",
    achievements: ["2 x FWA of the Day"],
  },
  {
    abbr: "GDA",
    name: "German Design Award",
    achievements: ["Special Mention Award"],
  },
  {
    abbr: "Bē",
    name: "Behance",
    achievements: ["1 x Graphic Design"],
  },
  {
    abbr: "R.",
    name: "Red Dot Design Award",
    achievements: ["Communication Design Award"],
  },
  {
    abbr: "D&AD",
    name: "D&AD Awards",
    achievements: ["Yellow Pencil", "Graphite Pencil"],
  },
  {
    abbr: "CSS",
    name: "CSS Design Awards",
    achievements: ["3 x Site of the Day", "1 x Site of the Month"],
  },
  {
    abbr: "iF",
    name: "iF Design Award",
    achievements: ["Communication Design", "Digital & Interactive"],
  },
  {
    abbr: "A'",
    name: "A' Design Award",
    achievements: ["Gold Award", "Silver Award"],
  },
  {
    abbr: "ADC",
    name: "ADC Annual Awards",
    achievements: ["Silver Cube", "Merit Award"],
  },
  {
    abbr: "TDC",
    name: "Type Directors Club",
    achievements: ["Certificate of Excellence"],
  },
  {
    abbr: "🦁",
    name: "Cannes Lions",
    achievements: ["Bronze Lion — Digital Craft"],
  },
  {
    abbr: "Wb",
    name: "The Webby Awards",
    achievements: ["2 x Official Honoree", "People's Voice"],
  },
  {
    abbr: "Dz",
    name: "Dezeen Awards",
    achievements: ["Highly Commended", "Brand Identity"],
  },
  {
    abbr: "AIGA",
    name: "AIGA Design",
    achievements: ["50 Books 50 Covers"],
  },
];

export default function Awards() {
  return (
    <section className="w-full py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Section label */}
        <motion.p
          className="text-xs font-semibold tracking-[0.1em] uppercase opacity-40 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Awards &amp; Recognition
        </motion.p>

        {/* Grid */}
        <div className="awards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0",
            borderTop: "1px solid rgba(244,237,217,0.12)",
            borderLeft: "1px solid rgba(244,237,217,0.12)",
          }}
        >
          {awards.map((award, i) => (
            <motion.div
              key={award.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderRight: "1px solid rgba(244,237,217,0.12)",
                borderBottom: "1px solid rgba(244,237,217,0.12)",
                padding: "2.5rem 2rem 2rem",
              }}
            >
              {/* Big abbreviation */}
              <div
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "var(--color-cream, #fbf0f2)",
                  lineHeight: 1,
                  marginBottom: "1.25rem",
                }}
              >
                {award.abbr}
              </div>

              {/* Award name */}
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "var(--color-cream, #fbf0f2)",
                  margin: "0 0 0.5rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {award.name}
              </p>

              {/* Achievements */}
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {award.achievements.map((a) => (
                  <li
                    key={a}
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--color-cream, #fbf0f2)",
                      opacity: 0.5,
                      lineHeight: 1.6,
                    }}
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
