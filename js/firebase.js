// Ponto único de acesso ao Firebase (SDK modular via CDN, versão fixa).
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export * from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
export * from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
