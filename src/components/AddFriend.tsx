import React, { useState } from "react";
import { FormContainer, FormGroup } from "./Container";
import CryptoJS from "crypto-js";
import DOMPurify from "dompurify";

interface AddFriendProps {
  addFriend: (friend: {
    name: string;
    size: string;
    email: string;
    type: string;
    color: string;
    priceRange?: string;
  }) => Promise<boolean>;
  registrationTimer: string;
}

const AddFriend: React.FC<AddFriendProps> = ({
  addFriend,
  registrationTimer,
}) => {
  const [selectedColor, setSelectedColor] = useState("");

  const [name, setName] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [priceRange, setPriceRange] = useState("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [registering, setRegistering] = useState<boolean>(false);

  interface ColorChangeEvent extends React.ChangeEvent<HTMLSelectElement> {
    target: HTMLSelectElement & EventTarget;
  }

  const handleColorChange = (e: ColorChangeEvent) => {
    const selectedValue = e.target.value;
    setColor(selectedValue);

    let colorCode = "";
    switch (selectedValue) {
      case "Sky Blue":
        colorCode = "#87CEEB";
        break;
      case "Royal Blue":
        colorCode = "#4169E1";
        break;
      case "Red":
        colorCode = "#FF0000";
        break;
      case "Maroon":
        colorCode = "#800000";
        break;
      case "White":
        colorCode = "#FFFFFF";
        break;
      default:
        colorCode = "";
    }
    setSelectedColor(colorCode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegistering(true);
    const sanitizedEmail = DOMPurify.sanitize(email);
    const hashedEmail = CryptoJS.SHA256(sanitizedEmail).toString();
    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedSize = DOMPurify.sanitize(size);
    const sanitizedType = DOMPurify.sanitize(type);
    const sanitizedColor = DOMPurify.sanitize(color);

    const sanitizedPriceRange = DOMPurify.sanitize(priceRange);

    if (sanitizedName && sanitizedSize) {
      const success = await addFriend({
        name: sanitizedName,
        size: sanitizedSize,
        email: hashedEmail,
        type: sanitizedType,
        color: sanitizedColor,
        priceRange: sanitizedPriceRange,
      });
      if (success) {
        setName("");
        setSize("");
        setType("");
        setColor("");
        setEmail("");
        setPriceRange("");
      }
    }
    setRegistering(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError(null);
    }
  };

  const isFormValid = name && size && email && !emailError;

  return (
    <FormContainer onSubmit={handleSubmit} className="">
      <h4 className="mb-0">
        Register Tee Size
        <span
          className="ml-1 text-xs"
          dangerouslySetInnerHTML={{ __html: registrationTimer }}
        ></span>
      </h4>

      {/* <span>
        <a
          href="https://printo.in/categories/t-shirts/customizable-products/custom-t-shirts"
          className="text-sm underline"
        >
          Custom t-shirt details
        </a>
      </span> */}
      <FormGroup>
        <div className="flex items-center w-full c-h">
          <span className="text-red-500">*</span>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Name")}
            onChange={(e) => setName(e.target.value)}
            className="flex-grow ml-1"
          />
        </div>
      </FormGroup>

      <FormGroup>
        <div className="flex items-center w-full c-h">
          <span className="text-red-500">*</span>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Email")}
            onChange={handleEmailChange}
            className="flex-grow ml-1"
          />
        </div>
      </FormGroup>

      <FormGroup>
        <div className="flex items-center w-full c-h">
          <span className="text-red-500">*</span>
          <select
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full rounded mt-1 ml-1"
          >
            <option value="">--Select Size--</option>
            <option value="Small (38 in)">Small (38 in)</option>
            <option value="Medium (40 in)">Medium (40 in)</option>
            <option value="Large (42 in)">Large (42 in)</option>
            <option value="Extra Large (44 in)">Extra Large (44 in)</option>
          </select>
        </div>
      </FormGroup>

      <FormGroup>
        <div className="flex items-center w-full c-h">
          <span className="text-red-500">*</span>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded mt-1 ml-1"
          >
            <option value="">--Vote for Type--</option>
            <option value="Round Neck">Round Neck</option>
            <option value="Collared">Collared</option>
          </select>
        </div>
      </FormGroup>

      <FormGroup>
        <div className="flex items-center w-full c-h">
          <span className="text-red-500">*</span>
          <select
            id="color"
            value={color}
            onChange={handleColorChange}
            className="w-full rounded mt-1 ml-1 font-bold"
            style={{
              color: selectedColor,
              backgroundColor:
                selectedColor === "#FFFFFF" ? "#000000" : "#FFFFFF",
            }}
          >
            <option value="">--Vote for Color--</option>
            <option value="Sky Blue" style={{ color: "#87CEEB" }}>
              Sky Blue
            </option>
            <option value="Royal Blue" style={{ color: "#4169E1" }}>
              Royal Blue
            </option>
            <option value="Red" style={{ color: "#FF0000" }}>
              Red
            </option>
            <option value="Maroon" style={{ color: "#800000" }}>
              Maroon
            </option>
            <option
              value="White"
              style={{
                color: "#FFFFFF",
                backgroundColor: "#000000",
              }}
            >
              White
            </option>
          </select>
        </div>
      </FormGroup>

      <FormGroup>
        <div className="flex items-center w-full c-h">
          <label className="ml-3 flex w-full">
            <span className="text-xs">Price (optional) :</span>
          </label>
          <label>
            <input
              type="radio"
              name="priceRange"
              value="400₹-600₹"
              checked={priceRange === "400₹-600₹"}
              onChange={(e) => setPriceRange(e.target.value)}
            />
            <span className="text-emerald-300 text-xs">
              400₹<div>to</div>600₹
            </span>
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="priceRange"
              value="600₹-800₹"
              checked={priceRange === "600₹-800₹"}
              onChange={(e) => setPriceRange(e.target.value)}
            />
            <span className="text-emerald-300 text-xs">
              600₹<div>to</div>800₹
            </span>
          </label>
        </div>
      </FormGroup>

      <FormGroup>
        <button
          disabled={!isFormValid}
          type="submit"
          className={` ${
            isFormValid
              ? "text-white transition-opacity duration-200 hover:opacity-70"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          {registering ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <output className="spinner-border text-primary"></output>
              </div>
            </div>
          ) : (
            "Register"
          )}
        </button>
      </FormGroup>
      {emailError && (
        <div className="mt-[-15px] text-red-500">{emailError}</div>
      )}
    </FormContainer>
  );
};

export default AddFriend;
