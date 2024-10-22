"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import OrderSummary from "../OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { updateCheckoutInfo } from "@/redux/userSlice";
import Link from "next/link";
import "./style.css";

const generalValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "firstName is too short!")
    .max(10, "firstName is too long!")
    .matches(/^[a-zA-Z]{1,10}$/, "Use only Alphabets(a-z or A-Z)")
    .required("firstName is required"),
  lastName: Yup.string()
    .min(2, "lastName is too short!")
    .max(10, "lastName is too long!")
    .matches(/^[a-zA-Z]{1,10}$/, "Use only Alphabets(a-z or A-Z)")
    .required("lastName is required"),
  email: Yup.string()
    .email()
    .matches(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, "Not a valid email")
    .required("Email is required"),
});
const addressValidationSchema = Yup.object().shape({
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
});
const paymentValidationSchema = Yup.object().shape({
  creditCardNumber: Yup.string()
    .min(10, "creditCardNumber is too short!")
    .max(20, "creditCardNumber is too long!")
    .required("creditCardNumber is required"),
  cardSecurityCode: Yup.string()
    .min(2, "cardSecurityCode is too short!")
    .max(4, "cardSecurityCode is too long!")
    .required("cardSecurityCode is required"),
  CardExpiration: Yup.string()
    .matches(
      /^\d{2}\/\d{2}$/,
      "CardExpiration Date must be in the format MM/YY"
    )
    .test("valid-month", "Month must be between 01 and 12", (value) => {
      const [month, year] = value.split("/");
      return Number(month) >= 1 && Number(month) <= 12;
    })
    .test("valid-year", "Year must be between 24 and 50", (value) => {
      const [month, year] = value.split("/");
      return Number(year) >= 24 && Number(year) <= 50;
    })
    .required("CardExpiration is required"),
});

function Form() {
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
      {
        id: "phoneNumber",
        name: "phoneNumber",
        type: "number",
        label: "phoneNumber",
        placeholder: "9876543210",
      },
    ],
    [
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
        type: "number",
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
        id: "cashondelivery",
        name: "cashondelivery",
        type: "checkbox",
        label: "Cash On Delivery",
      },
    ],
  ];
  const paymentData = [
    {
      id: "creditCardNumber",
      name: "creditCardNumber",
      type: "number",
      label: "Credit Card Number",
      placeholder: "12342315132",
    },
    {
      id: "cardSecurityCode",
      name: "cardSecurityCode",
      type: "number",
      label: "Security Code",
      placeholder: "1234",
    },
    {
      id: "CardExpiration",
      name: "CardExpiration",
      type: "text",
      label: "Card Expiration",
      placeholder: "01/25",
    },
  ];
  const shippingFormData = [
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
  const [forms, setForms] = useState(data);
  const [index, setIndex] = useState(0);
  const [cashondelivery, setcashondelivery] = useState(false);
  const [shippingForm, setShippingForm] = useState(false);
  const [lastUpdateField, setlastUpdateField] = useState();
  const [showNext, setShowNext] = useState(false);
  const [errors, seterrors] = useState("");
  const [refreshErrors, setRefreshErrors] = useState(1);
  const [selectCountryCode, setselectCountryCode] = useState("+91");
  const [selectCountryCodeMenu, setselectCountryCodeMenu] = useState(false);

  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    countryCode: selectCountryCode,
    phoneNumber: "",
    email: "",
    billingaddress: "",
    billingcity: "",
    billingpostalCode: "",
    billingstate: "",
    billingcountry: "",
    makeThisAddressAsShippingAddress: shippingForm,
    shippingaddress: "",
    shippingcity: "",
    shippingpostalCode: "",
    shippingstate: "",
    shippingcountry: "",
    paymentType: "debitOrCrerditCard",
    cashondelivery: cashondelivery,
    creditCardNumber: "",
    cardSecurityCode: "",
    CardExpiration: "",
  });

  const selectCountryCodeOptions = [
    {
      name: "Afghanistan",
      dial_code: "+93",
      code: "AF",
    },
    {
      name: "Aland Islands",
      dial_code: "+358",
      code: "AX",
    },
    {
      name: "Albania",
      dial_code: "+355",
      code: "AL",
    },
    {
      name: "Algeria",
      dial_code: "+213",
      code: "DZ",
    },
    {
      name: "AmericanSamoa",
      dial_code: "+1684",
      code: "AS",
    },
    {
      name: "Andorra",
      dial_code: "+376",
      code: "AD",
    },
    {
      name: "Angola",
      dial_code: "+244",
      code: "AO",
    },
    {
      name: "Anguilla",
      dial_code: "+1264",
      code: "AI",
    },
    {
      name: "Antarctica",
      dial_code: "+672",
      code: "AQ",
    },
    {
      name: "Antigua and Barbuda",
      dial_code: "+1268",
      code: "AG",
    },
    {
      name: "Argentina",
      dial_code: "+54",
      code: "AR",
    },
    {
      name: "Armenia",
      dial_code: "+374",
      code: "AM",
    },
    {
      name: "Aruba",
      dial_code: "+297",
      code: "AW",
    },
    {
      name: "Australia",
      dial_code: "+61",
      code: "AU",
    },
    {
      name: "Austria",
      dial_code: "+43",
      code: "AT",
    },
    {
      name: "Azerbaijan",
      dial_code: "+994",
      code: "AZ",
    },
    {
      name: "Bahamas",
      dial_code: "+1242",
      code: "BS",
    },
    {
      name: "Bahrain",
      dial_code: "+973",
      code: "BH",
    },
    {
      name: "Bangladesh",
      dial_code: "+880",
      code: "BD",
    },
    {
      name: "Barbados",
      dial_code: "+1246",
      code: "BB",
    },
    {
      name: "Belarus",
      dial_code: "+375",
      code: "BY",
    },
    {
      name: "Belgium",
      dial_code: "+32",
      code: "BE",
    },
    {
      name: "Belize",
      dial_code: "+501",
      code: "BZ",
    },
    {
      name: "Benin",
      dial_code: "+229",
      code: "BJ",
    },
    {
      name: "Bermuda",
      dial_code: "+1441",
      code: "BM",
    },
    {
      name: "Bhutan",
      dial_code: "+975",
      code: "BT",
    },
    {
      name: "Bolivia, Plurinational State of",
      dial_code: "+591",
      code: "BO",
    },
    {
      name: "Bosnia and Herzegovina",
      dial_code: "+387",
      code: "BA",
    },
    {
      name: "Botswana",
      dial_code: "+267",
      code: "BW",
    },
    {
      name: "Brazil",
      dial_code: "+55",
      code: "BR",
    },
    {
      name: "British Indian Ocean Territory",
      dial_code: "+246",
      code: "IO",
    },
    {
      name: "Brunei Darussalam",
      dial_code: "+673",
      code: "BN",
    },
    {
      name: "Bulgaria",
      dial_code: "+359",
      code: "BG",
    },
    {
      name: "Burkina Faso",
      dial_code: "+226",
      code: "BF",
    },
    {
      name: "Burundi",
      dial_code: "+257",
      code: "BI",
    },
    {
      name: "Cambodia",
      dial_code: "+855",
      code: "KH",
    },
    {
      name: "Cameroon",
      dial_code: "+237",
      code: "CM",
    },
    {
      name: "Canada",
      dial_code: "+1",
      code: "CA",
    },
    {
      name: "Cape Verde",
      dial_code: "+238",
      code: "CV",
    },
    {
      name: "Cayman Islands",
      dial_code: "+ 345",
      code: "KY",
    },
    {
      name: "Central African Republic",
      dial_code: "+236",
      code: "CF",
    },
    {
      name: "Chad",
      dial_code: "+235",
      code: "TD",
    },
    {
      name: "Chile",
      dial_code: "+56",
      code: "CL",
    },
    {
      name: "China",
      dial_code: "+86",
      code: "CN",
    },
    {
      name: "Christmas Island",
      dial_code: "+61",
      code: "CX",
    },
    {
      name: "Cocos (Keeling) Islands",
      dial_code: "+61",
      code: "CC",
    },
    {
      name: "Colombia",
      dial_code: "+57",
      code: "CO",
    },
    {
      name: "Comoros",
      dial_code: "+269",
      code: "KM",
    },
    {
      name: "Congo",
      dial_code: "+242",
      code: "CG",
    },
    {
      name: "Congo, The Democratic Republic of the Congo",
      dial_code: "+243",
      code: "CD",
    },
    {
      name: "Cook Islands",
      dial_code: "+682",
      code: "CK",
    },
    {
      name: "Costa Rica",
      dial_code: "+506",
      code: "CR",
    },
    {
      name: "Cote d'Ivoire",
      dial_code: "+225",
      code: "CI",
    },
    {
      name: "Croatia",
      dial_code: "+385",
      code: "HR",
    },
    {
      name: "Cuba",
      dial_code: "+53",
      code: "CU",
    },
    {
      name: "Cyprus",
      dial_code: "+357",
      code: "CY",
    },
    {
      name: "Czech Republic",
      dial_code: "+420",
      code: "CZ",
    },
    {
      name: "Denmark",
      dial_code: "+45",
      code: "DK",
    },
    {
      name: "Djibouti",
      dial_code: "+253",
      code: "DJ",
    },
    {
      name: "Dominica",
      dial_code: "+1767",
      code: "DM",
    },
    {
      name: "Dominican Republic",
      dial_code: "+1849",
      code: "DO",
    },
    {
      name: "Ecuador",
      dial_code: "+593",
      code: "EC",
    },
    {
      name: "Egypt",
      dial_code: "+20",
      code: "EG",
    },
    {
      name: "El Salvador",
      dial_code: "+503",
      code: "SV",
    },
    {
      name: "Equatorial Guinea",
      dial_code: "+240",
      code: "GQ",
    },
    {
      name: "Eritrea",
      dial_code: "+291",
      code: "ER",
    },
    {
      name: "Estonia",
      dial_code: "+372",
      code: "EE",
    },
    {
      name: "Ethiopia",
      dial_code: "+251",
      code: "ET",
    },
    {
      name: "Falkland Islands (Malvinas)",
      dial_code: "+500",
      code: "FK",
    },
    {
      name: "Faroe Islands",
      dial_code: "+298",
      code: "FO",
    },
    {
      name: "Fiji",
      dial_code: "+679",
      code: "FJ",
    },
    {
      name: "Finland",
      dial_code: "+358",
      code: "FI",
    },
    {
      name: "France",
      dial_code: "+33",
      code: "FR",
    },
    {
      name: "French Guiana",
      dial_code: "+594",
      code: "GF",
    },
    {
      name: "French Polynesia",
      dial_code: "+689",
      code: "PF",
    },
    {
      name: "Gabon",
      dial_code: "+241",
      code: "GA",
    },
    {
      name: "Gambia",
      dial_code: "+220",
      code: "GM",
    },
    {
      name: "Georgia",
      dial_code: "+995",
      code: "GE",
    },
    {
      name: "Germany",
      dial_code: "+49",
      code: "DE",
    },
    {
      name: "Ghana",
      dial_code: "+233",
      code: "GH",
    },
    {
      name: "Gibraltar",
      dial_code: "+350",
      code: "GI",
    },
    {
      name: "Greece",
      dial_code: "+30",
      code: "GR",
    },
    {
      name: "Greenland",
      dial_code: "+299",
      code: "GL",
    },
    {
      name: "Grenada",
      dial_code: "+1473",
      code: "GD",
    },
    {
      name: "Guadeloupe",
      dial_code: "+590",
      code: "GP",
    },
    {
      name: "Guam",
      dial_code: "+1671",
      code: "GU",
    },
    {
      name: "Guatemala",
      dial_code: "+502",
      code: "GT",
    },
    {
      name: "Guernsey",
      dial_code: "+44",
      code: "GG",
    },
    {
      name: "Guinea",
      dial_code: "+224",
      code: "GN",
    },
    {
      name: "Guinea-Bissau",
      dial_code: "+245",
      code: "GW",
    },
    {
      name: "Guyana",
      dial_code: "+595",
      code: "GY",
    },
    {
      name: "Haiti",
      dial_code: "+509",
      code: "HT",
    },
    {
      name: "Holy See (Vatican City State)",
      dial_code: "+379",
      code: "VA",
    },
    {
      name: "Honduras",
      dial_code: "+504",
      code: "HN",
    },
    {
      name: "Hong Kong",
      dial_code: "+852",
      code: "HK",
    },
    {
      name: "Hungary",
      dial_code: "+36",
      code: "HU",
    },
    {
      name: "Iceland",
      dial_code: "+354",
      code: "IS",
    },
    {
      name: "India",
      dial_code: "+91",
      code: "IN",
    },
    {
      name: "Indonesia",
      dial_code: "+62",
      code: "ID",
    },
    {
      name: "Iran, Islamic Republic of Persian Gulf",
      dial_code: "+98",
      code: "IR",
    },
    {
      name: "Iraq",
      dial_code: "+964",
      code: "IQ",
    },
    {
      name: "Ireland",
      dial_code: "+353",
      code: "IE",
    },
    {
      name: "Isle of Man",
      dial_code: "+44",
      code: "IM",
    },
    {
      name: "Israel",
      dial_code: "+972",
      code: "IL",
    },
    {
      name: "Italy",
      dial_code: "+39",
      code: "IT",
    },
    {
      name: "Jamaica",
      dial_code: "+1876",
      code: "JM",
    },
    {
      name: "Japan",
      dial_code: "+81",
      code: "JP",
    },
    {
      name: "Jersey",
      dial_code: "+44",
      code: "JE",
    },
    {
      name: "Jordan",
      dial_code: "+962",
      code: "JO",
    },
    {
      name: "Kazakhstan",
      dial_code: "+77",
      code: "KZ",
    },
    {
      name: "Kenya",
      dial_code: "+254",
      code: "KE",
    },
    {
      name: "Kiribati",
      dial_code: "+686",
      code: "KI",
    },
    {
      name: "Korea, Democratic People's Republic of Korea",
      dial_code: "+850",
      code: "KP",
    },
    {
      name: "Korea, Republic of South Korea",
      dial_code: "+82",
      code: "KR",
    },
    {
      name: "Kuwait",
      dial_code: "+965",
      code: "KW",
    },
    {
      name: "Kyrgyzstan",
      dial_code: "+996",
      code: "KG",
    },
    {
      name: "Laos",
      dial_code: "+856",
      code: "LA",
    },
    {
      name: "Latvia",
      dial_code: "+371",
      code: "LV",
    },
    {
      name: "Lebanon",
      dial_code: "+961",
      code: "LB",
    },
    {
      name: "Lesotho",
      dial_code: "+266",
      code: "LS",
    },
    {
      name: "Liberia",
      dial_code: "+231",
      code: "LR",
    },
    {
      name: "Libyan Arab Jamahiriya",
      dial_code: "+218",
      code: "LY",
    },
    {
      name: "Liechtenstein",
      dial_code: "+423",
      code: "LI",
    },
    {
      name: "Lithuania",
      dial_code: "+370",
      code: "LT",
    },
    {
      name: "Luxembourg",
      dial_code: "+352",
      code: "LU",
    },
    {
      name: "Macao",
      dial_code: "+853",
      code: "MO",
    },
    {
      name: "Macedonia",
      dial_code: "+389",
      code: "MK",
    },
    {
      name: "Madagascar",
      dial_code: "+261",
      code: "MG",
    },
    {
      name: "Malawi",
      dial_code: "+265",
      code: "MW",
    },
    {
      name: "Malaysia",
      dial_code: "+60",
      code: "MY",
    },
    {
      name: "Maldives",
      dial_code: "+960",
      code: "MV",
    },
    {
      name: "Mali",
      dial_code: "+223",
      code: "ML",
    },
    {
      name: "Malta",
      dial_code: "+356",
      code: "MT",
    },
    {
      name: "Marshall Islands",
      dial_code: "+692",
      code: "MH",
    },
    {
      name: "Martinique",
      dial_code: "+596",
      code: "MQ",
    },
    {
      name: "Mauritania",
      dial_code: "+222",
      code: "MR",
    },
    {
      name: "Mauritius",
      dial_code: "+230",
      code: "MU",
    },
    {
      name: "Mayotte",
      dial_code: "+262",
      code: "YT",
    },
    {
      name: "Mexico",
      dial_code: "+52",
      code: "MX",
    },
    {
      name: "Micronesia, Federated States of Micronesia",
      dial_code: "+691",
      code: "FM",
    },
    {
      name: "Moldova",
      dial_code: "+373",
      code: "MD",
    },
    {
      name: "Monaco",
      dial_code: "+377",
      code: "MC",
    },
    {
      name: "Mongolia",
      dial_code: "+976",
      code: "MN",
    },
    {
      name: "Montenegro",
      dial_code: "+382",
      code: "ME",
    },
    {
      name: "Montserrat",
      dial_code: "+1664",
      code: "MS",
    },
    {
      name: "Morocco",
      dial_code: "+212",
      code: "MA",
    },
    {
      name: "Mozambique",
      dial_code: "+258",
      code: "MZ",
    },
    {
      name: "Myanmar",
      dial_code: "+95",
      code: "MM",
    },
    {
      name: "Namibia",
      dial_code: "+264",
      code: "NA",
    },
    {
      name: "Nauru",
      dial_code: "+674",
      code: "NR",
    },
    {
      name: "Nepal",
      dial_code: "+977",
      code: "NP",
    },
    {
      name: "Netherlands",
      dial_code: "+31",
      code: "NL",
    },
    {
      name: "Netherlands Antilles",
      dial_code: "+599",
      code: "AN",
    },
    {
      name: "New Caledonia",
      dial_code: "+687",
      code: "NC",
    },
    {
      name: "New Zealand",
      dial_code: "+64",
      code: "NZ",
    },
    {
      name: "Nicaragua",
      dial_code: "+505",
      code: "NI",
    },
    {
      name: "Niger",
      dial_code: "+227",
      code: "NE",
    },
    {
      name: "Nigeria",
      dial_code: "+234",
      code: "NG",
    },
    {
      name: "Niue",
      dial_code: "+683",
      code: "NU",
    },
    {
      name: "Norfolk Island",
      dial_code: "+672",
      code: "NF",
    },
    {
      name: "Northern Mariana Islands",
      dial_code: "+1670",
      code: "MP",
    },
    {
      name: "Norway",
      dial_code: "+47",
      code: "NO",
    },
    {
      name: "Oman",
      dial_code: "+968",
      code: "OM",
    },
    {
      name: "Pakistan",
      dial_code: "+92",
      code: "PK",
    },
    {
      name: "Palau",
      dial_code: "+680",
      code: "PW",
    },
    {
      name: "Palestinian Territory, Occupied",
      dial_code: "+970",
      code: "PS",
    },
    {
      name: "Panama",
      dial_code: "+507",
      code: "PA",
    },
    {
      name: "Papua New Guinea",
      dial_code: "+675",
      code: "PG",
    },
    {
      name: "Paraguay",
      dial_code: "+595",
      code: "PY",
    },
    {
      name: "Peru",
      dial_code: "+51",
      code: "PE",
    },
    {
      name: "Philippines",
      dial_code: "+63",
      code: "PH",
    },
    {
      name: "Pitcairn",
      dial_code: "+872",
      code: "PN",
    },
    {
      name: "Poland",
      dial_code: "+48",
      code: "PL",
    },
    {
      name: "Portugal",
      dial_code: "+351",
      code: "PT",
    },
    {
      name: "Puerto Rico",
      dial_code: "+1939",
      code: "PR",
    },
    {
      name: "Qatar",
      dial_code: "+974",
      code: "QA",
    },
    {
      name: "Romania",
      dial_code: "+40",
      code: "RO",
    },
    {
      name: "Russia",
      dial_code: "+7",
      code: "RU",
    },
    {
      name: "Rwanda",
      dial_code: "+250",
      code: "RW",
    },
    {
      name: "Reunion",
      dial_code: "+262",
      code: "RE",
    },
    {
      name: "Saint Barthelemy",
      dial_code: "+590",
      code: "BL",
    },
    {
      name: "Saint Helena, Ascension and Tristan Da Cunha",
      dial_code: "+290",
      code: "SH",
    },
    {
      name: "Saint Kitts and Nevis",
      dial_code: "+1869",
      code: "KN",
    },
    {
      name: "Saint Lucia",
      dial_code: "+1758",
      code: "LC",
    },
    {
      name: "Saint Martin",
      dial_code: "+590",
      code: "MF",
    },
    {
      name: "Saint Pierre and Miquelon",
      dial_code: "+508",
      code: "PM",
    },
    {
      name: "Saint Vincent and the Grenadines",
      dial_code: "+1784",
      code: "VC",
    },
    {
      name: "Samoa",
      dial_code: "+685",
      code: "WS",
    },
    {
      name: "San Marino",
      dial_code: "+378",
      code: "SM",
    },
    {
      name: "Sao Tome and Principe",
      dial_code: "+239",
      code: "ST",
    },
    {
      name: "Saudi Arabia",
      dial_code: "+966",
      code: "SA",
    },
    {
      name: "Senegal",
      dial_code: "+221",
      code: "SN",
    },
    {
      name: "Serbia",
      dial_code: "+381",
      code: "RS",
    },
    {
      name: "Seychelles",
      dial_code: "+248",
      code: "SC",
    },
    {
      name: "Sierra Leone",
      dial_code: "+232",
      code: "SL",
    },
    {
      name: "Singapore",
      dial_code: "+65",
      code: "SG",
    },
    {
      name: "Slovakia",
      dial_code: "+421",
      code: "SK",
    },
    {
      name: "Slovenia",
      dial_code: "+386",
      code: "SI",
    },
    {
      name: "Solomon Islands",
      dial_code: "+677",
      code: "SB",
    },
    {
      name: "Somalia",
      dial_code: "+252",
      code: "SO",
    },
    {
      name: "South Africa",
      dial_code: "+27",
      code: "ZA",
    },
    {
      name: "South Sudan",
      dial_code: "+211",
      code: "SS",
    },
    {
      name: "South Georgia and the South Sandwich Islands",
      dial_code: "+500",
      code: "GS",
    },
    {
      name: "Spain",
      dial_code: "+34",
      code: "ES",
    },
    {
      name: "Sri Lanka",
      dial_code: "+94",
      code: "LK",
    },
    {
      name: "Sudan",
      dial_code: "+249",
      code: "SD",
    },
    {
      name: "Suriname",
      dial_code: "+597",
      code: "SR",
    },
    {
      name: "Svalbard and Jan Mayen",
      dial_code: "+47",
      code: "SJ",
    },
    {
      name: "Swaziland",
      dial_code: "+268",
      code: "SZ",
    },
    {
      name: "Sweden",
      dial_code: "+46",
      code: "SE",
    },
    {
      name: "Switzerland",
      dial_code: "+41",
      code: "CH",
    },
    {
      name: "Syrian Arab Republic",
      dial_code: "+963",
      code: "SY",
    },
    {
      name: "Taiwan",
      dial_code: "+886",
      code: "TW",
    },
    {
      name: "Tajikistan",
      dial_code: "+992",
      code: "TJ",
    },
    {
      name: "Tanzania, United Republic of Tanzania",
      dial_code: "+255",
      code: "TZ",
    },
    {
      name: "Thailand",
      dial_code: "+66",
      code: "TH",
    },
    {
      name: "Timor-Leste",
      dial_code: "+670",
      code: "TL",
    },
    {
      name: "Togo",
      dial_code: "+228",
      code: "TG",
    },
    {
      name: "Tokelau",
      dial_code: "+690",
      code: "TK",
    },
    {
      name: "Tonga",
      dial_code: "+676",
      code: "TO",
    },
    {
      name: "Trinidad and Tobago",
      dial_code: "+1868",
      code: "TT",
    },
    {
      name: "Tunisia",
      dial_code: "+216",
      code: "TN",
    },
    {
      name: "Turkey",
      dial_code: "+90",
      code: "TR",
    },
    {
      name: "Turkmenistan",
      dial_code: "+993",
      code: "TM",
    },
    {
      name: "Turks and Caicos Islands",
      dial_code: "+1649",
      code: "TC",
    },
    {
      name: "Tuvalu",
      dial_code: "+688",
      code: "TV",
    },
    {
      name: "Uganda",
      dial_code: "+256",
      code: "UG",
    },
    {
      name: "Ukraine",
      dial_code: "+380",
      code: "UA",
    },
    {
      name: "United Arab Emirates",
      dial_code: "+971",
      code: "AE",
    },
    {
      name: "United Kingdom",
      dial_code: "+44",
      code: "GB",
    },
    {
      name: "United States",
      dial_code: "+1",
      code: "US",
    },
    {
      name: "Uruguay",
      dial_code: "+598",
      code: "UY",
    },
    {
      name: "Uzbekistan",
      dial_code: "+998",
      code: "UZ",
    },
    {
      name: "Vanuatu",
      dial_code: "+678",
      code: "VU",
    },
    {
      name: "Venezuela, Bolivarian Republic of Venezuela",
      dial_code: "+58",
      code: "VE",
    },
    {
      name: "Vietnam",
      dial_code: "+84",
      code: "VN",
    },
    {
      name: "Virgin Islands, British",
      dial_code: "+1284",
      code: "VG",
    },
    {
      name: "Virgin Islands, U.S.",
      dial_code: "+1340",
      code: "VI",
    },
    {
      name: "Wallis and Futuna",
      dial_code: "+681",
      code: "WF",
    },
    {
      name: "Yemen",
      dial_code: "+967",
      code: "YE",
    },
    {
      name: "Zambia",
      dial_code: "+260",
      code: "ZM",
    },
    {
      name: "Zimbabwe",
      dial_code: "+263",
      code: "ZW",
    },
  ];
  const generalValidationFunction = async () => {
    try {
      await generalValidationSchema.validate(formData, { abortEarly: false });
      seterrors({});
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      seterrors(validationErrors);
    }
  };
  const addressValidationFunction = async () => {
    try {
      await addressValidationSchema.validate(formData, { abortEarly: false });

      seterrors({});
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      seterrors(validationErrors);
    }
  };
  const paymentValidationFunction = async () => {
    try {
      await paymentValidationSchema.validate(formData, { abortEarly: false });
      dispatch(updateCheckoutInfo(formData));
      seterrors({});
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      seterrors(validationErrors);
    }
  };

  const onChangeHandler = (e) => {
    e.preventDefault();

    const id = e.target.id;
    const val = e.target.value;

    setlastUpdateField(id);
    if (id === "cashondelivery" && e.target.type === "checkbox") {
      setcashondelivery(e.target.checked);
      setformData((prevData) => ({
        ...prevData,
        ["cashondelivery"]: e.target.checked,
        ["paymentType"]:
          e.target.checked === true ? "cashondelivery" : "debitOrCrerditCard",
      }));
    }
    if (
      id === "makeThisAddressAsShippingAddress" &&
      e.target.type === "checkbox"
    ) {
      setShippingForm(e.target.checked);
      if (e.target.checked === true) {
        setformData((prevData) => ({
          ...prevData,
          ["makeThisAddressAsShippingAddress"]: e.target.checked,
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
          ["makeThisAddressAsShippingAddress"]: e.target.checked,
          ["shippingphoneNumber"]: "",
          ["shippingaddress"]: "",
          ["shippingcity"]: "",
          ["shippingpostalCode"]: "",
          ["shippingstate"]: "",
          ["shippingcountry"]: "",
        }));
      }
    }
    if (e.target.type === "text" || e.target.type === "email") {
      setformData((prevData) => ({
        ...prevData,
        [id]: val,
      }));
    }
    if (e.target.type === "number") {
      setformData((prevData) => ({
        ...prevData,
        [id]: val,
      }));
    }
  };
  const validationHandler = (id) => {
    switch (id) {
      case "firstName":
        const firstNameValidationSchema = Yup.object().shape({
          firstName: Yup.string()
            .min(2, "First Name is too short!")
            .matches(/^[a-zA-Z]{1,10}$/, "Use only Alphabets(a-z or A-Z)")
            .max(10, "First Name is too long!")
            .required("First Name is required"),
        });
        async function firstNamevalidationFunc() {
          try {
            await firstNameValidationSchema.validate(formData, {
              abortEarly: false,
            });
            let errorObj = errors;
            if (errorObj.firstName) {
              delete errorObj.firstName;
              seterrors(errorObj);
            }
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            seterrors((prevData) => ({
              ...prevData,
              ["firstName"]: validationErrors.firstName,
            }));
          }
        }
        firstNamevalidationFunc();
        break;
      case "lastName":
        const lastNameValidationSchema = Yup.object().shape({
          lastName: Yup.string()
            .min(2, "Last Name is too short!")
            .max(10, "Last Name is too long!")
            .matches(/^[a-zA-Z]{1,10}$/, "Use only Alphabets(a-z or A-Z)")
            .required("Last Name is required"),
        });
        async function lastNamevalidationFunc() {
          try {
            await lastNameValidationSchema.validate(formData, {
              abortEarly: false,
            });
            let errorObj = errors;
            if (errorObj.lastName) {
              delete errorObj.lastName;
              seterrors(errorObj);
            }
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            seterrors((prevData) => ({
              ...prevData,
              ["lastName"]: validationErrors.lastName,
            }));
          }
        }
        lastNamevalidationFunc();
        break;
      case "email":
        const emailValidationSchema = Yup.object().shape({
          email: Yup.string()
            .email()
            .matches(
              /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
              "Not a valid email"
            )
            .required("Email is required"),
        });
        async function emailvalidationFunc() {
          try {
            await emailValidationSchema.validate(formData, {
              abortEarly: false,
            });
            let errorObj = errors;
            if (errorObj.email) {
              delete errorObj.email;
              seterrors(errorObj);
            }
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            seterrors((prevData) => ({
              ...prevData,
              ["email"]: validationErrors.email,
            }));
          }
        }
        emailvalidationFunc();
        break;
      case "phoneNumber":
        const phoneNumberValidationSchema = Yup.object().shape({
          phoneNumber: Yup.string()
            .matches(
              /[0-9]{1,10}/,
              // /^\+[1-9]{1}[0-9]{3,13}$/,
              // /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              "Phone number is not valid"
            )
            .min(
              10,
              "Phone Number should be 10 digit long.No special character allowed"
            )
            .max(10, "Phone Number should be max 10 digit long"),
        });
        async function phoneNumbervalidationFunc() {
          try {
            await phoneNumberValidationSchema.validate(formData, {
              abortEarly: false,
            });

            let errorObj = errors;
            if (errorObj.phoneNumber) {
              delete errorObj.phoneNumber;
              seterrors(errorObj);
            }
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            seterrors((prevData) => ({
              ...prevData,
              ["phoneNumber"]: validationErrors.phoneNumber,
            }));
          }
        }
        phoneNumbervalidationFunc();
        break;
      case "billingaddress":
        const billingaddressValidationSchema = Yup.object().shape({
          billingaddress: Yup.string()
            .min(2, "address is too short!")
            .max(25, "address is too long!")
            .required("address is required"),
        });
        async function billingaddressvalidationFunc() {
          try {
            await billingaddressValidationSchema.validate(formData, {
              abortEarly: false,
            });
            let errorObj = errors;
            if (errorObj.billingaddress) {
              delete errorObj.billingaddress;
              seterrors(errorObj);
            }
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            seterrors((prevData) => ({
              ...prevData,
              ["billingaddress"]: validationErrors.billingaddress,
            }));
          }
        }
        billingaddressvalidationFunc();
        break;
      case "billingcity":
        const billingcityValidationSchema = Yup.object().shape({
          billingcity: Yup.string()
            .min(2, "city is too short!")
            .matches(/^[a-zA-Z]{1,10}$/, "Use only Alphabets(a-z or A-Z)")
            .max(10, "city is too long!")
            .required("city is required"),
        });
        async function billingcityvalidationFunc() {
          try {
            await billingcityValidationSchema.validate(formData, {
              abortEarly: false,
            });
            let errorObj = errors;
            if (errorObj.billingcity) {
              delete errorObj.billingcity;
              seterrors(errorObj);
            }
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            seterrors((prevData) => ({
              ...prevData,
              ["billingcity"]: validationErrors.billingcity,
            }));
          }
        }
        billingcityvalidationFunc();
        break;
      case "billingstate":
        const billingstateValidationSchema = Yup.object().shape({
          billingstate: Yup.string()
            .min(2, "state is too short!")
            .matches(/^[a-zA-Z]{1,10}$/, "Use only Alphabets(a-z or A-Z)")
            .max(10, "state is too long!")
            .required("state is required"),
        });
        async function billingstatevalidationFunc() {
          try {
            await billingstateValidationSchema.validate(formData, {
              abortEarly: false,
            });
            let errorObj = errors;
            if (errorObj.billingstate) {
              delete errorObj.billingstate;
              seterrors(errorObj);
            }
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            seterrors((prevData) => ({
              ...prevData,
              ["billingstate"]: validationErrors.billingstate,
            }));
          }
        }
        billingstatevalidationFunc();
        break;
      case "billingpostalCode":
        const billingpostalCodeValidationSchema = Yup.object().shape({
          billingpostalCode: Yup.string()
            .min(6, "Postal Code is too short!")
            .matches(/^[0-9]{1,10}$/, "Use only Numbers(0-9)")
            .max(10, "Postal Code is too long!")
            .required("Postal Code is required"),
        });
        async function billingpostalCodevalidationFunc() {
          try {
            await billingpostalCodeValidationSchema.validate(formData, {
              abortEarly: false,
            });
            let errorObj = errors;
            if (errorObj.billingpostalCode) {
              delete errorObj.billingpostalCode;
              seterrors(errorObj);
            }
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            seterrors((prevData) => ({
              ...prevData,
              ["billingpostalCode"]: validationErrors.billingpostalCode,
            }));
          }
        }
        billingpostalCodevalidationFunc();
        break;
      case "billingcountry":
        const billingcountryValidationSchema = Yup.object().shape({
          billingcountry: Yup.string()
            .min(2, "country is too short!")
            .matches(/^[a-zA-Z]{1,10}$/, "Use only Alphabets(a-z or A-Z)")
            .max(10, "country is too long!")
            .required("country is required"),
        });
        async function billingcountryvalidationFunc() {
          try {
            await billingcountryValidationSchema.validate(formData, {
              abortEarly: false,
            });
            let errorObj = errors;
            if (errorObj.billingcountry) {
              delete errorObj.billingcountry;
              seterrors(errorObj);
            }
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            seterrors((prevData) => ({
              ...prevData,
              ["billingcountry"]: validationErrors.billingcountry,
            }));
          }
        }
        billingcountryvalidationFunc();
        break;
      case "shippingaddress":
        const shippingaddressValidationSchema = Yup.object().shape({
          shippingaddress: Yup.string()
            .min(2, "address is too short!")
            .max(10, "address is too long!")
            .required("address is required"),
        });
        async function shippingaddressvalidationFunc() {
          try {
            await shippingaddressValidationSchema.validate(formData, {
              abortEarly: false,
            });
            let errorObj = errors;
            if (errorObj.shippingaddress) {
              delete errorObj.shippingaddress;
              seterrors(errorObj);
            }
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            seterrors((prevData) => ({
              ...prevData,
              ["shippingaddress"]: validationErrors.shippingaddress,
            }));
          }
        }
        shippingaddressvalidationFunc();
        break;
      case "shippingcity":
        const shippingcityValidationSchema = Yup.object().shape({
          shippingcity: Yup.string()
            .min(2, "city is too short!")
            .matches(/^[a-zA-Z]{1,10}$/, "Use only Alphabets(a-z or A-Z)")
            .max(10, "city is too long!")
            .required("city is required"),
        });
        async function shippingcityvalidationFunc() {
          try {
            await shippingcityValidationSchema.validate(formData, {
              abortEarly: false,
            });
            let errorObj = errors;
            if (errorObj.shippingcity) {
              delete errorObj.shippingcity;
              seterrors(errorObj);
            }
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            seterrors((prevData) => ({
              ...prevData,
              ["shippingcity"]: validationErrors.shippingcity,
            }));
          }
        }
        shippingcityvalidationFunc();
        break;
      case "shippingstate":
        const shippingstateValidationSchema = Yup.object().shape({
          shippingstate: Yup.string()
            .min(2, "state is too short!")
            .matches(/^[a-zA-Z]{1,10}$/, "Use only Alphabets(a-z or A-Z)")
            .max(10, "state is too long!")
            .required("state is required"),
        });
        async function shippingstatevalidationFunc() {
          try {
            await shippingstateValidationSchema.validate(formData, {
              abortEarly: false,
            });
            let errorObj = errors;
            if (errorObj.shippingstate) {
              delete errorObj.shippingstate;
              seterrors(errorObj);
            }
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            seterrors((prevData) => ({
              ...prevData,
              ["shippingstate"]: validationErrors.shippingstate,
            }));
          }
        }
        shippingstatevalidationFunc();
        break;
      case "shippingpostalCode":
        const shippingpostalCodeValidationSchema = Yup.object().shape({
          shippingpostalCode: Yup.string()
            .min(6, "Postal Code is too short!")
            .matches(/^[0-9]{1,10}$/, "Use only Numbers(0-9)")
            .max(10, "Postal Code is too long!")
            .required("Postal Code is required"),
        });
        async function shippingpostalCodevalidationFunc() {
          try {
            await shippingpostalCodeValidationSchema.validate(formData, {
              abortEarly: false,
            });
            let errorObj = errors;
            if (errorObj.shippingpostalCode) {
              delete errorObj.shippingpostalCode;
              seterrors(errorObj);
            }
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            seterrors((prevData) => ({
              ...prevData,
              ["shippingpostalCode"]: validationErrors.shippingpostalCode,
            }));
          }
        }
        shippingpostalCodevalidationFunc();
        break;
      case "shippingcountry":
        const shippingcountryValidationSchema = Yup.object().shape({
          shippingcountry: Yup.string()
            .min(2, "country is too short!")
            .matches(/^[a-zA-Z]{1,10}$/, "Use only Alphabets(a-z or A-Z)")
            .max(10, "country is too long!")
            .required("country is required"),
        });
        async function shippingcountryvalidationFunc() {
          try {
            await shippingcountryValidationSchema.validate(formData, {
              abortEarly: false,
            });
            let errorObj = errors;
            if (errorObj.shippingcountry) {
              delete errorObj.shippingcountry;
              seterrors(errorObj);
            }
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            seterrors((prevData) => ({
              ...prevData,
              ["shippingcountry"]: validationErrors.shippingcountry,
            }));
          }
        }
        shippingcountryvalidationFunc();
        break;
      case "creditCardNumber":
        const creditCardNumberValidationSchema = Yup.object().shape({
          creditCardNumber: Yup.string()
            .min(10, "Credit Card Number is too short!")
            .max(20, "Credit Card Number is too long!")
            .required("Credit Card Number is required"),
        });
        async function creditCardNumbervalidationFunc() {
          try {
            await creditCardNumberValidationSchema.validate(formData, {
              abortEarly: false,
            });
            let errorObj = errors;
            if (errorObj.creditCardNumber) {
              delete errorObj.creditCardNumber;
              seterrors(errorObj);
            }
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            seterrors((prevData) => ({
              ...prevData,
              ["creditCardNumber"]: validationErrors.creditCardNumber,
            }));
          }
        }
        creditCardNumbervalidationFunc();
        break;
      case "cardSecurityCode":
        const cardSecurityCodeValidationSchema = Yup.object().shape({
          cardSecurityCode: Yup.string()
            .min(3, "Security Code is too short!")
            .max(4, "Security Code is too long!")
            .required("Security Code is required"),
        });
        async function cardSecurityCodevalidationFunc() {
          try {
            await cardSecurityCodeValidationSchema.validate(formData, {
              abortEarly: false,
            });
            let errorObj = errors;
            if (errorObj.cardSecurityCode) {
              delete errorObj.cardSecurityCode;
              seterrors(errorObj);
            }
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            seterrors((prevData) => ({
              ...prevData,
              ["cardSecurityCode"]: validationErrors.cardSecurityCode,
            }));
          }
        }
        cardSecurityCodevalidationFunc();
        break;
      case "CardExpiration":
        const CardExpirationValidationSchema = Yup.object().shape({
          CardExpiration: Yup.string()
            .matches(
              /^\d{2}\/\d{2}$/,
              "Card Expiration Date must be in the format MM/YY"
            )
            .test("valid-month", "Month must be between 01 and 12", (value) => {
              const [month, year] = value.split("/");
              return Number(month) >= 1 && Number(month) <= 12;
            })
            .test("valid-year", "Year must be between 24 and 50", (value) => {
              const [month, year] = value.split("/");
              return Number(year) >= 24 && Number(year) <= 50;
            })
            .required("Card Expiration is required"),
        });
        async function CardExpirationvalidationFunc() {
          try {
            await CardExpirationValidationSchema.validate(formData, {
              abortEarly: false,
            });
            let errorObj = errors;
            if (errorObj.CardExpiration) {
              delete errorObj.CardExpiration;
              seterrors(errorObj);
            }
          } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
            seterrors((prevData) => ({
              ...prevData,
              ["CardExpiration"]: validationErrors.CardExpiration,
            }));
          }
        }
        CardExpirationvalidationFunc();
        break;

      default:
        break;
    }
  };
  const nextHandler = (e) => {
    e.preventDefault();
    switch (titleData[index]) {
      case "General Details":
        generalValidationFunction();
        if (
          formData.firstName &&
          formData.lastName &&
          formData.phoneNumber &&
          formData.email &&
          Object.keys(errors).length === 0
        ) {
          setIndex(index + 1);
        }
        break;
      case "Billing Address Details":
        addressValidationFunction();
        if (
          formData.billingaddress &&
          formData.billingcity &&
          formData.billingpostalCode &&
          formData.billingstate &&
          formData.billingcountry &&
          Object.keys(errors).length === 0
        ) {
          setIndex(index + 1);
        }
        break;
      case "Payment Details":
        if (!cashondelivery) {
          paymentValidationFunction();
          if (
            formData.creditCardNumber &&
            formData.cardSecurityCode &&
            formData.CardExpiration &&
            Object.keys(errors).length === 0
          ) {
            setIndex(index + 1);
          }
        } else {
          dispatch(updateCheckoutInfo(formData));
          setIndex(index + 1);
        }
        break;

      default:
        break;
    }
    setShowNext(false);
  };
  const submitHandler = (e) => {
    alert("order placed");
  };
  useEffect(() => {
    setRefreshErrors(refreshErrors + 1);
    if (lastUpdateField) {
      validationHandler(lastUpdateField);
    }
  }, [formData, showNext]);
  useEffect(() => {
    if (Object.keys(errors).length) {
      setShowNext(false);
    }
    if (
      index === 0 &&
      formData.firstName &&
      formData.lastName &&
      formData.phoneNumber &&
      formData.email &&
      Object.keys(errors).length === 0
    ) {
      setShowNext(true);
    }
    if (
      index === 1 &&
      formData.billingaddress &&
      formData.billingcity &&
      formData.billingpostalCode &&
      formData.billingstate &&
      formData.billingcountry &&
      Object.keys(errors).length === 0
    ) {
      if (formData.makeThisAddressAsShippingAddress === true) {
        setShowNext(true);
      } else {
        if (
          formData.shippingaddress &&
          formData.shippingcity &&
          formData.shippingpostalCode &&
          formData.shippingstate &&
          formData.shippingcountry &&
          Object.keys(errors).length === 0
        ) {
          setShowNext(true);
        } else {
          setShowNext(false);
        }
      }
    }
    if (index === 2) {
      if (
        formData.creditCardNumber &&
        formData.cardSecurityCode &&
        formData.CardExpiration &&
        Object.keys(errors).length === 0
      ) {
        setShowNext(true);
      } else {
        if (cashondelivery) {
          setShowNext(true);
        } else {
          setShowNext(false);
        }
      }
    }
  }, [errors, shippingForm, cashondelivery, refreshErrors]);
  return (
    <div className="checkoutform-grid">
      <div className="checkoutform-col">
        <h1 className="checkoutform-title">{titleData[index]}</h1>

        {index !== forms.length ? (
          <form className="checkoutform-main-form">
            <div className="checkoutform-main-form-grid">
              {forms[index].map((form, i) => (
                <div key={form.label}>
                  <label
                    htmlFor={form.id}
                    className="checkoutform-main-form-grid-label"
                  >
                    {form.label}
                  </label>
                  <div className={`${form.type === "number" && "flex"}`}>
                    {form.type === "number" && form.name === "phoneNumber" && (
                      <>
                        {selectCountryCodeMenu && (
                          <div
                            className="checkoutform-selectCountryCodeMenu"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                            onClick={() => {
                              setselectCountryCodeMenu(false);
                            }}
                          >
                            <div className="py-1" role="none">
                              {selectCountryCodeOptions.map((option) => (
                                <>
                                  <Link
                                    href=""
                                    className="checkoutform-selectCountryCodeOptions"
                                    role="menuitem"
                                    title={option.dial_code}
                                    onClick={(e) => {
                                      setselectCountryCode(e.target.title);
                                    }}
                                  >
                                    <span
                                      title={option.dial_code}
                                      className=" text-right pr-4 w-16"
                                    >
                                      {option.dial_code}
                                    </span>
                                    <span
                                      className="flex-1"
                                      title={option.dial_code}
                                    >
                                      {option.name.split("(")[0]}
                                    </span>
                                  </Link>
                                </>
                              ))}
                            </div>
                          </div>
                        )}
                        <Link
                          href=""
                          class="checkoutform-selectCountryCode"
                          onClick={() => {
                            selectCountryCodeMenu === false
                              ? setselectCountryCodeMenu(true)
                              : setselectCountryCodeMenu(false);
                          }}
                        >
                          {selectCountryCode}
                        </Link>
                      </>
                    )}
                    <input
                      type={form.type}
                      id={form.id}
                      name={form.name}
                      placeholder={form.placeholder}
                      value={formData[form.name]}
                      checked={form.type === "checkbox" && formData[form.name]}
                      onInput={(e) => {
                        if (form.type === "number") {
                          let lastValidValue = "";
                          if (
                            e.target.value === "" &&
                            formData[form.name].length === 1
                          ) {
                            lastValidValue = "";
                          } else {
                            lastValidValue = formData[form.name];
                          }
                          if (/[0-9]/.test(e.target.value)) {
                            lastValidValue = e.target.value;
                          } else {
                            e.target.value = lastValidValue;
                          }
                        }
                      }}
                      onChange={onChangeHandler}
                      className={`checkoutform-main-form-grid-input ${
                        form.type === "radio" || form.type === "checkbox"
                          ? "w-auto text-primary"
                          : " w-full text-gray-900"
                      } ${
                        form.type === "number" &&
                        form.name === "phoneNumber" &&
                        "remove-arrow"
                      } ${form.type === "number" && "remove-card-arrow"}
                    `}
                    />
                  </div>
                  {errors[form.name] && (
                    <p className="text-red-500">{errors[form.name]}</p>
                  )}
                </div>
              ))}
            </div>
            {index === 1 && (
              <>
                <div class="checkoutform-shipping-div">
                  <div class="checkoutform-shipping-border"></div>
                  <span class="checkoutform-shipping">
                    Shipping Address details
                  </span>
                  <div class="checkoutform-shipping-border"></div>
                </div>

                <form className="checkoutform-shipping-form">
                  <div className="checkoutform-shipping-form-grid">
                    {shippingFormData.map((form, i) => (
                      <div key={form.label}>
                        <label
                          htmlFor={form.id}
                          className="checkoutform-shipping-form-label"
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
                          className={`checkoutform-shipping-form-input ${
                            form.type === "radio" || form.type === "checkbox"
                              ? "w-auto"
                              : " w-full "
                          }`}
                        />
                        {errors[form.name] && (
                          <p className="text-red-500">{errors[form.name]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </form>
              </>
            )}
            {!cashondelivery && index === 2 && (
              <>
                <div class="checkoutform-shipping-div">
                  <div class="checkoutform-shipping-border"></div>
                  <span class="checkoutform-shipping">
                    Debit or Credit Card details
                  </span>
                  <div class="checkoutform-shipping-border"></div>
                </div>
                <form className="checkoutform-shipping-form">
                  <div className="checkoutform-shipping-form-grid">
                    {paymentData.map((form, i) => (
                      <div key={form.label}>
                        <label
                          htmlFor={form.id}
                          className="checkoutform-shipping-form-label"
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
                          onInput={(e) => {
                            if (form.type === "number") {
                              let lastValidValue = "";
                              if (
                                e.target.value === "" &&
                                formData[form.name].length === 1
                              ) {
                                lastValidValue = "";
                              } else {
                                lastValidValue = formData[form.name];
                              }
                              if (/[0-9]/.test(e.target.value)) {
                                lastValidValue = e.target.value;
                              } else {
                                e.target.value = lastValidValue;
                              }
                            }
                          }}
                          className={`checkoutform-shipping-form-input ${
                            form.type === "radio" || form.type === "checkbox"
                              ? "w-auto"
                              : " w-full "
                          } ${form.type === "number" && "remove-card-arrow"}`}
                        />
                        {errors[form.name] && (
                          <p className="text-red-500">{errors[form.name]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </form>
              </>
            )}
          </form>
        ) : (
          <>
            <div className="checkoutform-shipping-form">
              <div className="checkoutform-ordersummary">
                <div className="border shadow-lg">
                  <h1 className="checkoutform-ordersummary-head">
                    Product Details
                  </h1>
                  <hr />
                  <div className="checkoutform-ordersummary-grid">
                    <OrderSummary />
                  </div>
                  <div className="border m-5">
                    <h1 className="checkoutform-ordersummary-head">
                      Your Details
                    </h1>
                    <hr />
                    <div className="checkoutform-ordersummary-grid">
                      <div className="border">
                        <h1 className="checkoutform-ordersummary-head">
                          Personal Info
                        </h1>
                        <div className="checkoutform-ordersummary-grid p-4">
                          <p>Name</p>
                          <p>
                            {formData.firstName} {formData.lastName}
                          </p>
                          <p>Email</p>
                          <p>{formData.email}</p>
                          <p>Phone</p>
                          <p>{formData.phoneNumber}</p>
                        </div>
                      </div>
                      <div className="border">
                        <h1 className="checkoutform-ordersummary-head">
                          Payment Details
                        </h1>
                        <div className="checkoutform-ordersummary-grid p-4">
                          <p>Payment Type</p>
                          <p>{formData.paymentType}</p>
                          {formData.paymentType === "debitOrCrerditCard" && (
                            <>
                              <p>Credit Card Number</p>
                              <p>
                                XXXX-XXXX-{formData.creditCardNumber.slice(-4)}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="border">
                        <h1 className="checkoutform-ordersummary-head">
                          Billing Address
                        </h1>
                        <div className="checkoutform-ordersummary-grid p-4">
                          <p>Address</p>
                          <p>{formData.billingaddress}</p>
                          <p>City</p>
                          <p>{formData.billingcity}</p>
                          <p>Postal Code</p>
                          <p>{formData.billingpostalCode}</p>
                          <p>State</p>
                          <p>{formData.billingstate}</p>
                          <p>Country</p>
                          <p>{formData.billingcountry}</p>
                        </div>
                      </div>
                      <div className="border">
                        <h1 className="checkoutform-ordersummary-head">
                          Shipping Address
                        </h1>
                        <div className="checkoutform-ordersummary-grid p-4">
                          <p>Address</p>
                          <p>{formData.shippingaddress}</p>
                          <p>City</p>
                          <p>{formData.shippingcity}</p>
                          <p>Postal Code</p>
                          <p>{formData.shippingpostalCode}</p>
                          <p>State</p>
                          <p>{formData.shippingstate}</p>
                          <p>Country</p>
                          <p>{formData.shippingcountry}</p>
                        </div>
                      </div>
                    </div>
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
                index === 0 && "hidden"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setIndex(index - 1);
                seterrors({});
              }}
            >
              Previous
            </button>
          </div>
          <div className="grid w-1/2 justify-self-end justify-end">
            {index === forms.length ? (
              <button
                className="mt-4 justify-self-start justify-end py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
                onClick={submitHandler}
              >
                Place Order
              </button>
            ) : (
              <>
                {!showNext && Object.keys(errors).length !== 0 ? (
                  <button className="mt-4 justify-self-start justify-end py-3 px-4 text-center text-gray-400 bg-white border border-white rounded-md hover:bg-transparent hover:text-gray-300 transition font-medium">
                    Next
                  </button>
                ) : (
                  <button
                    className="mt-4 justify-self-start justify-end py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
                    onClick={nextHandler}
                  >
                    Next
                  </button>
                )}{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
