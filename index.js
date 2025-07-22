import "./flipper.config";
import "./global.css";

import Base from "@/Base/index";
import { registerRootComponent } from "expo";

// Must be exported or Fast Refresh won't update the context
export function App() {
  return <Base />;
}

registerRootComponent(App);
