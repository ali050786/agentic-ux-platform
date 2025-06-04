import { useState } from "react"
import TagInput from "./TagInput"
import FileUpload from "./FileUpload"
import CustomPrompt from "./CustomPrompt"

export default function PersonaForm({ onGenerate, loading }) {
  const [type, setType] = useState("Classic")
  const [project, setProject] = useState("")
  const [role, setRole] = useState("")
  const [context, setContext] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate({
      persona_type: type,
      project_name: project,
      target_user_role: role,
      product_context: context
    })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm p-3 rounded-md">
        💡 <strong>Pro Tip:</strong> Start with basic info, then use AI assist to expand each section. You can always edit!
      </div>

      <label className="block">
        <span className="text-sm font-medium">Select Persona Type</span>
        <select
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Classic">Classic</option>
          <option value="Agile">Agile</option>
          <option value="JTBD">JTBD</option>
          <option value="Empathy">Empathy</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium">Project Name</span>
        <input
          type="text"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          placeholder="e.g., QuickEats Food Delivery App"
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Target User Role</span>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g., College student, Working mother"
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Product Context</span>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g., Ordering groceries online..."
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>

      <button
        type="button"
        className="text-sm text-purple-600"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {showAdvanced ? "Hide" : "Show"} Advanced Options
      </button>

      {showAdvanced && (
        <>
          <TagInput label="Behavior Traits" placeholder="e.g., Tech-savvy, Budget-conscious" tagColor="blue" />
          <TagInput label="Pain Points" placeholder="e.g., Slow delivery, Hidden fees" tagColor="red" />
          <TagInput label="Goals" placeholder="e.g., Order in under 2 mins" tagColor="green" />
        </>
      )}

      <FileUpload />
      <CustomPrompt />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 rounded-md"
      >
        {loading ? "Generating..." : "⚡ Generate Persona"}
      </button>
    </form>
  )
}
