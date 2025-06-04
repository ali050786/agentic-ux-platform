import PersonaCardClassic from "./PersonaCardClassic"
import PersonaCardAgile from "./PersonaCardAgile"
import PersonaCardJTBD from "./PersonaCardJTBD"
import PersonaCardEmpathy from "./PersonaCardEmpathy"

export default function PersonaCard({ data }) {
  if (!data || !data.type) return null

  switch (data.type) {
    case "Classic":
      return <PersonaCardClassic data={data} />
    case "Agile":
      return <PersonaCardAgile data={data} />
    case "JTBD":
      return <PersonaCardJTBD data={data} />
    case "Empathy":
      return <PersonaCardEmpathy data={data} />
    default:
      return <p className="text-red-500">Unknown persona type</p>
  }
}