import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Contact() {
  const [error, seterror] = useState({});
  const [loader, setloader] = useState(false);
  const [formdata, setformdata] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const notify = () =>
    toast.success("Message Submitted !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const validation = () => {
    let validationeror = {};
    if (!formdata.fullname.trim()) {
      validationeror.fullname = "Enterd FullName";
    } else if (formdata.fullname.length < 4) {
      validationeror.fullname = " FullName Must Be 4 Char";
    }
    if (!formdata.email.trim()) {
      validationeror.email = " Email Is Required";
    } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
      validationeror.email = " Email Is Not Valid";
    }
    if (!formdata.message.trim()) {
      validationeror.message = " Message Is Required";
    } else if (formdata.message.length < 4) {
      validationeror.message = "Message Must Be 4 Char";
    }
    return validationeror;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const validationerror = validation(formdata); // ✅ get errors
    seterror(validationerror); // ✅ store in state for UI
    if (Object.keys(validationerror).length > 0) {
      console.log("Validation failed");
      return;
    }
    try {
      setloader(true);
      axios
        .post("https://digitalden-backend-lq55.onrender.com/auth/contactpage", formdata)
        .then((res) => {
          console.log("Submited", res.data);
          setformdata({ fullname: "", email: "", message: "" });
          notify();
          setloader(false);
        })
        .catch((err) => console.log("error", err));
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <section
        className="min-h-screen bg-cover "
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")',
        }}
      >
        <div className="flex flex-col min-h-screen bg-black/60">
          <div className="container flex flex-col flex-1 px-6 py-12 mx-auto">
            <div className="flex-1 lg:flex lg:items-center lg:-mx-6">
              <div className="text-white lg:w-1/2 lg:mx-6">
                <h1 className="text-2xl font-semibold capitalize lg:text-3xl">
                  We're Here to <span className="text-indigo-500">Help</span>!
                </h1>
                <p className="max-w-xl mt-6">
                  At <span className="text-indigo-500">Digital Den</span>, your
                  satisfaction is our top priority. Whether you have a question
                  about a product, need assistance with an order, or want to
                  share your feedback, our team is here to help.
                </p>
                {/* <button className="px-8 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50">
                  get in touch
                </button> */}
                <div className="mt-6 md:mt-8">
                  <h3 className="text-gray-300 ">Follow us</h3>
                  <div className="flex mt-4 -mx-1.5 ">
                    <a
                      className="mx-1.5 text-white transition-colors duration-300 transform hover:text-indigo-500"
                      href="#"
                    >
                      <svg
                        className="w-10 h-10 fill-current"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18.6668 6.67334C18.0002 7.00001 17.3468 7.13268 16.6668 7.33334C15.9195 6.49001 14.8115 6.44334 13.7468 6.84201C12.6822 7.24068 11.9848 8.21534 12.0002 9.33334V10C9.83683 10.0553 7.91016 9.07001 6.66683 7.33334C6.66683 7.33334 3.87883 12.2887 9.3335 14.6667C8.0855 15.498 6.84083 16.0587 5.3335 16C7.53883 17.202 9.94216 17.6153 12.0228 17.0113C14.4095 16.318 16.3708 14.5293 17.1235 11.85C17.348 11.0351 17.4595 10.1932 17.4548 9.34801C17.4535 9.18201 18.4615 7.50001 18.6668 6.67268V6.67334Z" />
                      </svg>
                    </a>
                    <a
                      className="mx-1.5 text-white transition-colors duration-300 transform hover:text-indigo-500"
                      href="#"
                    >
                      <svg
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.2 8.80005C16.4731 8.80005 17.694 9.30576 18.5941 10.2059C19.4943 11.1061 20 12.327 20 13.6V19.2H16.8V13.6C16.8 13.1757 16.6315 12.7687 16.3314 12.4687C16.0313 12.1686 15.6244 12 15.2 12C14.7757 12 14.3687 12.1686 14.0687 12.4687C13.7686 12.7687 13.6 13.1757 13.6 13.6V19.2H10.4V13.6C10.4 12.327 10.9057 11.1061 11.8059 10.2059C12.7061 9.30576 13.927 8.80005 15.2 8.80005Z"
                          fill="currentColor"
                        />
                        <path
                          d="M7.2 9.6001H4V19.2001H7.2V9.6001Z"
                          fill="currentColor"
                        />
                        <path
                          d="M5.6 7.2C6.48366 7.2 7.2 6.48366 7.2 5.6C7.2 4.71634 6.48366 4 5.6 4C4.71634 4 4 4.71634 4 5.6C4 6.48366 4.71634 7.2 5.6 7.2Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                    <a
                      className="mx-1.5 text-white transition-colors duration-300 transform hover:text-indigo-500"
                      href="#"
                    >
                      <svg
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 10.2222V13.7778H9.66667V20H13.2222V13.7778H15.8889L16.7778 10.2222H13.2222V8.44444C13.2222 8.2087 13.3159 7.9826 13.4826 7.81591C13.6493 7.64921 13.8754 7.55556 14.1111 7.55556H16.7778V4H14.1111C12.9324 4 11.8019 4.46825 10.9684 5.30175C10.1349 6.13524 9.66667 7.2657 9.66667 8.44444V10.2222H7Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                    <a
                      className="mx-1.5 text-white transition-colors duration-300 transform hover:text-indigo-500"
                      href="#"
                    >
                      <svg
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.9294 7.72275C9.65868 7.72275 7.82715 9.55428 7.82715 11.825C7.82715 14.0956 9.65868 15.9271 11.9294 15.9271C14.2 15.9271 16.0316 14.0956 16.0316 11.825C16.0316 9.55428 14.2 7.72275 11.9294 7.72275ZM11.9294 14.4919C10.462 14.4919 9.26239 13.2959 9.26239 11.825C9.26239 10.354 10.4584 9.15799 11.9294 9.15799C13.4003 9.15799 14.5963 10.354 14.5963 11.825C14.5963 13.2959 13.3967 14.4919 11.9294 14.4919ZM17.1562 7.55495C17.1562 8.08692 16.7277 8.51178 16.1994 8.51178C15.6674 8.51178 15.2425 8.08335 15.2425 7.55495C15.2425 7.02656 15.671 6.59813 16.1994 6.59813C16.7277 6.59813 17.1562 7.02656 17.1562 7.55495ZM19.8731 8.52606C19.8124 7.24434 19.5197 6.10901 18.5807 5.17361C17.6453 4.23821 16.51 3.94545 15.2282 3.88118C13.9073 3.80621 9.94787 3.80621 8.62689 3.88118C7.34874 3.94188 6.21341 4.23464 5.27444 5.17004C4.33547 6.10544 4.04628 7.24077 3.98201 8.52249C3.90704 9.84347 3.90704 13.8029 3.98201 15.1238C4.04271 16.4056 4.33547 17.5409 5.27444 18.4763C6.21341 19.4117 7.34517 19.7045 8.62689 19.7687C9.94787 19.8437 13.9073 19.8437 15.2282 19.7687C16.51 19.708 17.6453 19.4153 18.5807 18.4763C19.5161 17.5409 19.8089 16.4056 19.8731 15.1238C19.9481 13.8029 19.9481 9.84704 19.8731 8.52606ZM18.1665 16.5412C17.8881 17.241 17.349 17.7801 16.6456 18.0621C15.5924 18.4799 13.0932 18.3835 11.9294 18.3835C10.7655 18.3835 8.26272 18.4763 7.21307 18.0621C6.51331 17.7837 5.9742 17.2446 5.69215 16.5412C5.27444 15.488 5.37083 12.9888 5.37083 11.825C5.37083 10.6611 5.27801 8.15832 5.69215 7.10867C5.97063 6.40891 6.50974 5.8698 7.21307 5.58775C8.26629 5.17004 10.7655 5.26643 11.9294 5.26643C13.0932 5.26643 15.596 5.17361 16.6456 5.58775C17.3454 5.86623 17.8845 6.40534 18.1665 7.10867C18.5843 8.16189 18.4879 10.6611 18.4879 11.825C18.4879 12.9888 18.5843 15.4916 18.1665 16.5412Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 lg:w-1/2 lg:mx-6">
                <div className="w-full px-8 py-10 mx-auto overflow-hidden bg-white shadow-2xl rounded-xl  lg:max-w-xl">
                  <h1 className="text-xl font-medium text-gray-900 ">
                    Contact form
                  </h1>
                  <p className="mt-2 text-gray-500 ">
                    Ask us everything and we would love to hear from you
                  </p>
                  <form className="mt-6" onSubmit={handlesubmit}>
                    <div className="flex-1">
                      <label className="block mb-2 text-sm text-gray-900 ">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        value={formdata.fullname}
                        placeholder="John Doe"
                        onChange={handlechange}
                        className="block w-full px-5 py-3 mt-2 text-gray-900 bg-white border border-gray-200 rounded-md  focus:border-indigo-400 focus:ring-indigo-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                      />
                      {<span className="text-red-400">{error.fullname}</span>}
                    </div>
                    <div className="flex-1 mt-6">
                      <label className="block mb-2 text-sm text-gray-900 ">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formdata.email}
                        onChange={handlechange}
                        placeholder="johndoe@example.com"
                        className="block w-full px-5 py-3 mt-2 text-gray-900 bg-white border border-gray-200 rounded-md  focus:border-indigo-400 focus:ring-indigo-400 focus:ring-opacity-40  focus:outline-none focus:ring"
                      />
                      {<span className="text-red-400">{error.email}</span>}
                    </div>

                    <div className="w-full mt-6">
                      <label className="block mb-2 text-sm text-gray-900 ">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formdata.message}
                        onChange={handlechange}
                        className="block w-full h-32 px-5 py-3 mt-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-48  focus:border-indigo-400 focus:ring-indigo-400 focus:ring-opacity-40  focus:outline-none focus:ring"
                        placeholder="Message"
                      />
                      {<span className="text-red-400">{error.message}</span>}
                    </div>
                    <button
                      type="submit"
                      className=" px-8 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
                    >
                      {loader ? "submitting" : "get in touch"}
                    </button>
                  </form>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
