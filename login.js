const loginInput = document.getElementById("login");
const senhaInput = document.getElementById("senha");
const btnEntrar = document.getElementById("btnEntrar");
const msg = document.getElementById("msg");

// ===== ativa botão só se tiver tudo preenchido =====
function validarBotaoLogin() {
  const loginOk = loginInput.value.trim().length > 0;
  const senhaOk = senhaInput.value.trim().length > 0;

  btnEntrar.disabled = !(loginOk && senhaOk);
}

// ===== eventos em tempo real =====
loginInput.addEventListener("input", validarBotaoLogin);
senhaInput.addEventListener("input", validarBotaoLogin);

// ===== login fake (você depois liga no Supabase no auth.js) =====
function login() {
  if (btnEntrar.disabled) return;

  const login = loginInput.value.trim();
  const senha = senhaInput.value.trim();

  if (!login || !senha) {
    msg.innerText = "Preencha todos os campos!";
    return;
  }

  msg.style.color = "green";
  msg.innerText = "Login validado (pronto para Supabase)";
}