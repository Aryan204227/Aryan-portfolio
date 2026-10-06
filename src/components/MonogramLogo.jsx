import React from 'react';

/**
 * MonogramLogo - Custom stylized cursive/script "AD" monogram
 * inspired by the high-end creative developer "RB" monogram.
 */
export default function MonogramLogo({ className = "w-10 h-10" }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-white hover:text-orange-400 transition-colors duration-300 drop-shadow-[0_2px_12px_rgba(249,115,22,0.3)]"
      >
        {/* Stylized Script A & D Ligature */}
        <path
          d="M 18 64 C 16 52, 28 20, 42 16 C 52 14, 56 22, 50 38 C 44 54, 32 64, 20 64 C 12 64, 14 52, 28 48 C 42 44, 54 44, 60 44"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 40 18 L 26 66"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Flowing D connecting with flourish */}
        <path
          d="M 48 20 C 56 12, 78 12, 84 24 C 90 36, 88 56, 76 64 C 64 72, 48 68, 52 46 C 54 36, 56 22, 54 18"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 52 18 L 50 66"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Subtle decorative baseline swoosh */}
        <path
          d="M 12 70 Q 50 76 90 62"
          stroke="url(#ad-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.8"
        />
        <defs>
          <linearGradient id="ad-gradient" x1="12" y1="70" x2="90" y2="62" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f97316" />
            <stop offset="1" stopColor="#ea580c" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
