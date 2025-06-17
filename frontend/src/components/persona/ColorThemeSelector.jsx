import React, { useState, useRef, useEffect } from "react";

const COLOR_THEMES = [
  { key: "purple", label: "Purple", colors: ["#a259e6", "#7c3aed"] },
  { key: "blue", label: "Blue", colors: ["#3b82f6", "#2563eb"] },
  { key: "green", label: "Green", colors: ["#22c55e", "#16a34a"] },
  { key: "orange", label: "Orange", colors: ["#fb923c", "#f97316"] },
  { key: "pink", label: "Pink", colors: ["#ec4899", "#db2777"] },
  { key: "indigo", label: "Indigo", colors: ["#6366f1", "#4f46e5"] },
  { key: "red", label: "Red", colors: ["#ef4444", "#dc2626"] },
  { key: "teal", label: "Teal", colors: ["#14b8a6", "#0d9488"] },
];

export default function ColorThemeSelector({ value = "purple", onChange }) {
  const [expanded, setExpanded] = useState(false);
  const currentTheme = COLOR_THEMES.find(t => t.key === value) || COLOR_THEMES[0];
  const cardRef = useRef(null);
  const popupRef = useRef(null);
  const [popupStyle, setPopupStyle] = useState({});

  // Position the popup absolutely below the card
  useEffect(() => {
    if (expanded && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setPopupStyle({
        position: 'absolute',
        left: rect.left + window.scrollX,
        top: rect.bottom + 8 + window.scrollY, // 8px gap
        zIndex: 1000,
        minWidth: rect.width,
      });
    }
  }, [expanded]);

  // Close popup on outside click
  useEffect(() => {
    if (!expanded) return;
    function handleClick(e) {
      if (
        cardRef.current && !cardRef.current.contains(e.target) &&
        popupRef.current && !popupRef.current.contains(e.target)
      ) {
        setExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [expanded]);

  return (
    <>
      <div
        className="bg-white rounded-xl shadow px-5 py-2 cursor-pointer select-none transition border border-gray-100 hover:shadow-lg relative"
        onClick={() => setExpanded((prev) => !prev)}
        tabIndex={0}
        role="button"
        aria-expanded={expanded}
        style={{ userSelect: 'none' }}
        ref={cardRef}
      >
        <div className="flex items-center mb-1 gap-2">
          <span className="inline-block bg-purple-100 p-2 rounded-full">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5A6.5 6.5 0 1110 3.5a6.5 6.5 0 010 13z" fill="#a259e6"/></svg>
          </span>
          <div className="flex-1">
            <div className="font-semibold">Color Theme</div>
            <div className="text-xs text-gray-500">{currentTheme.label}</div>
          </div>
          <span className={`transition-transform ml-2 ${expanded ? 'rotate-90' : ''}`}>
            <svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M7 5l5 5-5 5" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </div>
      </div>
      {expanded && (
        <div
          ref={popupRef}
          style={popupStyle}
          className="bg-white rounded-xl shadow-2xl border border-gray-200 p-5 mt-0 absolute animate-fade-in"
        >
          <div className="grid grid-cols-4 gap-3 mb-4 mt-1">
            {COLOR_THEMES.map((theme) => (
              <button
                key={theme.key}
                type="button"
                className={`flex flex-col items-center border rounded-lg p-2 transition focus:outline-none ${
                  value === theme.key ? "border-purple-600 shadow-lg" : "border-gray-200"
                }`}
                onClick={e => { e.stopPropagation(); onChange && onChange(theme.key); }}
                aria-label={theme.label}
              >
                <span className="flex w-4 h-4 rounded-full overflow-hidden mb-1">
                  <span style={{ background: theme.colors[0], flex: 1 }} />
                  <span style={{ background: theme.colors[1], flex: 1 }} />
                </span>
                <span className="text-xs font-medium text-gray-700">{theme.label}</span>
              </button>
            ))}
          </div>
          <div className="bg-gray-50 rounded p-2 text-xs text-gray-600 flex items-center gap-2">
            <span>Current theme:</span>
            <span className="font-semibold text-gray-800 capitalize">{currentTheme.label}</span>
          </div>
        </div>
      )}
    </>
  );
} 