require("dotenv").config();
const mongoose = require("mongoose");
const PageContent = require("./models/PageContent");

const defaultData = [
  {
    page: "home",
    sections: {
      hero: {
        heading: "Premium Branding Agency\nfor B2B Tech Scaleups",
        videoUrl: "",
      },
      about: {
        heading: "Crafting premium\nbrands for scaleups\nthat make people smile.",
        buttonText: "About us",
      },
      aboutFacts: [
        { value: "20+", label: "years building brands, platforms, and experiences that actually ship" },
        { value: "$100M+", label: "in projects, developments, and ventures supported through our work" },
        { value: "3 markets", label: "New York \u2022 Toronto \u2022 Florida \u2014 operating across borders and industries" },
        { value: "0 layers", label: "you work directly with senior leadership \u2014 always" },
        { value: "Weeks, not months", label: "from strategy to execution" },
      ],
      servicePanels: [
        {
          title: "Brand Strategy",
          description: "It's the core of your company's identity. It guides all business decisions, ensuring a consistent and impactful presence in the market.",
          items: "Research & Insights, Brand Model, Positioning, Value proposition, Messaging, Verbal Identity, Naming",
          bgColor: "#2B59C3",
        },
        {
          title: "Identity",
          description: "Distinctive visual systems designed to be immediate, enduring, and unmistakable.",
          items: "Logo & Wordmark, Typography & Color, Art Direction, Brand Systems, Guidelines",
          bgColor: "#0B0215",
        },
        {
          title: "Digital",
          description: "High-performance digital experiences—designed with precision and built to scale.",
          items: "UX & UI Design, Website Design, Web Development, Interaction & Motion",
          bgColor: "#F4EDD9",
        },
        {
          title: "Product",
          description: "Thoughtfully designed products that are intuitive, refined, and built for real use.",
          items: "UX Design, Prototyping, UI Systems, App Design",
          bgColor: "#020817",
        },
      ],
      works: {
        heading: "We partner with ambitious\nscaleups in New York\nand the Americas",
        ctaText: "See more projects",
      },
      insightCards: [
        {
          brand: "Marshall Haber",
          label: "The Heart of the Shift:",
          title: "Brand Messaging is the Soul of Rebranding",
          description: "The Heart of the Shift: Brand Messaging Is the Soul of Rebranding",
          bgColor: "#E8E6DF",
        },
        {
          brand: "Marshall Haber",
          label: "Research Is Our Love Language:",
          title: "The Art of Gathering Insights",
          description: "Research Is Our Love Language: The Art of Gathering Insights",
          bgColor: "#2B59C3",
        },
        {
          brand: "Marshall Haber",
          label: "The Founders' Guide to Rebranding",
          title: "...is it time?",
          description: "The Founders' Guide to Rebranding",
          bgColor: "#0B0215",
        },
      ],
      cta: [
        {
          topText: "You feel it too?\nLet's talk, no strings attached",
          heading: "Send Request",
          bgColor: "#E8E6DF",
        },
        {
          topText: "Our free offer for B2B tech scaleups!\nWe identify high-impact messaging and brand fixes you can implement within 24 hours.",
          heading: "Brand Masterplan",
          bgColor: "#2B59C3",
        },
      ],
    },
  },
  {
    page: "work",
    sections: {
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
  },
  {
    page: "about",
    sections: {
      intro: {
        paragraph: "SERIOUS.BUSINESS started in 2015 as a passion project at Hyper Island, Stockholm by a diverse group of creatives with the goal of re-defining what a serious business is really about: kindness and creativity.",
      },
      ctaBlocks: [
        {
          topText: "You feel it too?\nLet's talk, no strings attached",
          heading: "Send Request",
          bgColor: "#E8E6DF",
        },
        {
          topText: "Our free offer for B2B tech scaleups!\nWe identify high-impact messaging and brand fixes you can implement within 24 hours.",
          heading: "Brand Masterplan",
          bgColor: "#2B59C3",
        },
      ],
    },
  },
  {
    page: "clients",
    sections: {
      hero: {
        label: "Our Partners",
        heading: "Credibility has an impact\nin numbers",
        subheading: "Bookings in Europe and the Americas partner with us for our expertise in Brand Strategy, Identity, Marketing & Product.",
      },
      stats: [
        { value: "95%", label: "Of the clients we work with are built on long-term partnerships" },
        { value: "40+", label: "Top startups across global markets, EU/USA Markets" },
        { value: "180+", label: "Strategies we have designed for our clients" },
        { value: "320M\u20AC", label: "Of funding was raised by our partner clients and us" },
      ],
      clientList: [
        { name: "JPMorgan Chase", category: "Finance", logoUrl: "" },
        { name: "Berkshire Hathaway", category: "Finance", logoUrl: "" },
        { name: "Jeffries", category: "Finance", logoUrl: "" },
        { name: "Special Olympics", category: "Nonprofit", logoUrl: "" },
        { name: "Eurotech", category: "Technology", logoUrl: "" },
        { name: "Signature Bank", category: "Finance", logoUrl: "" },
        { name: "Burson Marsteller", category: "Communications", logoUrl: "" },
        { name: "Celadon", category: "Technology", logoUrl: "" },
        { name: "Humankind Investments", category: "Finance", logoUrl: "" },
        { name: "MIZ", category: "Technology", logoUrl: "" },
        { name: "Y&R", category: "Advertising", logoUrl: "" },
        { name: "Centerbridge", category: "Finance", logoUrl: "" },
        { name: "Kaplan", category: "Education", logoUrl: "" },
        { name: "Rivington", category: "Finance", logoUrl: "" },
        { name: "Trish McEvoy", category: "Beauty", logoUrl: "" },
        { name: "Usher", category: "Entertainment", logoUrl: "" },
      ],
      ctaSection: {
        heading: "Want to join our client roster?",
        buttonText: "Get in Touch",
      },
    },
  },
  {
    page: "services",
    sections: {
      hero: {
        heading: "We equip, empower, and inspire tomorrow's leaders through premium branding",
        videoUrl: "",
      },
      sidebar: {
        label: "When?",
        text: "Our work focusses on B2B tech scaleups at Series A & B stage. On top of that we work with one early stage startup at a time. Honoring both our passion and how we started.",
      },
      serviceCards: [
        { title: "Premium Branding", text: "Our bestseller for scaleups: a premium branding approach that connects strategy and creativity to turn complex value into a clear and credible story for enterprise buyers." },
        { title: "Sprint", text: "Sprints are 1-month projects designed to create a brand or website quickly and efficiently for early-stage startups." },
        { title: "Subscription", text: "Design subscriptions are our way of collaborating long-term with clients, acting as their extended team to speed up growth and ensure consistency." },
        { title: "Venture", text: "Venture relationships involve high commitment projects where we invest our expertise and resources in exchange for shares." },
      ],
      brandingPanels: [
        { title: "Brand Strategy", description: "It's the core of your company's identity. It guides all business decisions, ensuring a consistent and impactful presence in the market.", items: "Research & Insights, Brand Model, Positioning, Value proposition, Messaging, Verbal Identity, Naming", bgColor: "#cba6f7" },
        { title: "Identity", description: "Distinctive visual systems designed to be immediate, enduring, and unmistakable.", items: "Logo & Wordmark, Typography & Color, Art Direction, Brand Systems, Guidelines", bgColor: "#ffffff" },
        { title: "Digital", description: "High-performance digital experiences—designed with precision and built to scale.", items: "UX & UI Design, Website Design, Web Development, Interaction & Motion", bgColor: "#fac541" },
        { title: "Product", description: "Thoughtfully designed products that are intuitive, refined, and built for real use.", items: "UX Design, Prototyping, UI Systems, App Design", bgColor: "#1a1a1a" },
        { title: "Sprints", description: "We work in rapid, focused cycles—prototyping, testing, and refining to move ideas forward quickly.", items: "Rapid Prototyping, Design Sprints, MVP Development, Iteration & Optimization, Concept Testing", bgColor: "#f5f0e8" },
        { title: "Experiential", description: "Immersive brand experiences that create real-world impact.", items: "Brand Activations, Events & Installations, Spatial Design, Interactive Experiences", bgColor: "#e8f5e9" },
        { title: "Film & Content", description: "Cinematic storytelling that elevates brands and drives engagement.", items: "Brand Films, Campaign Content, Motion & Animation, Post-Production", bgColor: "#1c1c2e" },
        { title: "Objects", description: "Physical expressions of your brand—designed with the same level of care and intention.", items: "Corporate Gifting, Merchandise & Swag, Packaging, Custom Products", bgColor: "#2B59C3" },
      ],
    },
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    for (const page of defaultData) {
      await PageContent.findOneAndUpdate(
        { page: page.page },
        page,
        { upsert: true, new: true }
      );
      console.log(`Seeded: ${page.page}`);
    }

    console.log("\nAll pages seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
