import CursorSVG from "@/public/assets/CursorSVG";
import { CursorChatProps, CursorMode } from "@/types/types";
import React from "react";

const CursorChat: React.FC<CursorChatProps> = ({
  cursor,
  cursorState,
  setCursorState,
  updateMyPresence,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // yet to be implemented
    const message = e.target.value;
    updateMyPresence({ message, message });
    setCursorState({ mode: CursorMode.Chat, previousMessage: null, message });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // yet to be implemented
    if (e.key === "Enter") {
      setCursorState({
        mode: CursorMode.Chat,
        previousMessage: cursorState.message,
        message: "",
      });
      // updateMyPresence({ cursor, message: null });
    } else if (e.key === "Escape") {
      setCursorState({ mode: CursorMode.Hidden });
      // updateMyPresence({ cursor: null, message: null
    }
  };

  return (
    <div
      className="absolute top-0 left-0"
      style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
    >
      {cursorState.mode === CursorMode.Chat && (
        <>
          <CursorSVG color="#000" />
          <div
            className="absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]"
            onKeyUp={(e) => e.stopPropagation()}
          >
            {cursorState?.previousMessage && (
              <div className="">{cursorState.previousMessage}</div>
            )}
            <input
              className="z-10 w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none"
              type="text"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder={cursorState?.previousMessage ? "" : "Type a message"}
              value={cursorState?.message}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CursorChat;
