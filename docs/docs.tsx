import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import ReactWindow, { __window_event_store } from "../src/index";

const log = console.log;

const logElement = document.querySelector(".log") as HTMLDivElement;
const logContentElement = document.querySelector(".log-content") as HTMLDivElement;

let updateStore;

let lastLog = new Date();
let lastScrollUpdate = new Date();
let lastWheelUpdate = new Date();

console.log = (...a) => {
  log(...a);

  const now = new Date();
  if (now.getTime() - lastLog.getTime() > 100) {
    logContentElement.innerHTML += `<div class="log-separator">
      <div class="log-separator-line"></div>
      <div>${now.toLocaleTimeString()}</div>
    </div>`;
  }

  lastLog = now;

  logContentElement.innerHTML += `<div>${a.join("")}</div>`;

  logElement.scrollTop = 1000000;
};

const EventsStore = () => {
  const [store, setStore] = useState(__window_event_store);

  updateStore = () => {
    setStore({ ...__window_event_store });
  };

  if (Object.keys(__window_event_store).length === 0) {
    return null;
  }

  return (
    <div className="table-wrapper">
      <h3>Attached events</h3>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th># of callbacks</th>
            <th>Capture</th>
            <th>Passive</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(store).map(([key, value]) => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{Object.keys(value.userCallbacks).length}</td>
                <td>{value.options.capture ? "Yes" : ""}</td>
                <td>{value.options.passive ? "Yes" : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const ToggleListener = ({ label = "", ...props }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const eventName = Object.keys(props)[0];

  useEffect(() => {
    updateStore();
  }, [isEnabled]);

  return (
    <>
      <button
        className={`toggle ${isEnabled ? "toggle--enabled" : ""}`}
        onClick={() => {
          setIsEnabled(!isEnabled);
        }}
      >
        {isEnabled ? "Disable" : "Enable"} {label || eventName}
      </button>
      {isEnabled && <ReactWindow {...props} />}
    </>
  );
};

const Docs = () => {
  return (
    <div className="demo">
      <div className="toggles">
        <h3>Toggle events</h3>
        <div className="toggles-title">Click events</div>
        <div className="toggles-group">
          <ToggleListener
            label="onClick 1"
            onClick={() => {
              console.log("on click 1");
            }}
          />
          <ToggleListener
            label="onClick 2"
            onClick={() => {
              console.log("on click 2");
            }}
          />
          <ToggleListener
            label="onClick 3"
            onClick={() => {
              console.log("on click 3");
            }}
          />
          <ToggleListener
            onClickCapture={() => {
              console.log("on click capture");
            }}
          />
        </div>
        <div className="toggles-title">Keyboard events</div>
        <div className="toggles-group">
          <ToggleListener
            label="onKeyDown 1"
            onKeyDown={(e) => {
              console.log(`on key down 1: "${e.key}"`);
            }}
          />
          <ToggleListener
            label="onKeyDown 2"
            onKeyDown={(e) => {
              console.log(`on key down 2: "${e.key}"`);
            }}
          />
          <ToggleListener
            label="onKeyDown 3"
            onKeyDown={(e) => {
              console.log(`on key down 3: "${e.key}"`);
            }}
          />
          <ToggleListener
            onKeyDownCapture={(e) => {
              console.log(`on key down capture: "${e.key}"`);
            }}
          />
        </div>

        <div className="toggles-title">Scroll events</div>
        <div className="toggles-note">
          Logs are throttled for wheel and scroll events to prevent flooding of the log.
        </div>
        <div className="toggles-group">
          <ToggleListener
            onScrollPassive={() => {
              const now = new Date();

              if (now.getTime() - lastScrollUpdate.getTime() > 100) {
                console.log(`on scroll passive: ${window.scrollY}px`);
                lastScrollUpdate = now;
              }
            }}
          />
          <ToggleListener
            onWheelPassive={(e) => {
              const now = new Date();

              if (now.getTime() - lastWheelUpdate.getTime() > 100) {
                console.log(`on wheel passive: ${e.deltaY}`);
                lastWheelUpdate = now;
              }
            }}
          />
        </div>
      </div>
      <EventsStore />
    </div>
  );
};

const container = document.getElementById("demo");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <Docs />
  </StrictMode>
);
