import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./AdminPanel.module.css";

const API = "/api/admin";
const KEY = "234583419264838";
const headers = { "x-admin-key": KEY };
const jsonHeaders = { "x-admin-key": KEY, "Content-Type": "application/json" };

// ─── Page definitions: what sections each page has ───
const PAGE_CONFIG = {
  home: {
    label: "Home",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    sections: [
      {
        key: "hero",
        title: "Hero Section",
        fields: [
          { name: "heading", label: "Main Heading", type: "textarea" },
          { name: "subheading", label: "Subheading", type: "textarea" },
          { name: "videoUrl", label: "Hero Video", type: "video" },
          { name: "logoImageUrl", label: "Logo Image", type: "image" },
          { name: "bgColor", label: "Background Color", type: "color" },
        ],
      },
      {
        key: "about",
        title: "About Section",
        fields: [
          { name: "heading", label: "Heading", type: "textarea" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "buttonText", label: "Button Text", type: "text" },
          { name: "imageUrl", label: "About Image", type: "image" },
        ],
      },
      {
        key: "aboutFacts",
        title: "Key Facts",
        type: "list",
        fields: [
          { name: "value", label: "Value", type: "text" },
          { name: "label", label: "Description", type: "text" },
        ],
      },
      {
        key: "servicePanels",
        title: "Service Panels",
        type: "list",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "items", label: "Items (comma-separated)", type: "text" },
          { name: "bgColor", label: "Background Color", type: "color" },
          { name: "imageUrl", label: "Panel Image", type: "image" },
          { name: "videoUrl", label: "Panel Video", type: "video" },
        ],
      },
      {
        key: "works",
        title: "Works Section",
        fields: [
          { name: "heading", label: "Heading", type: "textarea" },
          { name: "ctaText", label: "CTA Button Text", type: "text" },
          { name: "imageUrl", label: "Section Image", type: "image" },
        ],
      },
      {
        key: "insightCards",
        title: "Insight Cards",
        type: "list",
        fields: [
          { name: "brand", label: "Brand Name", type: "text" },
          { name: "label", label: "Label", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "bgColor", label: "Background Color", type: "color" },
          { name: "imageUrl", label: "Card Image", type: "image" },
        ],
      },
      {
        key: "cta",
        title: "CTA Cards",
        type: "list",
        fields: [
          { name: "topText", label: "Top Text", type: "textarea" },
          { name: "heading", label: "Heading", type: "text" },
          { name: "bgColor", label: "Background Color", type: "color" },
          { name: "imageUrl", label: "Card Image", type: "image" },
          { name: "linkUrl", label: "Link URL", type: "text" },
        ],
      },
    ],
  },
  work: {
    label: "Work",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
    sections: [
      {
        key: "projects",
        title: "Projects",
        type: "list",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "slug", label: "URL Slug", type: "text" },
          { name: "subtitle", label: "Subtitle", type: "text" },
          { name: "client", label: "Client", type: "text" },
          { name: "category", label: "Category", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "imageUrl", label: "Project Image", type: "image" },
          { name: "videoUrl", label: "Project Video", type: "video" },
        ],
      },
    ],
  },
  about: {
    label: "About",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
    sections: [
      {
        key: "intro",
        title: "Intro Section",
        fields: [
          { name: "paragraph", label: "Main Paragraph", type: "textarea" },
          { name: "imageUrl", label: "About Image", type: "image" },
          { name: "videoUrl", label: "About Video", type: "video" },
        ],
      },
      {
        key: "ctaBlocks",
        title: "CTA Blocks",
        type: "list",
        fields: [
          { name: "topText", label: "Top Text", type: "textarea" },
          { name: "heading", label: "Heading", type: "text" },
          { name: "bgColor", label: "Background Color", type: "color" },
        ],
      },
    ],
  },
  clients: {
    label: "Clients",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    sections: [
      {
        key: "hero",
        title: "Hero Section",
        fields: [
          { name: "label", label: "Label", type: "text" },
          { name: "heading", label: "Heading", type: "textarea" },
          { name: "subheading", label: "Subheading", type: "textarea" },
          { name: "imageUrl", label: "Hero Image", type: "image" },
          { name: "videoUrl", label: "Hero Video", type: "video" },
        ],
      },
      {
        key: "stats",
        title: "Stats",
        type: "list",
        fields: [
          { name: "value", label: "Value (e.g. 95%)", type: "text" },
          { name: "label", label: "Description", type: "text" },
        ],
      },
      {
        key: "clientList",
        title: "Client List",
        type: "list",
        fields: [
          { name: "name", label: "Client Name", type: "text" },
          { name: "category", label: "Category", type: "text" },
          { name: "logoUrl", label: "Logo", type: "image" },
        ],
      },
      {
        key: "ctaSection",
        title: "CTA Section",
        fields: [
          { name: "heading", label: "Heading", type: "text" },
          { name: "buttonText", label: "Button Text", type: "text" },
        ],
      },
    ],
  },
  services: {
    label: "Services",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    sections: [
      {
        key: "hero",
        title: "Hero Section",
        fields: [
          { name: "heading", label: "Heading", type: "textarea" },
          { name: "subheading", label: "Subheading", type: "textarea" },
          { name: "videoUrl", label: "Hero Video", type: "video" },
          { name: "imageUrl", label: "Hero Image", type: "image" },
          { name: "bgColor", label: "Background Color", type: "color" },
        ],
      },
      {
        key: "sidebar",
        title: "Sidebar Info",
        fields: [
          { name: "label", label: "Label", type: "text" },
          { name: "text", label: "Text", type: "textarea" },
        ],
      },
      {
        key: "serviceCards",
        title: "Service Cards",
        type: "list",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "text", label: "Description", type: "textarea" },
        ],
      },
      {
        key: "brandingPanels",
        title: "Branding Service Panels",
        type: "list",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "items", label: "Items (comma-separated)", type: "text" },
          { name: "bgColor", label: "Background Color", type: "color" },
          { name: "imageUrl", label: "Panel Image", type: "image" },
          { name: "videoUrl", label: "Panel Video", type: "video" },
        ],
      },
    ],
  },
};

// ─── Reusable media uploader ───
function MediaUploader({ type, value, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file) {
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append(type, file);
    try {
      const res = await fetch(`${API}/upload-${type}`, { method: "POST", headers, body: fd });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } catch {}
    setUploading(false);
  }

  if (value) {
    return (
      <div className={styles.mediaThumb}>
        {type === "image" ? (
          <img src={value} alt="" />
        ) : (
          <video src={value} controls />
        )}
        <button type="button" className={styles.mediaRemove} onClick={() => onChange("")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>
    );
  }

  return (
    <div className={styles.dropzone} onClick={() => inputRef.current?.click()}>
      <input
        ref={inputRef}
        type="file"
        accept={type === "image" ? "image/*" : "video/*"}
        className={styles.hiddenInput}
        onChange={(e) => handleFile(e.target.files[0])}
      />
      {uploading ? (
        <div className={styles.spinner} />
      ) : (
        <>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.dropzoneIcon}>
            {type === "image" ? (
              <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></>
            ) : (
              <polygon points="5 3 19 12 5 21 5 3" />
            )}
          </svg>
          <span>Click to upload {type}</span>
        </>
      )}
    </div>
  );
}

// ─── Single field renderer ───
function FieldInput({ field, value, onChange }) {
  if (field.type === "image" || field.type === "video") {
    return <MediaUploader type={field.type} value={value || ""} onChange={onChange} />;
  }
  if (field.type === "color") {
    return (
      <div className={styles.colorRow}>
        <input type="color" value={value || "#000000"} onChange={(e) => onChange(e.target.value)} className={styles.colorPicker} />
        <input type="text" value={value || ""} onChange={(e) => onChange(e.target.value)} className={styles.input} placeholder="#000000" />
      </div>
    );
  }
  if (field.type === "textarea") {
    return (
      <textarea
        className={styles.textarea}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.label}
        rows={3}
      />
    );
  }
  return (
    <input
      className={styles.input}
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.label}
    />
  );
}

// ─── Section editor (single object) ───
function SectionEditor({ section, data, onChange }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{section.title}</h3>
      <div className={styles.fieldGrid}>
        {section.fields.map((field) => (
          <div key={field.name} className={styles.field}>
            <label className={styles.label}>{field.label}</label>
            <FieldInput
              field={field}
              value={data?.[field.name]}
              onChange={(val) => onChange({ ...data, [field.name]: val })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── List section editor (array of objects) ───
function ListSectionEditor({ section, data, onChange }) {
  const items = Array.isArray(data) ? data : [];

  function updateItem(index, field, value) {
    const updated = items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    onChange(updated);
  }

  function addItem() {
    const blank = {};
    section.fields.forEach((f) => { blank[f.name] = ""; });
    onChange([...items, blank]);
  }

  function removeItem(index) {
    if (!window.confirm("Delete this item?")) return;
    const updated = [...items];
    updated.splice(index, 1);
    onChange(updated);
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{section.title}</h3>
        <span className={styles.countBadge}>{items.length}</span>
      </div>
      <div className={styles.listItems}>
        {items.map((item, i) => (
          <div key={i} className={styles.listItem}>
            <div className={styles.listItemHeader}>
              <span className={styles.listIndex}>{i + 1}</span>
              <span className={styles.listItemTitle}>{item.title || item.name || item.value || `Item ${i + 1}`}</span>
              <button type="button" className={styles.removeBtn} onClick={() => removeItem(i)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </button>
            </div>
            <div className={styles.fieldGrid}>
              {section.fields.map((field) => (
                <div key={field.name} className={styles.field}>
                  <label className={styles.label}>{field.label}</label>
                  <FieldInput
                    field={field}
                    value={item[field.name]}
                    onChange={(val) => updateItem(i, field.name, val)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" className={styles.addBtn} onClick={addItem}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
        Add {section.title.replace(/s$/, "")}
      </button>
    </div>
  );
}

// ─── Fallback data when API is unavailable ───
const FALLBACK_DATA = {
  home: {
    hero: { heading: "Premium Branding Agency\nfor B2B Tech Scaleups", subheading: "", videoUrl: "", logoImageUrl: "", bgColor: "#020817" },
    about: { heading: "Crafting premium\nbrands for scaleups\nthat make people smile.", description: "", buttonText: "About us", imageUrl: "" },
    aboutFacts: [
      { value: "20+", label: "years building brands, platforms, and experiences that actually ship" },
      { value: "$100M+", label: "in projects, developments, and ventures supported through our work" },
      { value: "3 markets", label: "New York • Toronto • Florida — operating across borders and industries" },
      { value: "0 layers", label: "you work directly with senior leadership — always" },
      { value: "Weeks, not months", label: "from strategy to execution" },
    ],
    servicePanels: [
      { title: "Brand Strategy", description: "It's the core of your company's identity. It guides all business decisions, ensuring a consistent and impactful presence in the market.", items: "Research & Insights, Brand Model, Positioning, Value proposition, Messaging, Verbal Identity, Naming", bgColor: "#2B59C3", imageUrl: "", videoUrl: "" },
      { title: "Identity", description: "Distinctive visual systems designed to be immediate, enduring, and unmistakable.", items: "Logo & Wordmark, Typography & Color, Art Direction, Brand Systems, Guidelines", bgColor: "#0B0215", imageUrl: "", videoUrl: "" },
      { title: "Digital", description: "High-performance digital experiences—designed with precision and built to scale.", items: "UX & UI Design, Website Design, Web Development, Interaction & Motion", bgColor: "#fbf0f2", imageUrl: "", videoUrl: "" },
      { title: "Product", description: "Thoughtfully designed products that are intuitive, refined, and built for real use.", items: "UX Design, Prototyping, UI Systems, App Design", bgColor: "#020817", imageUrl: "", videoUrl: "" },
    ],
    works: { heading: "We partner with ambitious\nscaleups in New York\nand the Americas", ctaText: "See more projects" },
    insightCards: [
      { brand: "Marshall Haber", label: "The Heart of the Shift:", title: "Brand Messaging is the Soul of Rebranding", description: "The Heart of the Shift: Brand Messaging Is the Soul of Rebranding", bgColor: "#f7c4d5" },
      { brand: "Marshall Haber", label: "Research Is Our Love Language:", title: "The Art of Gathering Insights", description: "Research Is Our Love Language: The Art of Gathering Insights", bgColor: "#2B59C3" },
      { brand: "Marshall Haber", label: "The Founders' Guide to Rebranding", title: "...is it time?", description: "The Founders' Guide to Rebranding", bgColor: "#0B0215" },
    ],
    cta: [
      { topText: "You feel it too?\nLet's talk, no strings attached", heading: "Send Request", bgColor: "#E8E6DF" },
      { topText: "Our free offer for B2B tech scaleups!\nWe identify high-impact messaging and brand fixes you can implement within 24 hours.", heading: "Brand Masterplan", bgColor: "#2B59C3" },
    ],
  },
  work: {
    projects: [
      { slug: "memri", title: "MEMRI", subtitle: "TRUTH IS COMPLEX. SPEAK ITS LANGUAGE.", client: "MEMRI", category: "Civic + Public + Political", description: "", imageUrl: "", videoUrl: "" },
      { slug: "optifino", title: "Optifino", subtitle: "Technology", client: "Optifino", category: "Technology", description: "", imageUrl: "", videoUrl: "" },
      { slug: "toronto", title: "The One Toronto", subtitle: "Real Estate", client: "The One Toronto", category: "Real Estate", description: "", imageUrl: "", videoUrl: "" },
      { slug: "jpmorgan", title: "JPMorgan", subtitle: "INTERNATIONAL COUNCIL", client: "JPMorgan", category: "Financial Services", description: "", imageUrl: "", videoUrl: "" },
      { slug: "aaron_matthew", title: "Aaron Matthew SIDS Research Guild", subtitle: "Not-For-Profit", client: "Aaron Matthew", category: "Not-For-Profit", description: "", imageUrl: "", videoUrl: "" },
      { slug: "centerbridge", title: "Centerbridge Partners", subtitle: "Banking + Finance", client: "Centerbridge", category: "Banking + Finance", description: "", imageUrl: "", videoUrl: "" },
      { slug: "coinbase", title: "Coinbase", subtitle: "Banking + Finance", client: "Coinbase", category: "Banking + Finance", description: "", imageUrl: "", videoUrl: "" },
      { slug: "hotel-rivington", title: "Hotel on Rivington", subtitle: "Hospitality", client: "Hotel on Rivington", category: "Hospitality", description: "", imageUrl: "", videoUrl: "" },
      { slug: "special-olympics", title: "Special Olympics", subtitle: "Not-For-Profit", client: "Special Olympics", category: "Not-For-Profit", description: "", imageUrl: "", videoUrl: "" },
      { slug: "south-africa-tourism", title: "South Africa Tourism", subtitle: "Civic + Public + Political", client: "South Africa Tourism", category: "Civic + Public + Political", description: "", imageUrl: "", videoUrl: "" },
      { slug: "boracho", title: "Boracho Hard Seltzer", subtitle: "Consumer", client: "Boracho", category: "Consumer", description: "", imageUrl: "", videoUrl: "" },
      { slug: "eurotech", title: "Eurotech", subtitle: "B2B", client: "Eurotech", category: "B2B", description: "", imageUrl: "", videoUrl: "" },
      { slug: "humankind", title: "Humankind Investments", subtitle: "Banking + Finance", client: "Humankind Investments", category: "Banking + Finance", description: "", imageUrl: "", videoUrl: "" },
    ],
  },
  services: {
    hero: { heading: "We equip, empower, and inspire tomorrow's leaders through premium branding", videoUrl: "" },
    sidebar: { label: "When?", text: "Our work focusses on B2B tech scaleups at Series A & B stage. On top of that we work with one early stage startup at a time. Honoring both our passion and how we started." },
    serviceCards: [
      { title: "Premium Branding", text: "Our bestseller for scaleups: a premium branding approach that connects strategy and creativity to turn complex value into a clear and credible story for enterprise buyers." },
      { title: "Sprint", text: "Sprints are 1-month projects designed to create a brand or website quickly and efficiently for early-stage startups." },
      { title: "Subscription", text: "Design subscriptions are our way of collaborating long-term with clients, acting as their extended team to speed up growth and ensure consistency." },
      { title: "Venture", text: "Venture relationships involve high commitment projects where we invest our expertise and resources in exchange for shares." },
    ],
    brandingPanels: [
      { title: "Brand Strategy", description: "It's the core of your company's identity. It guides all business decisions, ensuring a consistent and impactful presence in the market.", items: "Research & Insights, Brand Model, Positioning, Value proposition, Messaging, Verbal Identity, Naming", bgColor: "#cba6f7", imageUrl: "", videoUrl: "" },
      { title: "Identity", description: "Distinctive visual systems designed to be immediate, enduring, and unmistakable.", items: "Logo & Wordmark, Typography & Color, Art Direction, Brand Systems, Guidelines", bgColor: "#ffffff", imageUrl: "", videoUrl: "" },
      { title: "Digital", description: "High-performance digital experiences—designed with precision and built to scale.", items: "UX & UI Design, Website Design, Web Development, Interaction & Motion", bgColor: "#fac541", imageUrl: "", videoUrl: "" },
      { title: "Product", description: "Thoughtfully designed products that are intuitive, refined, and built for real use.", items: "UX Design, Prototyping, UI Systems, App Design", bgColor: "#1a1a1a", imageUrl: "", videoUrl: "" },
      { title: "Sprints", description: "We work in rapid, focused cycles—prototyping, testing, and refining to move ideas forward quickly.", items: "Rapid Prototyping, Design Sprints, MVP Development, Iteration & Optimization, Concept Testing", bgColor: "#f5f0e8", imageUrl: "", videoUrl: "" },
      { title: "Experiential", description: "Immersive brand experiences that create real-world impact.", items: "Brand Activations, Events & Installations, Spatial Design, Interactive Experiences", bgColor: "#e8f5e9", imageUrl: "", videoUrl: "" },
      { title: "Film & Content", description: "Cinematic storytelling that elevates brands and drives engagement.", items: "Brand Films, Campaign Content, Motion & Animation, Post-Production", bgColor: "#1c1c2e", imageUrl: "", videoUrl: "" },
      { title: "Objects", description: "Physical expressions of your brand—designed with the same level of care and intention.", items: "Corporate Gifting, Merchandise & Swag, Packaging, Custom Products", bgColor: "#2B59C3", imageUrl: "", videoUrl: "" },
    ],
  },
  about: {
    intro: { paragraph: "SERIOUS.BUSINESS started in 2015 as a passion project at Hyper Island, Stockholm by a diverse group of creatives with the goal of re-defining what a serious business is really about: kindness and creativity." },
    ctaBlocks: [
      { topText: "You feel it too?\nLet's talk, no strings attached", heading: "Send Request", bgColor: "#E8E6DF" },
      { topText: "Our free offer for B2B tech scaleups!\nWe identify high-impact messaging and brand fixes you can implement within 24 hours.", heading: "Brand Masterplan", bgColor: "#2B59C3" },
    ],
  },
  clients: {
    hero: { label: "Our Partners", heading: "Credibility has an impact\nin numbers", subheading: "Bookings in Europe and the Americas partner with us for our expertise in Brand Strategy, Identity, Marketing & Product." },
    stats: [
      { value: "95%", label: "Of the clients we work with are built on long-term partnerships" },
      { value: "40+", label: "Top startups across global markets, EU/USA Markets" },
      { value: "180+", label: "Strategies we have designed for our clients" },
      { value: "320M€", label: "Of funding was raised by our partner clients and us" },
    ],
    clientList: [],
    ctaSection: { heading: "Want to join our client roster?", buttonText: "Get in Touch" },
  },
};

// ─── Main Admin Panel ───
export default function AdminPanel() {
  const [activePage, setActivePage] = useState("home");
  const [pageData, setPageData] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const config = PAGE_CONFIG[activePage];

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  async function loadPage(page) {
    setLoading(true);
    try {
      const res = await fetch(`${API}/pages/${page}`);
      const data = await res.json();
      const sections = data.sections || {};
      // If DB has data, use it; otherwise use fallback so user sees current content
      const hasData = Object.keys(sections).some(k => {
        const v = sections[k];
        return Array.isArray(v) ? v.length > 0 : v && Object.keys(v).length > 0;
      });
      setPageData(hasData ? sections : (FALLBACK_DATA[page] || {}));
    } catch {
      // API down — show fallback data so user can still see/edit
      setPageData(FALLBACK_DATA[page] || {});
    }
    setLoading(false);
  }

  useEffect(() => {
    loadPage(activePage);
  }, [activePage]);

  function updateSection(sectionKey, value) {
    setPageData((prev) => ({ ...prev, [sectionKey]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`${API}/pages/${activePage}`, {
        method: "PUT",
        headers: jsonHeaders,
        body: JSON.stringify({ sections: pageData }),
      });
      const data = await res.json();
      if (data.page) {
        showToast(`${config.label} page saved!`);
      } else {
        showToast(data.error || "Save failed", "error");
      }
    } catch (err) {
      showToast(err.message, "error");
    }
    setSaving(false);
  }

  return (
    <div className={styles.layout}>
      {/* ─── Sidebar ─── */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>M</div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Marshall</span>
            <span className={styles.brandSub}>Content Manager</span>
          </div>
        </div>

        <div className={styles.navLabel}>Pages</div>
        <nav className={styles.nav}>
          {Object.entries(PAGE_CONFIG).map(([key, cfg]) => (
            <button
              key={key}
              className={`${styles.navItem} ${activePage === key ? styles.active : ""}`}
              onClick={() => setActivePage(key)}
            >
              {cfg.icon}
              <span>{cfg.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.dot} />
          <span>API Connected</span>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <main className={styles.main}>
        {toast && (
          <div className={`${styles.toast} ${styles[toast.type]}`}>{toast.msg}</div>
        )}

        <header className={styles.header}>
          <div>
            <h1>{config.label}</h1>
            <p>Edit content for the {config.label} page</p>
          </div>
          <button className={styles.publishBtn} onClick={handleSave} disabled={saving}>
            {saving ? (
              <><div className={styles.btnSpinner} />Saving...</>
            ) : (
              <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>Save Changes</>
            )}
          </button>
        </header>

        {loading ? (
          <div className={styles.loadingState}><div className={styles.spinner} /></div>
        ) : (
          <div className={styles.sections}>
            {config.sections.map((section) =>
              section.type === "list" ? (
                <ListSectionEditor
                  key={section.key}
                  section={section}
                  data={pageData[section.key]}
                  onChange={(val) => updateSection(section.key, val)}
                />
              ) : (
                <SectionEditor
                  key={section.key}
                  section={section}
                  data={pageData[section.key]}
                  onChange={(val) => updateSection(section.key, val)}
                />
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
}
