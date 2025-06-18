import PersonaCard from "./PersonaCard"
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { FileUser } from "lucide-react";

const PersonaPreview = React.forwardRef(function PersonaPreview({ persona, loading, cardToggles, colorTheme }, ref) {
  const [scale, setScale] = useState(1);

  if (loading) {
    // Skeleton loader UI
    return (
      <div className="flex flex-col items-center justify-center h-full w-full animate-pulse">
        <Card className="max-w-xl w-full flex flex-col items-center justify-center p-10 rounded-[20px] shadow-md bg-white/90">
          <div className="mb-4 leading-none">
            <div className="w-[90px] h-[90px] bg-gray-200 rounded-full" />
          </div>
          <div className="h-6 w-1/2 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-2/3 bg-gray-100 rounded" />
        </Card>
      </div>
    );
  }

  if (!persona) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Card className="max-w-xl w-full flex flex-col items-center justify-center p-10 rounded-[20px] shadow-md bg-white/90">
          <div className="mb-4 leading-none"><FileUser  strokeWidth={1} className="w-[90px] h-[90px] text-gray-400" /></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to create a persona</h2>
          <p className="text-base text-gray-500">Fill out the form to generate your user persona.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="mt-[160px]" style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
      <PersonaCard data={persona} cardToggles={cardToggles} ref={ref} colorTheme={colorTheme} />
    </div>
  )
});

export default PersonaPreview;
