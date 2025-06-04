export default function FileUpload() {
  return (
    <div className="mt-4">
      <label className="text-sm font-medium block mb-1">Upload Research Data</label>
      <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:border-0 file:text-sm file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200" />
    </div>
  )
}
