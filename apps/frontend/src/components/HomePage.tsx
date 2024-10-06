import { Notepad } from "./Notepad";
import { getText, saveText } from "../services/dataService";
import { toast } from "@repo/ui";
import { useQuery } from "@tanstack/react-query";

/** The main page of the app, fetches and handles notepad data and saving. */
export default function HomePage() {
  const { data: initialText } = useQuery({
    queryKey: [sessionStorage.accessToken],
    queryFn: () =>
      getText().catch((e) => {
        toast.error(
          `There was a problem when fetching from the cloud. Please try again later. ${e}`
        );

        throw new Error(e);
      }),
  });

  if (!initialText) {
    return (
      <div className="w-full h-full cursor-wait animate-pulse bg-foreground/5" />
    );
  }

  return (
    <Notepad
      value={initialText}
      onSave={(text) =>
        saveText(text)
          .then(() =>
            toast.success(`Saved at ${new Date().toLocaleTimeString()}`)
          )
          .catch((e) =>
            toast.error(`There was a problem when saving to the cloud. ${e}`)
          )
      }
    />
  );
}
