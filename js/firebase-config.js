// Configuração do app Web do Firebase.
// Console do Firebase > Configurações do projeto > Seus apps > Config.
// Estes valores identificam o projeto e NÃO são segredos: quem protege os dados
// são as regras do Firestore (firestore.rules) e o Firebase Authentication.
// Nunca coloque aqui chaves de "conta de serviço" (service account).
export const firebaseConfig = {
  apiKey: "COLE_AQUI_A_API_KEY",
  authDomain: "SEU-PROJETO.firebaseapp.com",
  projectId: "SEU-PROJETO",
  storageBucket: "SEU-PROJETO.appspot.com",
  messagingSenderId: "COLE_AQUI",
  appId: "COLE_AQUI"
};
