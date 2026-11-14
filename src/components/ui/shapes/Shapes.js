// Decorative "Memphis" shapes from demo.png. Purely visual → aria-hidden.
// Colour comes from `currentColor`, so set it with a text-* class
// (e.g. <Ring className="text-cyan" />).

function svgProps({ width, height, className, style }) {
  return {
    width,
    height,
    className,
    style,
    "aria-hidden": true,
    focusable: "false",
  };
}

// O ring
export function Ring({ size = 48, strokeWidth = 12, className, style }) {
  return (
    <svg viewBox="0 0 100 100" {...svgProps({ width: size, height: size, className, style })}>
      <circle cx="50" cy="50" r={50 - strokeWidth / 2} fill="none" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}

// Outline triangle
export function Triangle({ size = 56, strokeWidth = 6, className, style }) {
  return (
    <svg viewBox="0 0 100 100" {...svgProps({ width: size, height: size, className, style })}>
      <polygon points="50,7 95,88 5,88" fill="none" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}

// Short diagonal stroke
export function Dash({ size = 36, strokeWidth = 10, className, style }) {
  return (
    <svg viewBox="0 0 100 100" {...svgProps({ width: size, height: size, className, style })}>
      <line x1="12" y1="88" x2="88" y2="12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

// Wavy squiggle
export function Squiggle({ size = 56, strokeWidth = 9, className, style }) {
  return (
    <svg viewBox="0 0 120 60" {...svgProps({ width: size, height: size / 2, className, style })}>
      <path
        d="M6 34 Q 19 6 32 30 T 58 30 T 84 30 T 112 28"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Small filled circle
export function Dot({ size = 14, className, style }) {
  return (
    <svg viewBox="0 0 10 10" {...svgProps({ width: size, height: size, className, style })}>
      <circle cx="5" cy="5" r="5" fill="currentColor" />
    </svg>
  );
}

// Large thin dashed circle (behind the About photo in the demo)
export function DashedCircle({ size = 320, className, style }) {
  const r = size / 2 - 1;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} {...svgProps({ width: size, height: size, className, style })}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="3 7"
      />
    </svg>
  );
}

// Dotted grid square (behind the big name in demo panels 3–6)
export function DotGrid({ width = 220, height = 220, gap = 14, radius = 1.3, className, style }) {
  const id = `dotgrid-${width}-${height}-${gap}`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} {...svgProps({ width, height, className, style })}>
      <defs>
        <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse">
          <circle cx={gap / 2} cy={gap / 2} r={radius} fill="currentColor" />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${id})`} />
    </svg>
  );
}

// Wireframe polyhedron — the demo's signature overlay on the hero photo
const V = {
  top: [95, 6],
  left: [12, 104],
  right: [190, 92],
  front: [72, 150],
  back: [138, 66],
  bottom: [120, 234],
};
const EDGES = [
  ["top", "left"],
  ["top", "back"],
  ["top", "front"],
  ["top", "right"],
  ["left", "front"],
  ["front", "right"],
  ["right", "back"],
  ["left", "back"],
  ["left", "bottom"],
  ["front", "bottom"],
  ["right", "bottom"],
  ["back", "bottom"],
];

export function Wireframe({ size = 220, strokeWidth = 5, className, style }) {
  return (
    <svg viewBox="0 0 200 240" {...svgProps({ width: size, height: size * 1.2, className, style })}>
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" fill="none">
        {EDGES.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={V[a][0]} y1={V[a][1]} x2={V[b][0]} y2={V[b][1]} />
        ))}
      </g>
    </svg>
  );
}
