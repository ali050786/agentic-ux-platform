import { useState, useEffect, useRef } from "react";
import PersonaForm from "./PersonaForm";
import PersonaPreview from "./PersonaPreview";
import { generatePersona, pollPersonaStatus, updatePersonaTheme } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Accordion, AccordionItem } from "../ui/accordion";
import { Select } from "../ui/select";
import { Switch } from "../ui/switch";
import logo from "../../logo.svg";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import { copyToFigmaClipboard, generateFigmeta, encodeFigmeta } from '../../lib/figmaExport';
import { Palette, FileText, FileImage, Figma } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "../ui/alert-dialog";
import ColorThemeSelector from "./ColorThemeSelector";

const socialOptions = [
  { value: "linkedin", label: "LinkedIn (4:5, Recommended)" },
  { value: "twitter", label: "Twitter" },
  { value: "facebook", label: "Facebook" },
];

export default function PersonaBuilder() {
  const [loading, setLoading] = useState(false);
  const [personaData, setPersonaData] = useState(null);
  const [showGoals, setShowGoals] = useState(true);
  const [showBackground, setShowBackground] = useState(true);
  const [showPainPoints, setShowPainPoints] = useState(true);
  const [showIdentity, setShowIdentity] = useState(true);
  const [social, setSocial] = useState(socialOptions[0].value);
  const [colorPalette, setColorPalette] = useState(true);
  const [typography, setTypography] = useState(true);
  const [backgroundDesign, setBackgroundDesign] = useState(true);
  const [slidesCounter, setSlidesCounter] = useState(true);
  const [identityBrand, setIdentityBrand] = useState(true);
  const { session } = useAuth();
  const pollingRef = useRef();
  const navigate = useNavigate();
  const { id: personaId } = useParams();
  const exportRef = useRef();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const [colorTheme, setColorTheme] = useState(null);

  const handleGenerate = async (formData) => {
    if (!formData) return;
    if (!session) {
      setAlertTitle("Login Required");
      setAlertDescription("You must be logged in to generate a persona. Please log in and try again.");
      setAlertOpen(true);
      return;
    }
    try {
      setLoading(true);
      const result = await generatePersona(formData, session?.access_token);
      setPersonaData(result);
      if (result.id) {
        startPolling(result.id);
      }
    } catch (error) {
      let message = error?.message || "";
      let backendMsg = message.replace(/^Persona generation failed:/, "").trim();
      if (
        message.includes("401") ||
        message.toLowerCase().includes("unauthorized") ||
        message.includes("403") ||
        backendMsg.includes("Missing token")
      ) {
        setAlertTitle("Login Required");
        setAlertDescription("You must be logged in to generate a persona. Please log in and try again.");
      } else {
        setAlertTitle("Persona Generation Failed");
        setAlertDescription(backendMsg || "Something went wrong. Please try again.");
      }
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const startPolling = (id) => {
    clearInterval(pollingRef.current);
    pollingRef.current = setInterval(async () => {
      try {
        const updated = await pollPersonaStatus(id);
        if (updated.profile_image_url) {
          setPersonaData((prev) => ({ ...prev, profile_image_url: updated.profile_image_url }));
          clearInterval(pollingRef.current);
        }
      } catch (e) {}
    }, 2000);
  };

  useEffect(() => {
    if (personaId) {
      // If there's an id in the URL, load the persona
      (async () => {
        setLoading(true);
        try {
          const data = await pollPersonaStatus(personaId);
          setPersonaData({ ...data.persona_json, ...data });
        } catch (err) {
          setPersonaData(null);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setPersonaData(null);
    }
    return () => {
      clearInterval(pollingRef.current);
    };
  }, [personaId]);

  // When personaData changes, update colorTheme from personaData.theme (if present)
  useEffect(() => {
    if (personaData && personaData.theme) {
      setColorTheme(personaData.theme);
    } else if (personaData) {
      setColorTheme('purple');
    }
  }, [personaData]);

  // Persona card element toggles
  const cardToggles = {
    showGoals,
    showBackground,
    showPainPoints,
    showIdentity,
  };

  // Export handlers
  const handleExportSVG = async () => {
    if (!exportRef.current) return;
    const dataUrl = await htmlToImage.toSvg(exportRef.current);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'persona.svg';
    link.click();
  };

  const handleExportJPG = async () => {
    if (!exportRef.current) return;
    const dataUrl = await htmlToImage.toJpeg(exportRef.current, { quality: 0.95 });
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'persona.jpg';
    link.click();
  };

  const handleExportPDF = async () => {
    if (!exportRef.current) return;
    const { width, height } = exportRef.current.getBoundingClientRect();
    const dataUrl = await htmlToImage.toPng(exportRef.current, { width, height });
    const pdf = new jsPDF({
      orientation: width > height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [width, height]
    });
    pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
    pdf.save('persona.pdf');
  };

  // Color theme change handler
  const handleThemeChange = async (newTheme) => {
    setColorTheme(newTheme);
    if (personaData && personaData.id && session?.access_token) {
      try {
        const updated = await updatePersonaTheme(personaData.id, newTheme, session.access_token);
        setPersonaData((prev) => ({ ...prev, ...updated }));
        setColorTheme(updated.theme || newTheme);
      } catch (err) {
        // Optionally show error to user
        console.error('Failed to update theme:', err);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Alert Dialog for errors */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertOpen(false)} autoFocus>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Sidebar */}
      <aside className="w-full md:w-80 p-4 bg-white flex flex-col gap-6 h-screen overflow-y-auto border border-purple-200 custom-scrollbar"
        style={{ boxShadow: "0 2px 12px 0 rgba(80, 0, 120, 0.07)" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-lg text-purple-700">AI Persona Generator</span>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center flex-1 mt-20">
            <div className="w-10 h-10 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mb-6"></div>
            <div className="text-purple-700 font-semibold text-lg mb-1">We are working on your persona...</div>
            <div className="text-gray-500 text-sm text-center">This may take a few moments. Please wait!</div>
          </div>
        ) : personaData ? (
          <>
            {/* Color Theme Selector - only visible after persona is generated */}
            <ColorThemeSelector value={colorTheme || 'purple'} onChange={handleThemeChange} />
            <div className="bg-white rounded-xl shadow px-5 py-5 w-full max-w-xs">
              <div className="space-y-4">
                {/* PDF Export */}
                <div className="border rounded-lg px-3 py-3 flex flex-col items-start">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl"><FileText strokeWidth={1.5}  className="inline w-6 h-6 align-text-bottom" /></span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">PDF Export</span>
                        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded">Popular</span>
                      </div>
                      <div className="text-xs text-gray-500">Print-ready format for sharing and presentations</div>
                    </div>
                  </div>
                  <button onClick={handleExportPDF} className="mt-4 mx-auto bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold px-6 py-2 rounded border border-purple-200 w-full">Export</button>
                </div>
                {/* Figma Plugin */}
                <div className="border rounded-lg px-3 py-3 flex flex-col items-start">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl"><Figma strokeWidth={1.5} className="inline w-6 h-6 align-text-bottom" /></span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium flex items-center gap-1">Figma Plugin</span>
                        <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded">Design</span>
                      </div>
                      <div className="text-xs text-gray-500">Click Export and paste the token into the Figma plugin</div>
                    </div>
                  </div>
                  {personaData.design_token && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(personaData.design_token);
                        alert('Token copied! Paste it into the Figma plugin.');
                      }}
                      className="mt-4 mx-auto bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold px-6 py-2 rounded border border-purple-200 w-full"
                    >
                      Export
                    </button>
                  )}
                </div>
                {/* JPG Export */}
                <div className="border rounded-lg px-3 py-3 flex flex-col items-start">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl"><FileImage  strokeWidth={1.5} className="inline w-6 h-6 align-text-bottom" /></span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">JPG Image</span>
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">Try Now</span>
                      </div>
                      <div className="text-xs text-gray-500">High quality image for web and print</div>
                    </div>
                  </div>
                  <button onClick={handleExportJPG} className="mt-4 mx-auto bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold px-6 py-2 rounded border border-purple-200 w-full">Export</button>
                </div>
                <button
                  className="w-full mt-6 bg-purple-600 text-white px-4 py-2 rounded font-bold hover:bg-purple-700 transition"
                  onClick={() => {
                    setPersonaData(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  + Create Another Persona
                </button>
              </div>
            </div>
          </>
        ) : (
          <PersonaForm onGenerate={handleGenerate} loading={loading} />
        )}
      </aside>
      {/* Main Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto bg-canvas-repeat bg-repeat">
        <div className="flex flex-col items-center justify-center w-full max-w-xl">
          <PersonaPreview ref={exportRef} persona={personaData} loading={loading} cardToggles={cardToggles} colorTheme={colorTheme} />
          
        </div>
      </main>
    </div>
  );
}
