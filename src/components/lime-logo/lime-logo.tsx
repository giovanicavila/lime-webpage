interface LimeLogoProps {
  size?: number;
  className?: string;
}

export function LimeLogo({ size = 28, className }: LimeLogoProps) {
  return (
    <svg
      aria-label="Lime DB logo"
      className={className}
      fill="none"
      height={size}
      role="img"
      viewBox="0 0 28 28"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer skin */}
      <circle cx="14" cy="14" fill="#4ade80" r="13" />
      {/* Flesh */}
      <circle cx="14" cy="14" fill="#bbf7d0" r="10.5" />
      {/* Segments */}
      <line
        stroke="#22c55e"
        strokeLinecap="round"
        strokeWidth="0.9"
        x1="14"
        x2="14"
        y1="3.5"
        y2="24.5"
      />
      <line
        stroke="#22c55e"
        strokeLinecap="round"
        strokeWidth="0.9"
        x1="3.5"
        x2="24.5"
        y1="14"
        y2="14"
      />
      <line
        stroke="#22c55e"
        strokeLinecap="round"
        strokeWidth="0.9"
        x1="6.4"
        x2="21.6"
        y1="6.4"
        y2="21.6"
      />
      <line
        stroke="#22c55e"
        strokeLinecap="round"
        strokeWidth="0.9"
        x1="21.6"
        x2="6.4"
        y1="6.4"
        y2="21.6"
      />
      {/* Center pith */}
      <circle cx="14" cy="14" fill="#4ade80" r="2" />
    </svg>
  );
}
