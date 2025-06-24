// /api/ping.js

export const config = {
  schedule: '*/5 * * * *', // Runs every 5 minutes
};

export default async function handler(req, res) {
  try {
    const backendURL = 'https://agentic-ux-platform.onrender.com/api/export/public/persona/c422MXo8-9vPRQHX';
    const response = await fetch(backendURL);
    const text = await response.text();
    res.status(200).json({ ok: true, text });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}
