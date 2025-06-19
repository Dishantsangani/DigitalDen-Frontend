import React, { useState } from "react";
import axios from "axios";

function Payment({ cartData }) {
  const [error, seterror] = useState({});
  const [loader, setloader] = useState(false);

  const [formdata, setformdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneno: "",
    addressline: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const validation = () => {
    let validationerror = {};

    if (!formdata.firstname.trim()) {
      validationerror.firstname = "Firstname Is Required";
    } else if (formdata.firstname.length < 4) {
      validationerror.firstname = "Firstname Must Be 4 Char";
    }

    if (!formdata.lastname.trim()) {
      validationerror.lastname = "Lastname Is Required";
    } else if (formdata.lastname.length < 4) {
      validationerror.lastname = "Lastname Must Be 4 Char";
    }

    if (!formdata.email.trim()) {
      validationerror.email = "Email Is Required";
    } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
      validationerror.email = "Email Is Not Valid";
    }

    if (!formdata.phoneno.trim()) {
      validationerror.phoneno = "Phone Number Is Required";
    } else if (formdata.phoneno.length < 10) {
      validationerror.phoneno = "Phone Number Is Must be 10 Number";
    }

    if (!formdata.addressline.trim()) {
      validationerror.addressline = "Address Is Required";
    } else if (formdata.addressline.length < 12) {
      validationerror.addressline = "Address Is Must be 12 Char";
    }

    if (!formdata.city.trim()) {
      validationerror.formdata = "City Is Required";
    } else if (formdata.city.length < 4) {
      validationerror.formdata = "City Must Be 4 Char";
    }

    if (!formdata.state.trim()) {
      validationerror.state = "State IS Required";
    } else if (formdata.state.length < 4) {
      validationerror.formdata = "State Must Be 4 Char";
    }

    if (!formdata.zipcode.trim()) {
      validationerror.zipcode = "Zipcode Is Required";
    } else if (formdata.zipcode.length < 4) {
      validationerror.zipcode = "Zipcode Must Be 4 Char ";
    }
    return validationerror;
  };

  async function handlesubmit(e) {
    e.preventDefault();

    const validationerror = validation(formdata); // ✅ get errors
    seterror(validationerror); // ✅ store in state for UI

    if (Object.keys(validationerror).length > 0) {
      console.log("Validation failed");
      return;
    }

    try {
      setloader(true);
      const response = await axios.post("http://localhost:1700/auth/checkout");
      setloader(false);
      if (response && response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  // Subtotal
  const subtotal = Array.isArray(cartData)
    ? cartData.reduce((acc, item) => acc + item.price * (item.qty || 1), 0)
    : 0;

  return (
    <>
      <div className="bg-white sm:px-8 px-4 py-6">
        <div className="max-w-screen-xl max-md:max-w-xl mx-auto">
          {/*  */}
          <div className="flex items-start mb-16">
            <div className="w-full">
              <div className="flex items-center w-full">
                <div className="w-8 h-8 shrink-0 mx-[-1px] bg-indigo-600 p-1.5 flex items-center justify-center rounded-full">
                  <span className="text-sm text-white font-semibold">1</span>
                </div>
                <div className="w-full h-[3px] mx-4 rounded-lg bg-indigo-600" />
              </div>
              <div className="mt-2 mr-4">
                <h6 className="text-sm font-semibold text-slate-900">Cart</h6>
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center w-full">
                <div className="w-8 h-8 shrink-0 mx-[-1px] bg-indigo-600 p-1.5 flex items-center justify-center rounded-full">
                  <span className="text-sm text-white font-semibold">2</span>
                </div>
                <div className="w-full h-[3px] mx-4 rounded-lg bg-slate-300" />
              </div>
              <div className="mt-2 mr-4">
                <h6 className="text-sm font-semibold text-slate-900">
                  Checkout
                </h6>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <div className="w-8 h-8 shrink-0 mx-[-1px] bg-slate-300 p-1.5 flex items-center justify-center rounded-full">
                  <span className="text-sm text-white font-semibold">3</span>
                </div>
              </div>
              <div className="mt-2">
                <h6 className="text-sm font-semibold text-slate-400">Order</h6>
              </div>
            </div>
          </div>

          {/* Updated */}
          <form
            onSubmit={handlesubmit}
            className="grid lg:grid-cols-3 gap-y-12 gap-x-12"
          >
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-xl text-slate-900 font-semibold mb-6">
                  Delivery Details
                </h2>
                <div className="grid lg:grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      value={formdata.firstname}
                      onChange={handlechange}
                      placeholder="Enter First Name"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
                    />
                    {<p className="text-red-400">{error.firstname}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      value={formdata.lastname}
                      onChange={handlechange}
                      placeholder="Enter Last Name"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
                    />
                    {<p className="text-red-400">{error.lastname}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formdata.email}
                      onChange={handlechange}
                      placeholder="Enter Email"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
                    />
                    {<p className="text-red-400">{error.email}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Phone No.
                    </label>
                    <input
                      type="number"
                      name="phoneno"
                      value={formdata.phoneno}
                      onChange={handlechange}
                      placeholder="Enter Phone No."
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
                    />
                    {<p className="text-red-400">{error.phoneno}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Address Line
                    </label>
                    <input
                      type="text"
                      name="addressline"
                      value={formdata.addressline}
                      onChange={handlechange}
                      placeholder="Enter Address Line"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
                    />
                    {<p className="text-red-400">{error.addressline}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formdata.city}
                      onChange={handlechange}
                      placeholder="Enter City"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
                    />
                    {<p className="text-red-400">{error.city}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formdata.state}
                      onChange={handlechange}
                      placeholder="Enter State"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
                    />
                    {<p className="text-red-400">{error.state}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      Zip Code
                    </label>
                    <input
                      type="number"
                      name="zipcode"
                      value={formdata.zipcode}
                      onChange={handlechange}
                      placeholder="Enter Zip Code"
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-indigo-600"
                    />
                    {<p className="text-red-400">{error.zipcode}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div>
                <h2 className="text-xl text-slate-900 font-semibold mb-6">
                  Payment
                </h2>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="payment-box">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="method"
                        id="card"
                        className="w-5 h-5"
                        defaultChecked
                      />
                      <label
                        htmlFor="card"
                        className="ml-4 flex gap-2 cursor-pointer"
                      >
                        <img
                          src="https://readymadeui.com/images/visa.webp"
                          className="w-12"
                        />
                        <img
                          src="https://readymadeui.com/images/american-express.webp"
                          className="w-12"
                        />
                        <img
                          src="https://readymadeui.com/images/master.webp"
                          className="w-12"
                        />
                      </label>
                    </div>
                    <p className="mt-4 text-sm text-slate-500 font-medium">
                      Pay with your debit or credit card
                    </p>
                  </div>
                  <div className="payment-box">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="method"
                        id="paypal"
                        className="w-5 h-5"
                      />
                      <label
                        htmlFor="paypal"
                        className="ml-4 flex gap-2 cursor-pointer"
                      >
                        <img
                          src="https://readymadeui.com/images/paypal.webp"
                          className="w-20"
                        />
                      </label>
                    </div>
                    <p className="mt-4 text-sm text-slate-500 font-medium">
                      Pay with your PayPal account
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT 1/3: Order Summary */}
            <div className="relative">
              <h2 className="text-xl text-slate-900 font-semibold mb-6">
                Order Summary
              </h2>
              <ul className="text-slate-500 font-medium space-y-4 text-sm">
                <li className="flex justify-between">
                  Subtotal{" "}
                  <span className="text-slate-900 font-semibold">
                    ${subtotal.toFixed(2)}
                  </span>
                </li>
                <li className="flex justify-between">
                  Discount{" "}
                  <span className="text-slate-900 font-semibold">$0.00</span>
                </li>
                <li className="flex justify-between">
                  Shipping{" "}
                  <span className="text-slate-900 font-semibold">$0.00</span>
                </li>
                <li className="flex justify-between">
                  Tax{" "}
                  <span className="text-slate-900 font-semibold">$0.00</span>
                </li>
                <hr className="border-slate-300" />
                <li className="flex justify-between text-base font-semibold text-slate-900">
                  Total <span>${subtotal.toFixed(2)}</span>
                </li>
              </ul>
              <div className="mt-8">
                <button
                  type="submit"
                  className="rounded-md px-4 py-2.5 w-full text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {loader ? "purchasing" : "Complete Purchase"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Payment;
