const hashHue = (str = "") => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
};

const AnonTag = ({ name, size = "md" }) => {
  const hue = hashHue(name);
  const dotSize = size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative flex items-center justify-center">
        <span
          className={`absolute inline-flex ${dotSize} animate-ping rounded-full opacity-40`}
          style={{ backgroundColor: `hsl(${hue}, 70%, 65%)` }}
        />
        <span
          className={`relative inline-flex ${dotSize} rounded-full`}
          style={{ backgroundColor: `hsl(${hue}, 70%, 65%)` }}
        />
      </span>
      <span
        className={`font-mono-anon tracking-tight text-[#D9D5EC] ${textSize}`}
      >
        {name || "unknown"}
      </span>
    </span>
  );
};

export default AnonTag;
