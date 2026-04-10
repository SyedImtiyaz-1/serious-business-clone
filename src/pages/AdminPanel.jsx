import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./AdminPanel.module.css";

const API = "http://localhost:5000/api/admin";
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
          { name: "videoUrl", label: "Hero Video", type: "video" },
        ],
      },
      {
        key: "about",
        title: "About Section",
        fields: [
          { name: "heading", label: "Heading", type: "textarea" },
          { name: "buttonText", label: "Button Text", type: "text" },
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
        ],
      },
      {
        key: "works",
        title: "Works Section",
        fields: [
          { name: "heading", label: "Heading", type: "textarea" },
          { name: "ctaText", label: "CTA Button Text", type: "text" },
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
          { name: "description", label: "Description", type: "text" },
          { name: "bgColor", label: "Background Color", type: "color" },
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
          { name: "subtitle", label: "Subtitle", type: "text" },
          { name: "client", label: "Client", type: "text" },
          { name: "category", label: "Category", type: "text" },
          { name: "imageUrl", label: "Project Image", type: "image" },
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
          { name: "videoUrl", label: "Video", type: "video" },
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
    onChange(items.filter((_, i) => i !== index));
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
      setPageData(data.sections || {});
    } catch {
      setPageData({});
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
