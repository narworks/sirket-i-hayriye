"use client";

export function OttomanCorner({ className = "", rotate = 0 }: { className?: string; rotate?: number }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 10 C10 10, 30 10, 40 20 C50 30, 50 50, 40 60 C30 70, 20 60, 25 50 C30 40, 40 45, 35 55"
        stroke="#c9a84c"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M10 10 C10 10, 10 30, 20 40 C30 50, 50 50, 60 40 C70 30, 60 20, 50 25 C40 30, 45 40, 55 35"
        stroke="#c9a84c"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      <circle cx="10" cy="10" r="3" fill="#c9a84c" opacity="0.6" />
      <circle cx="40" cy="20" r="2" fill="#c9a84c" opacity="0.4" />
      <circle cx="20" cy="40" r="2" fill="#c9a84c" opacity="0.4" />
    </svg>
  );
}

export function OttomanDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-8 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ottoman-gold to-transparent" />
      <svg viewBox="0 0 40 40" className="h-6 w-6 text-ottoman-gold" fill="currentColor">
        <path d="M20 2L24 14H36L26 22L30 34L20 26L10 34L14 22L4 14H16L20 2Z" opacity="0.6" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ottoman-gold to-transparent" />
    </div>
  );
}

export function OttomanFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Corners */}
      <OttomanCorner className="absolute -top-2 -left-2 h-16 w-16 md:h-24 md:w-24" rotate={0} />
      <OttomanCorner className="absolute -top-2 -right-2 h-16 w-16 md:h-24 md:w-24" rotate={90} />
      <OttomanCorner className="absolute -bottom-2 -left-2 h-16 w-16 md:h-24 md:w-24" rotate={270} />
      <OttomanCorner className="absolute -bottom-2 -right-2 h-16 w-16 md:h-24 md:w-24" rotate={180} />

      {/* Border */}
      <div className="border border-ottoman-gold/30 p-6 md:p-10">
        {children}
      </div>
    </div>
  );
}
