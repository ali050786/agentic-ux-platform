const BASE_URL = "http://localhost:8000/api"

export async function generatePersona(data) {
  const response = await fetch(`${BASE_URL}/define/persona`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Persona generation failed: ${error}`)
  }

  return await response.json()
}
