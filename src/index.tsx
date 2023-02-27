import { useGlobalEvents } from "./use-global-events";
import type { ReactWindowEvents, AttachedEvent } from "./types";

/**
 * DO NOT USE, for internal use only.
 * */
export const __event_store: Record<string, AttachedEvent> = {};

const ReactWindow: React.FC<ReactWindowEvents> = (props) => {
  if (typeof window === "undefined") {
    return null;
  }

  useGlobalEvents(props, window, __event_store);

  return null;
};

export default ReactWindow;
