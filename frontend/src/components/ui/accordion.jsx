import React, { useState } from "react";

export function Accordion({ children }) {
  return <div className="space-y-2">{children}</div>;
}

export function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-md">
      <button
        type="button"
        className="w-full flex justify-between items-center px-4 py-2 text-left font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-t-md focus:outline-none"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{title}</span>
        <span>{open ? "-" : "+"}</span>
      </button>
      {open && <div className="px-4 py-2 bg-white">{children}</div>}
    </div>
  );
} 