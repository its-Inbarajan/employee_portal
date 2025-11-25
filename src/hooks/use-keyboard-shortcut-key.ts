import React from "react";

type ShortcutCallback = (event: KeyboardEvent) => void;

const useKeyboardShortcut = (
  shortcutKey: string,
  callback: ShortcutCallback
) => {
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === shortcutKey) {
        event.preventDefault();
        callbackRef.current(event);
      }
    },
    [shortcutKey]
  );

  React.useEffect(() => {
    // Attaching to window uses the native DOM KeyboardEvent type
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
};

export default useKeyboardShortcut;
