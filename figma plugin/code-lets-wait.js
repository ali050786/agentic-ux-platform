
const COLOR_MAP = {
  purple: {
    bgLight: { r: 0.961, g: 0.953, b: 1 },
    bg: { r: 0.929, g: 0.91, b: 0.996 },
    text: { r: 0.486, g: 0.227, b: 0.929 },
    border: { r: 0.867, g: 0.839, b: 0.996 },
    tagBg: { r: 0.929, g: 0.91, b: 0.996 },
    tagText: { r: 0.357, g: 0.188, b: 0.714 },
    bar: { r: 0.486, g: 0.227, b: 0.929 },
    barBg: { r: 0.929, g: 0.91, b: 0.996 }
  },
  blue: {
    bgLight: { r: 0.937, g: 0.965, b: 0.996 },
    bg: { r: 0.859, g: 0.918, b: 0.996 },
    text: { r: 0.145, g: 0.388, b: 0.922 },
    border: { r: 0.749, g: 0.859, b: 0.996 },
    tagBg: { r: 0.859, g: 0.918, b: 0.996 },
    tagText: { r: 0.118, g: 0.251, b: 0.686 },
    bar: { r: 0.145, g: 0.388, b: 0.922 },
    barBg: { r: 0.859, g: 0.918, b: 0.996 }
  },
  green: {
    bgLight: { r: 0.925, g: 0.992, b: 0.961 },
    bg: { r: 0.82, g: 0.98, b: 0.898 },
    text: { r: 0.063, g: 0.725, b: 0.506 },
    border: { r: 0.655, g: 0.953, b: 0.816 },
    tagBg: { r: 0.82, g: 0.98, b: 0.898 },
    tagText: { r: 0.024, g: 0.373, b: 0.275 },
    bar: { r: 0.063, g: 0.725, b: 0.506 },
    barBg: { r: 0.82, g: 0.98, b: 0.898 }
  },
  orange: {
    bgLight: { r: 1, g: 0.969, b: 0.929 },
    bg: { r: 1, g: 0.929, b: 0.835 },
    text: { r: 0.976, g: 0.451, b: 0.086 },
    border: { r: 0.996, g: 0.843, b: 0.667 },
    tagBg: { r: 1, g: 0.929, b: 0.835 },
    tagText: { r: 0.761, g: 0.255, b: 0.047 },
    bar: { r: 0.976, g: 0.451, b: 0.086 },
    barBg: { r: 1, g: 0.929, b: 0.835 }
  },
  pink: {
    bgLight: { r: 0.992, g: 0.949, b: 0.973 },
    bg: { r: 0.984, g: 0.812, b: 0.91 },
    text: { r: 0.925, g: 0.286, b: 0.6 },
    border: { r: 0.976, g: 0.659, b: 0.831 },
    tagBg: { r: 0.984, g: 0.812, b: 0.91 },
    tagText: { r: 0.616, g: 0.09, b: 0.302 },
    bar: { r: 0.925, g: 0.286, b: 0.6 },
    barBg: { r: 0.984, g: 0.812, b: 0.91 }
  },
  indigo: {
    bgLight: { r: 0.933, g: 0.949, b: 1 },
    bg: { r: 0.878, g: 0.906, b: 1 },
    text: { r: 0.31, g: 0.275, b: 0.898 },
    border: { r: 0.78, g: 0.824, b: 0.996 },
    tagBg: { r: 0.878, g: 0.906, b: 1 },
    tagText: { r: 0.216, g: 0.188, b: 0.639 },
    bar: { r: 0.31, g: 0.275, b: 0.898 },
    barBg: { r: 0.878, g: 0.906, b: 1 }
  },
  red: {
    bgLight: { r: 0.996, g: 0.949, b: 0.949 },
    bg: { r: 0.996, g: 0.792, b: 0.792 },
    text: { r: 0.937, g: 0.267, b: 0.267 },
    border: { r: 0.988, g: 0.647, b: 0.647 },
    tagBg: { r: 0.996, g: 0.792, b: 0.792 },
    tagText: { r: 0.6, g: 0.106, b: 0.106 },
    bar: { r: 0.937, g: 0.267, b: 0.267 },
    barBg: { r: 0.996, g: 0.792, b: 0.792 }
  },
  teal: {
    bgLight: { r: 0.941, g: 0.992, b: 0.98 },
    bg: { r: 0.8, g: 0.984, b: 0.945 },
    text: { r: 0.078, g: 0.722, b: 0.651 },
    border: { r: 0.6, g: 0.965, b: 0.894 },
    tagBg: { r: 0.8, g: 0.984, b: 0.945 },
    tagText: { r: 0.075, g: 0.306, b: 0.29 },
    bar: { r: 0.078, g: 0.722, b: 0.651 },
    barBg: { r: 0.8, g: 0.984, b: 0.945 }
  }
};


// Common Struction Function
figma.showUI(__html__, { width: 450, height: 300 });

figma.ui.onmessage = async (msg) => {
  await ensureFonts(); // make sure fonts are loaded

  const persona = msg.payload;

  switch (persona.type) {
    case "Classic":
      await renderClassicPersona(persona);
      figma.closePlugin("Success: Classic Persona rendered from token");
      break;
    case "Agile":
      await renderAgilePersona(persona);
      figma.closePlugin("Success: Agile Persona rendered from token");
      break;
    case "JTBD":
      await renderJtbdPersona(persona);
      figma.closePlugin("Success: JTBD Persona rendered from token");
      break;
    case "Empathy":
      await renderEmpathyPersona(persona);
      figma.closePlugin("Success: Empathy Persona rendered from token");
      break;
    default:
      figma.closePlugin("Error: Unknown persona type");
  }
};


function createText(text, fontSize, fontWeight, color, align = "CENTER") {
  const node = figma.createText();
  node.characters = text || "-"; // prevent null/undefined issues
  node.fontSize = fontSize;
  node.fontName = { family: "Inter", style: fontWeight };
  node.fills = [{ type: "SOLID", color }];
  node.textAlignHorizontal = align;
  return node;
}

function createCard(titleText, items = []) {
  const card = figma.createFrame();
  card.layoutMode = "VERTICAL";
  card.counterAxisAlignItems = "MIN";
  card.itemSpacing = 10;
  card.paddingLeft = 16;
  card.paddingRight = 16;
  card.paddingTop = 16;
  card.paddingBottom = 16;
  card.cornerRadius = 10;
  card.fills = [{ type: "SOLID", color: { r: 1, g: 0.933, b: 0.91 } }];
  card.layoutGrow = 1;
  card.minWidth = 439;

  const title = figma.createText();
  title.characters = titleText || "Untitled";
  title.fontSize = 22;
  title.fontName = { family: "Inter", style: "Semi Bold" };
  title.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }];
  card.appendChild(title);

  if (typeof items === "string") {
    const item = figma.createText();
    item.characters = items || "-";
    item.fontSize = 14;
    item.fontName = { family: "Inter", style: "Regular" };
    item.lineHeight = { unit: "PIXELS", value: 20 };
    item.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
    card.appendChild(item);
  } else if (Array.isArray(items)) {
    items.forEach(text => {
      const item = figma.createText();
      item.characters = text || "-";
      item.fontSize = 14;
      item.lineHeight = { unit: "PIXELS", value: 20 };
      item.fontName = { family: "Inter", style: "Regular" };
      item.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
      card.appendChild(item);
    });
  }

  return card;
}
// First Column
async function createFirstColumn(persona) {
  const col = figma.createFrame();
  col.layoutMode = "VERTICAL";
  col.itemSpacing = 48;
  col.paddingLeft = 24;
  col.paddingRight = 24;
  col.paddingTop = 24;
  col.paddingBottom = 24;
  col.fills = [{ type: "SOLID", color: { r: 1, g: 0.933, b: 0.91 } }];
  col.resize(302, 752);
  col.cornerRadius = 10;


  async function createAvatarEllipse(imageUrl) {
    const ellipse = figma.createEllipse();
    ellipse.resize(254, 254);
    ellipse.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    ellipse.strokeWeight = 6;
  
    if (imageUrl) {
      try {
        const imageBytes = await fetch(imageUrl).then(res => res.arrayBuffer());
        const imageHash = figma.createImage(new Uint8Array(imageBytes)).hash;
        ellipse.fills = [{
          type: "IMAGE",
          scaleMode: "FILL",
          imageHash
        }];
      } catch (error) {
        console.error("Failed to load image:", error);
        ellipse.fills = [{ type: "SOLID", color: { r: 1, g: 0.85, b: 0.8 } }];
      }
    } else {
      ellipse.fills = [{ type: "SOLID", color: { r: 1, g: 0.85, b: 0.8 } }];
    }
  
    return ellipse;
  }

  const avatar = await createAvatarEllipse(persona.profile_image_url);
  col.appendChild(avatar);

  const nameTitleBox = figma.createFrame();
  nameTitleBox.layoutMode = "VERTICAL";
  nameTitleBox.primaryAxisAlignItems = "CENTER";

  nameTitleBox.itemSpacing = 8;
  nameTitleBox.paddingLeft = 0;
  nameTitleBox.paddingRight = 0;
  nameTitleBox.layoutAlign = 'STRETCH';
  nameTitleBox.paddingTop = 0;
  nameTitleBox.counterAxisAlignItems = "CENTER"
  nameTitleBox.paddingBottom = 0;
  nameTitleBox.fills = [{ type: "SOLID", color: { r: 1, g: 0.933, b: 0.91 } }]; // #FFEEE8

  const name = createText(persona.name, 32, "Semi Bold", { r: 0.2, g: 0.2, b: 0.2 });
  const title = createText(persona.title, 18, "Semi Bold", { r: 0.77, g: 0, b: 0.03 });

  nameTitleBox.appendChild(name);
  nameTitleBox.appendChild(title);

  const addInfoRow = (label, value) => {
    const row = figma.createText();
    const fullText = `${label} ${value}`;
    row.characters = fullText;
    row.fontSize = 14;
    row.lineHeight = { unit: "PIXELS", value: 20 };

    row.setRangeFontName(0, label.length, { family: "Inter", style: "Semi Bold" });
    row.setRangeFills(0, label.length, [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }]);

    row.setRangeFontName(label.length + 1, fullText.length, { family: "Inter", style: "Regular" });
    row.setRangeFills(label.length + 1, fullText.length, [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }]);
    return row;
  };

  const infoBox = figma.createFrame();
  infoBox.layoutMode = "VERTICAL";
  infoBox.primaryAxisAlignItems = "CENTER";
  infoBox.counterAxisAlignItems = "CENTER"
  infoBox.itemSpacing = 2;
  infoBox.paddingLeft = 16;
  infoBox.paddingRight = 16;
  infoBox.paddingTop = 16;
  infoBox.paddingBottom = 16;
  infoBox.cornerRadius = 10;
  infoBox.fills = [{ type: "SOLID", color: { r: 1, g: 0.86, b: 0.79 } }];
  infoBox.minWidth = 254;


  infoBox.appendChild(addInfoRow("Location", persona.location));
  infoBox.appendChild(addInfoRow("Generation", persona.generation));
  infoBox.appendChild(addInfoRow("Status", persona.status));
  infoBox.appendChild(addInfoRow("Income", persona.income));

  col.appendChild(avatar);
  col.appendChild(nameTitleBox);
  col.appendChild(infoBox);

  return col;
}


function createCard(titleText, items = []) {
  const card = figma.createFrame();
  card.layoutMode = "VERTICAL";
  card.counterAxisAlignItems = "MIN";
  card.itemSpacing = 10;
  card.paddingLeft = 16;
  card.paddingRight = 16;
  card.paddingTop = 16;
  card.paddingBottom = 16;
  card.cornerRadius = 10;
  card.fills = [{ type: "SOLID", color: { r: 1, g: 0.933, b: 0.91 } }];
  card.layoutGrow = 1;
  card.minWidth = 439;

  const title = figma.createText();
  title.characters = titleText;
  title.fontSize = 22;
  title.fontName = { family: "Inter", style: "Semi Bold" };
  title.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }];

  card.appendChild(title);

  items.forEach(text => {
    const item = figma.createText();
    item.characters = text || "-";
    item.fontSize = 14;
    item.lineHeight = { unit: "PIXELS", value: 20 };
    item.fontName = { family: "Inter", style: "Regular" };
    item.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
    card.appendChild(item);
  });

  return card;
}

function ensureFonts() {
  return Promise.all([
    figma.loadFontAsync({ family: "Inter", style: "Regular" }),
    figma.loadFontAsync({ family: "Inter", style: "Semi Bold" }),
    figma.loadFontAsync({ family: "Inter", style: "Light" })
  ]);
}

function createSlider(label, percent) {
  const wrap = figma.createFrame();
  wrap.layoutMode = "VERTICAL";
  wrap.itemSpacing = 4;
  wrap.counterAxisAlignItems = "MIN";
  wrap.fills = [{ type: "SOLID", color: { r: 1, g: 0.933, b: 0.91 } }];
  wrap.counterAxisSizingMode = 'AUTO';

  const lbl = figma.createText();
  lbl.characters = label;
  lbl.fontSize = 14;
  lbl.fontName = { family: "Inter", style: "Regular" };
  lbl.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }];

  const track = figma.createFrame();
  track.resize(390, 8);
  track.fills = [{ type: "SOLID", color: { r: 1, g: 0.866, b: 0.831 } }];
  track.cornerRadius = 4;
  track.counterAxisSizingMode = 'AUTO';

  const fill = figma.createRectangle();
  fill.resize(390 * percent, 8);
  fill.fills = [{ type: "SOLID", color: { r: 0.78, g: 0, b: 0.06 } }];
  fill.cornerRadius = 4;

  track.appendChild(fill);
  wrap.appendChild(lbl);
  wrap.appendChild(track);
  return wrap;
}

function createPersonalityCard(data) {
  const card = createCard("Personality");
  Object.entries(data).forEach(([trait, value]) => {
    const slider = createSlider(trait, value / 100);
    card.appendChild(slider);
  });
  return card;
}

function createMotivationsCard(motivations) {
  const card = createCard("Motivations");
  Object.entries(motivations).forEach(([label, value]) => {
    const slider = createSlider(label, value / 100);
    card.appendChild(slider);
  });
  return card;
}
//Classic//

async function renderClassicPersona(persona) {
  function createSecondColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.primaryAxisAlignItems = "MIN";
    col.itemSpacing = 24;
    col.paddingLeft = 0;
    col.paddingRight = 0;
    col.paddingTop = 0;
    col.paddingBottom = 0;
    col.resize(439, 752);

    // Background
    const background = Array.isArray(persona.background)
      ? persona.background
      : [persona.background || "Not provided"];
    col.appendChild(createCard("Background", background));

    // Personality
    col.appendChild(createPersonalityCard(persona.personality || {}));

    // Behavior Tags
    if (persona.behaviorTags && Array.isArray(persona.behaviorTags)) {
      const card = figma.createFrame();
      card.layoutMode = "VERTICAL";
      card.counterAxisAlignItems = "MIN";
      card.itemSpacing = 10;
      card.paddingLeft = 16;
      card.paddingRight = 16;
      card.paddingTop = 16;
      card.paddingBottom = 16;
      card.cornerRadius = 10;
      card.fills = [{ type: "SOLID", color: { r: 1, g: 0.933, b: 0.91 } }];
      card.layoutGrow = 1;
      card.minWidth = 439;

      const title = figma.createText();
      title.characters = "Behavior Tags";
      title.fontSize = 22;
      title.fontName = { family: "Inter", style: "Semi Bold" };
      title.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }];
      card.appendChild(title);

      const tagWrap = figma.createFrame();
      tagWrap.layoutMode = "HORIZONTAL";
      tagWrap.layoutWrap = "WRAP";
      tagWrap.itemSpacing = 8;
      tagWrap.fills = [];

      persona.behaviorTags.forEach(tag => {
        const pill = figma.createFrame();
        pill.layoutMode = "HORIZONTAL";
        pill.paddingLeft = 12;
        pill.paddingRight = 12;
        pill.paddingTop = 4;
        pill.paddingBottom = 4;
        pill.cornerRadius = 15;
        pill.fills = [{ type: "SOLID", color: { r: 1, g: 0.9, b: 0.95 } }];

        const pillText = figma.createText();
        pillText.characters = tag;
        pillText.fontSize = 12;
        pillText.fontName = { family: "Inter", style: "Regular" };
        pillText.fills = [{ type: "SOLID", color: { r: 0.7, g: 0.1, b: 0.4 } }];

        pill.appendChild(pillText);
        tagWrap.appendChild(pill);
      });

      card.appendChild(tagWrap);
      col.appendChild(card);
    }

    // Pain Points
    const painPoints = Array.isArray(persona.painPoints)
      ? persona.painPoints
      : [persona.painPoints || "Not provided"];
    col.appendChild(createCard("Pain Points", painPoints));

    return col;
  }

  function createThirdColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.primaryAxisAlignItems = "MIN";
    col.itemSpacing = 24;
    col.paddingLeft = 0;
    col.paddingRight = 0;
    col.paddingTop = 0;
    col.paddingBottom = 0;
    col.resize(439, 752);

    // Motivations
    col.appendChild(createMotivationsCard(persona.motivations || {}));

    // Goals
    const goals = Array.isArray(persona.goals)
      ? persona.goals
      : [persona.goals || "Not provided"];
    col.appendChild(createCard("Goals", goals));

    // Favourite Brands
    if (persona.favouriteBrands && Array.isArray(persona.favouriteBrands)) {
      const card = createCard("Favourite Brands");
      const wrap = figma.createFrame();
      wrap.layoutMode = "HORIZONTAL";
      wrap.layoutWrap = "WRAP";
      wrap.itemSpacing = 8;
      wrap.counterAxisAlignItems = "CENTER";
      wrap.fills = [];

      persona.favouriteBrands.forEach(brand => {
        const tag = figma.createFrame();
        tag.layoutMode = "HORIZONTAL";
        tag.paddingLeft = 12;
        tag.paddingRight = 12;
        tag.paddingTop = 4;
        tag.paddingBottom = 4;
        tag.cornerRadius = 100;
        tag.fills = [{ type: "SOLID", color: { r: 0.89, g: 0.95, b: 1 } }];

        const txt = figma.createText();
        txt.characters = brand;
        txt.fontSize = 12;
        txt.fontName = { family: "Inter", style: "Regular" };
        txt.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.3, b: 0.8 } }];

        tag.appendChild(txt);
        wrap.appendChild(tag);
      });

      card.appendChild(wrap);
      col.appendChild(card);
    }

    return col;
  }

  const main = figma.createFrame();
  main.name = "Classic Persona";
  main.layoutMode = "HORIZONTAL";
  main.counterAxisAlignItems = "MIN";
  main.itemSpacing = 32;
  main.paddingLeft = 40;
  main.paddingRight = 40;
  main.paddingTop = 40;
  main.paddingBottom = 40;
  main.resize(1308, 831);
  main.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  main.cornerRadius = 20;

  const left = await createFirstColumn(persona);
  const middle = createSecondColumn(persona);
  const right = createThirdColumn(persona);

  main.appendChild(left);
  main.appendChild(middle);
  main.appendChild(right);

  figma.currentPage.appendChild(main);
}

async function renderAgilePersona(persona) {
  function createBrandsCard(brands) {
    const card = createCard("Favourite Brands");
    const wrap = figma.createFrame();
    wrap.layoutMode = "HORIZONTAL";
    wrap.layoutWrap = "WRAP";
    wrap.itemSpacing = 8;
    wrap.counterAxisAlignItems = "CENTER";
    wrap.fills = [];

    brands.forEach(brand => {
      const tag = figma.createFrame();
      tag.layoutMode = "HORIZONTAL";
      tag.paddingLeft = 12;
      tag.paddingRight = 12;
      tag.paddingTop = 4;
      tag.paddingBottom = 4;
      tag.cornerRadius = 100;
      tag.fills = [{ type: "SOLID", color: { r: 0.89, g: 0.95, b: 1 } }];

      const txt = figma.createText();
      txt.characters = brand;
      txt.fontSize = 12;
      txt.fontName = { family: "Inter", style: "Regular" };
      txt.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.3, b: 0.8 } }];

      tag.appendChild(txt);
      wrap.appendChild(tag);
    });

    card.appendChild(wrap);
    return card;
  }

  function createSecondColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    const goals = Array.isArray(persona.goals) ? persona.goals : [persona.goals || "Not provided"];
    const painPoints = Array.isArray(persona.painPoints) ? persona.painPoints : [persona.painPoints || "Not provided"];

    col.appendChild(createCard("Goals", goals));
    col.appendChild(createCard("Pain Points", painPoints));

    return col;
  }

  function createThirdColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    const brands = Array.isArray(persona.tools) ? persona.tools : [persona.tools || "Not provided"];
    col.appendChild(createBrandsCard(brands));

    return col;
  }

  const main = figma.createFrame();
  main.name = "Agile Persona";
  main.layoutMode = "HORIZONTAL";
  main.itemSpacing = 32;
  main.paddingLeft = 40;
  main.paddingRight = 40;
  main.paddingTop = 40;
  main.paddingBottom = 40;
  main.resize(1308, 831);
  main.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  main.cornerRadius = 20;

  const left = await createFirstColumn(persona);
  const middle = createSecondColumn(persona);
  const right = createThirdColumn(persona);

  main.appendChild(left);
  main.appendChild(middle);
  main.appendChild(right);

  figma.currentPage.appendChild(main);
}


async function renderJtbdPersona(persona) {
  function createBrandsCard(brands) {
    const card = createCard("Favourite Brands");
    const wrap = figma.createFrame();
    wrap.layoutMode = "HORIZONTAL";
    wrap.layoutWrap = "WRAP";
    wrap.itemSpacing = 8;
    wrap.counterAxisAlignItems = "CENTER";
    wrap.fills = [];

    brands.forEach(brand => {
      const tag = figma.createFrame();
      tag.layoutMode = "HORIZONTAL";
      tag.paddingLeft = 12;
      tag.paddingRight = 12;
      tag.paddingTop = 4;
      tag.paddingBottom = 4;
      tag.cornerRadius = 100;
      tag.fills = [{ type: "SOLID", color: { r: 1, g: 0.9, b: 0.95 } }];

      const txt = figma.createText();
      txt.characters = brand;
      txt.fontSize = 12;
      txt.fontName = { family: "Inter", style: "Regular" };
      txt.fills = [{ type: "SOLID", color: { r: 0.7, g: 0.1, b: 0.4 } }];

      tag.appendChild(txt);
      wrap.appendChild(tag);
    });

    card.appendChild(wrap);
    return card;
  }

  function createSecondColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    const goals = Array.isArray(persona.goals_jtbd) ? persona.goals_jtbd : [persona.goals_jtbd || "Not provided"];
    const scenarios = Array.isArray(persona.scenarios) ? persona.scenarios : [persona.scenarios || "Not provided"];

    col.appendChild(createCard("Goals (JTBD)", goals));
    col.appendChild(createCard("Scenarios", scenarios));

    return col;
  }

  function createThirdColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    col.appendChild(createMotivationsCard(persona.motivations || {}));

    const brands = Array.isArray(persona.tools) ? persona.tools : [persona.tools || "Not provided"];
    col.appendChild(createBrandsCard(brands));

    return col;
  }

  const main = figma.createFrame();
  main.name = "JTBD Persona";
  main.layoutMode = "HORIZONTAL";
  main.itemSpacing = 32;
  main.paddingLeft = 40;
  main.paddingRight = 40;
  main.paddingTop = 40;
  main.paddingBottom = 40;
  main.resize(1308, 831);
  main.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  main.cornerRadius = 20;

  const left = await createFirstColumn(persona);
  const middle = createSecondColumn(persona);
  const right = createThirdColumn(persona);

  main.appendChild(left);
  main.appendChild(middle);
  main.appendChild(right);

  figma.currentPage.appendChild(main);
}



async function renderEmpathyPersona(persona) {
  function createTagPill(text) {
    const pillFrame = figma.createFrame();
    pillFrame.layoutMode = "HORIZONTAL";
    pillFrame.counterAxisAlignItems = "CENTER";
    pillFrame.itemSpacing = 0;
    pillFrame.paddingLeft = 12;
    pillFrame.paddingRight = 12;
    pillFrame.paddingTop = 4;
    pillFrame.paddingBottom = 4;
    pillFrame.cornerRadius = 100;
    pillFrame.fills = [{ type: "SOLID", color: { r: 1, g: 0.9, b: 0.95 } }];

    const pillText = figma.createText();
    pillText.characters = text;
    pillText.fontSize = 12;
    pillText.fontName = { family: "Inter", style: "Regular" };
    pillText.fills = [{ type: "SOLID", color: { r: 0.7, g: 0.1, b: 0.4 } }];

    pillFrame.appendChild(pillText);
    return pillFrame;
  }

  function createBehaviorTagsCard(tags) {
    const card = createCard("Behavior Tags");
    const tagWrap = figma.createFrame();
    tagWrap.layoutMode = "HORIZONTAL";
    tagWrap.layoutWrap = "WRAP";
    tagWrap.itemSpacing = 8;
    tagWrap.fills = [];

    tags.forEach(tag => {
      const pill = createTagPill(tag);
      tagWrap.appendChild(pill);
    });

    card.appendChild(tagWrap);
    return card;
  }

  function createSecondColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    const background = Array.isArray(persona.background) ? persona.background : [persona.background || "Not provided"];
    col.appendChild(createCard("Background", background));

    if (Array.isArray(persona.behaviorTags)) {
      col.appendChild(createBehaviorTagsCard(persona.behaviorTags));
    }

    col.appendChild(createPersonalityCard(persona.personality || {}));

    return col;
  }

  function createThirdColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    const painPoints = Array.isArray(persona.painPoints) ? persona.painPoints : [persona.painPoints || "Not provided"];
    col.appendChild(createCard("Pain Points", painPoints));

    col.appendChild(createMotivationsCard(persona.motivations || {}));

    const scenarios = Array.isArray(persona.scenarios) ? persona.scenarios : [persona.scenarios || "Not provided"];
    col.appendChild(createCard("Scenarios", scenarios));

    return col;
  }

  const main = figma.createFrame();
  main.name = "Empathy Persona";
  main.layoutMode = "HORIZONTAL";
  main.itemSpacing = 32;
  main.paddingLeft = 40;
  main.paddingRight = 40;
  main.paddingTop = 40;
  main.paddingBottom = 40;
  main.resize(1308, 831);
  main.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  main.cornerRadius = 20;

  const left = await createFirstColumn(persona);
  const middle = createSecondColumn(persona);
  const right = createThirdColumn(persona);

  main.appendChild(left);
  main.appendChild(middle);
  main.appendChild(right);

  figma.currentPage.appendChild(main);
}

/*

(async () => {
  await ensureFonts();

  const persona = {
    "name": "Jordan James",
    "title": "Researcher",
    "type": "Classic",
    "location": "California",
    "generation": "Gen Z / 20 years",
    "status": "Single • No kids",
    "income": "Average (+13%)",
    "background": [
      "Moved to California",
      "Instagram influencer (12k followers)",
      "Cares about sustainability and wellness"
    ],
    "personality": {
      "Introvert": 60,
      "Intuition": 85,
      "Feeling": 50,
      "Perceiving": 95
    },
    "behaviorTags": ["Task Switcher (3–5 apps open at all times)", "Tech Skeptic (relies on email despite knowing better)", "Social Media Minimalist (LinkedIn only for networking)", "Last-Minute Innovator (best work under deadlines)"],
    "goals": [
      "Promote wellness and eco-friendly products",
      "Engage Gen Z audiences",
      "Stay authentic in brand partnerships"
    ],
    "painPoints": [
      "Overwhelmed by content scheduling",
      "Difficulty finding ethical sponsors",
      "Struggles with platform changes"
    ],
    "tools": ["Instagram", "Canva", "Notion", "InShot"],
    "motivations": {
      "Creativity": 90,
      "Growth": 80,
      "Stability": 60,
      "Recognition": 70
    },
    "scenario": "Jordan checks her favorite wellness app every morning and posts a quick update to her audience before starting her college day."
  };


  /*
  
    const persona = {
      "name": "Alex Rivera",
      "title": "Freelance Graphic Designer",
      "type": "Empathy",
      "location": "Portland, OR",
      "archetype": "The Balancing Act",
      "status": "Living with roommate • Part-time worker",
      "background": [
        "Raised in a bilingual household",
        "Moved from Texas to Portland for design opportunities",
        "Enjoys nature and practices mindful journaling"
      ],
      "behaviorTags": [
        "Journals emotions daily",
        "Uses social media to inspire others",
        "Prefers face-to-face over text communication",
        "Shops based on emotional connection to brand"
      ],
      "personality": {
        "Introvert": 75,
        "Intuition": 68,
        "Feeling": 90,
        "Perceiving": 65
      },
      "painPoints": [
        "Feels overwhelmed by too many choices",
        "Struggles with client feedback emotionally",
        "Has difficulty balancing personal and client needs"
      ],
      "motivations": {
        "Empathy": 95,
        "Creativity": 80,
        "Connection": 85,
        "Freedom": 70
      },
      "scenario": [
        "Alex browses community forums in the morning to feel emotionally connected.",
        "She updates her moodboard while sipping tea and reflecting on yesterday's work.",
        "Before starting client tasks, she meditates for 5 minutes to set emotional tone."
      ]
    }*/

  /*
    const persona = {
      "name": "Alex Rivera",
      "title": "Marketing Manager",
      "type": "Agile",
      "location": "Remote, originally from Austin, TX",
      "generation": "Millennial / 32 years",
      "status": "Overwhelmed but adaptive",
      "income": "$85,000/year",
      "goals": [
        "Streamline workflows to reduce context-switching fatigue",
        "Maintain brand consistency across 5+ platforms",
        "Stay ahead of emerging trends without deep dives",
        "Avoid burnout while meeting quarterly KPIs"
      ],
      "painPoints": [
        "Fragmented tools create duplicate work (e.g., manual data entry between CRM and analytics)",
        "Creativity stifled by 'good enough' templates that don't reflect brand voice",
        "Decision fatigue from choosing between 10+ analytics platforms",
        "Fear of adopting new tools that require retraining teams"
      ],
      "favouriteBrands": [
        "Slack (for urgent comms)",
        "Trello (overloaded with half-finished boards)",
        "Google Analytics (used only for basic reports)",
        "Canva (for quick edits, but resists advanced features)",
        "Zoom (with unused breakout room features)"
      ]
    }
  
  
  

  const persona = {
    "name": "Alex Rivera",
    "title": "Freelance Content Creator",
    "type": "JTBD",
    "location": "Austin, TX",
    "archetype": "The Juggler",
    "goals": [
      "I need to prioritize tasks to meet multiple client deadlines without burning out.",
      "I want to maintain creative quality while adhering to client constraints.",
      "I need a way to track time effectively to invoice accurately but without micromanaging."
    ],
    "scenario": [
      "Struggling to say 'no' to new projects, leading to overcommitment.",
      "Spending hours refining a project detail because it 'feels right,' then missing the deadline.",
      "Avoiding client calls to dodge potential scope changes but then facing dissatisfaction later."
    ],
    "motivations": {
      "Autonomy": 95,
      "Efficiency": 85,
      "Creativity": 92,
      "Social_validation": 75,
      "Financial_stability": 80
    },
    "favouriteBrands": [
      "Trello",
      "Adobe Creative Cloud",
      "Slack",
      "RescueTime (used inconsistently)",
      "Avoids Asana due to perceived complexity"
    ]

    
;


  switch (persona.type) {
    case "Classic":
      await renderClassicPersona(persona);
      figma.closePlugin("Success: Classic Persona rendered");
      break;
    case "Agile":
      await renderAgilePersona(persona);
      figma.closePlugin("Success: Agile Persona rendered");
      break;
    case "JTBD":
      await renderJtbdPersona(persona);
      figma.closePlugin("Success: JTBD Persona rendered");
      break;
    case "Empathy":
      await renderEmpathyPersona(persona);
      figma.closePlugin("Success: Empathy Persona rendered");
      break;
    default:
      figma.closePlugin("Error: Unknown persona type");
  }
})();*/