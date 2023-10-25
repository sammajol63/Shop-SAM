import { useDispatch, useSelector } from "react-redux";
import Cart from "../Components/cart";
import Checkout from "../Components/checkout";
import { useEffect, useState } from "react";
import {
  searchProduct,
  filterProduct,
  fetchProduct,
} from "../store/Slices/productSlice";
import { fetchCategory } from "../store/Slices/categorySlice";

const FindUser = ({ addtocart }) => {
  const dispatch = useDispatch();
  const [filterData, setFIlterData] = useState("all");
  const [search, setSearch] = useState("");
  // console.log(search);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(searchProduct(search));
  };
  const handleFilter = () => {
    dispatch(filterProduct(filterData));
  };

  const { products, isLoading } = useSelector((state) => state.productSlice);
  const { categorys } = useSelector((state) => state.categorySlice);

  if (isLoading) {
    return (
      <div className="vh-100 ">
        <p className="align-middle">Loading fetch Data Product...</p>
      </div>
    );
  }

  return (
    <div>
      <Cart />
      <Checkout />
      <div className="ml-60">
        <input
          type="search"
          placeholder="Search by name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <select
          onChange={(e) => {
            setFIlterData(e.target.value);
          }}
          onClick={handleFilter}
        >
          <option selected Value="all">
            Filter Category
          </option>
          {categorys.map((el) => {
            return (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="w=full h-auto p-10 mt-20 flex flex-wrap gap-4 justify-center items-center">
        {products.map((data, i) => (
          <div
            className="w-80 h-auto justify-start items-center bg-slate-100 rounded-md flex flex-col p-2"
            key={data.id}
          >
            <img src={data.mainImg} className="w-50 " />
            <p className="text-xs line-clamp-1">
              {data.name} {data.categoryId}
            </p>
            <p className="text-sm font-bold">Rp. {data.price}</p>
            <div
              className="w-fit text-right text-sm text-white bg-green-500 px-1 rounded-sm cursor-pointer select-none"
              onClick={() => addtocart(data)}
            >
              add
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindUser;
