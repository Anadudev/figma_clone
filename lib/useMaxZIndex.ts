import { useMemo } from "react";

// import { useThreads } from "@/liveblocks.config";
import { useThreads } from "@liveblocks/react/suspense";

// Returns the highest z-index of all threads
export const useMaxZIndex = () => {
  // get all threads
  const { threads } = useThreads();

  // calculate the max z-index
  return useMemo(() => {
    let max = 0;
    for (const thread of threads) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (thread.metadata.zIndex > max) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        max = thread.metadata.zIndex;
      }
    }
    return max;
  }, [threads]);
};
