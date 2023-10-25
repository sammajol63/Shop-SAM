import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  deleteUser,
  searchUser,
} from "../../store/Slices/userSlice";
import { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const findUser = () => {
  const { users, searchData } = useSelector((state) => state.userSlice);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(searchUser(search));
  }, [search]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleDelete = async (id) => {
    // e.preventDefault()
    await dispatch(deleteUser(id));
    navigate("/FetchUser");
  };
  const { isLoading } = useSelector((state) => state.userSlice);
  console.log(isLoading);

  if (isLoading) {
    return (
      <div className="vh-100 ">
        <p className="align-middle">Loading fetch Data User...</p>
      </div>
    );
  }

  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="ml-4">
          <input
            className="form-control  mobile-only "
            type="search"
            placeholder="Search User By name"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                name
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">Email</div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">Role</div>
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users
                .filter((el) => {
                  if (searchData.length === 0) {
                    return el;
                  } else {
                    return el.name
                      .toLowerCase()
                      .includes(searchData.toLowerCase());
                  }
                })
                .map((data, i) => (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data?.name}
                    </th>
                    <td class="px-6 py-4">{data?.email}</td>
                    <td class="px-6 py-4">{data?.role}</td>
                    <td class="px-6 py-4 text-right">
                      <BsFillTrashFill
                        className="w-5 h-5 bg-red-500 text-white rounded-sm cursor-pointer"
                        onClick={() => handleDelete(data.id)}
                      />
                      <button>
                        <Link to={`/editUser/${data.id}`}>Update</Link>
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

export default findUser;
