
import React from "react";

type ProgressCircleProps = {
  size?: number; 
  strokeWidth?: number;
  progress: number;
  color?: string;
  bgColor?: string;
  label?: string;
};

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  size = 120,
  strokeWidth = 12,
  progress,
  color = "#4f46e5",
  bgColor = "#e5e7eb",
  label,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.7s ease" }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-lg font-bold fill-gray-700"
        >
          {progress}%
        </text>
      </svg>
      {label && <span className="mt-2 text-gray-700 font-medium">{label}</span>}
    </div>
  );
};

export default ProgressCircle;
