import { useDispatch, useSelector } from "react-redux";
import Cart from "../Components/cart";
import Checkout from "../Components/checkout";
import FetchProduct from "../Components/fetchProduct";
import {
  addToCart,
  fetchProduct,
  deleteItem,
  increment,
  decrement,
} from "../store/Slices/productSlice";
import { useEffect, useState } from "react";

const katalog = () => {
  const dispatch = useDispatch();
  const { products, cart } = useSelector((state) => state.productSlice);

  // useEffect(() => {
  //   dispatch(fetchProduct());
  // }, [dispatch]);

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);
  const addtocart = (id) => dispatch(addToCart(id));
  const handleDelete = (id) => dispatch(deleteItem(id));
  const incrementProduct = (id) => dispatch(increment(id));
  const decrementProduct = (id) => dispatch(decrement(id));
  const totalPrice = cart.reduce((accumulator, item) => {
    return accumulator + item.qty * item.price;
  }, 0);

  return (
    <div>
      {isOpen ? (
        <Checkout
          data={cart}
          deleteItem={handleDelete}
          increment={incrementProduct}
          decrement={decrementProduct}
          total={totalPrice}
        />
      ) : (
        <FetchProduct addtocart={addtocart} />
      )}
      <Cart cart={cart} handleOpen={handleOpen} />
    </div>
  );
};

export default katalog;
