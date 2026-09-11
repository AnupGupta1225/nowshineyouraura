// ======================================================
// NOW SHINE YOUR AURA - SCRIPT.JS
// Firebase Authentication + Firestore
// ======================================================

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ======================================================
// FIREBASE CONFIG
// ======================================================

const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "now-shine-your-aura.firebaseapp.com",
  projectId: "now-shine-your-aura",
  storageBucket: "now-shine-your-aura.firebasestorage.app",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID",
  measurementId: "G-W59YH8K4QZ"
};


// ======================================================
// INITIALIZE FIREBASE
// ======================================================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// ======================================================
// KEEP LOGIN AFTER REFRESH
// ======================================================

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Login persistence enabled");
  })
  .catch((error) => {
    console.error("Persistence error:", error);
  });


// ======================================================
// HELPER
// ======================================================

function getElement(...ids) {
  for (const id of ids) {
    const element = document.getElementById(id);
    if (element) return element;
  }
  return null;
}

function show(element) {
  if (element) element.style.display = "";
}

function hide(element) {
  if (element) element.style.display = "none";
}


// ======================================================
// ELEMENTS
// ======================================================

const loginPage = getElement("loginPage", "login-section", "login");
const registerPage = getElement(
  "registerPage",
  "register-section",
  "register"
);
const dashboardPage = getElement(
  "dashboardPage",
  "dashboard-section",
  "dashboard"
);

const loginForm = getElement("loginForm");
const registerForm = getElement("registerForm");

const loginEmail = getElement("loginEmail", "email");
const loginPassword = getElement("loginPassword", "password");

const registerName = getElement("registerName", "name");
const registerEmail = getElement("registerEmail", "registerEmail");
const registerMobile = getElement(
  "registerMobile",
  "mobile",
  "mobileNumber"
);
const registerPassword = getElement(
  "registerPassword",
  "registerPassword"
);

const logoutButton = getElement(
  "logoutBtn",
  "logoutButton",
  "logout"
);

const userName = getElement(
  "userName",
  "dashboardName",
  "profileName"
);

const auraPoints = getElement(
  "auraPoints",
  "totalAura",
  "totalAuraPoints"
);

const userLevel = getElement(
  "userLevel",
  "level",
  "currentLevel"
);

const userIdElement = getElement(
  "userId",
  "displayUserId"
);


// ======================================================
// REGISTER
// ======================================================

if (registerForm) {

  registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = registerName?.value.trim() || "";
    const email = registerEmail?.value.trim() || "";
    const mobile = registerMobile?.value.trim() || "";
    const password = registerPassword?.value || "";

    if (!name || !email || !mobile || !password) {
      alert("Please fill all fields.");
      return;
    }

    if (mobile.length < 10) {
      alert("Please enter a valid mobile number.");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    try {

      const credential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = credential.user;

      // Firebase profile name
      await updateProfile(user, {
        displayName: name
      });

      // Generate user ID
      const generatedUserId =
        "AURA" +
        Math.floor(100000 + Math.random() * 900000);

      // New user starts with 500 Aura
      await setDoc(doc(db, "users", user.uid), {

        uid: user.uid,

        name: name,

        email: email,

        mobile: mobile,

        userId: generatedUserId,

        auraPoints: 500,

        level: 1,

        auraCardNumber:
          "AC" +
          Math.floor(10000000 + Math.random() * 90000000),

        createdAt: serverTimestamp(),

        role: "user"

      });

      alert(
        "Registration successful!\n\nYour User ID: " +
        generatedUserId
      );

      showDashboard(user);

    } catch (error) {

      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email address.");
      } else if (error.code === "auth/weak-password") {
        alert("Password is too weak.");
      } else {
        alert(error.message);
      }
    }
  });
}


// ======================================================
// LOGIN
// ======================================================

if (loginForm) {

  loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = loginEmail?.value.trim() || "";
    const password = loginPassword?.value || "";

    if (!email || !password) {
      alert("Enter email and password.");
      return;
    }

    try {

      const credential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      showDashboard(credential.user);

    } catch (error) {

      console.error(error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password"
      ) {
        alert("Email or password is incorrect.");
      } else if (error.code === "auth/user-not-found") {
        alert("Account not found.");
      } else {
        alert(error.message);
      }
    }
  });
}


// ======================================================
// LOGOUT
// ======================================================

if (logoutButton) {

  logoutButton.addEventListener("click", async () => {

    try {

      await signOut(auth);

      hide(dashboardPage);
      show(loginPage);

    } catch (error) {

      console.error(error);
      alert("Logout failed.");
    }
  });
}


// ======================================================
// LOAD USER DATA
// ======================================================

async function loadUserData(user) {

  if (!user) return;

  try {

    const userRef = doc(db, "users", user.uid);

    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {

      console.log("User document not found.");
      return;
    }

    const data = snapshot.data();

    if (userName) {
      userName.textContent =
        data.name || user.displayName || "User";
    }

    if (auraPoints) {
      auraPoints.textContent =
        data.auraPoints ?? 500;
    }

    if (userLevel) {
      userLevel.textContent =
        data.level ?? 1;
    }

    if (userIdElement) {
      userIdElement.textContent =
        data.userId || "AURAUSER";
    }

    // Optional elements
    const emailElement =
      getElement("userEmail", "profileEmail");

    const mobileElement =
      getElement("userMobile", "profileMobile");

    const cardNumberElement =
      getElement("cardNumber", "auraCardNumber");

    if (emailElement) {
      emailElement.textContent = data.email || "";
    }

    if (mobileElement) {
      mobileElement.textContent = data.mobile || "";
    }

    if (cardNumberElement) {
      cardNumberElement.textContent =
        data.auraCardNumber || "";
    }

    updateAuraLevel(data.auraPoints || 0);

  } catch (error) {

    console.error("User data error:", error);

  }
}


// ======================================================
// AURA LEVEL SYSTEM
// ======================================================

function calculateLevel(points) {

  if (points < 1000) {
    return 1;
  }

  let level = 1;
  let required = 1000;

  while (points >= required && level < 999) {

    level++;

    required += 1000;
  }

  return level;
}


function updateAuraLevel(points) {

  const calculatedLevel =
    calculateLevel(Number(points));

  if (userLevel) {
    userLevel.textContent = calculatedLevel;
  }
}


// ======================================================
// SHOW DASHBOARD
// ======================================================

async function showDashboard(user) {

  hide(loginPage);
  hide(registerPage);
  show(dashboardPage);

  await loadUserData(user);
}


// ======================================================
// AUTH STATE
// ======================================================

onAuthStateChanged(auth, async (user) => {

  if (user) {

    console.log("User logged in:", user.uid);

    await showDashboard(user);

  } else {

    console.log("No logged-in user.");

    hide(dashboardPage);

    if (loginPage) {
      show(loginPage);
    }
  }
});


// ======================================================
// PAGE NAVIGATION
// ======================================================

const registerLink =
  getElement("showRegister", "registerLink", "goRegister");

const loginLink =
  getElement("showLogin", "loginLink", "goLogin");

if (registerLink) {

  registerLink.addEventListener("click", (event) => {

    event.preventDefault();

    hide(loginPage);
    show(registerPage);

  });
}

if (loginLink) {

  loginLink.addEventListener("click", (event) => {

    event.preventDefault();

    hide(registerPage);
    show(loginPage);

  });
}


// ======================================================
// VIEW AURA CARD
// ======================================================

const auraCardButton =
  getElement(
    "viewAuraCard",
    "viewCard",
    "auraCardBtn"
  );

const auraCardPage =
  getElement(
    "auraCardPage",
    "aura-card-page",
    "cardPage"
  );

if (auraCardButton && auraCardPage) {

  auraCardButton.addEventListener("click", () => {

    hide(dashboardPage);
    show(auraCardPage);

  });
}


// ======================================================
// BACK TO DASHBOARD
// ======================================================

const backDashboard =
  getElement(
    "backDashboard",
    "backToDashboard"
  );

if (backDashboard) {

  backDashboard.addEventListener("click", () => {

    hide(auraCardPage);
    show(dashboardPage);

  });
}


// ======================================================
// PREVENT EMPTY FORM SUBMISSION
// ======================================================

document.querySelectorAll("form").forEach((form) => {

  form.addEventListener("submit", () => {

    console.log("Form submitted");

  });

});


console.log(
  "Now Shine Your Aura initialized successfully."
);
