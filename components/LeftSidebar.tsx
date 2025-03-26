import React from "react";

const LeftSidebar = () => {
  return (
    <aside className="flex flex-col border-t border-gray-200 bg-black text-gray-300 min-w-[227px] sticky left-0 h-full max-sm:hidden select-none overflow-y-auto">
      <h3 className="px-5 pt-4 text-xs uppercase">Elements</h3>
    </aside>
  );
};

export default LeftSidebar;
