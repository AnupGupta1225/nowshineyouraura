/* =========================================================
   NOWSHINEYOURAURA
   STYLE.CSS
   ========================================================= */


/* ================= BASIC RESET ================= */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


html {
  scroll-behavior: smooth;
}


body {
  min-height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
  background: #090316;
  overflow-x: hidden;
}


button,
input {
  font: inherit;
}


button {
  border: 0;
  cursor: pointer;
}


input {
  outline: none;
}


/* ================= BACKGROUND ================= */

.app-bg {
  position: fixed;
  inset: 0;
  z-index: -2;

  background:
    radial-gradient(
      circle at 50% 10%,
      rgba(130, 65, 255, 0.32),
      transparent 32%
    ),
    radial-gradient(
      circle at 15% 75%,
      rgba(42, 100, 255, 0.20),
      transparent 28%
    ),
    radial-gradient(
      circle at 90% 65%,
      rgba(190, 45, 255, 0.18),
      transparent 30%
    ),
    linear-gradient(
      145deg,
      #08020f 0%,
      #140529 45%,
      #08020f 100%
    );
}


.app-bg::before {
  content: "";
  position: absolute;
  width: 420px;
  height: 420px;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);

  background: rgba(115, 50, 255, 0.16);

  filter: blur(90px);
  border-radius: 50%;
}


/* ================= APP ================= */

#app {
  width: 100%;
  min-height: 100vh;
}


/* ================= SCREEN SYSTEM ================= */

.screen {
  display: none;
  width: 100%;
  min-height: 100vh;

  animation: screenIn 0.35s ease;
}


.screen.active {
  display: block;
}


@keyframes screenIn {

  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }

}


/* ================= GLASS ================= */

.glass {
  background: rgba(255, 255, 255, 0.055);

  border: 1px solid rgba(255, 255, 255, 0.10);

  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);

  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}


/* ================= BRAND ================= */

.brand {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 1.4px;

  background:
    linear-gradient(
      90deg,
      #ffffff,
      #c7a6ff,
      #ffffff
    );

  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}


/* ================= LOGIN ================= */

.login-screen {
  min-height: 100vh;

  display: flex !important;

  align-items: center;
  justify-content: center;

  padding: 25px;
}


.login-screen:not(.active) {
  display: none !important;
}


.login-card {
  width: min(100%, 430px);

  padding: 34px 28px;

  border-radius: 28px;

  text-align: center;
}


.login-card .brand {
  margin-bottom: 10px;
}


.tagline {
  color: rgba(255, 255, 255, 0.62);

  font-size: 13px;

  line-height: 1.5;

  margin-bottom: 28px;
}


/* ================= INPUT ================= */

.field {
  width: 100%;
  height: 56px;

  display: flex;
  align-items: center;

  gap: 12px;

  padding: 0 16px;

  margin-bottom: 13px;

  border-radius: 16px;

  background: rgba(255, 255, 255, 0.065);

  border: 1px solid rgba(255, 255, 255, 0.09);

  transition: 0.2s ease;
}


.field:focus-within {
  border-color: rgba(174, 124, 255, 0.75);

  box-shadow:
    0 0 0 3px rgba(140, 75, 255, 0.10);
}


.field > span {
  width: 20px;

  color: #bd91ff;

  font-size: 16px;
}


.field input {
  flex: 1;

  min-width: 0;

  border: 0;

  background: transparent;

  color: #ffffff;

  font-size: 14px;
}


.field input::placeholder {
  color: rgba(255, 255, 255, 0.38);
}


.eye {
  background: transparent;

  color: rgba(
