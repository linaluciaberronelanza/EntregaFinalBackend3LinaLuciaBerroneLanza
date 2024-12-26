import { adoptionsService, petsService, usersService } from "../services/index.js"

const getAllAdoptions = async (req, res) => {
    try {
        const result = await adoptionsService.getAll();
        res.send({ status: "success", payload: result })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error retrieving adoptions" })
    }
}

const getAdoption = async (req, res) => {
    const adoptionId = req.params.aid;
    try {
        const adoption = await adoptionsService.getBy({ _id: adoptionId })
        if (!adoption) {
            return res.status(404).send({ status: "error", error: "Adoption not found" })
        }
        res.send({ status: "success", payload: adoption })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error retrieving adoption" })
    }
}

const createAdoption = async (req, res) => {
    const { uid, pid } = req.params;
    try {
        const user = await usersService.getUserById(uid);
        if (!user) return res.status(404).send({ status: "error", error: "user Not found" });

        const pet = await petsService.getBy({ _id: pid });
        if (!pet) return res.status(404).send({ status: "error", error: "Pet not found" });

        if (pet.adopted) return res.status(400).send({ status: "error", error: "Pet is already adopted" });

        user.pets.push(pet._id);
        await usersService.update(user._id, { pets: user.pets });
        await petsService.update(pet._id, { adopted: true, owner: user._id });
        await adoptionsService.create({ owner: user._id, pet: pet._id });

        res.send({ status: "success", message: "Pet adopted" });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error processing adoption" });
    }
}

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}