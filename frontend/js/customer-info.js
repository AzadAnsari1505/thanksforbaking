import { auth, db } from './firebase.js';
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("customer-info-form");
const emailInput = document.getElementById("custEmail");

// ✅ Make sure autocomplete is declared at top-level
let autocomplete;

auth.onAuthStateChanged(user => {
  if (user && user.emailVerified) {
    emailInput.value = user.email;
    emailInput.addEventListener('keydown', e => e.preventDefault());
    emailInput.addEventListener('paste', e => e.preventDefault());
    emailInput.style.caretColor = 'transparent';
    emailInput.style.backgroundColor = '#f9f9f9';
    emailInput.style.cursor = 'not-allowed';
  } else {
    alert("Please login with a verified email to continue.");
    window.location.href = "/account.html";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user) {
    alert("User not logged in!");
    return;
  }

  const data = {
    uid: user.uid,
    fullName: form.custName.value.trim(),
    mobile: form.custMobile.value.trim(),
    email: user.email,
    house: form.custHouse.value.trim(),
    city: form.custCity.value.trim(),
    state: form.custState.value.trim(),
    pincode: form.custPincode.value.trim(),
    landmark: form.custLandmark.value.trim(),
    instructions: form.custInstructions.value.trim(),
    createdAt: serverTimestamp()
  };

  try {
    await addDoc(collection(db, "deliveryDetails"), data);
    alert("Delivery info saved! Redirecting to payment...");
    window.location.href = "/frontend/payment.html";
  } catch (err) {
    console.error("Failed to save delivery details", err);
    alert("Something went wrong. Try again.");
  }
});

// ✅ Place Autocomplete setup
function initAutocomplete() {
  const input = document.getElementById('autocomplete');
  autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['geocode'],
    componentRestrictions: { country: "in" },
    fields: ['address_components', 'geometry', 'formatted_address'],
  });

  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  const place = autocomplete.getPlace();
  document.getElementById('autocomplete').value = place.formatted_address;

  const addressComponents = place.address_components;

  let city = "";
  let state = "";
  let pincode = "";

  addressComponents.forEach(component => {
    const types = component.types;

    if (types.includes("locality")) {
      city = component.long_name;
    }

    if (types.includes("administrative_area_level_1")) {
      state = component.long_name;
    }

    if (types.includes("postal_code")) {
      pincode = component.long_name;
    }
  });

  // Fill into form fields
  document.getElementById("custCity").value = city;
  document.getElementById("custState").value = state;
  document.getElementById("custPincode").value = pincode;
}


// ✅ Safe load even if Google is delayed
window.addEventListener("load", () => {
  if (typeof google !== "undefined" && google.maps) {
    initAutocomplete();
  } else {
    const interval = setInterval(() => {
      if (typeof google !== "undefined" && google.maps) {
        initAutocomplete();
        clearInterval(interval);
      }
    }, 300);
  }
});
