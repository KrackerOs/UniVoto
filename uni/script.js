// Carregar dados do LocalStorage
let users = JSON.parse(localStorage.getItem("users")) || {
    admin: { password: "admin123", role: "Administrador" },
};

let votes = JSON.parse(localStorage.getItem("votes")) || {
    "Festa Junina": 0,
    "Feira de Ciências": 0,
    "Campeonato Esportivo": 0,
};

let totalVotes = JSON.parse(localStorage.getItem("totalVotes")) || 0;
let voters = JSON.parse(localStorage.getItem("voters")) || [];

// Salvar dados no LocalStorage
function saveData() {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("totalVotes", JSON.stringify(totalVotes));
    localStorage.setItem("voters", JSON.stringify(voters));
}

// Função de registro
function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const registerError = document.getElementById("register-error");

    if (!username || !password) {
        registerError.textContent = "Preencha todos os campos!";
        return;
    }

    if (users[username]) {
        registerError.textContent = "Usuário já existe!";
        return;
    }

    users[username] = { password: password, role: "Aluno" };
    saveData(); // Salvar usuários no LocalStorage
    registerError.textContent = "Usuário registrado com sucesso!";
    document.getElementById("register-username").value = "";
    document.getElementById("register-password").value = "";
}

// Função de login
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("login-error");

    if (users[username] && users[username].password === password) {
        loginError.textContent = "";
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("register-section").classList.add("hidden");
        document.getElementById("voting-section").classList.remove("hidden");
        document.getElementById("user-role").textContent = users[username].role;

        if (users[username].role === "Administrador") {
            document.getElementById("admin-panel").classList.remove("hidden");
            document.getElementById("student-panel").classList.add("hidden");
        }
    } else {
        loginError.textContent = "Usuário ou senha inválidos!";
    }
}

// Função de votação
function vote(event) {
    const username = document.getElementById("username").value;

    if (voters.includes(username)) {
        alert("Você já votou!");
        return;
    }

    votes[event]++;
    totalVotes++;
    voters.push(username);
    saveData(); // Salvar votos e eleitores no LocalStorage
    updateResults();
}

// Atualizar resultados
function updateResults() {
    document.getElementById("votes-festa").textContent = ((votes["Festa Junina"] / totalVotes) * 100).toFixed(1);
    document.getElementById("votes-feira").textContent = ((votes["Feira de Ciências"] / totalVotes) * 100).toFixed(1);
    document.getElementById("votes-campeonato").textContent = ((votes["Campeonato Esportivo"] / totalVotes) * 100).toFixed(1);

    const votersList = document.getElementById("voters-list");
    votersList.innerHTML = "";
    voters.forEach(voter => {
        const li = document.createElement("li");
        li.textContent = voter;
        votersList.appendChild(li);
    });
}

// Carregar resultados ao iniciar
updateResults();