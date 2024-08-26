import { Provider } from "react-redux";
import { useLaunch } from "@tarojs/taro";

import store from "./store/index";
import "./app.scss";

const App: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {

  useLaunch((options) => {
    console.log(options,'op');
  })

  return (
    <Provider store={store} >
      {children}
    </Provider>
  );
}

export default App
