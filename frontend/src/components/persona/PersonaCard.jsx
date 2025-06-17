import PersonaCardClassic from "./PersonaCardClassic"
import PersonaCardAgile from "./PersonaCardAgile"
import PersonaCardJTBD from "./PersonaCardJTBD"
import PersonaCardEmpathy from "./PersonaCardEmpathy"
import React from "react";

const PersonaCard = React.forwardRef(function PersonaCard({ data, colorTheme }, ref) {
  if (!data || !data.type) return null

  switch (data.type) {
    case "Classic":
      return <PersonaCardClassic data={data} ref={ref} colorTheme={colorTheme} />
    case "Agile":
      return <PersonaCardAgile data={data} ref={ref} colorTheme={colorTheme} />
    case "JTBD":
      return <PersonaCardJTBD data={data} ref={ref} colorTheme={colorTheme} />
    case "Empathy":
      return <PersonaCardEmpathy data={data} ref={ref} colorTheme={colorTheme} />
    default:
      return <p className="text-red-500">Unknown persona type</p>
  }
});

export default PersonaCard;