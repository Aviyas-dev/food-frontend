'use client';
import React, { useState } from "react";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
    setSuccess(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email. Use a format like example@email.com");
    } else {
      setError("");
      setSuccess(true);
      setStep(2); // 2-р шат руу шилжинэ
    }
  };

  const handleVerifyEmail = () => {
    setStep(3); // 3-р шат руу шилжинэ
  };

  const handleResendEmail = () => {
    alert("Verification email has been resent to your email address.");
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
      alert("Password successfully reset!");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const goBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {step > 1 && (
        <button
          onClick={goBack}
          className="absolute top-4 left-4 text-black hover:text-gray-700"
        >
          <span className="text-2xl">&larr;</span>
        </button>
      )}

      {step === 1 && (
        <form
          onSubmit={handleEmailSubmit}
          className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Reset your password</h2>
          <p className="text-gray-500 mb-6">
            Enter your email to receive a password reset link.
          </p>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email address"
            className={`w-full px-4 py-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm mt-2">
              Email is valid! Please check your inbox.
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md mt-4 hover:bg-gray-800 transition"
          >
            Send Link
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-2">Please verify your Email</h2>
          <p className="text-gray-500 mb-6">
            We just sent an email to {email}. Click the link in the email to verify your account.
          </p>
          <button
            onClick={handleVerifyEmail}
            className="w-full bg-black text-white py-2 rounded-md mt-4 hover:bg-gray-800 transition"
          >
            Verify Email
          </button>
          <button
            onClick={handleResendEmail}
            className="w-full bg-gray-200 text-black py-2 rounded-md mt-4 hover:bg-gray-300 transition"
          >
            Resend email
          </button>
        </div>
      )}

      {step === 3 && (
        <form
          onSubmit={handlePasswordSubmit}
          className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Create new password</h2>
          <p className="text-gray-500 mb-6">
            Set a new password with a combination of letters and numbers for better security.
          </p>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
          />
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={toggleShowPassword}
              className="mr-2"
            />
            <label className="text-gray-500">Show password</label>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md mt-4 hover:bg-gray-800 transition"
          >
            Create Password
          </button>
        </form>
      )}
    </div>
  );
}

