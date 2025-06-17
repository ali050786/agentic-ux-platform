import React from "react";

const COLOR_MAP = {
  purple: {
    bgLight: "bg-purple-50",
    bg: "bg-purple-100",
    text: "text-purple-600",
    border: "border-purple-200",
    tagBg: "bg-purple-100",
    tagText: "text-purple-800",
    bar: "bg-purple-600",
    barBg: "bg-purple-100",
  },
  blue: {
    bgLight: "bg-blue-50",
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-200",
    tagBg: "bg-blue-100",
    tagText: "text-blue-800",
    bar: "bg-blue-600",
    barBg: "bg-blue-100",
  },
  green: {
    bgLight: "bg-green-50",
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-200",
    tagBg: "bg-green-100",
    tagText: "text-green-800",
    bar: "bg-green-600",
    barBg: "bg-green-100",
  },
  orange: {
    bgLight: "bg-orange-50",
    bg: "bg-orange-100",
    text: "text-orange-600",
    border: "border-orange-200",
    tagBg: "bg-orange-100",
    tagText: "text-orange-800",
    bar: "bg-orange-600",
    barBg: "bg-orange-100",
  },
  pink: {
    bgLight: "bg-pink-50",
    bg: "bg-pink-100",
    text: "text-pink-600",
    border: "border-pink-200",
    tagBg: "bg-pink-100",
    tagText: "text-pink-800",
    bar: "bg-pink-600",
    barBg: "bg-pink-100",
  },
  indigo: {
    bgLight: "bg-indigo-50",
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    border: "border-indigo-200",
    tagBg: "bg-indigo-100",
    tagText: "text-indigo-800",
    bar: "bg-indigo-600",
    barBg: "bg-indigo-100",
  },
  red: {
    bgLight: "bg-red-50",
    bg: "bg-red-100",
    text: "text-red-600",
    border: "border-red-200",
    tagBg: "bg-red-100",
    tagText: "text-red-800",
    bar: "bg-red-600",
    barBg: "bg-red-100",
  },
  teal: {
    bgLight: "bg-teal-50",
    bg: "bg-teal-100",
    text: "text-teal-600",
    border: "border-teal-200",
    tagBg: "bg-teal-100",
    tagText: "text-teal-800",
    bar: "bg-teal-600",
    barBg: "bg-teal-100",
  },
};

export default React.forwardRef(function PersonaCardEmpathy({ data, colorTheme = "pink" }, ref) {
  const theme = COLOR_MAP[colorTheme] || COLOR_MAP.pink;
  const { name, title, location, generation, status, income, archetype, background, personality, behaviorTags, painPoints, motivations, scenarios, profile_image, profile_image_url } = data;

  const renderBar = (value) => (
    <div className={`w-full h-2 ${theme.barBg} rounded`}>
      <div className={`h-full ${theme.bar} rounded`} style={{ width: `${value}%` }} />
    </div>
  );

  return (
    <div ref={ref} className="bg-white rounded-[20px] p-10 shadow-md max-w-[1308px] text-sm text-gray-800">
      <div className="grid grid-cols-[302px_439px_439px] gap-[24px] items-start">
        {/* Column 1 - Avatar + Name + Role + Bio */}
        <div className={`flex flex-col items-center text-center gap-12 ${theme.bgLight} p-6 rounded-xl`}>
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
            <div className={`w-[254px] h-[254px] ${theme.bg} rounded-full border-[6px] border-white`} />
          )}
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className={`${theme.text} font-semibold mt-3`}>{title}</p>
          </div>
          <div className={`${theme.bg} p-4 rounded-xl w-full text-left space-y-1`}>
            {location && <p><strong>Location</strong>: {location}</p>}
            {generation && <p><strong>Generation/Age</strong>: {generation}</p>}
            {archetype && <p><strong>Archetype</strong>: {archetype}</p>}
          </div>
        </div>

        {/* Column 2 - Background, Behavior Tags, Personality */}
        <div className="flex flex-col gap-6 h-full">
          {background?.length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl`}>
              <h3 className="font-semibold mb-1">Background</h3>
              <ul className="list-disc list-outside pl-4">
                {background.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}

          {behaviorTags?.length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl`}>
              <h3 className="font-semibold mb-2">Behavior Tags</h3>
              <div className="flex flex-wrap gap-2">
                {behaviorTags.map((tag, i) => (
                  <span key={i} className={`${theme.tagBg} ${theme.tagText} text-xs px-3 py-1 rounded-full`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {personality && Object.keys(personality).length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl`}>
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
            <div className={`${theme.bg} p-4 rounded-xl`}>
              <h3 className="font-semibold mb-1">Pain Points</h3>
              <ul className="list-disc list-outside pl-4">
                {painPoints.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}

          {motivations && Object.keys(motivations).length > 0 && (
            <div className={`${theme.bg} p-4 rounded-xl`}>
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
            <div className={`${theme.bg} p-4 rounded-xl flex-1`}>
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
