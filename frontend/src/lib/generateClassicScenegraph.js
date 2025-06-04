export function generateClassicScenegraph(data) {
  return {
    type: "FRAME",
    name: "Classic Persona Card",
    layoutMode: "VERTICAL",
    padding: 24,
    itemSpacing: 16,
    background: "#FFFFFF",
    children: [
      {
        type: "ELLIPSE",
        name: "Avatar",
        size: 120,
        fill: "#FFE0E0",
        stroke: "#FFFFFF",
        strokeWidth: 4
      },
      {
        type: "TEXT",
        name: "Name",
        characters: data.name,
        fontSize: 20,
        fontWeight: "bold",
        fill: "#111827"
      },
      {
        type: "TEXT",
        name: "Title",
        characters: data.title,
        fontSize: 16,
        fill: "#6B7280"
      },
      {
        type: "FRAME",
        name: "Basic Info",
        layoutMode: "VERTICAL",
        itemSpacing: 4,
        background: "#FEE2E2",
        padding: 12,
        children: [
          { type: "TEXT", characters: `Location: ${data.location}` },
          { type: "TEXT", characters: `Generation: ${data.generation}` },
          { type: "TEXT", characters: `Status: ${data.status}` },
          { type: "TEXT", characters: `Income: ${data.income}` }
        ]
      },
      {
        type: "FRAME",
        name: "Background",
        layoutMode: "VERTICAL",
        itemSpacing: 4,
        children: data.background.map(item => ({
          type: "TEXT",
          characters: `• ${item}`
        }))
      },
      {
        type: "FRAME",
        name: "Goals",
        layoutMode: "VERTICAL",
        itemSpacing: 4,
        children: data.goals.map(item => ({
          type: "TEXT",
          characters: `• ${item}`
        }))
      },
      {
        type: "FRAME",
        name: "Pain Points",
        layoutMode: "VERTICAL",
        itemSpacing: 4,
        children: data.painPoints.map(item => ({
          type: "TEXT",
          characters: `• ${item}`
        }))
      },
      {
        type: "FRAME",
        name: "Behaviour Tags",
        layoutMode: "HORIZONTAL",
        itemSpacing: 6,
        children: data.behaviorTags.map(tag => ({
          type: "TEXT",
          characters: tag,
          fontSize: 12,
          fill: "#EF4444",
          background: "#FECACA",
          padding: 6,
          cornerRadius: 8
        }))
      },
      {
        type: "FRAME",
        name: "Favourite Brands",
        layoutMode: "HORIZONTAL",
        itemSpacing: 6,
        children: data.tools.map(tool => ({
          type: "TEXT",
          characters: tool,
          fontSize: 12,
          fill: "#374151",
          background: "#E5E7EB",
          padding: 6,
          cornerRadius: 8
        }))
      },
      {
        type: "FRAME",
        name: "Motivations",
        layoutMode: "VERTICAL",
        itemSpacing: 6,
        children: Object.entries(data.motivations).map(([label, value]) => ({
          type: "FRAME",
          layoutMode: "VERTICAL",
          children: [
            { type: "TEXT", characters: label },
            {
              type: "RECTANGLE",
              width: 200,
              height: 8,
              fill: "#10B981",
              widthPercent: value
            }
          ]
        }))
      },
      {
        type: "FRAME",
        name: "Personality",
        layoutMode: "VERTICAL",
        itemSpacing: 6,
        children: Object.entries(data.personality).map(([label, value]) => ({
          type: "FRAME",
          layoutMode: "VERTICAL",
          children: [
            { type: "TEXT", characters: label },
            {
              type: "RECTANGLE",
              width: 200,
              height: 8,
              fill: "#6366F1",
              widthPercent: value
            }
          ]
        }))
      }
    ]
  }
}
