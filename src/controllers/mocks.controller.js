import { usersService, petsService } from "../services/index.js";
import MockingService from "../services/mocking.js";

const validateServices = () => {
    if (!usersService?.create || typeof usersService.create !== 'function') {
        throw new Error('User service create method is not properly implemented');
    }
    if (!petsService?.create || typeof petsService.create !== 'function') {
        throw new Error('Pet service create method is not properly implemented');
    }
};

const getMockingPets = async (req, res) => {
    const pets = await MockingService.generateMockingPets(100);
    res.send({ status: "success", payload: pets });
}

const getMockingUsers = async (req, res) => {
    const users = await MockingService.generateMockingUsers(50);
    res.send({ status: "success", payload: users });
}

const generateData = async (req, res) => {
    const { users = 10, pets = 10 } = req.body;

    try {
        // Validar si los métodos de los servicios existen antes de continuar
        validateServices();

        // Generar datos ficticios de usuarios y mascotas según la cantidad indicada
        const mockingUsers = await MockingService.generateMockingUsers(users);
        const mockingPets = await MockingService.generateMockingPets(pets);

        // Insertar cada usuario generado en la base de datos
        for (const user of mockingUsers) {
            await usersService.create(user);
        }

        // Insertar cada mascota generada en la base de datos
        for (const pet of mockingPets) {
            await petsService.create(pet);
        }

        res.send({
            status: "success",
            message: "Los datos se han generado y cargado correctamente en la Base de Datos"
        });
    } catch (error) {

        console.error("Error al generar y cargar datos:", error);
        res.status(500).send({
            status: "error",
            message: "Error al generar y cargar los datos en la Base de Datos."
        });
    }
};


export default {
    getMockingPets,
    getMockingUsers,
    generateData
}