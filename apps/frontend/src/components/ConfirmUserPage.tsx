// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmSignUp } from "../services/authService";
import { Button, Input } from "@repo/ui";

const ConfirmUserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line
  const [email, setEmail] = useState(location.state?.email || "");
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await confirmSignUp(email, confirmationCode);
      alert("Account confirmed successfully!\nSign in on next page.");
      navigate("/login");
    } catch (error) {
      alert(`Failed to confirm account: ${error}`);
    }
  };

  return (
    <div className="flex h-screen mx-auto max-w-xl">
      <div className="flex flex-col my-auto gap-4 w-full">
        <h2 className="text-2xl">Confirm Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <Input
              className="inputText"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <Input
              className="inputText"
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              placeholder="Confirmation Code"
              required
            />
            <Button type="submit">Confirm Account</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmUserPage;
