import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduct,
  deleteProduct,
  removeProduct,
} from "../../store/Slices/productSlice";
import { BsFillTrashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { fetchCategory } from "../../store/Slices/categorySlice";

const adminFetchProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const { categorys } = useSelector((state) => state.categorySlice);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const handleDelete = async (id) => {
    // preventDefault();
    await dispatch(deleteProduct(id));
    navigate("/AdminFetchData");
  };

  const { products, isLoading } = useSelector((state) => state.productSlice);

  if (isLoading) {
    return (
      <div className="vh-100 ">
        <p className="align-middle">Loading fetch Data Product...</p>
      </div>
    );
  }

  return (
    <>
      <div class="mt-2 ml-2 mb-2 mr-2">
        <Link to="/addProduct">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Add Product
          </button>
        </Link>
        <Link to="/FetchUser">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Fetch User
          </button>
        </Link>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">Image</div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">Description</div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">Price</div>
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Category</span>
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((data, i) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data?.name}
                </td>
                <td>
                  <img src={data?.mainImg} width={80} />
                </td>
                <td class="px-6 py-4">
                  <p className=" line-clamp-1">{data?.description}</p>
                </td>
                <td class="px-6 py-4">Rp. {data?.price}</td>
                <td class="px-6 py-4">
                  <div className="bg-blue w-10 h-6">
                    {categorys.map((dataCategory) =>
                      dataCategory.id === data.categoryId
                        ? dataCategory.name
                        : null
                    )}
                  </div>
                </td>
                <td class="px-6 py-4 text-right">
                  <div>
                    <BsFillTrashFill
                      className="w-5 h-5 bg-red-500 text-white rounded-sm cursor-pointer"
                      onClick={() => handleDelete(data.id)}
                    />
                  </div>
                  <button>
                    <Link to={`/editProduct/${data.id}`}>Update</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default adminFetchProduct;
