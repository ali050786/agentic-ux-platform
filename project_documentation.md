# 📁 Folder Structure

├── .gitignore
├── backend/
│   ├── .gitignore
│   ├── app/
│   │   ├── agents/
│   │   │   └── persona_agent.py
│   │   ├── api/
│   │   │   ├── deps.py
│   │   │   └── routes/
│   │   │       ├── define.py
│   │   │       ├── empathize.py
│   │   │       ├── orientation.py
│   │   │       └── upload.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── db/
│   │   │   ├── models/
│   │   │   │   └── persona.py
│   │   │   ├── schemas.py
│   │   │   └── supabase_client.py
│   │   ├── main.py
│   │   └── services/
│   │       ├── agent_runner.py
│   │       ├── document_generator.py
│   │       └── file_processor.py
├── figma plugin/
│   ├── code.js
│   ├── manifest.json
│   └── ui.html
├── frontend/
│   ├── .gitignore
│   ├── package.json
│   ├── postcss.config.js
│   ├── src/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── components/
│   │   │   ├── HeaderBar.jsx
│   │   │   ├── WelcomeCard.jsx
│   │   │   ├── persona/
│   │   │   │   ├── CustomPrompt.jsx
│   │   │   │   ├── FileUpload.jsx
│   │   │   │   ├── PersonaBuilder.jsx
│   │   │   │   ├── PersonaCard.jsx
│   │   │   │   ├── PersonaCardAgile.jsx
│   │   │   │   ├── PersonaCardClassic.jsx
│   │   │   │   ├── PersonaCardEmpathy.jsx
│   │   │   │   ├── PersonaCardJTBD.jsx
│   │   │   │   ├── PersonaForm.jsx
│   │   │   │   ├── PersonaPreview.jsx
│   │   │   │   ├── TagInput.jsx
│   │   │   │   └── generate/
│   │   │   └── ui/
│   │   │       └── card.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── lib/
│   │   │   ├── api.js
│   │   │   ├── figmaExport.js
│   │   │   ├── generateClassicScenegraph.js
│   │   │   ├── supabase.js
│   │   │   └── utils.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   └── tailwind.config.js
├── orchestration/
│   ├── agents/
│   ├── memory/
│   ├── prompts/
│   └── workflows/

# 🧾 File Contents

## 📄 Code in `.gitignore`
```code
.env
```

## 📄 Code in `backend\app\main.py`
```code
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import orientation, define

app = FastAPI(title="Agentic UX Platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ✅ Replace with * only in dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(orientation.router, prefix="/api/orientation", tags=["Orientation"])
app.include_router(define.router, prefix="/api/define", tags=["Define"])

@app.get("/")
def root():
    return {"message": "Agentic UX API is running"}
```

## 📄 Code in `backend\app\agents\persona_agent.py`
```code
import json
import re
from typing import List, Dict, Union
from pydantic import BaseModel, ValidationError
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate
from app.core.config import GROQ_API_KEY


# ------------------ Pydantic Models ------------------ #
class ClassicPersona(BaseModel):
    name: str
    title: str
    type: str
    location: str
    generation: str
    status: str
    income: str
    background: List[str]
    personality: Dict[str, int]
    behaviorTags: List[str]
    goals: List[str]
    painPoints: List[str]
    motivations: Dict[str, int]
    tools: List[str]


class AgilePersona(BaseModel):
    name: str
    role: str
    location: str
    type: str
    status: str
    archetype: str
    goals: List[str]
    painPoints: List[str]
    tools: List[str]


class JTBDPersona(BaseModel):
    name: str
    role: str
    location: str
    archetype: str
    type: str
    goals_jtbd: List[str]
    motivations: Dict[str, int]
    scenarios: List[str]
    tools: List[str]


class EmpathyPersona(BaseModel):
    name: str
    title: str
    location: str
    archetype: str
    type: str
    background: List[str]
    behaviorTags: List[str]
    painPoints: List[str]
    motivations: Dict[str, int]
    scenarios: List[str]
    personality: Dict[str, int]


# ------------------ Format Instructions ------------------ #
def get_format_instructions_by_type(persona_type: str) -> str:
    templates = {
        "Classic": """
Return a JSON object with the following keys:
- name, title, type, location, generation, status, income: strings
- background: list of strings
- personality: dictionary (4 traits, 0–100)
- behaviorTags: list of strings
- goals: list of strings
- painPoints: list of strings
- motivations: dictionary (3–4 traits, 0–100)
- tools: list of strings
Only return the JSON.
""",
        "Agile": """
Return a JSON object with the following keys:
- type="Agile" (Send always "Agile")
- name, role, location, type="Agile", status, archetype: strings
- goals: list of strings
- painPoints: list of strings
- tools: list of strings
Only return the JSON.
""",
        "JTBD": """
Return a JSON object with the following keys:
- name, role, location, archetype: strings,  type="JTBD",
- type="JTBD" (Send always "JTBD")
- goals_jtbd: list of strings
- motivations: dictionary (0–100 values)
- scenarios: list of strings
- tools: list of strings
Only return the JSON.
""",
        "Empathy": """
Return a JSON object with the following keys:
- name, title, location, archetype: strings,
- type="Empathy" (Send always "Empathy")
- background: list of strings
- behaviorTags: list of strings
- painPoints: list of strings
- motivations: dictionary (0–100 values)
- scenarios: list of strings
- personality: dictionary (MBTI traits 0–100)
Only return the JSON.
"""
    }
    return templates.get(persona_type, "")


# ------------------ Prompt Template ------------------ #
prompt = ChatPromptTemplate.from_messages([
    ("system", """You're a veteran UX strategist with 15+ years of experience. Generate actionable, psychologically nuanced UX personas that:
1. Reflect real user research insights
2. Contain contradictions and complexities found in real humans
3. Prioritize design-actionable insights over demographics
4. Include behavioral triggers and decision-making patterns
5. Connect pain points directly to design opportunities"""),

    ("human", """## Persona Specification
**Type**: {persona_type}
**Project**: {project_name}
**User Role**: {target_user_role}
**Product Context**: {product_context}

## Strategic Considerations
- Include 1-2 paradoxical traits (e.g.: "Values efficiency but spends hours curating perfect playlists")
- Map pain points to HMW opportunities
- Indicate behavioral thresholds (e.g.: "Abandons flow after 2 friction points")
- Add technology adoption psychographics

{format_instructions}

## Veteran UX Notes
Focus on these when generating:
- Behavioral economics triggers
- Decision-making heuristics
- Contextual environmental factors
- Unspoken emotional drivers
""")
])


# ------------------ LangChain Model ------------------ #
llm = ChatGroq(
    api_key=GROQ_API_KEY,
    model="qwen-qwq-32b",
    temperature=0.4
)

persona_chain = prompt | llm


# ------------------ Main Persona Generator ------------------ #
def generate_persona(data: dict) -> Union[BaseModel, dict]:
    persona_type = data["persona_type"]
    format_instructions = get_format_instructions_by_type(persona_type)

    input_for_prompt = {
        "project_name": data["project_name"],
        "target_user_role": data["target_user_role"],
        "product_context": data["product_context"],
        "persona_type": persona_type,
        "format_instructions": format_instructions
    }

    raw_output = persona_chain.invoke(input_for_prompt)
    output_text = raw_output.content if hasattr(raw_output, "content") else str(raw_output)

    try:
        json_match = re.search(r"\{[\s\S]*\}", output_text)
        if not json_match:
            raise ValueError("No JSON object found in LLM response.")

        json_str = json_match.group(0).strip()
        persona_data = json.loads(json_str)

        # Validate and parse with Pydantic
        model_map = {
            "Classic": ClassicPersona,
            "Agile": AgilePersona,
            "JTBD": JTBDPersona,
            "Empathy": EmpathyPersona
        }

        model = model_map.get(persona_type)
        if not model:
            raise ValueError("Unsupported persona type.")

        return model.parse_obj(persona_data)

    except (json.JSONDecodeError, ValidationError, ValueError) as e:
        print("❌ Parsing failed:\n", output_text)
        raise e
```

## 📄 Code in `backend\app\api\deps.py`
```code
from fastapi import Header, HTTPException
import os
import jwt

JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")  # Found in Supabase > Project Settings > API

async def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid auth header")
    token = authorization.split(" ")[1]
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return decoded  # contains user info like sub (user_id), email, etc.
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid Supabase JWT token")
```

## 📄 Code in `backend\app\api\routes\define.py`
```code
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.agents.persona_agent import generate_persona

router = APIRouter()

# ----------- Input Schema ----------- #
class PersonaSeed(BaseModel):
    project_name: str
    target_user_role: str
    product_context: str
    persona_type:str



# ----------- Route ----------- #
@router.post("/persona")
def generate_persona_route(input_data: PersonaSeed):
    try:
        result = generate_persona(input_data.dict())
        return result.dict()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

## 📄 Code in `backend\app\api\routes\orientation.py`
```code
from fastapi import APIRouter, Depends, HTTPException
from app.api.deps import get_current_user
from pydantic import BaseModel
from typing import Dict, Any

router = APIRouter()

class OrientationInput(BaseModel):
    project_id: str
    app_idea: str
    target_user: str

@router.post("/")
async def run_orientation(input: OrientationInput):
    output = {
        "requirement_doc": f"Generated requirement for {input.app_idea}",
        "project_id": input.project_id
    }
    return {"status": "success", "output": output}
```

## 📄 Code in `backend\app\core\config.py`
```code
from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Agentic UX Platform"
    SUPABASE_URL: str = os.getenv("SUPABASE_URL")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY")
    SUPABASE_JWT_SECRET: str = os.getenv("SUPABASE_JWT_SECRET")
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")


settings = Settings()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is missing in the .env file.")
```

## 📄 Code in `figma plugin\code.js`
```code
// Common Struction Function
function createText(text, fontSize, fontWeight, color, align = "CENTER") {
  const node = figma.createText();
  node.characters = text;
  node.fontSize = fontSize;
  node.fontName = { family: "Inter", style: fontWeight };
  node.fills = [{ type: "SOLID", color }];
  node.textAlignHorizontal = align;
  return node;
}

function createCard(titleText, items = []) {
  const card = figma.createFrame();
  card.layoutMode = "VERTICAL";
  card.counterAxisAlignItems = "MIN";
  card.itemSpacing = 10;
  card.paddingLeft = 16;
  card.paddingRight = 16;
  card.paddingTop = 16;
  card.paddingBottom = 16;
  card.cornerRadius = 10;
  card.fills = [{ type: "SOLID", color: { r: 1, g: 0.933, b: 0.91 } }];
  card.layoutGrow = 1;
  card.minWidth = 439;

  const title = figma.createText();
  title.characters = titleText;
  title.fontSize = 22;
  title.fontName = { family: "Inter", style: "Semi Bold" };
  title.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }];
  card.appendChild(title);

  if (typeof items === "string") {
    const item = figma.createText();
    item.characters = items;
    item.fontSize = 14;
    item.fontName = { family: "Inter", style: "Regular" };
    item.lineHeight = { unit: "PIXELS", value: 20 };
    item.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
    card.appendChild(item);
  } else if (Array.isArray(items)) {
    items.forEach(text => {
      const item = figma.createText();
      item.characters = text;
      item.fontSize = 14;
      item.lineHeight = { unit: "PIXELS", value: 20 };
      item.fontName = { family: "Inter", style: "Regular" };
      item.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
      card.appendChild(item);
    });
  }

  return card;
}
// First Column
function createFirstColumn(persona) {
  const col = figma.createFrame();
  col.layoutMode = "VERTICAL";
  col.itemSpacing = 48;
  col.paddingLeft = 24;
  col.paddingRight = 24;
  col.paddingTop = 24;
  col.paddingBottom = 24;
  col.fills = [{ type: "SOLID", color: { r: 1, g: 0.933, b: 0.91 } }];
  col.resize(302, 752);
  col.cornerRadius = 10;


  const avatar = figma.createEllipse();
  avatar.resize(254, 254);
  avatar.strokes = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  avatar.strokeWeight = 6;
  avatar.fills = [{ type: "SOLID", color: { r: 1, g: 0.85, b: 0.8 } }];

  const nameTitleBox = figma.createFrame();
  nameTitleBox.layoutMode = "VERTICAL";
  nameTitleBox.primaryAxisAlignItems = "CENTER";

  nameTitleBox.itemSpacing = 8;
  nameTitleBox.paddingLeft = 0;
  nameTitleBox.paddingRight = 0;
  nameTitleBox.layoutAlign = 'STRETCH';
  nameTitleBox.paddingTop = 0;
  nameTitleBox.counterAxisAlignItems = "CENTER"
  nameTitleBox.paddingBottom = 0;
  nameTitleBox.fills = [{ type: "SOLID", color: { r: 1, g: 0.933, b: 0.91 } }]; // #FFEEE8

  const name = createText(persona.name, 32, "Semi Bold", { r: 0.2, g: 0.2, b: 0.2 });
  const title = createText(persona.title, 18, "Semi Bold", { r: 0.77, g: 0, b: 0.03 });

  nameTitleBox.appendChild(name);
  nameTitleBox.appendChild(title);

  const addInfoRow = (label, value) => {
    const row = figma.createText();
    const fullText = `${label} ${value}`;
    row.characters = fullText;
    row.fontSize = 14;
    row.lineHeight = { unit: "PIXELS", value: 20 };

    row.setRangeFontName(0, label.length, { family: "Inter", style: "Semi Bold" });
    row.setRangeFills(0, label.length, [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }]);

    row.setRangeFontName(label.length + 1, fullText.length, { family: "Inter", style: "Regular" });
    row.setRangeFills(label.length + 1, fullText.length, [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }]);
    return row;
  };

  const infoBox = figma.createFrame();
  infoBox.layoutMode = "VERTICAL";
  infoBox.primaryAxisAlignItems = "CENTER";
  infoBox.counterAxisAlignItems = "CENTER"
  infoBox.itemSpacing = 2;
  infoBox.paddingLeft = 16;
  infoBox.paddingRight = 16;
  infoBox.paddingTop = 16;
  infoBox.paddingBottom = 16;
  infoBox.cornerRadius = 10;
  infoBox.fills = [{ type: "SOLID", color: { r: 1, g: 0.86, b: 0.79 } }];
  infoBox.minWidth = 254;


  infoBox.appendChild(addInfoRow("Location", persona.location));
  infoBox.appendChild(addInfoRow("Generation", persona.generation));
  infoBox.appendChild(addInfoRow("Status", persona.status));
  infoBox.appendChild(addInfoRow("Income", persona.income));

  col.appendChild(avatar);
  col.appendChild(nameTitleBox);
  col.appendChild(infoBox);

  return col;
}


function createCard(titleText, items = []) {
  const card = figma.createFrame();
  card.layoutMode = "VERTICAL";
  card.counterAxisAlignItems = "MIN";
  card.itemSpacing = 10;
  card.paddingLeft = 16;
  card.paddingRight = 16;
  card.paddingTop = 16;
  card.paddingBottom = 16;
  card.cornerRadius = 10;
  card.fills = [{ type: "SOLID", color: { r: 1, g: 0.933, b: 0.91 } }];
  card.layoutGrow = 1;
  card.minWidth = 439;

  const title = figma.createText();
  title.characters = titleText;
  title.fontSize = 22;
  title.fontName = { family: "Inter", style: "Semi Bold" };
  title.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }];

  card.appendChild(title);

  items.forEach(text => {
    const item = figma.createText();
    item.characters = text;
    item.fontSize = 14;
    item.lineHeight = { unit: "PIXELS", value: 20 };
    item.fontName = { family: "Inter", style: "Regular" };
    item.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
    card.appendChild(item);
  });

  return card;
}

function ensureFonts() {
  return Promise.all([
    figma.loadFontAsync({ family: "Inter", style: "Regular" }),
    figma.loadFontAsync({ family: "Inter", style: "Semi Bold" }),
    figma.loadFontAsync({ family: "Inter", style: "Light" })
  ]);
}

function createSlider(label, percent) {
  const wrap = figma.createFrame();
  wrap.layoutMode = "VERTICAL";
  wrap.itemSpacing = 4;
  wrap.counterAxisAlignItems = "MIN";
  wrap.fills = [{ type: "SOLID", color: { r: 1, g: 0.933, b: 0.91 } }];
  wrap.counterAxisSizingMode = 'AUTO';

  const lbl = figma.createText();
  lbl.characters = label;
  lbl.fontSize = 14;
  lbl.fontName = { family: "Inter", style: "Regular" };
  lbl.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }];

  const track = figma.createFrame();
  track.resize(390, 8);
  track.fills = [{ type: "SOLID", color: { r: 1, g: 0.866, b: 0.831 } }];
  track.cornerRadius = 4;
  track.counterAxisSizingMode = 'AUTO';

  const fill = figma.createRectangle();
  fill.resize(390 * percent, 8);
  fill.fills = [{ type: "SOLID", color: { r: 0.78, g: 0, b: 0.06 } }];
  fill.cornerRadius = 4;

  track.appendChild(fill);
  wrap.appendChild(lbl);
  wrap.appendChild(track);
  return wrap;
}

function createPersonalityCard(data) {
  const card = createCard("Personality");
  Object.entries(data).forEach(([trait, value]) => {
    const slider = createSlider(trait, value / 100);
    card.appendChild(slider);
  });
  return card;
}

function createMotivationsCard(motivations) {
  const card = createCard("Motivations");
  Object.entries(motivations).forEach(([label, value]) => {
    const slider = createSlider(label, value / 100);
    card.appendChild(slider);
  });
  return card;
}
//Classic//

function renderClassicPersona(persona) {

  function createSecondColumn(persona) {
    const secondCol = figma.createFrame();
    secondCol.layoutMode = "VERTICAL";
    secondCol.primaryAxisAlignItems = "MIN";
    secondCol.itemSpacing = 24;
    secondCol.paddingLeft = 0;
    secondCol.paddingRight = 0;
    secondCol.paddingTop = 0;
    secondCol.paddingBottom = 0;
    secondCol.resize(439, 752);

    const backgroundCard = createCard("Background", persona.background);
    const personalityCard = createPersonalityCard(persona.personality);
    const goalsCard = createCard("Goals", persona.goals);
    const painCard = createCard("Pain Points", persona.painPoints);

    secondCol.appendChild(backgroundCard);
    secondCol.appendChild(personalityCard);
    secondCol.appendChild(goalsCard);
    secondCol.appendChild(painCard);

    return secondCol;
  }


  function createThirdColumn(persona) {
    const thirdCol = figma.createFrame();
    thirdCol.layoutMode = "VERTICAL";
    thirdCol.primaryAxisAlignItems = "MIN";
    thirdCol.itemSpacing = 24;
    thirdCol.paddingLeft = 0;
    thirdCol.paddingRight = 0;
    thirdCol.paddingTop = 0;
    thirdCol.paddingBottom = 0;
    thirdCol.resize(439, 752);


    thirdCol.appendChild(createToolsCard(persona.tools));
    thirdCol.appendChild(createMotivationsCard(persona.motivations));
    thirdCol.appendChild(createScenarioCard(persona.scenario));
    return thirdCol;
  }

  function createToolsCard(tools) {
    return createCard("Tools", tools);
  }



  function createScenarioCard(text) {
    const card = createCard("Scenario");
    const block = figma.createText();
    block.characters = text;
    block.fontSize = 14;
    block.lineHeight = { unit: "PIXELS", value: 20 };
    block.fontName = { family: "Inter", style: "Regular" };
    block.fills = [{ type: "SOLID", color: { r: 0.4, g: 0.4, b: 0.4 } }];
    block.textAlignHorizontal = "LEFT";
    card.appendChild(block);
    return card;
  }

  const main = figma.createFrame();
  main.name = "Classic Persona";
  main.layoutMode = "HORIZONTAL";
  main.counterAxisAlignItems = "MIN";
  main.itemSpacing = 32;
  main.paddingLeft = 40;
  main.paddingRight = 40;
  main.paddingTop = 40;
  main.paddingBottom = 40;
  main.resize(1308, 831);
  main.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  main.cornerRadius = 20;

  const left = createFirstColumn(persona);
  const right = createSecondColumn(persona);
  const third = createThirdColumn(persona);

  main.appendChild(left);
  main.appendChild(right);
  main.appendChild(third);

  figma.currentPage.appendChild(main);
}

function renderAgilePersona(persona) {
  function createBrandsCard(brands) {
    const card = createCard("Favourite Brands");
    const wrap = figma.createFrame();
    wrap.layoutMode = "HORIZONTAL";
    wrap.layoutWrap = "WRAP";
    wrap.itemSpacing = 8;
    wrap.counterAxisAlignItems = "CENTER";
    wrap.fills = [];

    brands.forEach(brand => {
      const tag = figma.createFrame();
      tag.layoutMode = "HORIZONTAL";
      tag.paddingLeft = 12;
      tag.paddingRight = 12;
      tag.paddingTop = 4;
      tag.paddingBottom = 4;
      tag.cornerRadius = 100;
      tag.fills = [{ type: "SOLID", color: { r: 0.89, g: 0.95, b: 1 } }];

      const txt = figma.createText();
      txt.characters = brand;
      txt.fontSize = 12;
      txt.fontName = { family: "Inter", style: "Regular" };
      txt.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.3, b: 0.8 } }];

      tag.appendChild(txt);
      wrap.appendChild(tag);
    });

    card.appendChild(wrap);
    return card;
  }

  function createSecondColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    col.appendChild(createCard("Goals", persona.goals));
    col.appendChild(createCard("Pain Points", persona.painPoints));

    return col;
  }

  function createThirdColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    col.appendChild(createBrandsCard(persona.favouriteBrands));
    return col;
  }

  const main = figma.createFrame();
  main.name = "Agile Persona";
  main.layoutMode = "HORIZONTAL";
  main.itemSpacing = 32;
  main.paddingLeft = 40;
  main.paddingRight = 40;
  main.paddingTop = 40;
  main.paddingBottom = 40;
  main.resize(1308, 831);
  main.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  main.cornerRadius = 20;

  const left = createFirstColumn(persona);
  const middle = createSecondColumn(persona);
  const right = createThirdColumn(persona);

  main.appendChild(left);
  main.appendChild(middle);
  main.appendChild(right);

  figma.currentPage.appendChild(main);
}

function renderJtbdPersona(persona) {
  function createBrandsCard(brands) {
    const card = createCard("Favourite Brands");
    const wrap = figma.createFrame();
    wrap.layoutMode = "HORIZONTAL";
    wrap.layoutWrap = "WRAP";
    wrap.itemSpacing = 8;
    wrap.counterAxisAlignItems = "CENTER";
    wrap.fills = [];

    brands.forEach(brand => {
      const tag = figma.createFrame();
      tag.layoutMode = "HORIZONTAL";
      tag.paddingLeft = 12;
      tag.paddingRight = 12;
      tag.paddingTop = 4;
      tag.paddingBottom = 4;
      tag.cornerRadius = 100;
      tag.fills = [{ type: "SOLID", color: { r: 1, g: 0.9, b: 0.95 } }];

      const txt = figma.createText();
      txt.characters = brand;
      txt.fontSize = 12;
      txt.fontName = { family: "Inter", style: "Regular" };
      txt.fills = [{ type: "SOLID", color: { r: 0.7, g: 0.1, b: 0.4 } }];

      tag.appendChild(txt);
      wrap.appendChild(tag);
    });

    card.appendChild(wrap);
    return card;
  }

  function createSecondColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    col.appendChild(createCard("Goals (JTBD)", persona.goals));
    col.appendChild(createCard("Scenarios", persona.scenario));

    return col;
  }

  function createThirdColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    col.appendChild(createMotivationsCard(persona.motivations));
    col.appendChild(createBrandsCard(persona.favouriteBrands));

    return col;
  }

  const main = figma.createFrame();
  main.name = "JTBD Persona";
  main.layoutMode = "HORIZONTAL";
  main.itemSpacing = 32;
  main.paddingLeft = 40;
  main.paddingRight = 40;
  main.paddingTop = 40;
  main.paddingBottom = 40;
  main.resize(1308, 831);
  main.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  main.cornerRadius = 20;

  const left = createFirstColumn(persona);
  const middle = createSecondColumn(persona);
  const right = createThirdColumn(persona);

  main.appendChild(left);
  main.appendChild(middle);
  main.appendChild(right);

  figma.currentPage.appendChild(main);
}


function renderEmpathyPersona(persona) {
  function createTagPill(text) {
    const pillFrame = figma.createFrame();
    pillFrame.layoutMode = "HORIZONTAL";
    pillFrame.counterAxisAlignItems = "CENTER";
    pillFrame.itemSpacing = 0;
    pillFrame.paddingLeft = 12;
    pillFrame.paddingRight = 12;
    pillFrame.paddingTop = 4;
    pillFrame.paddingBottom = 4;
    pillFrame.cornerRadius = 100;
    pillFrame.fills = [{ type: "SOLID", color: { r: 1, g: 0.9, b: 0.95 } }];

    const pillText = figma.createText();
    pillText.characters = text;
    pillText.fontSize = 12;
    pillText.fontName = { family: "Inter", style: "Regular" };
    pillText.fills = [{ type: "SOLID", color: { r: 0.7, g: 0.1, b: 0.4 } }];

    pillFrame.appendChild(pillText);
    return pillFrame;
  }

  function createBehaviorTagsCard(tags) {
    const card = createCard("Behavior Tags");
    const tagWrap = figma.createFrame();
    tagWrap.layoutMode = "HORIZONTAL";
    tagWrap.layoutWrap = "WRAP";
    tagWrap.itemSpacing = 8;
    tagWrap.fills = [];

    tags.forEach(tag => {
      const pill = createTagPill(tag);
      tagWrap.appendChild(pill);
    });

    card.appendChild(tagWrap);
    return card;
  }

  function createSecondColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    col.appendChild(createCard("Background", persona.background));
    col.appendChild(createBehaviorTagsCard(persona.behaviorTags));
    col.appendChild(createPersonalityCard(persona.personality));

    return col;
  }

  function createThirdColumn(persona) {
    const col = figma.createFrame();
    col.layoutMode = "VERTICAL";
    col.itemSpacing = 24;
    col.resize(439, 752);
    col.fills = [];

    col.appendChild(createCard("Pain Points", persona.painPoints));
    col.appendChild(createMotivationsCard(persona.motivations));
    col.appendChild(createCard("Scenario", persona.scenario));

    return col;
  }

  const main = figma.createFrame();
  main.name = "Empathy Persona";
  main.layoutMode = "HORIZONTAL";
  main.itemSpacing = 32;
  main.paddingLeft = 40;
  main.paddingRight = 40;
  main.paddingTop = 40;
  main.paddingBottom = 40;
  main.resize(1308, 831);
  main.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  main.cornerRadius = 20;

  const left = createFirstColumn(persona); // from Classic
  const middle = createSecondColumn(persona);
  const right = createThirdColumn(persona);

  main.appendChild(left);
  main.appendChild(middle);
  main.appendChild(right);

  figma.currentPage.appendChild(main);
}






(async () => {
  await ensureFonts();
  
  const persona = {
    "name": "Jordan James",
    "title": "Researcher",
    "type": "Classic",
    "location": "California",
    "generation": "Gen Z / 20 years",
    "status": "Single • No kids",
    "income": "Average (+13%)",
    "background": [
      "Moved to California",
      "Instagram influencer (12k followers)",
      "Cares about sustainability and wellness"
    ],
    "personality": {
      "Introvert": 60,
      "Intuition": 85,
      "Feeling": 50,
      "Perceiving": 95
    },
    "goals": [
      "Promote wellness and eco-friendly products",
      "Engage Gen Z audiences",
      "Stay authentic in brand partnerships"
    ],
    "painPoints": [
      "Overwhelmed by content scheduling",
      "Difficulty finding ethical sponsors",
      "Struggles with platform changes"
    ],
    "tools": ["Instagram", "Canva", "Notion", "InShot"],
    "motivations": {
      "Creativity": 90,
      "Growth": 80,
      "Stability": 60,
      "Recognition": 70
    },
    "scenario": "Jordan checks her favorite wellness app every morning and posts a quick update to her audience before starting her college day."
  };
/*
  const persona = {
    "name": "Alex Rivera",
    "title": "Freelance Graphic Designer",
    "type": "Empathy",
    "location": "Portland, OR",
    "archetype": "The Balancing Act",
    "status": "Living with roommate • Part-time worker",
    "background": [
      "Raised in a bilingual household",
      "Moved from Texas to Portland for design opportunities",
      "Enjoys nature and practices mindful journaling"
    ],
    "behaviorTags": [
      "Journals emotions daily",
      "Uses social media to inspire others",
      "Prefers face-to-face over text communication",
      "Shops based on emotional connection to brand"
    ],
    "personality": {
      "Introvert": 75,
      "Intuition": 68,
      "Feeling": 90,
      "Perceiving": 65
    },
    "painPoints": [
      "Feels overwhelmed by too many choices",
      "Struggles with client feedback emotionally",
      "Has difficulty balancing personal and client needs"
    ],
    "motivations": {
      "Empathy": 95,
      "Creativity": 80,
      "Connection": 85,
      "Freedom": 70
    },
    "scenario": [
      "Alex browses community forums in the morning to feel emotionally connected.",
      "She updates her moodboard while sipping tea and reflecting on yesterday's work.",
      "Before starting client tasks, she meditates for 5 minutes to set emotional tone."
    ]
  }*/

  /*
    const persona = {
      "name": "Alex Rivera",
      "title": "Marketing Manager",
      "type": "Agile",
      "location": "Remote, originally from Austin, TX",
      "generation": "Millennial / 32 years",
      "status": "Overwhelmed but adaptive",
      "income": "$85,000/year",
      "goals": [
        "Streamline workflows to reduce context-switching fatigue",
        "Maintain brand consistency across 5+ platforms",
        "Stay ahead of emerging trends without deep dives",
        "Avoid burnout while meeting quarterly KPIs"
      ],
      "painPoints": [
        "Fragmented tools create duplicate work (e.g., manual data entry between CRM and analytics)",
        "Creativity stifled by 'good enough' templates that don't reflect brand voice",
        "Decision fatigue from choosing between 10+ analytics platforms",
        "Fear of adopting new tools that require retraining teams"
      ],
      "favouriteBrands": [
        "Slack (for urgent comms)",
        "Trello (overloaded with half-finished boards)",
        "Google Analytics (used only for basic reports)",
        "Canva (for quick edits, but resists advanced features)",
        "Zoom (with unused breakout room features)"
      ]
    }
  
  
  

  const persona = {
    "name": "Alex Rivera",
    "title": "Freelance Content Creator",
    "type": "JTBD",
    "location": "Austin, TX",
    "archetype": "The Juggler",
    "goals": [
      "I need to prioritize tasks to meet multiple client deadlines without burning out.",
      "I want to maintain creative quality while adhering to client constraints.",
      "I need a way to track time effectively to invoice accurately but without micromanaging."
    ],
    "scenario": [
      "Struggling to say 'no' to new projects, leading to overcommitment.",
      "Spending hours refining a project detail because it 'feels right,' then missing the deadline.",
      "Avoiding client calls to dodge potential scope changes but then facing dissatisfaction later."
    ],
    "motivations": {
      "Autonomy": 95,
      "Efficiency": 85,
      "Creativity": 92,
      "Social_validation": 75,
      "Financial_stability": 80
    },
    "favouriteBrands": [
      "Trello",
      "Adobe Creative Cloud",
      "Slack",
      "RescueTime (used inconsistently)",
      "Avoids Asana due to perceived complexity"
    ]
  }*/


  switch (persona.type) {
    case "Classic":
      renderClassicPersona(persona);
      figma.closePlugin("✅ Classic Persona rendered");
      break;
    case "Agile":
      renderAgilePersona(persona);
      figma.closePlugin("✅ Agile Persona rendered");
      break;
    case "JTBD":
      renderJtbdPersona(persona);
      figma.closePlugin("✅ JTBD Persona rendered");
      break;
    case "Empathy":
      renderEmpathyPersona(persona);
      figma.closePlugin("✅ Empathy Persona rendered");
      break;
    default:
      figma.closePlugin("❌ Unknown persona type");
  }
})();
```

## 📄 Code in `figma plugin\manifest.json`
```code
{
  "name": "Persona Renderer",
  "id": "com.openuxlab.persona.renderer",
  "api": "1.0.0",
  "main": "code.js",
  "editorType": ["figma"]
}
```

## 📄 Code in `figma plugin\ui.html`
```code
<!DOCTYPE html>
<html>
  <body>
    <h3>Paste Persona JSON</h3>
    <textarea id="jsonInput" style="width: 100%; height: 200px;"></textarea>
    <br/>
    <button id="renderBtn">Render in Figma</button>
    <script>
      document.getElementById('renderBtn').onclick = () => {
        const raw = document.getElementById('jsonInput').value;
        parent.postMessage({ pluginMessage: { type: 'render-json', payload: raw } }, '*');
      }
    </script>
  </body>
</html>
```

## 📄 Code in `frontend\.gitignore`
```code
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/public
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
.env
```

## 📄 Code in `frontend\package.json`
```code
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@supabase/supabase-js": "^2.49.9",
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.4",
    "tailwindcss": "^3.4.1"
  }
}
```

## 📄 Code in `frontend\postcss.config.js`
```code
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 📄 Code in `frontend\tailwind.config.js`
```code
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 📄 Code in `frontend\src\App.css`
```code
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

## 📄 Code in `frontend\src\App.js`
```code
import HeaderBar from "./components/HeaderBar";
import PersonaBuilder from "./components/persona/PersonaBuilder";

function App() {
  return (
    <main className="min-h-screen bg-gray-100 font-sans">
      <HeaderBar />
      <PersonaBuilder />
    </main>
  );
}

export default App;
```

## 📄 Code in `frontend\src\App.test.js`
```code
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

## 📄 Code in `frontend\src\index.css`
```code
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

## 📄 Code in `frontend\src\index.js`
```code
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

## 📄 Code in `frontend\src\logo.svg`
```code
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3"><g fill="#61DAFB"><path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z"/><circle cx="420.9" cy="296.5" r="45.7"/><path d="M520.5 78.1z"/></g></svg>
```

## 📄 Code in `frontend\src\reportWebVitals.js`
```code
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
```

## 📄 Code in `frontend\src\setupTests.js`
```code
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
```

## 📄 Code in `frontend\src\components\HeaderBar.jsx`
```code
import { useAuth } from "../context/AuthContext";

export default function HeaderBar() {
  const { user, signIn, signOut } = useAuth();

  return (
    <header className="bg-purple-700 text-white py-3 px-6 text-sm flex justify-between items-center">
      <span className="font-semibold text-lg">🚀 OpenUXlab</span>
      {user ? (
        <div className="flex gap-4 items-center">
          <span className="text-xs">Hi, {user.email}</span>
          <button onClick={signOut} className="bg-white text-purple-700 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={signIn} className="bg-white text-purple-700 px-3 py-1 rounded">
          Sign in with Google
        </button>
      )}
    </header>
  );
}
```

## 📄 Code in `frontend\src\components\WelcomeCard.jsx`
```code
import { Card, CardContent } from "../components/ui/card"

function WelcomeCard() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-xl font-bold">👋 Welcome to Agentic UX</h1>
          <p className="text-sm mt-2 text-gray-600">
            Start by creating your first UX project and talk to the AI agent.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default WelcomeCard
```

## 📄 Code in `frontend\src\components\persona\CustomPrompt.jsx`
```code
export default function CustomPrompt() {
  return (
    <div className="mt-4">
      <label className="text-sm font-medium block mb-1">Add Custom Prompt</label>
      <textarea className="w-full rounded-md border-gray-300 shadow-sm" placeholder="Write any extra details for the AI agent..." />
    </div>
  )
}
```

## 📄 Code in `frontend\src\components\persona\FileUpload.jsx`
```code
export default function FileUpload() {
  return (
    <div className="mt-4">
      <label className="text-sm font-medium block mb-1">Upload Research Data</label>
      <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:border-0 file:text-sm file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200" />
    </div>
  )
}
```

## 📄 Code in `frontend\src\components\persona\PersonaBuilder.jsx`
```code
import { useState } from "react"
import PersonaForm from "./PersonaForm"
import PersonaPreview from "./PersonaPreview"
import { generatePersona } from "../../lib/api"

export default function PersonaBuilder() {
  const [loading, setLoading] = useState(false)           // ✅ Add this
  const [personaData, setPersonaData] = useState(null)    // ✅ And this

  const handleGenerate = async (formData) => {
    try {
      console.log("➡️ Sending request:", formData)
      setLoading(true)
      const result = await generatePersona(formData)
      console.log("✅ Response:", result)
      setPersonaData(result)
    } catch (error) {
      console.error("❌ Error from API:", error)
      alert("Something went wrong while generating persona.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <aside className="w-full md:w-1/3 p-4 bg-white border-r overflow-y-auto">
        <PersonaForm onGenerate={handleGenerate} loading={loading} />
      </aside>
      <section className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <PersonaPreview persona={personaData} loading={loading} />
      </section>
    </div>
  )
}
```

## 📄 Code in `frontend\src\components\persona\PersonaCard.jsx`
```code
import PersonaCardClassic from "./PersonaCardClassic"
import PersonaCardAgile from "./PersonaCardAgile"
import PersonaCardJTBD from "./PersonaCardJTBD"
import PersonaCardEmpathy from "./PersonaCardEmpathy"

export default function PersonaCard({ data }) {
  if (!data || !data.type) return null

  switch (data.type) {
    case "Classic":
      return <PersonaCardClassic data={data} />
    case "Agile":
      return <PersonaCardAgile data={data} />
    case "JTBD":
      return <PersonaCardJTBD data={data} />
    case "Empathy":
      return <PersonaCardEmpathy data={data} />
    default:
      return <p className="text-red-500">Unknown persona type</p>
  }
}
```

## 📄 Code in `frontend\src\components\persona\PersonaCardAgile.jsx`
```code
export default function PersonaCardAgile({ data }) {
  const { name, role, location, status, archetype, goals, painPoints, motivations, tools } = data;

  const renderBar = (value) => (
    <div className="w-full h-2 bg-blue-100 rounded">
      <div className="h-full bg-blue-600 rounded" style={{ width: `${value}%` }} />
    </div>
  );

  return (
    <div className="bg-white rounded-[20px] p-10 shadow-md max-w-[1308px] mx-auto text-[15px] text-gray-800">
      <div className="grid grid-cols-[302px_439px_439px] gap-[24px] items-start">
        {/* Column 1 - Avatar + Bio */}
        <div className="flex flex-col items-center text-center gap-12 bg-blue-50 p-6 rounded-xl">
          <div className="w-[254px] h-[254px] bg-blue-100 rounded-full border-[6px] border-white" />
          <div>
            <h2 className="text-[26px] font-bold">{name}</h2>
            <p className="text-blue-600 font-semibold mt-3">{role}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-xl w-full text-left space-y-1">
            {location && <p><strong>Location</strong>: {location}</p>}
            {status && <p><strong>Status</strong>: {status}</p>}
            {archetype && <p><strong>Archetype</strong>: {archetype}</p>}
          </div>
        </div>

        {/* Column 2 - Goals + Pain Points */}
        <div className="flex flex-col gap-6 h-full">
          {goals?.length > 0 && (
            <div className="bg-blue-100 p-4 rounded-xl">
              <h3 className="text-[17px] font-semibold mb-1">Goals</h3>
              <ul className="list-disc list-outside pl-4">
                {goals.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
          {painPoints?.length > 0 && (
            <div className="bg-blue-100 p-4 rounded-xl flex-1">
              <h3 className="text-[17px] font-semibold mb-1">Pain Points</h3>
              <ul className="list-disc list-outside pl-4">
                {painPoints.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Column 3 - Motivation + Brands */}
        <div className="flex flex-col gap-6 h-full">
          {motivations && Object.keys(motivations).length > 0 && (
            <div className="bg-blue-100 p-4 rounded-xl">
              <h3 className="text-[17px] font-semibold mb-1">Motivation</h3>
              <div className="space-y-2">
                {Object.entries(motivations).map(([k, v]) => (
                  <div key={k}>
                    <p className="capitalize mb-1">{k}</p>
                    {renderBar(v)}
                  </div>
                ))}
              </div>
            </div>
          )}
          {tools?.length > 0 && (
            <div className="bg-blue-100 p-4 rounded-xl flex-1">
              <h3 className="text-[17px] font-semibold mb-2">Favourite Brands</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, i) => (
                  <span key={i} className="bg-blue-200 text-blue-800 text-xs px-3 py-1 rounded-full">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

## 📄 Code in `frontend\src\components\persona\PersonaCardClassic.jsx`
```code
export default function PersonaCardClassic({ data }) {
  const { name, title, location, generation, status, income, archetype, background, personality, behaviorTags, goals, painPoints, motivations, tools } = data;

  const renderBar = (value) => (
    <div className="w-full h-2 bg-red-100 rounded">
      <div className="h-full bg-red-600 rounded" style={{ width: `${value}%` }} />
    </div>
  );

  return (
    <div className="bg-white rounded-[20px] p-10 shadow-md max-w-[1308px] mx-auto text-sm text-gray-800">
      <div className="grid grid-cols-[302px_439px_439px] gap-[24px]">
        {/* Column 1 - Avatar & Info */}
        {/* Column 1 - Avatar & Info */}
        <div className="flex flex-col items-center text-center gap-12 bg-red-50 p-6 rounded-xl">
          {/* Avatar */}
          <div className="w-[254px] h-[254px] rounded-full bg-red-100 border-[6px] border-white" />

          {/* Name + Role */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
            <p className="text-red-600 font-semibold mt-3">{title}</p>
          </div>

          {/* Basic Info */}
          <div className="bg-red-100 p-4 rounded-xl w-full text-left text-sm space-y-1">
            {location && <p><strong>Location</strong>: {location}</p>}
            {generation && <p><strong>Generation/Age</strong>: {generation}</p>}
            {status && <p><strong>Status/Kids</strong>: {status}</p>}
            {income && <p><strong>Income</strong>: {income}</p>}
          </div>
        </div>

        {/* Column 2 - Background, Personality, Behavior Tags, Pain Points */}
        <div className="flex flex-col gap-6">
          {background?.length > 0 && (
            <div className="bg-red-50 p-4 rounded-xl">
              <h3 className="font-semibold mb-1">Background</h3>
              <ul className="list-disc list-outside pl-4">
                {background.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}

          {personality && Object.keys(personality).length > 0 && (
            <div className="bg-red-50 p-4 rounded-xl">
              <h3 className="font-semibold mb-1">Personality</h3>
              <div className="space-y-2">
                {Object.entries(personality).map(([k, v]) => (
                  <div key={k}>
                    <p className="capitalize mb-1">{k}</p>
                    {renderBar(v)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {behaviorTags?.length > 0 && (
            <div className="bg-red-50 p-4 rounded-xl">
              <h3 className="font-semibold mb-2">Behavior Tags</h3>
              <div className="flex flex-wrap gap-2">
                {behaviorTags.map((tag, i) => (
                  <span key={i} className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {painPoints?.length > 0 && (
            <div className="bg-red-50 p-4 rounded-xl">
              <h3 className="font-semibold mb-1">Pain Points</h3>
              <ul className="list-disc list-outside pl-4">
                {painPoints.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Column 3 - Motivation, Goals, Favourite Brands */}
        <div className="flex flex-col gap-6">
          {motivations && Object.keys(motivations).length > 0 && (
            <div className="bg-red-50 p-4 rounded-xl">
              <h3 className="font-semibold mb-1">Motivation</h3>
              <div className="space-y-2">
                {Object.entries(motivations).map(([k, v]) => (
                  <div key={k}>
                    <p className="capitalize mb-1">{k}</p>
                    {renderBar(v)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {goals?.length > 0 && (
            <div className="bg-red-50 p-4 rounded-xl">
              <h3 className="font-semibold mb-1">Goals</h3>
              <ul className="list-disc list-outside pl-4">
                {goals.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}

          {/* Favourite Brands */}
          {/* Favourite Brands */}
<div className="bg-red-50 p-4 rounded-xl flex flex-col flex-1">
  <h3 className="font-semibold mb-2">Favourite Brands</h3>
  <div className="flex gap-4 items-center flex-wrap">
    {tools.map((tool, i) => (
      <span key={i} className="bg-white border px-4 py-2 rounded-lg shadow text-xs">
        {tool}
      </span>
    ))}
  </div>
</div>
        </div>
      </div>
    </div>
  );
}
```

## 📄 Code in `frontend\src\components\persona\PersonaCardEmpathy.jsx`
```code
export default function PersonaCardEmpathy({ data }) {
  const { name, title, location, generation, status, income, archetype, background, personality, behaviorTags, painPoints, motivations, scenarios } = data;

  const renderBar = (value) => (
    <div className="w-full h-2 bg-pink-100 rounded">
      <div className="h-full bg-pink-600 rounded" style={{ width: `${value}%` }} />
    </div>
  );

  return (
    <div className="bg-white rounded-[20px] p-10 shadow-md max-w-[1308px] mx-auto text-sm text-gray-800">
      <div className="grid grid-cols-[302px_439px_439px] gap-[24px] items-start">
        {/* Column 1 - Avatar + Name + Role + Bio */}
        <div className="flex flex-col items-center text-center gap-12 bg-pink-50 p-6 rounded-xl">
          <div className="w-[254px] h-[254px] bg-pink-100 rounded-full border-[6px] border-white" />
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-pink-600 font-semibold mt-3">{title}</p>
          </div>
          <div className="bg-pink-100 p-4 rounded-xl w-full text-left space-y-1">
            {location && <p><strong>Location</strong>: {location}</p>}
            {generation && <p><strong>Generation/Age</strong>: {generation}</p>}
            {archetype && <p><strong>Archetype</strong>: {archetype}</p>}
          </div>
        </div>

        {/* Column 2 - Background, Behavior Tags, Personality */}
        <div className="flex flex-col gap-6 h-full">
          {background?.length > 0 && (
            <div className="bg-pink-100 p-4 rounded-xl">
              <h3 className="font-semibold mb-1">Background</h3>
              <ul className="list-disc list-outside pl-4">
                {background.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}

          {behaviorTags?.length > 0 && (
            <div className="bg-pink-100 p-4 rounded-xl">
              <h3 className="font-semibold mb-2">Behavior Tags</h3>
              <div className="flex flex-wrap gap-2">
                {behaviorTags.map((tag, i) => (
                  <span key={i} className="bg-pink-200 text-pink-800 text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {personality && Object.keys(personality).length > 0 && (
            <div className="bg-pink-100 p-4 rounded-xl">
              <h3 className="font-semibold mb-2">Personality</h3>
              <div className="space-y-2">
                {Object.entries(personality).map(([k, v]) => (
                  <div key={k}>
                    <p className="capitalize mb-1">{k}</p>
                    {renderBar(v)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Column 3 - Pain Points, Motivation, Scenarios */}
        <div className="flex flex-col gap-6 h-full">
          {painPoints?.length > 0 && (
            <div className="bg-pink-100 p-4 rounded-xl">
              <h3 className="font-semibold mb-1">Pain Points</h3>
              <ul className="list-disc list-outside pl-4">
                {painPoints.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}

          {motivations && Object.keys(motivations).length > 0 && (
            <div className="bg-pink-100 p-4 rounded-xl">
              <h3 className="font-semibold mb-1">Motivation</h3>
              <div className="space-y-2">
                {Object.entries(motivations).map(([k, v]) => (
                  <div key={k}>
                    <p className="capitalize mb-1">{k}</p>
                    {renderBar(v)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {scenarios?.length > 0 && (
            <div className="bg-pink-100 p-4 rounded-xl flex-1">
              <h3 className="font-semibold mb-1">Scenario</h3>
              <ul className="list-disc list-outside pl-4">
                {scenarios.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

## 📄 Code in `frontend\src\components\persona\PersonaCardJTBD.jsx`
```code
export default function PersonaCardJTBD({ data }) {
  const { name, role, location, generation, status, income, archetype, goals_jtbd, motivations, scenarios, tools } = data;

  const renderBar = (value) => (
    <div className="w-full h-2 bg-rose-100 rounded">
      <div className="h-full bg-rose-600 rounded" style={{ width: `${value}%` }} />
    </div>
  );

  return (
    <div className="bg-white rounded-[20px] p-10 shadow-md max-w-[1308px] mx-auto text-[15px] text-gray-800">
      <div className="grid grid-cols-[302px_439px_439px] gap-[24px] items-start min-h-[720px]">
        {/* Column 1 - Avatar + Bio */}
        <div className="flex flex-col items-center text-center gap-12 bg-rose-50 p-6 rounded-xl">
          <div className="w-[254px] h-[254px] bg-rose-200 rounded-full border-[6px] border-white" />
          <div>
            <h2 className="text-[26px] font-bold">{name}</h2>
            <p className="text-rose-600 font-semibold mt-3">{role}</p>
          </div>
          <div className="bg-rose-100 p-4 rounded-xl w-full text-left space-y-1">
            {location && <p><strong>Location</strong>: {location}</p>}
            {generation && <p><strong>Generation/Age</strong>: {generation}</p>}
            {status && <p><strong>Status/Kids</strong>: {status}</p>}
            {income && <p><strong>Income</strong>: {income}</p>}
            {archetype && <p><strong>Archetype</strong>: {archetype}</p>}
          </div>
        </div>

        {/* Column 2 - Goals + Scenarios */}
        <div className="flex flex-col gap-6 h-full">
          {goals_jtbd?.length > 0 && (
            <div className="bg-rose-100 p-4 rounded-xl">
              <h3 className="text-[17px] font-semibold mb-1">Goals (JTBD)</h3>
              <ul className="list-disc list-outside pl-4">
                {goals_jtbd.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
          {scenarios?.length > 0 && (
            <div className="bg-rose-100 p-4 rounded-xl flex-1">
              <h3 className="text-[17px] font-semibold mb-1">Scenarios</h3>
              <ul className="list-disc list-outside pl-4 ">
                {scenarios.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Column 3 - Motivation + Brands */}
        <div className="flex flex-col gap-6 h-full">
          {motivations && Object.keys(motivations).length > 0 && (
            <div className="bg-rose-100 p-4 rounded-xl">
              <h3 className="text-[17px] font-semibold mb-1">Motivation</h3>
              <div className="space-y-2">
                {Object.entries(motivations).map(([k, v]) => (
                  <div key={k}>
                    <p className="capitalize mb-1">{k}</p>
                    {renderBar(v)}
                  </div>
                ))}
              </div>
            </div>
          )}
          {tools?.length > 0 && (
            <div className="bg-rose-100 p-4 rounded-xl flex-1">
              <h3 className="text-[17px] font-semibold mb-2">Favourite Brands</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, i) => (
                  <span key={i} className="bg-rose-200 text-rose-800 text-xs px-3 py-1 rounded-full">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

## 📄 Code in `frontend\src\components\persona\PersonaForm.jsx`
```code
import { useState } from "react"
import TagInput from "./TagInput"
import FileUpload from "./FileUpload"
import CustomPrompt from "./CustomPrompt"

export default function PersonaForm({ onGenerate, loading }) {
  const [type, setType] = useState("Classic")
  const [project, setProject] = useState("")
  const [role, setRole] = useState("")
  const [context, setContext] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate({
      persona_type: type,
      project_name: project,
      target_user_role: role,
      product_context: context
    })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm p-3 rounded-md">
        💡 <strong>Pro Tip:</strong> Start with basic info, then use AI assist to expand each section. You can always edit!
      </div>

      <label className="block">
        <span className="text-sm font-medium">Select Persona Type</span>
        <select
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Classic">Classic</option>
          <option value="Agile">Agile</option>
          <option value="JTBD">JTBD</option>
          <option value="Empathy">Empathy</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium">Project Name</span>
        <input
          type="text"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          placeholder="e.g., QuickEats Food Delivery App"
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Target User Role</span>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g., College student, Working mother"
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Product Context</span>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="e.g., Ordering groceries online..."
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
        />
      </label>

      <button
        type="button"
        className="text-sm text-purple-600"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {showAdvanced ? "Hide" : "Show"} Advanced Options
      </button>

      {showAdvanced && (
        <>
          <TagInput label="Behavior Traits" placeholder="e.g., Tech-savvy, Budget-conscious" tagColor="blue" />
          <TagInput label="Pain Points" placeholder="e.g., Slow delivery, Hidden fees" tagColor="red" />
          <TagInput label="Goals" placeholder="e.g., Order in under 2 mins" tagColor="green" />
        </>
      )}

      <FileUpload />
      <CustomPrompt />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 rounded-md"
      >
        {loading ? "Generating..." : "⚡ Generate Persona"}
      </button>
    </form>
  )
}
```

## 📄 Code in `frontend\src\components\persona\PersonaPreview.jsx`
```code
import PersonaCard from "./PersonaCard"
import {
  copyToFigmaClipboard
} from "../../lib/figmaExport"

const figmetaBase64 = "eyJwYXN0ZUlkIjogImNsYXNzaWMtcGVyc29uYS1leHBvcnQiLCAiZmlsZUtleSI6ICJVWEwtZmlnbWEtZHluYW1pYy1leHBvcnQiLCAidHlwZSI6ICJDTElQQk9BUkRfQ09QWSIsICJ2ZXJzaW9uIjogIjEuMCJ9";

const figmaBinaryBase64 = "ZmlnLWZha2UtYmluYXJ5LWRhdGEtZm9yLWNsYXNzaWMtcGVyc29uYQ=="; // placeholder

export default function PersonaPreview({ persona, loading }) {
  const handleFigmaExport = () => {
    copyToFigmaClipboard(figmetaBase64, figmaBinaryBase64)
  }

  if (loading) {
    return <p className="text-center text-gray-400">Generating persona...</p>
  }

  if (!persona) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <div className="text-5xl mb-4">👤</div>
        <h2 className="text-xl font-semibold">Ready to create a persona</h2>
        <p className="text-sm text-gray-400 mt-1">Fill out the form to generate your user persona</p>
      </div>
    )
  }

  return (
    <div className="mt-4">
      <PersonaCard data={persona} />
      <button
        onClick={handleFigmaExport}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        📋 Copy to Figma
      </button>
    </div>
  )
}
```

## 📄 Code in `frontend\src\components\persona\TagInput.jsx`
```code
import { useState } from "react"

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
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full rounded-md border-gray-300 shadow-sm"
      />
    </div>
  )
}
```

## 📄 Code in `frontend\src\components\ui\card.jsx`
```code
import React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-white text-black shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardContent }
```

## 📄 Code in `frontend\src\context\AuthContext.jsx`
```code
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

## 📄 Code in `frontend\src\hooks\useAuth.js`
```code
// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, signIn, signOut };
}
```

## 📄 Code in `frontend\src\lib\api.js`
```code
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
```

## 📄 Code in `frontend\src\lib\figmaExport.js`
```code
// Step 1: Generate figmeta JSON
export function generateFigmeta({ pasteId = "agentic-ux", fileKey = "UXL123" } = {}) {
  return {
    pasteId,
    fileKey,
    type: "CLIPBOARD_COPY",
    version: "1.0"
  }
}

// Step 2: Encode figmeta safely
export function encodeFigmeta(meta) {
  const json = JSON.stringify(meta)
  return btoa(unescape(encodeURIComponent(json)))
}

// Step 3: Build the clipboard HTML payload

export function buildClipboardHTML(figmetaB64, figmaB64) {
  return `
    <div>
      <span data-metadata="<!--(figmeta)${figmetaB64}(/figmeta)-->"></span>
      <span data-buffer="<!--(figma)${figmaB64}(/figma)-->"></span>
    </div>
  `
}

export async function copyToFigmaClipboard(figmetaB64, figmaB64) {
  const html = buildClipboardHTML(figmetaB64, figmaB64)
  const blob = new Blob([html], { type: "text/html" })
  await navigator.clipboard.write([
    new ClipboardItem({ "text/html": blob })
  ])
  alert("✅ Copied to clipboard! Paste into Figma now.")
}
```

## 📄 Code in `frontend\src\lib\generateClassicScenegraph.js`
```code
export function generateClassicScenegraph(data) {
  return {
    type: "FRAME",
    name: "Classic Persona Card",
    layoutMode: "VERTICAL",
    padding: 24,
    itemSpacing: 16,
    background: "#FFFFFF",
    children: [
      {
        type: "ELLIPSE",
        name: "Avatar",
        size: 120,
        fill: "#FFE0E0",
        stroke: "#FFFFFF",
        strokeWidth: 4
      },
      {
        type: "TEXT",
        name: "Name",
        characters: data.name,
        fontSize: 20,
        fontWeight: "bold",
        fill: "#111827"
      },
      {
        type: "TEXT",
        name: "Title",
        characters: data.title,
        fontSize: 16,
        fill: "#6B7280"
      },
      {
        type: "FRAME",
        name: "Basic Info",
        layoutMode: "VERTICAL",
        itemSpacing: 4,
        background: "#FEE2E2",
        padding: 12,
        children: [
          { type: "TEXT", characters: `Location: ${data.location}` },
          { type: "TEXT", characters: `Generation: ${data.generation}` },
          { type: "TEXT", characters: `Status: ${data.status}` },
          { type: "TEXT", characters: `Income: ${data.income}` }
        ]
      },
      {
        type: "FRAME",
        name: "Background",
        layoutMode: "VERTICAL",
        itemSpacing: 4,
        children: data.background.map(item => ({
          type: "TEXT",
          characters: `• ${item}`
        }))
      },
      {
        type: "FRAME",
        name: "Goals",
        layoutMode: "VERTICAL",
        itemSpacing: 4,
        children: data.goals.map(item => ({
          type: "TEXT",
          characters: `• ${item}`
        }))
      },
      {
        type: "FRAME",
        name: "Pain Points",
        layoutMode: "VERTICAL",
        itemSpacing: 4,
        children: data.painPoints.map(item => ({
          type: "TEXT",
          characters: `• ${item}`
        }))
      },
      {
        type: "FRAME",
        name: "Behaviour Tags",
        layoutMode: "HORIZONTAL",
        itemSpacing: 6,
        children: data.behaviorTags.map(tag => ({
          type: "TEXT",
          characters: tag,
          fontSize: 12,
          fill: "#EF4444",
          background: "#FECACA",
          padding: 6,
          cornerRadius: 8
        }))
      },
      {
        type: "FRAME",
        name: "Favourite Brands",
        layoutMode: "HORIZONTAL",
        itemSpacing: 6,
        children: data.tools.map(tool => ({
          type: "TEXT",
          characters: tool,
          fontSize: 12,
          fill: "#374151",
          background: "#E5E7EB",
          padding: 6,
          cornerRadius: 8
        }))
      },
      {
        type: "FRAME",
        name: "Motivations",
        layoutMode: "VERTICAL",
        itemSpacing: 6,
        children: Object.entries(data.motivations).map(([label, value]) => ({
          type: "FRAME",
          layoutMode: "VERTICAL",
          children: [
            { type: "TEXT", characters: label },
            {
              type: "RECTANGLE",
              width: 200,
              height: 8,
              fill: "#10B981",
              widthPercent: value
            }
          ]
        }))
      },
      {
        type: "FRAME",
        name: "Personality",
        layoutMode: "VERTICAL",
        itemSpacing: 6,
        children: Object.entries(data.personality).map(([label, value]) => ({
          type: "FRAME",
          layoutMode: "VERTICAL",
          children: [
            { type: "TEXT", characters: label },
            {
              type: "RECTANGLE",
              width: 200,
              height: 8,
              fill: "#6366F1",
              widthPercent: value
            }
          ]
        }))
      }
    ]
  }
}
```

## 📄 Code in `frontend\src\lib\supabase.js`
```code
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## 📄 Code in `frontend\src\lib\utils.js`
```code
export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
```
