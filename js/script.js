// CRIAR CONTA
function criarConta() {
    const tel = document.getElementById("regTelefone").value;
    const senha = document.getElementById("regSenha").value;
    if (!tel || !senha) return alert("Preenche todos os campos");

    const user = {
        telefone: tel,
        senha: senha,
        saldo: 6
    };

    localStorage.setItem("user_" + tel, JSON.stringify(user));
    alert("Conta criada com sucesso!");
    window.location.href = "index.html";
}

// LOGIN
function login() {
    const tel = document.getElementById("telefone").value;
    const senha = document.getElementById("senha").value;

    const userData = localStorage.getItem("user_" + tel);
    if (!userData) return alert("Conta não existe");

    const user = JSON.parse(userData);
    if (user.senha !== senha) return alert("Senha incorreta");

    localStorage.setItem("usuarioLogado", tel);
    window.location.href = "dashboard.html";
}

// MODAIS
function abrirRecarga() {
    document.getElementById("modalRecarga").style.display = "flex";
}
function abrirRetirada() {
    document.getElementById("modalRetirada").style.display = "flex";
}
function fecharModais() {
    document.getElementById("modalRecarga").style.display = "none";
    document.getElementById("modalRetirada").style.display = "none";
}

// RECARGA (só admin)
function confirmarRecarga() {
    const senhaAdmin = document.getElementById("senhaAdmin").value;
    const valor = parseFloat(document.getElementById("valorRecarga").value);

    if (senhaAdmin !== "1234") return alert("Senha admin incorreta!");
    if (isNaN(valor) || valor <= 0) return alert("Valor inválido!");

    const tel = localStorage.getItem("usuarioLogado");
    const user = JSON.parse(localStorage.getItem("user_" + tel));

    user.saldo += valor;
    localStorage.setItem("user_" + tel, JSON.stringify(user));
    document.getElementById("saldo").innerText = user.saldo.toFixed(2);

    fecharModais();
    alert("Recarga efetuada com sucesso!");
}

// RETIRADA
function confirmarRetirada() {
    const iban = document.getElementById("iban").value.trim();
    const valor = Number(document.getElementById("valorRetirada").value);

    const tel = localStorage.getItem("usuarioLogado");
    const user = JSON.parse(localStorage.getItem("user_" + tel));

    if (!iban.startsWith("PT50") || iban.length !== 25) return alert("IBAN inválido!");
    if (valor > user.saldo) return alert("Saldo insuficiente!");

    user.saldo -= valor;
    localStorage.setItem("user_" + tel, JSON.stringify(user));
    document.getElementById("saldo").innerText = user.saldo.toFixed(2);

    fecharModais();
    alert("Retirada simulada com sucesso!");
}
