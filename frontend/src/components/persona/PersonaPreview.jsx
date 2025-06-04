import PersonaCard from "./PersonaCard"
import {
  copyToFigmaClipboard
} from "../../lib/figmaExport"

const figmetaBase64 = "eyJwYXN0ZUlkIjogImNsYXNzaWMtcGVyc29uYS1leHBvcnQiLCAiZmlsZUtleSI6ICJVWEwtZmlnbWEtZHluYW1pYy1leHBvcnQiLCAidHlwZSI6ICJDTElQQk9BUkRfQ09QWSIsICJ2ZXJzaW9uIjogIjEuMCJ9";

const figmaBinaryBase64 = "ZmlnLWZha2UtYmluYXJ5LWRhdGEtZm9yLWNsYXNzaWMtcGVyc29uYQ=="; // placeholder

export default function PersonaPreview({ persona, loading }) {
  const handleFigmaExport = () => {
    copyToFigmaClipboard(figmetaBase64, figmaBinaryBase64)
  }

  if (loading) {
    return <p className="text-center text-gray-400">Generating persona...</p>
  }

  if (!persona) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <div className="text-5xl mb-4">👤</div>
        <h2 className="text-xl font-semibold">Ready to create a persona</h2>
        <p className="text-sm text-gray-400 mt-1">Fill out the form to generate your user persona</p>
      </div>
    )
  }

  return (
    <div className="mt-4">
      <PersonaCard data={persona} />
      <button
        onClick={handleFigmaExport}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        📋 Copy to Figma
      </button>
    </div>
  )
}
