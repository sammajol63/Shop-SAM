import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { transaction } from "../store/Slices/productSlice";
import axios from "axios";

const checkoutCart = ({ data, increment, decrement, deleteItem, total }) => {
  const dispatch = useDispatch();

  const [no_order, set_no_order] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [resultTotal, setResutTotal] = useState(total);
  const handleNoOrder = (e) => set_no_order(e.target.value);

  const handleTransaction = async () => {
    const resultName = data?.map((data) => {
      return data?.name;
    });
    setName(resultName);

    const res = await axios.post(
      "http://localhost:3000/transaction",
      { no_order, total: resultTotal, name },
      {
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      }
    );

    setToken(res.data.token);
    console.log(res.data.token);
  };

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (res) => {
          localStorage.setItem("Pembayaran", JSON.stringify(res));
          setToken("");
        },
        onPending: (res) => {
          localStorage.setItem("Pembayaran", JSON.stringify(res));
          setToken("");
        },
        onError: (error) => {
          console.log(error);
          setToken("");
        },
        onClose: () => {
          console.log("Anda belum  menyelesaikan pembayaran");
          setToken("");
        },
      });
      set_no_order("");
      setResutTotal(0);
      setName("");
    }
  }, [token]);

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = import.meta.env.VITE_REACT_APP_CLIENT_KEY;

    scriptTag.setAttribute("data-client-key", midtransClientKey);
    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className="w-full h-auto p-10 mt-20 flex flex-col space-y-4 justify-center items-center relative ">
      {data?.map((data, i) => (
        <div
          key={i}
          className="flex space-x-10 w-full h-20 border-orange-200 border-b items-center"
        >
          <img src={data?.mainImg} className="w-14 h-10" />
          <div className="w-80 h-auto line-clamp-1">{data?.name}</div>
          <div className="flex space-x-2">
            <div
              className="cursor-pointer select-none"
              onClick={() => decrement(data.id)}
            >
              -
            </div>
            <p className="font-semibold">{data?.qty}</p>
            <div
              className="cursor-pointer select-none"
              onClick={() => increment(data.id)}
            >
              +
            </div>
          </div>
          <p className="font-semibold">Rp. {data.price}</p>
          <p className="font-semibold">{data.price * data.qty}</p>
          <BsFillTrashFill
            className="w-5 h-5 bg-red-500 text-white rounded-sm cursor-pointer"
            onClick={() => deleteItem(data.id)}
          />
          <input
            type="text"
            placeholder="No Order"
            value={no_order}
            onChange={handleNoOrder}
          />
        </div>
      ))}
      {data?.length ? (
        <div className="'flex self-end w-40 border-b border-orange-600 text-lg font-bold">
          Total : Rp.{total} <br />
          <button className="bg-yelow font-light" onClick={handleTransaction}>
            Bayar
          </button>
        </div>
      ) : (
        <p>belum ada product yang di tambahkan</p>
      )}
    </div>
  );
};

export default checkoutCart;
