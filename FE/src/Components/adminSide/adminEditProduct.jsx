import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct, detailProduct } from "../../store/Slices/productSlice";
import { fetchCategory } from "../../store/Slices/categorySlice";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
  });
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const { categorys } = useSelector((state) => state.categorySlice);

  useEffect(() => {
    dispatch(detailProduct(id));
  }, [dispatch]);

  // dispatch(findId(id));

  const result = useSelector((state) => state.productSlice.singleProduct);

  useEffect(() => {
    if (result) {
      setValues({
        name: result.name,
        description: result.description,
        price: result.price,
        categoryId: result.categoryId,
      });
      setPrice(result.price);
    }
  }, [result]);

  const hendleEditProduct = async (e) => {
    e.preventDefault();
    await dispatch(
      updateProduct({
        name: values.name,
        description: values.description,
        price: values.price,
        categoryId: values.categoryId,
      })
    );
    navigate("/AdminFetchData");
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form className="px-4 pt-6 pb-8 mb-4" onSubmit={hendleEditProduct}>
        <div class="mb-6">
          <input
            type="text"
            placeholder="name"
            value={values.name}
            onChange={(e) => {
              setValues(e.target.value);
            }}
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={values.description}
            onChange={(e) => {
              setValues(e.target.value);
            }}
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Price"
            value={values.price}
            onChange={(e) => {
              setValues(e.target.value);
            }}
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-100 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={values.categoryId}
            onChange={(e) => {
              setValues(e.target.value);
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
        </div>

        <button
          type="submit"
          class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
