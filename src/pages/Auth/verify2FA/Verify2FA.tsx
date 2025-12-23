/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  useSetUpTwoFAMutation,
  useVerifyCodeAndEnavble2FAMutation,
} from "../../../redux/features/twoFA/twoFA";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Verify2FA = () => {
  const [twoFACode, setTwoFACode] = useState(""); // For the 2FA code input
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null); // QR code URL
  const [twoFASecret, setTwoFASecret] = useState<string | null>(null); // Secret key
  const [twoFA, setTwoFA] = useState(false); // Whether 2FA is enabled

  const [setUpTwoFA] = useSetUpTwoFAMutation(); // Mutation for setting up 2FA
  const [verifyCodeAndEnavble2FA] = useVerifyCodeAndEnavble2FAMutation(); // Mutation for verifying code
  const navigate = useNavigate();
  // Setup 2FA function
  const handleSetUpTwoFA = async () => {
    try {
      const res = await setUpTwoFA({}).unwrap();
      setQrCodeUrl(res?.data?.qrCodeUrl);
      setTwoFASecret(res?.data?.secret);
      message.success(res?.message || "2FA setup initiated");
    } catch (error) {
      console.error("2FA setup failed:", error);
      message.error("Failed to setup 2FA");
    }
  };

  // Verify 2FA code
  const handleVerifyCodeAndEnable2FA = async (token: string) => {
    try {
      const res = await verifyCodeAndEnavble2FA({ token }).unwrap();
      message.success(res?.message || "2FA enabled successfully");
      setTwoFA(true); // Mark 2FA as enabled
      // Redirect user to the appropriate page after successful verification (e.g., dashboard)
      navigate("/");
    } catch (error) {
      console.error("2FA verification failed:", error);
      message.error("Invalid or expired 2FA code");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Set up Two-Factor Authentication
        </h1>

        {!qrCodeUrl ? (
          <button
            onClick={handleSetUpTwoFA}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Start Setup
          </button>
        ) : (
          <div className="flex flex-col items-center">
            <p className="mb-4 text-gray-600 text-center">
              Scan this QR code using Google Authenticator or any 2FA app.
            </p>

            <img
              src={qrCodeUrl}
              alt="2FA QR Code"
              className="w-48 h-48 mb-4 border rounded-lg"
            />

            {twoFASecret && (
              <div className="bg-gray-100 p-3 rounded-md text-sm mb-4 w-full break-all text-center font-mono">
                <p className="font-medium mb-1">Manual setup key:</p>
                <p>{twoFASecret}</p>
              </div>
            )}

            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={twoFACode}
              onChange={(e) => setTwoFACode(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg text-center tracking-widest mb-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              maxLength={6}
            />

            <button
              disabled={!twoFACode}
              onClick={() => handleVerifyCodeAndEnable2FA(twoFACode)}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                twoFACode
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Verify & Enable
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify2FA;
