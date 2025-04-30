import { RecoilRoot } from "recoil";
import Routers from "./src/routers/Routers";

import "./global.css";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import Toast from "react-native-toast-message";

const App = () => {
  return (
    <Provider store={store}>
      <RecoilRoot>
        <Routers />
        <Toast />
      </RecoilRoot>
    </Provider>
  );
};

export default App;
