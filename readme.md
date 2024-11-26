# Backend Mocking API

Este proyecto es un backend construido con **Node.js**, **Express**, y **MongoDB**, que ofrece una API para generar usuarios y mascotas de manera aleatoria para realizar pruebas de carga y desarrollo.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.
- **Express**: Framework para construir la API RESTful.
- **MongoDB**: Base de datos NoSQL para almacenar usuarios y mascotas.
- **Mongoose**: ODM para MongoDB, utilizado para interactuar con la base de datos.
- **Faker**: Librería para generar datos falsos y aleatorios como nombres, correos electrónicos, etc.
- **bcryptjs**: Librería para hashear las contraseñas de los usuarios.
- **Cookie-parser**: Middleware para gestionar las cookies en las solicitudes HTTP.

## Instalación

Para instalar el proyecto y sus dependencias, sigue estos pasos:

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2. Accede al directorio del proyecto:

    ```bash
    cd <NOMBRE_DEL_DIRECTORIO>
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

4. Asegúrate de tener configurada tu base de datos MongoDB y actualiza la cadena de conexión en el archivo `app.js`:

    ```javascript
    const connection = mongoose.connect('CADENA_DE_CONEXIÓN_A_TU_MONGO');
    ```

5. Inicia el servidor:

    ```bash
    npm start
    ```

El servidor se iniciará en el puerto `8080` o el puerto definido en tu entorno.

## Rutas disponibles

### 1. `/api/mocks/generateData` (POST)

**Descripción**: Este endpoint permite generar y cargar usuarios y mascotas en la base de datos según los parámetros indicados.

**Cuerpo de la solicitud**:
```json
{
  "users": <cantidad_de_usuarios>,
  "pets": <cantidad_de_mascotas>
}