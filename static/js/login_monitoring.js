// Lista de usuarios y contraseñas simulada
const users = [
  { username: "vrojas", email: "vr.rojaspozo@gmail.com", password: "argos@" },
  { username: "fano", email: "juannolorbe@gmail.com", password: "chisito@" },
  { username: "user3", email: "user3@example.com", password: "password3" }
];

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const usernameOrEmail = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  // Verificación del usuario
  const user = users.find(user => 
    (user.username === usernameOrEmail || user.email === usernameOrEmail) 
    && user.password === password
  );

  if (user) {
    // Si el usuario es válido, redirigir a la segunda página
    window.location.href = "/monitoring/index.html";
  } else {
    // Si las credenciales son incorrectas, mostrar un mensaje de error
    errorMessage.textContent = "Invalid username/email or password";
  }
});

