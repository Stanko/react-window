import { useEffect, useId } from "react";
import type { ReactWindowEvents, AttachedEvent } from "./types";

/**
 * DO NOT USE, for internal use only.
 * */
export const __event_store: Record<string, AttachedEvent> = {};

function getEventName(propName: string) {
  return propName.replace(/(on|Capture|Passive)/g, "").toLowerCase();
}

const ReactWindow: React.FC<ReactWindowEvents> = (props) => {
  const id = useId();

  useEffect(() => {
    // Mount
    Object.entries(props).forEach(([propName, userCallback]) => {
      const eventName = getEventName(propName);
      const options = {
        capture: propName.includes("Capture"),
        passive: propName.includes("Passive"),
      };

      // Listener is already attached
      if (__event_store[propName]) {
        // Add user callback to the list
        __event_store[propName].userCallbacks[id] = userCallback;
      } else {
        // If listener is not attached yet,
        // create a new handler that loops through user callbacks and executes them
        const handler = (e: Event) => {
          Object.values(__event_store[propName].userCallbacks).forEach((callback) => callback(e));
        };

        // Store the event data
        __event_store[propName] = {
          handler,
          userCallbacks: {
            [id]: userCallback,
          },
          options,
        };

        // Attach the listener
        window.addEventListener(eventName, handler, options);
      }
    });

    // Unmount
    return () => {
      for (let key in props) {
        let eventName = getEventName(key);

        // If this is the only user callback, remove the listener and clean up
        if (Object.keys(__event_store[key].userCallbacks).length === 1) {
          const { handler, options } = __event_store[key];

          window.removeEventListener(eventName, handler, options);

          delete __event_store[key];
        } else {
          // If there is more callbacks, just remove this one from the map
          delete __event_store[key].userCallbacks[id];
        }
      }
    };
    // In practice, handlers shouldn't be dynamic.
    // So no dependencies here to make sure it happens only on mount (and unmount).
  }, []);

  return null;
};

export default ReactWindow;
