export function CityIllustration() {
  return (
    <svg
      aria-label="由城市、高铁、山川与住宅组成的虚构人生地图"
      className="h-auto w-full"
      role="img"
      viewBox="0 0 720 330"
    >
      <defs>
        <pattern id="windows" width="20" height="24" patternUnits="userSpaceOnUse">
          <rect width="6" height="8" x="4" y="5" fill="#f3efe5" opacity=".72" />
        </pattern>
      </defs>
      <path d="M14 265C117 219 158 225 236 260s158 30 236-10 139-39 234 7" fill="none" stroke="#1b2a35" strokeWidth="2" />
      <path d="M0 292c80-31 118-22 184-1s117 10 178-15 122-23 184-3 106 30 174 5v52H0Z" fill="#2d7a67" opacity=".14" />
      <path d="m20 251 79-91 64 91Zm37 0 86-128 99 128Z" fill="#50657b" opacity=".16" stroke="#50657b" strokeWidth="2" />
      <path d="M190 260V129h72v131m13 0V76h98v184m15 0V111h64v149m13 0V45h93v215m16 0V143h60v117" fill="#1b2a35" />
      <path d="M190 260V129h72v131m13 0V76h98v184m15 0V111h64v149m13 0V45h93v215m16 0V143h60v117" fill="url(#windows)" />
      <path d="M298 76 324 39l25 37M486 45l25-24 24 24" fill="none" stroke="#c53d32" strokeWidth="4" />
      <path d="M94 274c84-39 171-34 260-4 86 29 173 22 276-16" fill="none" stroke="#c53d32" strokeDasharray="8 10" strokeWidth="3" />
      <g transform="translate(321 241)">
        <path d="M0 13h81l17 13H12Z" fill="#f3efe5" stroke="#1b2a35" strokeWidth="2" />
        <path d="M18 13 30 2h45l10 11" fill="#f3efe5" stroke="#1b2a35" strokeWidth="2" />
        <circle cx="27" cy="27" r="6" fill="#1b2a35" />
        <circle cx="77" cy="27" r="6" fill="#1b2a35" />
      </g>
      <circle cx="652" cy="62" r="34" fill="#d3a64a" opacity=".85" />
      <path d="M641 51h22m-22 11h22m-22 11h22" stroke="#1b2a35" strokeWidth="2" />
    </svg>
  );
}
