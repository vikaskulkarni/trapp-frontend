import React, { useState } from "react";
import { FormContainer, FormGroup } from "./Container";
import CryptoJS from "crypto-js";
import DOMPurify from "dompurify";

interface AddFriendProps {
  addFriend: (friend: {
    name: string;
    size: string;
    email: string;
    priceRange?: string;
  }) => Promise<boolean>;
}

const AddFriend: React.FC<AddFriendProps> = ({ addFriend }) => {
  const [name, setName] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [priceRange, setPriceRange] = useState("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [registering, setRegistering] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegistering(true);
    const sanitizedEmail = DOMPurify.sanitize(email);
    const hashedEmail = CryptoJS.SHA256(sanitizedEmail).toString();
    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedSize = DOMPurify.sanitize(size);

    const sanitizedPriceRange = DOMPurify.sanitize(priceRange);

    if (sanitizedName && sanitizedSize) {
      const success = await addFriend({
        name: sanitizedName,
        size: sanitizedSize,
        email: hashedEmail,
        priceRange: sanitizedPriceRange,
      });
      if (success) {
        setName("");
        setSize("");
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
      <h4>Register Tee Size</h4>
      <span>
        <a href="https://printo.in/categories/t-shirts/customizable-products/custom-t-shirts">
          Custom t-shirt Link
        </a>
      </span>
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
          <label className="ml-3 flex w-full">
            Price Preference (<span className="text-xs">optional</span>):
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
