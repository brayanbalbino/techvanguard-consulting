// Utilitários de interface: cabeçalho, sub-menu do admin, formatação e avisos.
import { terminarSessao } from "./sessao.js";

export const ESTADOS = {
  pendente: "Pendente",
  em_analise: "Em análise",
  concluido: "Concluído",
  recusado: "Recusado"
};

/** Escapa texto antes de inserir em innerHTML (evita XSS). */
export function esc(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

export const fmtMoeda = (n) =>
  Number(n || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function fmtData(ts) {
  const d = ts?.toDate ? ts.toDate() : null;
  return d ? d.toLocaleString("pt-BR") : "—";
}

export function toast(texto, erro = false) {
  const el = document.createElement("div");
  el.className = "toast" + (erro ? " erro" : "");
  el.setAttribute("role", "status");
  el.textContent = texto;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

export function mensagemErroAuth(codigo) {
  const mapa = {
    "auth/invalid-credential": "E-mail ou senha incorretos.",
    "auth/wrong-password": "E-mail ou senha incorretos.",
    "auth/user-not-found": "E-mail ou senha incorretos.",
    "auth/invalid-email": "Digite um e-mail válido.",
    "auth/email-already-in-use": "Já existe uma conta com este e-mail. Use “Entrar”.",
    "auth/weak-password": "A senha precisa ter pelo menos 8 caracteres.",
    "auth/too-many-requests": "Muitas tentativas. Aguarde alguns minutos e tente de novo.",
    "auth/network-request-failed": "Sem conexão com o Firebase. Verifique a internet.",
    "permission-denied": "Você não tem permissão para esta ação."
  };
  return mapa[codigo] || "Algo deu errado. Tente novamente.";
}

/** Preenche <header id="cabecalho"> conforme o estado de login. */
export function montarCabecalho({ user, perfil }, ativa = "") {
  const el = document.getElementById("cabecalho");
  if (!el) return;
  const admin = perfil?.papel === "admin";
  const atual = (chave) => (chave === ativa ? ' aria-current="page"' : "");

  el.innerHTML = `
    <div class="wrap barra">
      <a class="marca" href="/"><img src="/assets/logo.svg" alt="" width="34" height="34">
        <span>TechVanguard <small>Consulting</small></span></a>
      <nav aria-label="Principal">
        <a href="/"${atual("inicio")}>Início</a>
        ${user ? `<a href="/cliente/servicos.html"${atual("servicos")}>Serviços</a>
                  <a href="/cliente/pedidos.html"${atual("pedidos")}>Meus pedidos</a>` : ""}
        ${admin ? `<a href="/admin"${atual("admin")}>Administração</a>` : ""}
      </nav>
      <div class="conta">
        ${user
          ? `<span class="usuario">${esc(perfil?.nome || user.email)}</span>
             <button class="btn btn-contorno btn-pequeno" id="btn-sair" type="button">Sair</button>`
          : `<a class="btn btn-contorno btn-pequeno" href="/login.html">Entrar</a>
             <a class="btn btn-primario btn-pequeno" href="/registo.html">Criar conta</a>`}
      </div>
    </div>`;
  document.getElementById("btn-sair")?.addEventListener("click", () => terminarSessao(user));
}

/** Preenche <nav id="subnav"> nas páginas /admin. */
export function montarSubnavAdmin(ativa) {
  const el = document.getElementById("subnav");
  if (!el) return;
  const itens = [
    ["painel", "/admin", "Painel"],
    ["servicos", "/admin/servicos.html", "Serviços"],
    ["clientes", "/admin/clientes.html", "Clientes"],
    ["pedidos", "/admin/pedidos.html", "Pedidos de orçamento"],
    ["acessos", "/admin/acessos.html", "Registo de acessos"]
  ];
  el.innerHTML = itens
    .map(([k, href, texto]) => `<a href="${href}"${k === ativa ? ' aria-current="page"' : ""}>${texto}</a>`)
    .join("");
}
