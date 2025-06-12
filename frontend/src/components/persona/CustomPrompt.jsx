import { Textarea } from "../ui/textarea"

export default function CustomPrompt() {
  return (
    <div className="mt-4">
      <label className="text-sm font-medium block mb-1">Add Custom Prompt</label>
      <Textarea className="w-full" placeholder="Write any extra details for the AI agent..." />
    </div>
  )
}
