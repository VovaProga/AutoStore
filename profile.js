import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
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

// Функция выхода
const logout = async () => {
    try {
        await signOut(auth);
        window.location.href = "index.html";
    } catch (error) {
        console.error("Ошибка выхода:", error);
    }
};

// Навешиваем обработчик на кнопку выхода
document.getElementById('logout-btn')?.addEventListener('click', logout);

// Загрузка данных пользователя
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        
        document.getElementById('profile-avatar').textContent = 
            `${userData.firstName[0]}${userData.lastName[0]}`;
        
        document.getElementById('profile-info').innerHTML = `
            <h2>${userData.firstName} ${userData.lastName}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Телефон:</strong> ${userData.phone}</p>
            <p><strong>Дата регистрации:</strong> ${new Date(userData.createdAt).toLocaleDateString()}</p>
        `;
    } else {
        window.location.href = "login.html";
    }
});