import React from "react";

export default React.forwardRef(function PersonaCardJTBD({ data }, ref) {
  const { name, role, location, generation, status, income, archetype, goals_jtbd, motivations, scenarios, tools, profile_image, profile_image_url } = data;

  const renderBar = (value) => (
    <div className="w-full h-2 bg-rose-100 rounded">
      <div className="h-full bg-rose-600 rounded" style={{ width: `${value}%` }} />
    </div>
  );

  return (
    <div ref={ref} className="bg-white rounded-[20px] p-10 shadow-md max-w-[1308px] text-[15px] text-gray-800">
      <div className="grid grid-cols-[302px_439px_439px] gap-[24px] items-start min-h-[720px]">
        {/* Column 1 - Avatar + Bio */}
        <div className="flex flex-col items-center text-center gap-12 bg-rose-50 p-6 rounded-xl">
          {profile_image_url ? (
            <img
              src={profile_image_url}
              alt={name}
              className="w-[254px] h-[254px] rounded-full object-cover border-[6px] border-white bg-gray-100"
              width={254}
              height={254}
            />
          ) : profile_image ? (
            <img
              src={`data:image/png;base64,${profile_image}`}
              alt={name}
              className="w-[254px] h-[254px] rounded-full object-cover border-[6px] border-white bg-gray-100"
              width={254}
              height={254}
            />
          ) : (
            <div className="w-[254px] h-[254px] bg-rose-200 rounded-full border-[6px] border-white" />
          )}
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
});
