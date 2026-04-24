"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {LaptopMinimalCheck,Loader2,CreditCard,ShieldCheck,} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Pay = ({ cart }) => {
  const [agree, setAgree] = useState(true);

  const total = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const { isPending, isError, mutate, data } = useMutation({
    mutationFn: async (cart) => {
      const startTime = Date.now();

      const response = await axios.post(
        "http://localhost:3002/payment-service",
        { cart }
      );

      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;

      return { ...response, duration };
    },
  });

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col gap-6 border border-gray-100">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Payment Summary</h1>
        <ShieldCheck className="text-green-500 w-5 h-5" />
      </div>

      {/* TOTAL */}
      <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
        <span className="text-gray-500 text-sm">Total</span>
        <span className="text-2xl font-bold text-black">${total}</span>
      </div>

      {/* CARD */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white p-4 rounded-xl flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs opacity-70">Card Holder</span>
          <span className="font-semibold">Mahmoud</span>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xs opacity-70">Card</span>
          <span className="font-semibold">**** 3567</span>
        </div>

        <Image src="/visa.png" alt="visa" width={40} height={25} />
      </div>

      {/* TERMS */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <input
          type="checkbox"
          checked={agree}
          onChange={() => setAgree(!agree)}
          className="w-4 h-4"
        />
        <span>
          I agree to the{" "}
          <span className="text-black font-medium cursor-pointer hover:underline">
            Terms & Conditions
          </span>
        </span>
      </div>

      {/* BUTTON */}
      <button
        disabled={isPending || !agree}
        onClick={() => mutate(cart)}
        className="bg-black text-white py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4" />
            Pay ${total}
          </>
        )}
      </button>

      {/* SUCCESS */}
      {data && (
        <div className="bg-green-50 text-green-600 p-3 rounded-lg flex items-center gap-2 text-sm">
          <LaptopMinimalCheck className="w-5 h-5" />
          Payment successful in{" "}
          <span className="font-bold">{data.duration}s</span>
        </div>
      )}

      {/* ERROR */}
      {isError && (
        <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
          Payment failed. Try again.
        </div>
      )}
    </div>
  );
};

export default Pay;