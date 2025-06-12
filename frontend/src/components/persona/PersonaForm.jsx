import { useState } from "react"
import TagInput from "./TagInput"
import FileUpload from "./FileUpload"
import CustomPrompt from "./CustomPrompt"
import { Input } from "../ui/input"
import { Select } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Accordion, AccordionItem } from "../ui/accordion"
import { Lightbulb, Zap } from "lucide-react"
import { ProTip } from "../ui/ProTip"

export default function PersonaForm({ onGenerate, loading }) {
  const [type, setType] = useState("Classic")
  const [project, setProject] = useState("")
  const [role, setRole] = useState("")
  const [context, setContext] = useState("")
  const [location, setLocation] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate({
      persona_type: type,
      project_name: project,
      target_user_role: role,
      product_context: context,
      location: location
    })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      
      <ProTip>Start with basic info, then use AI assist to expand each section. You can always edit!</ProTip>

      <Accordion>
        <AccordionItem title="Select Persona Type" defaultOpen>
          <Select
            options={[
              { value: "Classic", label: "Classic" },
              { value: "Agile", label: "Agile" },
              { value: "JTBD", label: "JTBD" },
              { value: "Empathy", label: "Empathy" },
            ]}
            value={type}
            onChange={e => setType(e.target.value)}
            className="mt-1"
          />
        </AccordionItem>
        
      </Accordion>

      <label className="block">
        <span className="text-sm font-medium">Project Name</span>
        <Input
          type="text"
          value={project}
          onChange={e => setProject(e.target.value)}
          placeholder="e.g., QuickEats Food Delivery App"
          className="mt-1"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Target User Role</span>
        <Input
          type="text"
          value={role}
          onChange={e => setRole(e.target.value)}
          placeholder="e.g., College student, Working mother"
          className="mt-1"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Product Context</span>
        <Textarea
          value={context}
          onChange={e => setContext(e.target.value)}
          placeholder="e.g., Ordering groceries online..."
          className="mt-1"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Location</span>
        <Input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="e.g., New York, Remote, US, Europe"
          className="mt-1"
        />
      </label>
      {/*
      <AccordionItem title="Advanced Options">
        <TagInput label="Behavior Traits" placeholder="e.g., Tech-savvy, Budget-conscious" tagColor="blue" />
        <TagInput label="Pain Points" placeholder="e.g., Slow delivery, Hidden fees" tagColor="red" />
        <TagInput label="Goals" placeholder="e.g., Order in under 2 mins" tagColor="green" />
      </AccordionItem>
      <AccordionItem title="Upload Research Data">
        <FileUpload />
      </AccordionItem>
      <AccordionItem title="Add Custom Prompt">
        <CustomPrompt />
      </AccordionItem>
      */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 rounded-md"
      >
        {loading ? <><Zap className="inline w-4 h-4 mr-1 text-yellow-500" /> Generating...</> : <><Zap className="inline w-4 h-4 mr-1 text-yellow-500" /> Generate Persona</>}
      </button>
    </form>
  )
}
