const cpfInput = document.getElementById("cpf");
const telefoneInput = document.getElementById("telefone");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const confirmarSenhaInput = document.getElementById("confirmarSenha");
const msg = document.getElementById("msg");
const btn = document.getElementById("btnCadastrar");

// ===== PROTEÇÃO =====
function contemCodigoMalicioso(texto) {
  const padrao = /<script|<\/script>|javascript:|onerror=|onload=|<|>/gi;
  return padrao.test(texto);
}

// ===== TELEFONE =====
telefoneInput.addEventListener("input", () => {
  let v = telefoneInput.value.replace(/\D/g, "").slice(0, 11);

  v = v.replace(/(\d{2})(\d)/, "($1) $2");
  v = v.replace(/(\d{5})(\d)/, "$1-$2");

  telefoneInput.value = v;
  telefoneInput.style.borderColor = v.length === 15 ? "green" : "red";

  validarFormulario();
});

// ===== EMAIL =====
emailInput.addEventListener("input", () => {
  const valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
  emailInput.style.borderColor = valido ? "green" : "red";

  validarFormulario();
});

// ===== CPF =====
cpfInput.addEventListener("input", () => {
  let v = cpfInput.value.replace(/\D/g, "").slice(0, 11);

  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  cpfInput.value = v;

  validarFormulario();
});

// ===== CPF VALIDAÇÃO =====
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++)
    soma += cpf[i] * (10 - i);

  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto != cpf[9]) return false;

  soma = 0;
  for (let i = 0; i < 10; i++)
    soma += cpf[i] * (11 - i);

  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;

  return resto == cpf[10];
}

// ===== SENHA =====
const regras = {
  tamanho: document.getElementById("regraTamanho"),
  maiuscula: document.getElementById("regraMaiuscula"),
  numero: document.getElementById("regraNumero"),
  especial: document.getElementById("regraEspecial"),
  igual: document.getElementById("regraIgual"),
};

function validarSenhaRealtime() {
  const s = senhaInput.value;
  const c = confirmarSenhaInput.value;

  const temTamanho = s.length >= 8;
  const temMaiuscula = /[A-Z]/.test(s);
  const temNumero = /\d/.test(s);
  const temEspecial = /[!@#$%&]/.test(s);
  const apenasPermitidos = /^[A-Za-z\d!@#$%&]+$/.test(s);
  const iguais = s && c && s === c;

  atualizar(regras.tamanho, temTamanho);
  atualizar(regras.maiuscula, temMaiuscula);
  atualizar(regras.numero, temNumero);
  atualizar(regras.especial, temEspecial && apenasPermitidos);
  atualizar(regras.igual, iguais);

  validarFormulario();
}

function atualizar(el, ok) {
  el.classList.remove("valido", "invalido");
  el.classList.add(ok ? "valido" : "invalido");
}

senhaInput.addEventListener("input", validarSenhaRealtime);
confirmarSenhaInput.addEventListener("input", validarSenhaRealtime);

// ===== FORMULÁRIO =====
function validarFormulario() {
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
  const telefoneValido = telefoneInput.value.length === 15;
  const cpfValido = validarCPF(cpfInput.value);
  const instituicao = document.getElementById("instituicao").value;
  const senha = senhaInput.value;
  const confirmar = confirmarSenhaInput.value;

  const senhaValida =
    senha.length >= 8 &&
    /[A-Z]/.test(senha) &&
    /\d/.test(senha) &&
    /[!@#$%&]/.test(senha) &&
    /^[A-Za-z\d!@#$%&]+$/.test(senha);

  const senhasIguais = senha === confirmar;

  const seguro =
    !contemCodigoMalicioso(emailInput.value) &&
    !contemCodigoMalicioso(telefoneInput.value) &&
    !contemCodigoMalicioso(cpfInput.value);

  const tudoValido =
    emailValido &&
    telefoneValido &&
    cpfValido &&
    instituicao &&
    senhaValida &&
    senhasIguais &&
    seguro;

  btn.disabled = !tudoValido;
}

// ===== BOTÃO =====
window.cadastrar = function () {
  if (btn.disabled) return;

  msg.style.color = "green";
  msg.innerText = "Cadastro validado com sucesso!";
};