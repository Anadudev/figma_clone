"use client";
import React, { useCallback, useState } from "react";
import LiveCursors from "./cursor/LiveCursors";
import { useOthers } from "@liveblocks/react";
import { useMyPresence } from "@liveblocks/react/suspense";
import CursorChat from "./cursor/CursorChat";
import { CursorMode } from "@/types/types";

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence();
  const [cursorState, setCursorState] = useState({mode:CursorMode.Hidden});

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
      {cursor && <CursorChat cursor={cursor} />}

      <LiveCursors others={others} />
    </div>
  );
};

export default Live;
