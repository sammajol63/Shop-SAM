import { Provider } from "react-redux";
import store from "./store";
// import CounterComponent from "./Components/Counter";
import Router from "./Routers/index";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Router />
      </div>
    </Provider>
  );
}

export default App;
