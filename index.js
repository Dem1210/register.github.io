/*
    Ejercicio:
    Crea un register de usuarios, donde se almacene un array de objetos que represente
    un usuario y contengan el nombre, correo y contraseña

    Debes tener dos variables en el localstorage, una para almecenar todos los usuarios
    y otra para almacenar el usuario actual.

    Crea una pantalla donde puedas registrar un usuario, otra donde puedas loguearte,
    otra donde puedas cerrar sesion, ademas de una pantalla de bienvenida.

    Si el usuario no existe, mostrar un mensaje de error
    Si el usuario existe, redirigir a la pantalla de bienvenida
    Si el usuario no esta logueado, no podra ver la pantalla de bienvenida

    Fecha de entrega: 04/03/24
*/


// Registrando un nuevo usuario
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword= document.getElementById('confirmPassword').value;

    const newUser = { name, email, password };
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si el usuario ya está registrado por su correo electrónico
    const isUserRegistered = users.some(user => user.email === email);

    if(password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
         return; // Detiene la ejecución si las contraseñas no coinciden
    }

    if (isUserRegistered) {
        alert('El usuario ya está registrado. Por favor, elige otro correo electrónico.');
    } else {
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Usuario registrado con éxito');
        window.location.href = 'login.html';
    }
});

// Iniciando sesión
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'bienvenida.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Bienvenida al usuario
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('bienvenida.html')) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            window.location.href = 'login.html';
        } else {
            document.getElementById('welcomeText').innerText = `¡Hola, ${currentUser.name}!`;
        }
    }
    
    if (window.location.pathname.includes('logout.html')) {
        // Después de eliminar el usuario actual del localStorage
        document.getElementById('logoutMessage').innerText = "¡Has cerrado sesión con éxito!";

        try {
    // Intenta eliminar el usuario actual del localStorage
    localStorage.removeItem('currentUser');
    console.log("¡Adiós!");
} catch (error) {
    console.error("Error al cerrar sesión:", error);
}

    }
});

// Nueva clave

document.getElementById('resetPasswordBtn')?.addEventListener('click', function(e) {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value;
    const newPassword = document.getElementById('newPassword').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let found = false;

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            users[i].password = newPassword;
            found = true;
            break;
        }
    }

    if (found) {
        localStorage.setItem('users', JSON.stringify(users));
        alert('Contraseña restablecida con éxito. Por favor, inicia sesión con tu nueva contraseña.');
        window.location.href = 'login.html';
    } else {
        alert('No se encontró un usuario con ese correo electrónico.');
    }
});




