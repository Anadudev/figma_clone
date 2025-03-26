"use client";
import React, { useCallback, useEffect, useState } from "react";
import LiveCursors from "@/components/cursor/LiveCursors";
// import { useOthers } from "@liveblocks/react";
// import { useMyPresence } from "@liveblocks/react/suspense";
import CursorChat from "@/components/cursor/CursorChat";
import {
  CursorMode,
  CursorState,
  Reaction,
  ReactionEvent,
} from "@/types/types";
import { useEventListener, useOthers } from "@liveblocks/react";
import { useMyPresence } from "@liveblocks/react/suspense";
import ReactionSelector from "@/components/reaction/ReactionButton";
import FlyingReaction from "@/components/reaction/FlyingReaction";
import useInterval from "@/hooks/useInterval";
import { useBroadcastEvent } from "@liveblocks/react/suspense";

type LiveProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

const Live: React.FC<LiveProps> = ({ canvasRef }) => {
  const others = useOthers();
  const broadcast = useBroadcastEvent();

  const [{ cursor }, updateMyPresence] = useMyPresence();

  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });
  const [reaction, setReaction] = useState<Reaction[]>([]);

  useInterval(() => {
    setReaction((react) =>
      react.filter((reaction) => reaction.timestamp > Date.now() - 4000)
    );
  }, 1000);

  useInterval(() => {
    if (
      cursorState.mode === CursorMode.Reaction &&
      cursorState.isPressed &&
      cursor
    ) {
      setReaction((reactions) => [
        ...reactions,
        {
          point: { x: cursor.x, y: cursor.y },
          timestamp: Date.now(),
          value: cursorState.reaction,
        },
      ]);
      broadcast({ x: cursor.x, y: cursor.y, value: cursorState.reaction });
    }
  }, 100);

  useEventListener((eventData) => {
    const event = eventData.event as ReactionEvent;
    setReaction((reactions) => [
      ...reactions,
      {
        point: { x: event.x, y: event.y },
        timestamp: Date.now(),
        value: event.value,
      },
    ]);
  });

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
      const y = e.clientY - e.currentTarget.getBoundingClientRect().y;
      // console.log(cursor);
      updateMyPresence({ cursor: { x, y } });
    }
  }, []);

  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    // e.preventDefault();
    setCursorState({ mode: CursorMode.Hidden });

    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // e.preventDefault();
      const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
      const y = e.clientY - e.currentTarget.getBoundingClientRect().y;
      updateMyPresence({ cursor: { x, y } });
      setCursorState((state: CursorState) =>
        cursorState.mode == CursorMode.Reaction
          ? { ...state, isPressed: true }
          : state
      );
    },
    [cursorState.mode, setCursorState]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      setCursorState((state: CursorState) =>
        cursorState.mode == CursorMode.Reaction
          ? { ...state, isPressed: true }
          : state
      );
    },
    [cursorState.mode, setCursorState]
  );

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setCursorState({ mode: CursorMode.Hidden });
      } else if (e.key === "e") {
        setCursorState({ mode: CursorMode.ReactionSelector });
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [updateMyPresence]);

  const setReactions = useCallback((reaction: string) => {
    setCursorState({
      mode: CursorMode.Reaction,
      reaction,
      isPressed: false,
    });
  }, []);
  return (
    <div
      id="canvas"
      className="h-screen w-full flex justify-center items-center text-center"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <canvas ref={canvasRef} />
      {reaction.map((react, index) => (
        <FlyingReaction
          key={index}
          x={react.point.x}
          y={react.point.y}
          timestamp={react.timestamp}
          value={react.value}
        />
      ))}
      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}

      {cursorState.mode === CursorMode.ReactionSelector && (
        <ReactionSelector setReaction={setReactions} />
      )}

      <LiveCursors others={others} />
    </div>
  );
};

export default Live;
