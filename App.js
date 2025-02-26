import { RecoilRoot } from "recoil";
import Routers from "./src/routers/Routers";

import "./global.css";

const App = () => {
  return (
    <RecoilRoot>
      <Routers />
    </RecoilRoot>
  );
};

export default App;
