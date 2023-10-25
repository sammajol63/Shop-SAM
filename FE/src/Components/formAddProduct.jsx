import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../store/Slices/productSlice";
import { fetchCategory } from "../store/Slices/categorySlice";

const functionAddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setMainImg] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const { categorys } = useSelector((state) => state.categorySlice);

  const handleSelectFile = (e) => setMainImg(e.target.files[0]);
  const handleAddProduct = async (e) => {
    e.preventDefault();
    await dispatch(addProduct({ name, description, price, file, categoryId }));
    navigate("/AdminFetchData");
  };

  const { isLoading } = useSelector((state) => state.productSlice);
  console.log(isLoading);

  if (isLoading) {
    return (
      <div className="vh-100 ">
        <p className="align-middle">Loading add Data Product...</p>
      </div>
    );
  }

  return (
    <>
      <div class="ml-5 mt-2">
        <h3> Add Products </h3>
      </div>
      <form className="px-4 pt-6 pb-8 mb-4" onSubmit={handleAddProduct}>
        <div class="mb-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-6">
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-6">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="mb-6">
          <input type="file" onChange={handleSelectFile} />
        </div>
        <div class="mb-6">
          <select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
            }}
          >
            <option selected> Chose a Category</option>
            {categorys.map((el) => {
              return (
                <option key={el.id} value={el.id}>
                  {" "}
                  {el.name}{" "}
                </option>
              );
            })}
          </select>

          {/* <input
            type="text"
            placeholder="CategoryId"
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
            }}
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          /> */}
        </div>
        <button
          type="submit"
          class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default functionAddProduct;
