import { useEffect, useState } from "react";

/** Props for {@link Notepad}. */
export type NotepadProps = {
  /** Callback for when data should be saved. */
  onSave: (text: string) => void;
  value: string;
  /** How long to wait without changes before saving. Default 3 seconds. */
  saveDelayMs?: number;
};

/** A modified textarea component to be used as the notepad. */
export const Notepad = ({
  value,
  onSave,
  saveDelayMs = 3000,
}: NotepadProps): JSX.Element => {
  const [text, setText] = useState<string>(value);

  useEffect(() => {
    if (value === text) return;

    const getData = setTimeout(() => {
      onSave(text);
    }, saveDelayMs);

    return () => clearTimeout(getData);
  }, [text, onSave]);

  return (
    <textarea
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      className="grow mx-12 p-4 h-full resize-none border-0 outline-none lg:w-[928px] lg:mx-auto"
      onChange={(e) => setText(e.target.value)}
      value={text}
    />
  );
};
