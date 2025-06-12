import { useEffect, useState, useRef } from 'react';
import PersonaPreview from './PersonaPreview';
import { pollPersonaStatus } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';
import { useParams, useNavigate } from 'react-router-dom';

export default function PersonaViewer() {
  const { session } = useAuth();
  const [persona, setPersona] = useState(null);
  const [designToken, setDesignToken] = useState(null);
  const exportRef = useRef();
  const { id: personaId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (personaId) {
        try {
          const data = await pollPersonaStatus(personaId);
          console.log('pollPersonaStatus API response:', data);
          setPersona({ ...data.persona_json, ...data });
        } catch (err) {
          console.error(err);
        }
      }
    }
    fetchData();
  }, [personaId]);

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

  return (
    <div className="p-6 bg-canvas-repeat bg-repeat">
      <button onClick={() => navigate('/dashboard')} className="mb-4 bg-gray-200 px-3 py-1 rounded">
        ← Back
      </button>
      {designToken && (
        <button
          className="mb-4 ml-4 bg-blue-600 text-white px-3 py-1 rounded"
          onClick={() => {
            navigator.clipboard.writeText(designToken);
            alert('🔗 Design token copied. Paste into Figma plugin to render.');
          }}
        >
          🔗 Copy Token for Figma
        </button>
      )}
      <div className="flex gap-2 mb-4">
        <button onClick={handleExportPDF} className="bg-purple-600 text-white px-3 py-1 rounded">Export as PDF</button>
        <button onClick={handleExportSVG} className="bg-green-600 text-white px-3 py-1 rounded">Export as SVG</button>
        <button onClick={handleExportJPG} className="bg-pink-600 text-white px-3 py-1 rounded">Export as JPG</button>
      </div>
      <PersonaPreview ref={exportRef} persona={persona} loading={!persona} />
    </div>
  );
}
