"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import OrderSummary from "../OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { onUpdateUser } from "@/redux/userSlice";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "firstName is too short!")
    .max(10, "firstName is too long!")
    .required("firstName is required"),
  lastName: Yup.string()
    .min(2, "lastName is too short!")
    .max(10, "lastName is too long!")
    .required("lastName is required"),
  email: Yup.string()
    .email()
    .matches(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, "Not a valid email")
    .required("Email is required"),
  paymentType: Yup.string().required("phone is required"),
  billingphoneNumber: Yup.string()
    .min(2, "phone is too short!")
    .max(10, "phone is too long!")
    .required("phone is required"),
  billingaddress: Yup.string()
    .min(2, "address is too short!")
    .max(25, "address is too long!")
    .required("address is required"),
  billingcity: Yup.string()
    .min(2, "city is too short!")
    .max(25, "city is too long!")
    .required("city is required"),
  billingstate: Yup.string()
    .min(2, "state is too short!")
    .max(25, "state is too long!")
    .required("state is required"),
  billingpostalCode: Yup.string()
    .min(2, "pinCode is too short!")
    .max(10, "pinCode is too long!")
    .required("pinCode is required"),
  billingcountry: Yup.string()
    .min(2, "country is too short!")
    .max(25, "country is too long!")
    .required("country is required"),
  shippingphoneNumber: Yup.string()
    .min(2, "phone is too short!")
    .max(10, "phone is too long!")
    .required("phone is required"),
  shippingaddress: Yup.string()
    .min(2, "address is too short!")
    .max(25, "address is too long!")
    .required("address is required"),
  shippingcity: Yup.string()
    .min(2, "city is too short!")
    .max(25, "city is too long!")
    .required("city is required"),
  shippingstate: Yup.string()
    .min(2, "state is too short!")
    .max(25, "state is too long!")
    .required("state is required"),
  shippingpostalCode: Yup.string()
    .min(2, "pinCode is too short!")
    .max(10, "pinCode is too long!")
    .required("pinCode is required"),
  shippingcountry: Yup.string()
    .min(2, "country is too short!")
    .max(25, "country is too long!")
    .required("country is required"),
  cardFirstName: Yup.string()
    .min(2, "country is too short!")
    .max(25, "country is too long!")
    .required("country is required"),
  cardLastName: Yup.string()
    .min(2, "country is too short!")
    .max(25, "country is too long!")
    .required("country is required"),
  creditCardNumber: Yup.string()
    .min(2, "country is too short!")
    .max(25, "country is too long!")
    .required("country is required"),
  cardSecurityCode: Yup.string()
    .min(4, "country is too short!")
    .max(10, "country is too long!")
    .required("country is required"),
  CardExpiration: Yup.string()
    .min(2, "country is too short!")
    .max(25, "country is too long!")
    .required("country is required"),
});

function Form() {
  const loggedInUser = useSelector((state) => state.userReducer.loggedInUser);
  const dispatch = useDispatch();
  const titleData = [
    "General Details",
    "Billing Address Details",
    "Payment Details",
    "Order Summary",
  ];
  const data = [
    [
      {
        id: "firstName",
        name: "firstName",
        type: "text",
        label: "First Name",
        placeholder: "First Name",
      },
      {
        id: "lastName",
        name: "lastName",
        type: "text",
        label: "Last Name",
        placeholder: "Last Name",
      },
      {
        id: "email",
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Email",
      },
    ],
    [
      {
        id: "billingphoneNumber",
        name: "billingphoneNumber",
        type: "text",
        label: "Phone Number",
        placeholder: "Phone Number",
      },
      {
        id: "billingaddress",
        name: "billingaddress",
        type: "text",
        label: "Address",
        placeholder: "Address",
      },
      {
        id: "billingcity",
        name: "billingcity",
        type: "text",
        label: "City",
        placeholder: "City",
      },
      {
        id: "billingpostalCode",
        name: "billingpostalCode",
        type: "text",
        label: "Postal Code",
        placeholder: "Postal Code",
      },
      {
        id: "billingstate",
        name: "billingstate",
        type: "text",
        label: "State",
        placeholder: "State",
      },
      {
        id: "billingcountry",
        name: "billingcountry",
        type: "text",
        label: "Country",
        placeholder: "Country",
      },
      {
        id: "makeThisAddressAsShippingAddress",
        name: "makeThisAddressAsShippingAddress",
        type: "checkbox",
        label: "Make this address as Shipping Address",
      },
    ],
    [
      {
        id: "cashOnDelivery",
        value: "cashOnDelivery",
        name: "paymentType",
        type: "radio",
        label: "Cash On Delivery",
      },
      {
        id: "debitOrCrerditCard",
        value: "debitOrCrerditCard",
        name: "paymentType",
        type: "radio",
        label: "Debit or Credit Card",
      },
    ],
  ];
  const paymentData = [
    {
      id: "cardFirstName",
      name: "cardFirstName",
      type: "text",
      label: "First Name",
      placeholder: "First Name",
    },
    {
      id: "cardLastName",
      name: "cardLastName",
      type: "text",
      label: "Last Name",
      placeholder: "Last Name",
    },
    {
      id: "creditCardNumber",
      name: "creditCardNumber",
      type: "text",
      label: "Credit Card Number",
      placeholder: "Credit Card Number",
    },
    {
      id: "cardSecurityCode",
      name: "cardSecurityCode",
      type: "text",
      label: "Security Code",
      placeholder: "Security Code",
    },
    {
      id: "CardExpiration",
      name: "CardExpiration",
      type: "text",
      label: "Card Expiration",
      placeholder: "Card Expiration",
    },
  ];
  const shippingFormData = [
    {
      id: "shippingphoneNumber",
      name: "shippingphoneNumber",
      type: "text",
      label: "Phone Number",
      placeholder: "Phone Number",
    },
    {
      id: "shippingaddress",
      name: "shippingaddress",
      type: "text",
      label: "Address",
      placeholder: "Address",
    },
    {
      id: "shippingcity",
      name: "shippingcity",
      type: "text",
      label: "City",
      placeholder: "City",
    },
    {
      id: "shippingpostalCode",
      name: "shippingpostalCode",
      type: "text",
      label: "Postal Code",
      placeholder: "Postal Code",
    },
    {
      id: "shippingstate",
      name: "shippingstate",
      type: "text",
      label: "State",
      placeholder: "State",
    },
    {
      id: "shippingcountry",
      name: "shippingcountry",
      type: "text",
      label: "Country",
      placeholder: "Country",
    },
  ];
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    billingphoneNumber: "",
    billingaddress: "",
    billingcity: "",
    billingpostalCode: "",
    billingstate: "",
    billingcountry: "",
    shippingphoneNumber: "",
    shippingaddress: "",
    shippingcity: "",
    shippingpostalCode: "",
    shippingstate: "",
    shippingcountry: "",
    paymentType: "cashOnDelivery",
    cardFirstName: "",
    cardLastName: "",
    creditCardNumber: "",
    cardSecurityCode: "",
    CardExpiration: "",
  });
  const [forms, setForms] = useState(data);
  const [index, setIndex] = useState(0);
  const [paymentType, setPaymentType] = useState("cashondelivery");
  const [shippingForm, setShippingForm] = useState(false);
  const [errors, seterrors] = useState("");

  const onChangeHandler = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    if (e.target.type == "radio") {
      setPaymentType(id);
      console.log(id);
      setformData((prevData) => ({
        ...prevData,
        ["paymentType"]: id,
      }));
      if (id == "cashOnDelivery") {
        setformData((prevData) => ({
          ...prevData,

          ["cardFirstName"]: "None",
          ["cardLastName"]: "None",
          ["creditCardNumber"]: "None",
          ["cardSecurityCode"]: "None",
          ["CardExpiration"]: "None",
        }));
      }
    }
    if (
      id == "makeThisAddressAsShippingAddress" &&
      e.target.type == "checkbox"
    ) {
      setShippingForm(e.target.checked);
      if (e.target.checked == true) {
        setformData((prevData) => ({
          ...prevData,
          ["shippingphoneNumber"]: formData.billingphoneNumber,
          ["shippingaddress"]: formData.billingaddress,
          ["shippingcity"]: formData.billingcity,
          ["shippingpostalCode"]: formData.billingpostalCode,
          ["shippingstate"]: formData.billingstate,
          ["shippingcountry"]: formData.billingcountry,
        }));
      } else {
        setformData((prevData) => ({
          ...prevData,
          ["shippingphoneNumber"]: "",
          ["shippingaddress"]: "",
          ["shippingcity"]: "",
          ["shippingpostalCode"]: "",
          ["shippingstate"]: "",
          ["shippingcountry"]: "",
        }));
      }
    }
    if (e.target.type == "text" || e.target.type == "email") {
      setformData((prevData) => ({
        ...prevData,
        [id]: val,
      }));
    }
  };
  const validateInputHandler = async (e) => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      debugger;
      console.log("form is valid", formData);
      let newData = loggedInUser;
      dispatch(onUpdateUser(loggedInUser));
      seterrors({});
      setIndex(index + 1);
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      seterrors(validationErrors);
      setIndex(0);
      console.log("form is Invalid", validationErrors);
    }
  };
  const nextHandler = (e) => {
    e.preventDefault();
    if (index < forms.length - 1) {
      setIndex(index + 1);
      console.log("next");
      console.log(formData);
    } else {
      validateInputHandler();
    }
  };

  const submitHandler = (e) => {
    console.log("submit");
    alert("order placed");
  };
  return (
    <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
      <div className="col-span-12 border border-gray-200 p-4 rounded">
        <h1 className="text-center text-3xl m-2 text-primary">
          {titleData[index]}
        </h1>

        {Object.keys(errors).length ? (
          <p style={{ color: "red" }}>
            Please recheck the details you had entered
          </p>
        ) : (
          <></>
        )}
        {index != forms.length ? (
          <form className="my-4 sm:my-5">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              {forms[index].map((form, i) => (
                <div key={form.label}>
                  <label
                    htmlFor={form.id}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {form.label}
                  </label>
                  <input
                    type={form.type}
                    id={form.id}
                    name={form.name}
                    placeholder={form.placeholder}
                    value={formData[form.name]}
                    onChange={onChangeHandler}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      form.type == "radio" || form.type == "checkbox"
                        ? "w-auto"
                        : " w-full "
                    }`}
                  />
                  {errors[form.name] && (
                    <p style={{ color: "red" }}>{errors[form.name]}</p>
                  )}
                </div>
              ))}
            </div>
            {!shippingForm && index == 1 && (
              <form className="my-4 sm:my-5">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  {shippingFormData.map((form, i) => (
                    <div key={form.label}>
                      <label
                        htmlFor={form.id}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {form.label}
                      </label>
                      <input
                        type={form.type}
                        id={form.id}
                        name={form.name}
                        placeholder={form.placeholder}
                        value={formData[form.id]}
                        onChange={onChangeHandler}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                          form.type == "radio" || form.type == "checkbox"
                            ? "w-auto"
                            : " w-full "
                        }`}
                      />
                      {errors[form.name] && (
                        <p style={{ color: "red" }}>{errors[form.name]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </form>
            )}
            {paymentType == "debitOrCrerditCard" && index == 2 && (
              <form className="my-4 sm:my-5">
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  {paymentData.map((form, i) => (
                    <div key={form.label}>
                      <label
                        htmlFor={form.id}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {form.label}
                      </label>
                      <input
                        type={form.type}
                        id={form.id}
                        name={form.name}
                        placeholder={form.placeholder}
                        value={formData[form.id]}
                        onChange={onChangeHandler}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                          form.type == "radio" || form.type == "checkbox"
                            ? "w-auto"
                            : " w-full "
                        }`}
                      />
                      {errors[form.name] && (
                        <p style={{ color: "red" }}>{errors[form.name]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </form>
            )}
          </form>
        ) : (
          <>
            <div className="my-4 sm:my-5">
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="border w-1/2">
                  <h1 className="text-center">Your Details</h1>
                  <hr />
                  {Object.entries(formData).map((userData) => (
                    <>
                      <div className="grid gap-6 md:grid-cols-2">
                        <p className="px-8">{userData[0]}</p>
                        <p className="">{userData[1]}</p>
                      </div>
                    </>
                  ))}
                </div>
                <div className="border w-1/2">
                  <h1 className="text-center">Product Details</h1>
                  <hr />
                  <div className="grid gap-6 md:grid-cols-2">
                    <OrderSummary />
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </>
        )}

        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="grid w-1/2">
            <button
              className={`mt-4 justify-self-start justify-end py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium ${
                index == 0 && "hidden"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setIndex(index - 1);
              }}
            >
              Previous
            </button>
          </div>
          <div className="grid w-1/2 justify-self-end justify-end">
            {index == forms.length ? (
              <button
                className="mt-4 justify-self-start justify-end py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
                onClick={submitHandler}
              >
                Place Order
              </button>
            ) : (
              <button
                className="mt-4 justify-self-start justify-end py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
                onClick={nextHandler}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
