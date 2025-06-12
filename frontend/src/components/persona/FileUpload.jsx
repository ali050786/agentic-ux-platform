import { Input } from "../ui/input"

export default function FileUpload() {
  return (
    <div className="mt-4">
      <label className="text-sm font-medium block mb-1">Upload Research Data</label>
      <Input type="file" className="w-full" />
    </div>
  )
}
