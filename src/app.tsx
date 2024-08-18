import { Provider } from "react-redux";
import "taro-ui/dist/style/index.scss"; // 全局引入一次即可
import store from "./store/index";
import "./app.scss";

const App: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <Provider store={store} >
      {children}
    </Provider>
  );
}

export default App
