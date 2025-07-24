import { auth, onAuthStateChanged, signOut } from './firebase.js';

onAuthStateChanged(auth, function(user) {
  const accSection = document.getElementById('account-section');
  if (user) {
    // Show avatar/profile
    accSection.innerHTML = `
      <div class="avatar-menu">
        ${user.photoURL ? `<img src="${user.photoURL}" class="avatar-img">` : `<div class="avatar-initial">${user.email[0].toUpperCase()}</div>`}
        <div class="avatar-dropdown">
          <div>${user.displayName || user.email}</div>
          <div style="font-size:.9em">${user.email}</div>
          <button id="logout-btn" style= "background:#f44336;color:#fff;padding:7px 14px;border:none;border-radius:5px;cursor:pointer;">Logout</button>
        </div>
      </div>
    `;
    // Logout logic
    document.getElementById('logout-btn').onclick = () => signOut(auth);
  } else {
    // Default Account link
    accSection.innerHTML = `<a href="account.html" id="account-link">Account</a>`;
  }
});
