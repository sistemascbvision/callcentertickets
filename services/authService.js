const usuarios = require('../data/usuarios.json');

class AuthService {
    static login(nombre_usuario, contrasena) {
        // Buscar al usuario por nombre de usuario
        const user = usuarios.find(user => user.nombre_usuario === nombre_usuario);

        if (!user) {
            // Usuario no encontrado
            return { success: false, message: 'Usuario no encontrado' };
        }

        // Validar la contraseña
        if (user.contrasena !== contrasena) {
            // Contraseña incorrecta
            return { success: false, message: 'Contraseña incorrecta' };
        }

        // Usuario autenticado correctamente
        return { success: true, message: 'Inicio de sesión exitoso', user };
    }
}

module.exports = AuthService;
