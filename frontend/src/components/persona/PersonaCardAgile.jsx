import React from "react";

export default React.forwardRef(function PersonaCardAgile({ data }, ref) {
  const { name, role, location, status, archetype, goals, painPoints, motivations, tools, profile_image, profile_image_url } = data;

  const renderBar = (value) => (
    <div className="w-full h-2 bg-blue-100 rounded">
      <div className="h-full bg-blue-600 rounded" style={{ width: `${value}%` }} />
    </div>
  );

  return (
    <div ref={ref} className="bg-white rounded-[20px] p-10 shadow-md max-w-[1308px] text-[15px] text-gray-800">
      <div className="grid grid-cols-[302px_439px_439px] gap-[24px] items-start">
        {/* Column 1 - Avatar + Bio */}
        <div className="flex flex-col items-center text-center gap-12 bg-blue-50 p-6 rounded-xl">
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
            <div className="w-[254px] h-[254px] bg-blue-100 rounded-full border-[6px] border-white" />
          )}
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
});
