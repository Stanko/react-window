# React Window

[![npm version](https://img.shields.io/npm/v/%40stanko%2Freact-window.svg?style=flat-square)](https://www.npmjs.com/package/react-window)
[![npm downloads](https://img.shields.io/npm/dm/%40stanko%2Freact-window.svg?style=flat-square)](https://www.npmjs.com/package/react-window)

ReactWindow is a component that simplifies the management of window event listeners.

Instead of adding (and removing) listeners manually in `useEffect`, this component allows you to attach them in React way:

```js
<ReactWindow
  onClick={() => {
    console.log("Hello world!");
  }}
/>
```

It can be conditionally rendered and it attaches a single listener per event type (`onClick`, `onScroll`...).

Inspired by [&lt;svelte:window&gt;](https://svelte.dev/docs#template-syntax-svelte-window).

- [Demo](https://muffinman.io/react-window/)
- [Changelog](CHANGELOG.md)

## Quick start

Get it from npm

```
$ npm install --save @stanko/react-window
```

Import and use it in your React app:

### Base example

```javascript
import ReactWindow from "@stanko/react-window";

function Example() {
  return (
    <ReactWindow
      onClick={() => {
        console.log("Hello world!");
      }}
      onScroll={() => {
        console.log(`Wheeeeee! ${window.scrollY}px`);
      }}
    />
  );
}
```

### Conditional rendering

```javascript
import { useState } from "react";
import ReactWindow from "@stanko/react-window";

function Example() {
  const [listenForScroll, setListenForScroll] = useState(true);

  return (
    <div>
      <button
        onClick={() => {
          setListenForScroll(!listenForScroll);
        }}
      >
        {listenForScroll ? "Disable" : "Enable"} scroll listener
      </button>

      {listenForScroll && (
        <ReactWindow
          onScroll={() => {
            console.log(`Wheeeeee! ${window.scrollY}px`);
          }}
        />
      )}
    </div>
  );
}
```

## Supported events

### Misc

| Event    | Capture variant |
| -------- | --------------- |
| onLoad   | onLoadCapture   |
| onSelect | onSelectCapture |
| onError  | onErrorCapture  |

### Scroll / Wheel

| Event    | Capture variant | Passive variant |
| -------- | --------------- | --------------- |
| onScroll | onScrollCapture | onScrollPassive |
| onWheel  | onWheelCapture  | onWheelPassive  |

### Focus / Blur

| Event   | Capture variant |
| ------- | --------------- |
| onFocus | onFocusCapture  |
| onBlur  | onBlurCapture   |

### Keyboard

| Event     | Capture variant  |
| --------- | ---------------- |
| onKeyDown | onKeyDownCapture |
| onKeyUp   | onKeyUpCapture   |

### Mouse

| Event         | Capture variant      |
| ------------- | -------------------- |
| onAuxClick    | onAuxClickCapture    |
| onClick       | onClickCapture       |
| onDblClick    | onDblClickCapture    |
| onContextMenu | onContextMenuCapture |
| onDrag        | onDragCapture        |
| onDragEnd     | onDragEndCapture     |
| onDragEnter   | onDragEnterCapture   |
| onDragExit    | onDragExitCapture    |
| onDragLeave   | onDragLeaveCapture   |
| onDragOver    | onDragOverCapture    |
| onDragStart   | onDragStartCapture   |
| onDrop        | onDropCapture        |
| onMouseDown   | onMouseDownCapture   |
| onMouseMove   | onMouseMoveCapture   |
| onMouseOut    | onMouseOutCapture    |
| onMouseOver   | onMouseOverCapture   |
| onMouseUp     | onMouseUpCapture     |
| onMouseEnter  |                      |
| onMouseLeave  |                      |

### Touch

| Event         | Capture variant      | Passive variant     |
| ------------- | -------------------- | ------------------- |
| onTouchCancel | onTouchCancelCapture |                     |
| onTouchEnd    | onTouchEndCapture    |                     |
| onTouchMove   | onTouchMoveCapture   | onTouchMovePassive  |
| onTouchStart  | onTouchStartCapture  | onTouchStartPassive |

### Pointer

| Event                | Capture variant             |
| -------------------- | --------------------------- |
| onPointerDown        | onPointerDownCapture        |
| onPointerMove        | onPointerMoveCapture        |
| onPointerUp          | onPointerUpCapture          |
| onPointerCancel      | onPointerCancelCapture      |
| onPointerEnter       | onPointerEnterCapture       |
| onPointerLeave       | onPointerLeaveCapture       |
| onPointerOver        | onPointerOverCapture        |
| onPointerOut         | onPointerOutCapture         |
| onGotPointerCapture  | onGotPointerCaptureCapture  |
| onLostPointerCapture | onLostPointerCaptureCapture |

### Animation

| Event                | Capture variant             |
| -------------------- | --------------------------- |
| onAnimationStart     | onAnimationStartCapture     |
| onAnimationEnd       | onAnimationEndCapture       |
| onAnimationIteration | onAnimationIterationCapture |
| onAnimationCancel    | onAnimationCancelCapture    |

### Transition

| Event              | Capture variant           |
| ------------------ | ------------------------- |
| onTransitionStart  | onTransitionStartCapture  |
| onTransitionEnd    | onTransitionEndCapture    |
| onTransitionRun    | onTransitionRunCapture    |
| onTransitionCancel | onTransitionCancelCapture |
