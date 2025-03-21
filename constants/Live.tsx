"use client";
import React, { useCallback } from "react";
import LiveCursors from "./cursor/LiveCursors";
import { useOthers } from "@liveblocks/react";
import { useMyPresence } from "@liveblocks/react/suspense";
const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence();
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });
  }, []);

  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    e.preventDefault();

    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // e.preventDefault();
    const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });
  }, []);

  return (
    <div
      className="h-screen w-full flex justify-center items-center"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
    >
      <h1 className="text-2xl">Figma clone</h1>

      <LiveCursors others={others} />
    </div>
  );
};

export default Live;
