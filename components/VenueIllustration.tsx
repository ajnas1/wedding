// Animated golden-mandapam illustration (pure SVG + CSS, classes live in app/globals.css).
const PETALS = [
  { x: 40, d: 0, c: "#F29BB5" }, { x: 95, d: 2.2, c: "#FFC94A" }, { x: 150, d: 4.1, c: "#F29BB5" },
  { x: 205, d: 1.2, c: "#FFB02E" }, { x: 255, d: 3.3, c: "#FFFFFF" }, { x: 310, d: 5.2, c: "#F29BB5" },
  { x: 125, d: 6.4, c: "#FFB02E" }, { x: 280, d: 7.3, c: "#FFC94A" },
];

function Lotus({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0C-14-6-16-26-2-38C4-26 4-10 0 0Z" fill="#F4A6C2" />
      <path d="M0 0C14-6 16-26 2-38C-4-26-4-10 0 0Z" fill="#F4A6C2" />
      <path d="M0 0C-24 0-34-18-26-30C-12-24-2-14 0 0Z" fill="#EE86AA" />
      <path d="M0 0C24 0 34-18 26-30C12-24 2-14 0 0Z" fill="#EE86AA" />
      <path d="M0 0C-6-12-4-30 0-44C4-30 6-12 0 0Z" fill="#F9C3D6" />
    </g>
  );
}

function Banana({ x, flip = false }: { x: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} 462) scale(${flip ? -1 : 1} 1)`}>
      <g className="v-leaf">
        <path d="M0 0C-34-40-40-120-6-170C14-120 14-50 0 0Z" fill="#3F8F3A" />
        <path d="M0 0C-3-60-4-110-6-170" stroke="#2C6E2C" strokeWidth="1.5" />
        <path d="M0 0C30-36 70-70 96-70C84-30 40-4 0 0Z" fill="#58A745" />
        <path d="M0 0C-44-14-70-50-72-82C-36-70-8-40 0 0Z" fill="#4E9B3F" />
        <path d="M0 0C-8-90 20-140 52-150C54-100 28-30 0 0Z" fill="#6DB654" />
        <path d="M0 0C20-60 36-110 52-150" stroke="#3F8F3A" strokeWidth="1.3" />
      </g>
    </g>
  );
}

function Pot({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 478)`}>
      <path d="M-26 0c-4-14 0-26 6-30h40c6 4 10 16 6 30Z" fill="#8A5A2B" stroke="#E0B04A" strokeWidth="1.5" />
      {[[-16, -36, "#FFB02E"], [-4, -42, "#FFD23F"], [10, -38, "#E5487A"], [20, -32, "#FFFFFF"], [-24, -30, "#FFFFFF"], [0, -30, "#FFB02E"], [-10, -30, "#E5487A"]].map(([cx, cy, f], i) => (
        <circle key={i} cx={cx as number} cy={cy as number} r="7" fill={f as string} />
      ))}
    </g>
  );
}

function Hanging({ x }: { x: number }) {
  return (
    <g className="v-sway">
      <path d={`M${x} 0V92`} stroke="#F4A91F" strokeWidth="8" strokeDasharray="0 9" strokeLinecap="round" />
      <path d={`M${x} 4V92`} stroke="#FFFFFF" strokeWidth="5" strokeDasharray="0 9" strokeLinecap="round" transform="translate(5 0)" />
      <circle cx={x} cy="98" r="7" fill="#E5487A" />
    </g>
  );
}

export default function VenueIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 360 540" role="img" aria-label="Animated illustration of a bride and groom exchanging garlands under a golden mandapam">
      <defs>
        <linearGradient id="vSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CDEDE5" /><stop offset=".45" stopColor="#FCEFD9" /><stop offset="1" stopColor="#F8E3C4" />
        </linearGradient>
        <linearGradient id="vGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#C58A22" /><stop offset=".45" stopColor="#F2C85B" /><stop offset="1" stopColor="#B97E1E" />
        </linearGradient>
        <linearGradient id="vGoldV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F5D06B" /><stop offset="1" stopColor="#CC9327" />
        </linearGradient>
        <radialGradient id="vGlow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#FFF6DC" /><stop offset="1" stopColor="#FFF6DC" stopOpacity="0" />
        </radialGradient>
        <pattern id="vLat" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 5L5 0L10 5L5 10Z" fill="none" stroke="#A8701A" strokeWidth=".8" />
        </pattern>
        <clipPath id="vGroomClip"><ellipse cx="140" cy="274" rx="22" ry="26" /></clipPath>
        <clipPath id="vBrideClip"><ellipse cx="225" cy="278" rx="22" ry="26" /></clipPath>
      </defs>

      {/* sky + distant gopuram */}
      <rect width="360" height="540" fill="url(#vSky)" />
      <ellipse cx="40" cy="120" rx="60" ry="26" fill="#F7D9E4" opacity=".7" />
      <ellipse cx="330" cy="110" rx="46" ry="22" fill="#FFFFFF" opacity=".7" />
      <g fill="#D9C3CF" opacity=".85">
        <rect x="318" y="170" width="42" height="150" /><rect x="324" y="150" width="30" height="22" /><rect x="330" y="134" width="18" height="18" />
      </g>

      {/* glowing hall behind the couple */}
      <rect x="82" y="166" width="196" height="300" fill="#FDEBD0" />
      <ellipse className="v-glow" cx="180" cy="320" rx="120" ry="150" fill="url(#vGlow)" />
      {/* stone inner pillars */}
      {[118, 216].map((x) => (
        <g key={x}>
          <rect x={x} y="172" width="26" height="292" fill="#CDB4C0" />
          <rect x={x - 5} y="168" width="36" height="14" fill="#B79BAA" />
          <rect x={x - 5} y="450" width="36" height="14" fill="#B79BAA" />
        </g>
      ))}

      {/* floor */}
      <path d="M70 464H290L360 540H0Z" fill="#F4DFC2" />
      <path d="M96 464L40 540M264 464L320 540" stroke="#E0B04A" strokeWidth="3" />

      {/* golden pillars */}
      {[[40, 1], [290, -1]].map(([x]) => (
        <g key={x}>
          <rect x={x + 6} y="164" width="22" height="296" fill="url(#vGold)" />
          <path d={`M${x - 4} 164H${x + 38}L${x + 32} 192H${x + 2}Z`} fill="url(#vGoldV)" stroke="#A8701A" strokeWidth="1" />
          <path d={`M${x + 2} 380C${x - 8} 392 ${x - 4} 412 ${x + 17} 420C${x + 38} 412 ${x + 42} 392 ${x + 32} 380Z`} fill="url(#vGoldV)" stroke="#A8701A" strokeWidth="1" />
          <path d={`M${x - 6} 440H${x + 40}L${x + 46} 464H${x - 12}Z`} fill="url(#vGoldV)" stroke="#A8701A" strokeWidth="1" />
          <path d={`M${x + 17} 196V376`} stroke="#A8701A" strokeWidth="1" strokeDasharray="3 5" />
        </g>
      ))}

      {/* dome + tiers */}
      <g>
        <path className="v-glow" d="M126 80C126 40 152 22 180 22C208 22 234 40 234 80Z" fill="url(#vGoldV)" />
        <path d="M126 80C126 40 152 22 180 22C208 22 234 40 234 80Z" fill="url(#vLat)" stroke="#A8701A" strokeWidth="1.2" />
        {[[180, 22, 1], [152, 34, .7], [208, 34, .7]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
            <ellipse cx="0" cy="-5" rx="5" ry="7" fill="#F2C85B" stroke="#A8701A" strokeWidth="1" />
            <path d="M0-12V-22" stroke="#A8701A" strokeWidth="1.5" /><circle cx="0" cy="-24" r="2" fill="#F5D06B" />
          </g>
        ))}
        <rect x="100" y="80" width="160" height="22" fill="url(#vGold)" stroke="#A8701A" strokeWidth="1" />
        <rect x="170" y="84" width="20" height="14" fill="#7A3A12" rx="2" /><path d="M175 98V90h10v8" fill="#F5D06B" />
        {[112, 132, 214, 238].map((x) => <rect key={x} x={x} y="85" width="10" height="13" fill="#A8701A" rx="2" />)}
        <rect x="70" y="102" width="220" height="26" fill="url(#vGold)" stroke="#A8701A" strokeWidth="1" />
        {[84, 112, 140, 168, 196, 224, 252].map((x) => <rect key={x} x={x} y="108" width="14" height="16" fill="#A8701A" rx="3" opacity=".75" />)}
        {[[78, 90], [270, 90]].map(([x, y]) => (
          <path key={x} d={`M${x - 10} 102C${x - 10} ${y - 6} ${x + 10} ${y - 6} ${x + 10} 102Z`} fill="url(#vGoldV)" stroke="#A8701A" strokeWidth="1" />
        ))}
        <path d="M22 156L56 128H304L338 156Z" fill="url(#vGold)" stroke="#A8701A" strokeWidth="1.2" />
        <rect x="16" y="156" width="328" height="12" fill="url(#vGoldV)" stroke="#A8701A" strokeWidth="1.2" />
        <path d="M20 168c4 8 12 8 16 0s12 8 16 0s12 8 16 0s12 8 16 0s12 8 16 0s12 8 16 0s12 8 16 0s12 8 16 0s12 8 16 0s12 8 16 0s12 8 16 0s12 8 16 0s12 8 16 0s12 8 16 0s12 8 16 0s12 8 16 0s12 8 16 0s12 8 16 0s12 8 16 0s12 8 16 0Z" fill="#E7B64F" stroke="#A8701A" strokeWidth=".8" />
      </g>

      {/* garlands */}
      <g className="v-sway">
        <path d="M44 172Q112 262 180 176Q248 262 316 172" stroke="#F4A91F" strokeWidth="10" strokeDasharray="0 11" strokeLinecap="round" fill="none" />
        <path d="M44 178Q112 258 180 182Q248 258 316 178" stroke="#FFD23F" strokeWidth="6" strokeDasharray="0 11" strokeLinecap="round" fill="none" />
        <path d="M84 176Q112 214 140 178M220 178Q248 214 276 176" stroke="#FFFFFF" strokeWidth="8" strokeDasharray="0 9" strokeLinecap="round" fill="none" />
        <path d="M148 180Q180 224 212 180" stroke="#4E9A3C" strokeWidth="9" strokeDasharray="0 8" strokeLinecap="round" fill="none" />
        <circle cx="180" cy="206" r="8" fill="#E5487A" />
      </g>
      <Hanging x={14} /><Hanging x={346} />
      <Hanging x={30} /><Hanging x={330} />

      {/* greenery + flowers at the sides */}
      <Lotus x={16} y={418} s={1.1} /><Lotus x={344} y={430} s={1.1} /><Lotus x={44} y={512} s={.8} /><Lotus x={318} y={514} s={.8} />
      <Banana x={32} /><Banana x={328} flip />
      <Pot x={46} /><Pot x={314} />

      {/* GROOM (left) */}
      <g>
        <ellipse cx="140" cy="500" rx="50" ry="6" fill="#B58A5A" opacity=".25" />
        <path d="M106 440H174L180 496H100Z" fill="#FFFAEB" stroke="#E6CF9A" strokeWidth="1" />
        <rect x="100" y="486" width="80" height="6" fill="#E0B04A" />
        <ellipse cx="124" cy="499" rx="9" ry="4" fill="#C98A5B" /><ellipse cx="156" cy="499" rx="9" ry="4" fill="#C98A5B" />
        <path d="M112 302Q140 288 168 302L176 392L172 446H108L104 392Z" fill="#FFF3D6" stroke="#E3C98A" strokeWidth="1.2" />
        <path d="M140 296V446" stroke="#E3C98A" strokeWidth="1" strokeDasharray="1 5" strokeLinecap="round" />
        <rect x="130" y="290" width="20" height="16" fill="#C98A5B" />
        <path d="M166 316C184 318 196 322 206 324" stroke="#FFF3D6" strokeWidth="13" strokeLinecap="round" fill="none" />
        <circle cx="209" cy="325" r="7" fill="#C98A5B" />
        <path d="M118 298C100 350 108 396 140 410C172 396 180 350 162 298" stroke="#FFFFFF" strokeWidth="9" strokeDasharray="0 10" strokeLinecap="round" fill="none" />
        <path d="M120 304C108 350 114 392 140 404" stroke="#4E9A3C" strokeWidth="4" strokeDasharray="0 14" strokeLinecap="round" fill="none" />
        <circle cx="140" cy="414" r="7" fill="#E5487A" /><circle cx="134" cy="424" r="5" fill="#E5487A" /><circle cx="146" cy="424" r="5" fill="#E5487A" />
        <image href="/images/groom-face.jpg" x="112" y="246" width="56" height="56" preserveAspectRatio="xMidYMid slice" clipPath="url(#vGroomClip)" />
        <ellipse cx="140" cy="274" rx="22" ry="26" fill="none" stroke="#E0B04A" strokeWidth="1.4" />
      </g>

      {/* BRIDE (right) */}
      <g>
        <ellipse cx="225" cy="500" rx="56" ry="6" fill="#B58A5A" opacity=".25" />
        <path d="M188 312Q225 292 262 312L274 398L286 496H168L180 398Z" fill="#A31F2D" />
        <path d="M262 312L274 398L286 496H266L254 398Z" fill="#E0B04A" opacity=".9" />
        <path d="M196 314L252 480" stroke="#E0B04A" strokeWidth="9" strokeLinecap="round" opacity=".95" />
        <path d="M170 484H286V496H168Z" fill="#E0B04A" />
        <path d="M190 312Q225 296 260 312L262 340L188 340Z" fill="#8E1A26" />
        <rect x="215" y="296" width="20" height="18" fill="#D9A06F" />
        <path d="M190 328C178 326 172 326 160 326" stroke="#D9A06F" strokeWidth="10" strokeLinecap="round" fill="none" />
        <circle cx="157" cy="326" r="6" fill="#D9A06F" />
        <path d="M185 332h14M185 337h14" stroke="#E0B04A" strokeWidth="2" strokeLinecap="round" />
        <path d="M192 304C176 356 190 398 225 410C260 398 274 356 258 304" stroke="#FFFFFF" strokeWidth="9" strokeDasharray="0 10" strokeLinecap="round" fill="none" />
        <path d="M194 308C184 352 196 392 225 404" stroke="#4E9A3C" strokeWidth="4" strokeDasharray="0 14" strokeLinecap="round" fill="none" />
        <circle cx="225" cy="414" r="7" fill="#E5487A" /><circle cx="219" cy="424" r="5" fill="#E5487A" /><circle cx="231" cy="424" r="5" fill="#E5487A" />
        <circle cx="205" cy="270" r="14" fill="#2B1A14" />
        <path d="M194 262Q198 254 208 252" stroke="#FFFFFF" strokeWidth="5" strokeDasharray="0 6" strokeLinecap="round" fill="none" />
        <image href="/images/bride-face.jpg" x="197" y="250" width="56" height="56" preserveAspectRatio="xMidYMid slice" clipPath="url(#vBrideClip)" />
        <ellipse cx="225" cy="278" rx="22" ry="26" fill="none" stroke="#E0B04A" strokeWidth="1.4" />
        <circle cx="225" cy="249" r="3" fill="#E0B04A" />
      </g>

      {/* falling petals */}
      {PETALS.map((p, i) => (
        <ellipse key={i} className="v-petal" cx={p.x} cy="-10" rx="4" ry="2.4" fill={p.c} style={{ animationDelay: `${p.d}s` }} />
      ))}
    </svg>
  );
}
