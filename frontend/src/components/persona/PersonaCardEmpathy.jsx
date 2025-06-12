import React from "react";

export default React.forwardRef(function PersonaCardEmpathy({ data }, ref) {
  const { name, title, location, generation, status, income, archetype, background, personality, behaviorTags, painPoints, motivations, scenarios, profile_image, profile_image_url } = data;

  const renderBar = (value) => (
    <div className="w-full h-2 bg-pink-100 rounded">
      <div className="h-full bg-pink-600 rounded" style={{ width: `${value}%` }} />
    </div>
  );

  return (
    <div ref={ref} className="bg-white rounded-[20px] p-10 shadow-md max-w-[1308px] text-sm text-gray-800">
      <div className="grid grid-cols-[302px_439px_439px] gap-[24px] items-start">
        {/* Column 1 - Avatar + Name + Role + Bio */}
        <div className="flex flex-col items-center text-center gap-12 bg-pink-50 p-6 rounded-xl">
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
            <div className="w-[254px] h-[254px] bg-pink-100 rounded-full border-[6px] border-white" />
          )}
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
});
