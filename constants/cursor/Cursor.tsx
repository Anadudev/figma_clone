import CursorSVG from "@/public/assets/CursorSVG";
import React from "react";

type CursorProps = {
  color: string;
  x: number;
  y: number;
  message: string;
};
const Cursor: React.FC<CursorProps> = ({ color, x, y, message }) => {
  return <div className="pointer-events-none absolute top-0 left-0" style={{transform: `translate(${x}px, ${y}px)`}}>
    <CursorSVG color={color} />
    {/* MESSAGE */}
    <div className="absolute top-0 left-0 text-white text-xs">
      {message}
    </div>
  </div>;
};

export default Cursor;
