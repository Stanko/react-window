import { useGlobalEvents } from "./use-global-events";
import type { ReactWindowEvents, AttachedEvent } from "./types";

/**
 * DO NOT USE, for internal use only.
 * */
export const __window_event_store: Record<string, AttachedEvent> = {};

const ReactWindow: React.FC<ReactWindowEvents> = (props) => {
  if (typeof window === "undefined") {
    return null;
  }

  useGlobalEvents(props, window, __window_event_store);

  return null;
};

export default ReactWindow;

/**
 * DO NOT USE, for internal use only.
 * */
export const __body_event_store: Record<string, AttachedEvent> = {};

export const ReactBody: React.FC<ReactWindowEvents> = (props) => {
  if (typeof document === "undefined") {
    return null;
  }

  useGlobalEvents(props, document.body, __body_event_store);

  return null;
};
