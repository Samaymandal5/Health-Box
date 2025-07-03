import * as React from "react";

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Purple Parts */}
      <circle cx="26" cy="10" r="7" fill="#5A39A8" />
      <rect x="22" y="17" width="8" height="8" fill="#5A39A8" />
      <rect x="8" y="25" width="14" height="8" fill="#5A39A8" />
      
      {/* Red Parts */}
      <rect x="22" y="25" width="8" height="8" fill="#E54D42" />
      <rect x="30" y="25" width="14" height="8" fill="#E54D42" />
      <rect x="22" y="33" width="8" height="14" fill="#E54D42" />

      {/* Red Swoosh */}
      <path d="M34 10 C 48 2, 50 22, 36 28" stroke="#E54D42" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Head details */}
      <circle cx="26" cy="10" r="3.5" fill="white" />
      <circle cx="26" cy="10" r="2" fill="#5A39A8" />
    </svg>
  );
}
