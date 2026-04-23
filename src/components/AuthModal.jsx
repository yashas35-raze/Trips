// AuthModal.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FiX, FiEye, FiEyeOff } from "react-icons/fi";

export default function AuthModal({ isOpen, onClose, initialMode = "login" }) {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const { login, signup } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      onClose();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        {/* Close button */}
        <button style={closeBtn} onClick={onClose}>
          <FiX size={24} />
        </button>

        <h2 style={title}>{isLogin ? "Login" : "Create Account"}</h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>

          {/* NAME FIELD (SIGNUP ONLY) */}
          {!isLogin && (
            <div style={inputGroup}>
              <label style={label}>Full Name</label>
              <input
                style={input}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}

          {/* EMAIL */}
          <div style={inputGroup}>
            <label style={label}>Email</label>
            <input
              type="email"
              style={input}
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD + TOGGLE */}
          <div style={inputGroup}>
            <label style={label}>Password</label>
            <div style={passwordWrapper}>
              <input
                type={showPass ? "text" : "password"}
                style={passwordInput}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* Show / Hide Button */}
              <span
                style={toggleIcon}
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </span>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button style={submitBtn} type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* SWITCH MODES */}
        <p style={switchText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)} style={switchBtn}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

//
// ---------------------- INLINE RESPONSIVE CSS ----------------------
//

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.65)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  zIndex: 9999,
};

const modal = {
  width: "100%",
  maxWidth: "380px",
  background: "#fff",
  padding: "28px 24px",
  borderRadius: "14px",
  position: "relative",
  boxShadow: "0 10px 32px rgba(0,0,0,0.25)",
  animation: "fadeIn 0.2s ease",
};

const closeBtn = {
  position: "absolute",
  top: 12,
  right: 12,
  background: "transparent",
  border: "none",
  cursor: "pointer",
};

const title = {
  fontSize: "1.6rem",
  fontWeight: "700",
  marginBottom: 20,
};

const inputGroup = {
  marginBottom: 14,
};

const label = {
  display: "block",
  marginBottom: 6,
  fontSize: "0.9rem",
  fontWeight: "600",
};

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "1rem",
  outline: "none",
};

const passwordWrapper = {
  position: "relative",
  width: "100%",
};

const passwordInput = {
  width: "100%",
  padding: "12px 40px 12px 12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "1rem",
};

const toggleIcon = {
  position: "absolute",
  right: 12,
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  color: "#555",
};

const submitBtn = {
  width: "100%",
  padding: "13px",
  borderRadius: "12px",
  border: "none",
  background: "#0a84ff",
  color: "#fff",
  fontSize: "1rem",
  fontWeight: "700",
  marginTop: 10,
  cursor: "pointer",
};

const switchText = {
  marginTop: 18,
  fontSize: "0.9rem",
};

const switchBtn = {
  color: "#0a84ff",
  marginLeft: 6,
  cursor: "pointer",
  fontWeight: "700",
};