import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  addByAmount,
} from "../store/Slices/CounterSlice";

const Counter = () => {
  const { counterProduct } = useSelector((state) => state.counterSlice);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Counter Component</h1>
      Counter: {counterProduct}
      <br />
      <button onClick={() => dispatch(increment())}> Tambah</button>
      <br />
      <button onClick={() => dispatch(decrement())}>Kurang</button>
      <br />
      <button onClick={() => dispatch(addByAmount(5345))}>Add 5</button>
    </>
  );
};

export default Counter;
