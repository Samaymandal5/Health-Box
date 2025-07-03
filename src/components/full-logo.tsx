import * as React from "react";

export function FullLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Graphic Part */}
      <g transform="translate(0, 2)">
        <circle cx="26" cy="14" r="7" fill="#5A39A8" />
        <rect x="22" y="21" width="8" height="10" fill="#5A39A8" />
        <rect x="8" y="25" width="14" height="8" fill="#5A39A8" />
        <rect x="22" y="25" width="8" height="8" fill="#E54D42" />
        <rect x="30" y="25" width="14" height="8" fill="#E54D42" />
        <rect x="22" y="33" width="8" height="14" fill="#E54D42" />
        <path d="M34 14 C 48 6, 50 26, 36 32" stroke="#E54D42" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="26" cy="14" r="3.5" fill="white" />
        <circle cx="26" cy="14" r="2" fill="#5A39A8" />
      </g>
      
      {/* Text Part */}
      <text x="60" y="36" fontFamily="'PT Sans', sans-serif" fontSize="16" fontWeight="bold" fill="#5A39A8">HEALTH BOX</text>
      <line x1="60" y1="41" x2="121" y2="41" stroke="#E54D42" strokeWidth="2" />
      <line x1="121" y1="41" x2="182" y2="41" stroke="#5A39A8" strokeWidth="2" />
      <text x="85" y="54" fontFamily="'PT Sans', sans-serif" fontSize="10" fill="#E54D42" letterSpacing="0.5">MEDICAL CENTER</text>
    </svg>
  );
}
