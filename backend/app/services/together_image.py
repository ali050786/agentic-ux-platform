import os
import requests

def generate_stability_image(prompt: str, filename: str = "stability_image.jpeg"):
    api_key = os.getenv("STABILITY_API_KEY")
    if not api_key:
        return None
    url = "https://api.stability.ai/v2beta/stable-image/generate/sd3"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "accept": "image/*",
        "Content-Type": "application/json"
    }
    data = {
        "prompt": prompt,
        "output_format": "jpeg",
        "width": 256,
        "height": 256
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        with open(filename, 'wb') as file:
            file.write(response.content)
        file_size_kb = os.path.getsize(filename) / 1024
        return filename
    else:
        return None

def build_image_prompt_from_persona(persona: dict) -> str:
    # Example: You can make this as rich as you want!
    name = persona.get('name', 'User')
    title = persona.get('title') or persona.get('role') or persona.get('type', '')
    location = persona.get('location', 'US')
    archetype = persona.get('archetype', '')
    background = ', '.join(persona.get('background', []))
    personality = ', '.join(f"{k}: {v}" for k, v in persona.get('personality', {}).items())
    # Add more fields as needed

    prompt = (
        f"Professional UX persona portrait. "
        f"Name: {name}. "
        f"Role/Title: {title}. "
        f"Location: {location}. "
        f"Archetype: {archetype}. "
        f"Background: {background}. "
        f"Personality traits: {personality}. "
        f"Realistic, clean background, soft lighting, upper-body headshot, no text or logos."
    )
    return prompt

