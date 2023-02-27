import { useEffect, useId } from "react";
import type { ReactWindowEvents, AttachedEvent } from "./types";

function getEventName(eventKey: string) {
  return eventKey.replace(/(on|Capture|Passive)/g, "").toLowerCase();
}

export function useGlobalEvents(
  events: ReactWindowEvents,
  element: Window | HTMLElement,
  eventStore: Record<string, AttachedEvent>
) {
  const id = useId();

  useEffect(() => {
    // Mount
    Object.entries(events).forEach(([eventKey, userCallback]) => {
      const eventName = getEventName(eventKey);
      const options = {
        capture: eventKey.includes("Capture"),
        passive: eventKey.includes("Passive"),
      };

      // Listener is already attached
      if (eventStore[eventKey]) {
        // Add user callback to the list
        eventStore[eventKey].userCallbacks[id] = userCallback;
      } else {
        // If listener is not attached yet,
        // create a new handler that loops through user callbacks and executes them
        const handler = (e: Event) => {
          Object.values(eventStore[eventKey].userCallbacks).forEach((callback) => callback(e));
        };

        // Store the event data
        eventStore[eventKey] = {
          handler,
          userCallbacks: {
            [id]: userCallback,
          },
          options,
        };

        // Attach the listener
        element.addEventListener(eventName, handler, options);
      }
    });

    // Unmount
    return () => {
      for (let eventKey in events) {
        let eventName = getEventName(eventKey);

        // If this is the only user callback, remove the listener and clean up
        if (Object.keys(eventStore[eventKey].userCallbacks).length === 1) {
          const { handler, options } = eventStore[eventKey];

          element.removeEventListener(eventName, handler, options);

          delete eventStore[eventKey];
        } else {
          // If there is more callbacks, just remove this one from the map
          delete eventStore[eventKey].userCallbacks[id];
        }
      }
    };
    // In practice, handlers shouldn't be dynamic.
    // So no dependencies here to make sure it happens only on mount (and unmount).
  }, []);
}
