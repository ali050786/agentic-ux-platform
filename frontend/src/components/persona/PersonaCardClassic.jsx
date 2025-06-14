import React from "react";
export default React.forwardRef(function PersonaCardClassic({ data }, ref) {
  const { name, title, location, generation, status, income, archetype, background, personality, behaviorTags, goals, painPoints, motivations, tools, profile_image, profile_image_url } = data;

  const renderBar = (value) => (
    <div className="w-full h-2 bg-red-100 rounded">
      <div className="h-full bg-red-600 rounded" style={{ width: `${value}%` }} />
    </div>
  );

  return (
    <div ref={ref} className="bg-white rounded-[20px] p-10 shadow-md max-w-[1308px] text-sm text-gray-800">
      <div className="grid grid-cols-[302px_439px_439px] gap-[24px]">
        {/* Column 1 - Avatar & Info */}
        <div className="flex flex-col items-center text-center gap-12 bg-red-50 p-6 rounded-xl">
          {/* Avatar/Profile Image */}
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
            <div className="w-[254px] h-[254px] rounded-full bg-red-100 border-[6px] border-white" />
          )}

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
});
