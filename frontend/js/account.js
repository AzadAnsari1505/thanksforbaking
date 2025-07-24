// /js/account.js
import {
  auth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from './firebase.js';

// ---- NAVBAR AVATAR LOGIC ----
onAuthStateChanged(auth, (user) => {
  const accSection = document.getElementById('account-section');
  if (!accSection) return;

  if (user) {
    let avatarHTML = user.photoURL
      ? `<img src="${user.photoURL}" class="avatar-img" style="width:40px;height:40px;border-radius:50%" />`
      : `<div class="avatar-initial" style="width:40px;height:40px;border-radius:50%;background:#f44336;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:bold;">${user.email[0].toUpperCase()}</div>`;

    accSection.innerHTML = `
      <div class="avatar-menu" style="position:relative;display:inline-block;">
        ${avatarHTML}
        <div class="avatar-dropdown" style="display:none;position:absolute;top:48px;right:0;min-width:180px;background:#fff;border:1px solid #ccc;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.12);z-index:100;padding:14px;">
          <div style="margin-bottom:5px;">${user.displayName || user.email}</div>
          <div style="font-size:.92em;margin-bottom:12px;">${user.email}</div>
          <button id="logout-btn" style="background:#f44336;color:#fff;padding:7px 14px;border:none;border-radius:5px;cursor:pointer;">Logout</button>
        </div>
      </div>`;
    // Dropdown show/hide
    const avatarMenu = accSection.querySelector('.avatar-menu');
    const dropdown = accSection.querySelector('.avatar-dropdown');
    avatarMenu.onmouseenter = () => (dropdown.style.display = 'block');
    avatarMenu.onmouseleave = () => (dropdown.style.display = 'none');
    // Logout
    document.getElementById('logout-btn').onclick = () => signOut(auth);
  } else {
    accSection.innerHTML = `<a href="account.html" id="account-link">Account</a>`;
  }
});

// AUTH FORM LOGIC (if present):

const form = document.getElementById("auth-form");
if (form) {
  const submitBtn = document.getElementById("submit-btn");
  const toggleLink = document.getElementById("toggle-link");
  const formTitle = document.getElementById("form-title");
  const formSubtitle = document.getElementById("form-subtitle");
  const forgotPassword = document.getElementById("forgot-password");
  const googleBtn = document.getElementById("google-login");
  let isLogin = true;

  // Toggle Form (login/signup)
  if (toggleLink) {
    toggleLink.addEventListener("click", () => {
      isLogin = !isLogin;
      formTitle.textContent = isLogin ? "Holla, Welcome Back" : "Join Us Today";
      formSubtitle.textContent = isLogin
        ? "Hey, welcome back to your special place"
        : "Create your account to get started";
      submitBtn.textContent = isLogin ? "Sign In" : "Sign Up";
      toggleLink.textContent = isLogin ? "Sign Up" : "Sign In";
    });
  }

  // Form submit (login/signup)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (!userCred.user.emailVerified) {
            alert("Please verify your email before logging in.");
            signOut(auth);
          } else {
            alert("Login successful!");
            window.history.back();
          }
        })
        .catch((err) => alert(err.message));
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          sendEmailVerification(userCred.user);
          alert("Account created! Verify your email before logging in.");
          form.reset();
          isLogin = true;
          toggleLink.click();
        })
        .catch((err) => alert(err.message));
    }
  });

  // Forgot Password
  if (forgotPassword) {
    forgotPassword.addEventListener("click", () => {
      const email = form.email.value;
      if (!email) {
        alert("Enter your email to reset password.");
        return;
      }
      sendPasswordResetEmail(auth, email)
        .then(() => alert("Password reset email sent."))
        .catch((err) => alert(err.message));
    });
  }

  // Google login
  if (googleBtn) {
    googleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          alert("Google login successful!");
          window.history.back();
        })
        .catch((error) => alert("Google login failed: " + error.message));
    });
  }
}
const closeBtn = document.getElementById("close-account-page");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    window.history.back();
    // ya window.history.back();
  });
}
