import React, { useState } from "react";
import { FormContainer, FormGroup } from "./Container";
import CryptoJS from "crypto-js";

interface AddFriendProps {
  addFriend: (friend: {
    name: string;
    size: string;
    email: string;
  }) => Promise<boolean>;
}

const AddFriend: React.FC<AddFriendProps> = ({ addFriend }) => {
  const [name, setName] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hashedEmail = CryptoJS.SHA256(email).toString();
    if (name && size) {
      const success = await addFriend({ name, size, email: hashedEmail });
      if (success) {
        setName("");
        setSize("");
        setEmail("");
      }
    }
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
      <h4 className="text-white">Register Tee Size</h4>
      <FormGroup>
        <div className="flex items-center w-full">
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
        <div className="flex items-center w-full">
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
        <div className="flex items-center w-full">
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
        <button
          disabled={!isFormValid}
          type="submit"
          className={` ${
            isFormValid
              ? "text-white transition-opacity duration-200 hover:opacity-70"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          Register
        </button>
      </FormGroup>
      {emailError && <div className="text-red-500">{emailError}</div>}
    </FormContainer>
  );
};

export default AddFriend;
