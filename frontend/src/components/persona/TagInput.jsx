import { useState } from "react"
import { Input } from "../ui/input"

export default function TagInput({ label, placeholder, tagColor }) {
  const [tags, setTags] = useState([])
  const [input, setInput] = useState("")

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault()
      setTags([...tags, input.trim()])
      setInput("")
    }
  }

  return (
    <div>
      <label className="text-sm font-medium block mb-1">{label}</label>
      <div className="flex flex-wrap gap-2 mb-1">
        {tags.map((tag, i) => (
          <span key={i} className={`px-2 py-1 rounded-full text-xs bg-${tagColor}-100 text-${tagColor}-700`}>
            {tag}
          </span>
        ))}
      </div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  )
}
