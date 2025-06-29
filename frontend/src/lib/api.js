const BASE_URL = process.env.REACT_APP_BACKEND_API

export async function generatePersona(data, token) {
  const headers = {
    "Content-Type": "application/json"
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${BASE_URL}/define/persona`, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Persona generation failed: ${error}`);
  }

  return await response.json();
}

export async function listSavedPersonas(token) {
  const response = await fetch(`${BASE_URL}/export/persona/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!response.ok) {
    throw new Error(await response.text())
  }
  return await response.json()
}

export async function getSavedPersona(id, token) {
  const response = await fetch(`${BASE_URL}/export/persona/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!response.ok) {
    throw new Error(await response.text())
  }
  return await response.json()
}

export async function deleteSavedPersona(id, token) {
  const response = await fetch(`${BASE_URL}/export/persona/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!response.ok) {
    throw new Error(await response.text())
  }
  return await response.json()
}

export async function pollPersonaStatus(id) {
  const response = await fetch(`${BASE_URL}/define/persona/status/${id}`);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.json();
}

export async function updatePersonaTheme(personaId, theme, token) {
  const response = await fetch(`${BASE_URL}/export/persona/${personaId}/theme`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ theme }),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.json();
}
