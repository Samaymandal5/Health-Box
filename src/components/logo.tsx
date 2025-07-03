import * as React from "react";

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* The purple person/i icon */}
      <g>
        <rect x="21" y="21" width="6" height="11" fill="#5A39A8" />
        <circle cx="24" cy="17" r="4" fill="#5A39A8" />
        <circle cx="24" cy="17" r="2.5" fill="white" />
        <circle cx="24" cy="17" r="1.5" fill="#5A39A8" />
      </g>
      
      {/* The red T-shaped cross */}
      <path d="M16 25H38V31H30V39H18V31H16V25Z" fill="#E54D42"/>

      {/* The red swoosh */}
      <path d="M28.5 16C37 11, 47 20, 40 32.5" stroke="#E54D42" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
