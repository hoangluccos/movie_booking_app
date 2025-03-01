import { RecoilRoot } from "recoil";
import Routers from "./src/routers/Routers";

import "./global.css";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <RecoilRoot>
        <Routers />
      </RecoilRoot>
    </Provider>
  );
};

export default App;
