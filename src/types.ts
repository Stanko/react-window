// Event
type _LoadAndSelect = "onLoad" | "onSelect";
// ErrorEvent
type _Error = "onError";
// Event
type _Scroll = "onScroll" | "onWheel";
// FocusEvent
type _Focus = "onFocus" | "onBlur";
// KeyboardEvent
type _Keyboard = "onKeyDown" | "onKeyUp";

// MouseEvent
type _Mouse =
  | "onAuxClick"
  | "onClick"
  | "onDblClick"
  | "onContextMenu"
  | "onDrag"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDragStart"
  | "onDrop"
  | "onMouseDown"
  | "onMouseMove"
  | "onMouseOut"
  | "onMouseOver"
  | "onMouseUp";
type _MouseNoCapture = "onMouseEnter" | "onMouseLeave";

// TouchEvent
type _Touch = "onTouchCancel" | "onTouchEnd";
type _TouchPassive = "onTouchMove" | "onTouchStart";

// PointerEvent
type _Pointer =
  | "onPointerDown"
  | "onPointerMove"
  | "onPointerUp"
  | "onPointerCancel"
  | "onPointerEnter"
  | "onPointerLeave"
  | "onPointerOver"
  | "onPointerOut"
  | "onGotPointerCapture"
  | "onLostPointerCapture";

// AnimationEvent
type _Animation = "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration" | "onAnimationCancel";

// TransitionEvent
type _Transition = "onTransitionStart" | "onTransitionEnd" | "onTransitionRun" | "onTransitionCancel";

// Generic handler
type EventHandler<E> = (e: E) => void;

// Base without passive or capture variant
type EventType<T extends string, E> = {
  [K in T]?: EventHandler<E>;
};

// Adding capture variant
type EventTypeCapture<T extends string, E> = EventType<T, E> & {
  [K in T as `${K}Capture`]?: EventHandler<E>;
};

// Adding capture and passive variants
type EventTypeCapturePassive<T extends string, E> = EventTypeCapture<T, E> & {
  [K in T as `${K}Passive`]?: EventHandler<E>;
};

// Other
type LoadAndSelectEvents = EventTypeCapture<_LoadAndSelect, Event>;
// Error
type ErrorEvents = EventTypeCapture<_Error, ErrorEvent>;
// Scroll
type ScrollEvents = EventTypeCapturePassive<_Scroll, Event>;
// Focus
type FocusEvents = EventTypeCapture<_Focus, Event>;
// Keyboard
type KeyboardEvents = EventTypeCapture<_Keyboard, MouseEvent>;
// Mouse
type MouseEvents = EventTypeCapture<_Mouse, MouseEvent> & EventType<_MouseNoCapture, MouseEvent>;
// Touch
type TouchEvents = EventTypeCapture<_Touch, TouchEvent> & EventTypeCapturePassive<_TouchPassive, TouchEvent>;
// Pointer
type PointerEvents = EventTypeCapture<_Pointer, PointerEvent>;
// Animation
type AnimationEvents = EventTypeCapture<_Animation, AnimationEvent>;
// Transition
type TransitionEvents = EventTypeCapture<_Transition, TransitionEvent>;

export type ReactWindowEvents = LoadAndSelectEvents &
  ErrorEvents &
  ScrollEvents &
  FocusEvents &
  KeyboardEvents &
  MouseEvents &
  TouchEvents &
  PointerEvents &
  AnimationEvents &
  TransitionEvents;

export type AttachedEvent = {
  userCallbacks: Record<string, (e: any) => void>;
  handler: (e: Event) => void;
  options: {
    capture: boolean;
    passive: boolean;
  };
};
