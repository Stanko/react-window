import { useGlobalEvents } from "./use-global-events";
import type { ReactWindowEvents, AttachedEvent } from "./types";

/**
 * DO NOT USE, for internal use only.
 * */
export const __event_store: Record<string, AttachedEvent> = {};

const ReactBody: React.FC<ReactWindowEvents> = (props) => {
  if (typeof document === "undefined") {
    return null;
  }

  useGlobalEvents(props, document.body, __event_store);

  return null;
};

export default ReactBody;
