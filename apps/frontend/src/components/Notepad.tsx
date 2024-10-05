import { useEffect, useState } from "react";

export type NotepadProps = {
  onSave: (text: string) => void;
  value: string;
};

export const Notepad = ({ value, onSave }: NotepadProps): JSX.Element => {
  const [text, setText] = useState<string>(value);

  useEffect(() => {
    const getData = setTimeout(() => {
      onSave(text);
    }, 3000);

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
