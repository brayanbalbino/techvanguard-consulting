// Sessão do usuário, proteção de páginas e registo de acessos.
import {
  auth, db, onAuthStateChanged, signOut,
  doc, getDoc, addDoc, collection, serverTimestamp
} from "./firebase.js";

async function carregarPerfil(uid) {
  try {
    const snap = await getDoc(doc(db, "usuarios", uid));
    return snap.exists() ? snap.data() : null;
  } catch (e) {
    console.error("Não foi possível ler o perfil:", e);
    return null;
  }
}

/** Espera o Firebase informar o estado de login. Devolve { user, perfil }. */
export function aguardarUsuario() {
  return new Promise((resolve) => {
    const cancelar = onAuthStateChanged(
      auth,
      async (user) => {
        cancelar();
        if (!user) return resolve({ user: null, perfil: null });
        resolve({ user, perfil: await carregarPerfil(user.uid) });
      },
      () => resolve({ user: null, perfil: null })
    );
  });
}

const parar = () => new Promise(() => {}); // interrompe o script da página após redirecionar

/** Páginas da área do cliente: exige login. */
export async function exigirLogin() {
  const sessao = await aguardarUsuario();
  if (!sessao.user) {
    location.replace("/login.html?next=" + encodeURIComponent(location.pathname));
    return parar();
  }
  return sessao;
}

/** Páginas /admin: exige login + papel "admin". A segurança real está em firestore.rules. */
export async function exigirAdmin() {
  const sessao = await exigirLogin();
  if (sessao.perfil?.papel !== "admin") {
    location.replace("/cliente/servicos.html");
    return parar();
  }
  return sessao;
}

/** Grava um registo em "acessos" com data e hora do servidor. */
export function registarAcesso(user, acao) {
  return addDoc(collection(db, "acessos"), {
    uid: user.uid,
    email: user.email,
    acao, // "login" | "logout" | "registo"
    dataHora: serverTimestamp()
  });
}

export async function terminarSessao(user) {
  try { if (user) await registarAcesso(user, "logout"); } catch (e) { console.warn(e); }
  await signOut(auth);
  location.href = "/";
}
