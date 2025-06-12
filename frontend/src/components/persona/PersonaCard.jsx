import PersonaCardClassic from "./PersonaCardClassic"
import PersonaCardAgile from "./PersonaCardAgile"
import PersonaCardJTBD from "./PersonaCardJTBD"
import PersonaCardEmpathy from "./PersonaCardEmpathy"
import React from "react";

const PersonaCard = React.forwardRef(function PersonaCard({ data }, ref) {
  if (!data || !data.type) return null

  switch (data.type) {
    case "Classic":
      return <PersonaCardClassic data={data} ref={ref} />
    case "Agile":
      return <PersonaCardAgile data={data} ref={ref} />
    case "JTBD":
      return <PersonaCardJTBD data={data} ref={ref} />
    case "Empathy":
      return <PersonaCardEmpathy data={data} ref={ref} />
    default:
      return <p className="text-red-500">Unknown persona type</p>
  }
});

export default PersonaCard;