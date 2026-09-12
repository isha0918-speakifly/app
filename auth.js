// Shared auth helpers used across pages.

function showMsg(el, text, type) {
  el.textContent = text;
  el.className = "form-msg " + (type || "");
}

async function signUp(email, password, displayName) {
  const cred = await auth.createUserWithEmailAndPassword(email, password);
  await cred.user.updateProfile({ displayName });
  await db.collection("users").doc(cred.user.uid).set({
    displayName,
    email,
    currentLevel: "level0",
    completedUnits: [],
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  return cred.user;
}

async function logIn(email, password) {
  const cred = await auth.signInWithEmailAndPassword(email, password);
  return cred.user;
}

function logOut() {
  return auth.signOut();
}

// Call this at the top of any page that requires login.
// Redirects to index.html if no user is signed in.
function requireAuth(onReady) {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "index.html";
    } else {
      onReady(user);
    }
  });
}

function friendlyError(err) {
  const map = {
    "auth/email-already-in-use": "That email already has an account. Try logging in instead.",
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/weak-password": "Use at least 6 characters for your password.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "That password doesn't match.",
    "auth/invalid-credential": "Email or password is incorrect."
  };
  return map[err.code] || err.message;
}
