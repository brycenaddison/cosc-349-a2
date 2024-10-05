import { createRoot } from "react-dom/client";
import "@repo/ui/styles.css";
import router from "./router";
import { StrictMode } from "react";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(<StrictMode>{router}</StrictMode>);
