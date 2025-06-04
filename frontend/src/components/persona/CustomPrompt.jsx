export default function CustomPrompt() {
  return (
    <div className="mt-4">
      <label className="text-sm font-medium block mb-1">Add Custom Prompt</label>
      <textarea className="w-full rounded-md border-gray-300 shadow-sm" placeholder="Write any extra details for the AI agent..." />
    </div>
  )
}
