import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAV4oz47e-7f_azlWsu-jc_qDRnDindCgQ",
    authDomain: "avto-ae8d9.firebaseapp.com",
    projectId: "avto-ae8d9",
    storageBucket: "avto-ae8d9.appspot.com",
    messagingSenderId: "3772249669",
    appId: "1:3772249669:web:eeb345c2ca5f85495d552c",
    measurementId: "G-TW9YMF1B26"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
    const authContainer = document.getElementById("auth-container");
    
    if (user && authContainer) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        
        authContainer.innerHTML = `
            <a href="profile.html" class="user-avatar">
                ${userData.firstName[0]}${userData.lastName[0]}
            </a>
        `;
    } else if (authContainer) {
        authContainer.innerHTML = '<a href="login.html" class="login-link">Войти</a>';
    }
});

window.toggleUserMenu = function() {
    const menu = document.getElementById("user-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
};

window.logoutUser = function() {
    signOut(auth).then(() => window.location.reload());
};