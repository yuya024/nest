import React from "react";

export default function NestLogo() {
  return (
    <div className="w-48 h-48 bg-blue-500 flex items-center justify-center p-4 rounded-lg overflow-hidden">
      <span className="sr-only">NEST</span>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 水の背景 */}
        <defs>
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4FC3F7" />
            <stop offset="100%" stopColor="#0288D1" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#waterGradient)" />

        {/* コースレーン */}
        {[20, 40, 60, 80].map((x, i) => (
          <React.Fragment key={i}>
            {/* 上部の緑のライン */}
            <line
              x1={x}
              y1="0"
              x2={x}
              y2="75"
              stroke="#00FF00"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />
            {/* 下部の赤のライン */}
            <line
              x1={x}
              y1="75"
              x2={x}
              y2="100"
              stroke="#FF0000"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />
          </React.Fragment>
        ))}

        {/* NEST テキスト */}
        <text
          x="40"
          y="60"
          fontFamily="Arial"
          fontSize="24"
          fontWeight="bold"
          fill="#FFFFFF"
          textAnchor="middle"
        >
          NES
        </text>

        {/* T with wavy horizontal line and water splashes */}
        <g transform="translate(1, 0)">
          <path
            d="M75 45 V58 M67 45 Q71 42, 75 45 T83 45"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          >
            <animate
              attributeName="d"
              values="
                M75 45 V58 M67 45 Q71 42, 75 45 T83 45;
                M75 45 V58 M67 45 Q71 48, 75 45 T83 45;
                M75 45 V58 M67 45 Q71 42, 75 45 T83 45
              "
              dur="2s"
              repeatCount="indefinite"
            />
          </path>

          {/* Water splashes */}
          <g transform="translate(10, 0)">
            <circle cx="73" cy="42" r="1" fill="#FFFFFF">
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="1.5s"
                repeatCount="indefinite"
                begin="0s"
              />
            </circle>
            <circle cx="77" cy="40" r="1.5" fill="#FFFFFF">
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="1.5s"
                repeatCount="indefinite"
                begin="0.5s"
              />
            </circle>
            <circle cx="81" cy="41" r="1" fill="#FFFFFF">
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="1.5s"
                repeatCount="indefinite"
                begin="1s"
              />
            </circle>
          </g>
        </g>
      </svg>
    </div>
  );
}
