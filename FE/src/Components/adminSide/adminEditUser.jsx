import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailUser, updateUser } from "../../store/Slices/userSlice";

const EditProduct = () => {
  const result = useSelector((state) => state.userSlice.singleUser);
  const [name, setName] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(detailUser(id));
  }, [dispatch]);

  useEffect(() => {
    if (result) {
      setName(result.name);
    }
  }, [result]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await dispatch(updateUser({ id, name }));
    navigate("/FetchUser");
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form className="px-4 pt-6 pb-8 mb-4" onSubmit={handleUpdate}>
        <div class="mb-6">
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="base-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
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
