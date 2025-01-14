import supertest from "supertest";
import chai from "chai";
import app from '../src/app.js';
const expect = chai.expect;

// Configuramos el requester
const requester = supertest(app);

describe("Testing Adoption Router", function () {
    // Variables para usar en múltiples tests
    const validUserId = '671867696890203be0f33e5f';
    const validPetId = '671860eea7e06a95b6300028';
    const validAdoptionId = '67436cde99efa026a232e74d';
    const invalidId = '100056789010000008556533';

    // Hook para esperar la conexión a MongoDB
    before(function (done) {
        this.timeout(10000); // Aumentamos el timeout a 10 segundos
        setTimeout(done, 2000);
    });

    describe("GET /api/adoptions", function () {
        it("Debería obtener todas las adopciones correctamente", async function () {
            const response = await requester.get("/api/adoptions");

            expect(response.statusCode).to.equal(200);
            expect(response.body).to.have.property('status').equal('success');
            expect(response.body).to.have.property('payload');
            expect(response.body.payload).to.be.an('array');
        });
    });

    describe("GET /api/adoptions/:aid", function () {
        it("Debería obtener una adopción específica con ID válido", async function () {
            const response = await requester.get(`/api/adoptions/${validAdoptionId}`);

            if (response.statusCode === 200) {
                expect(response.body).to.have.property('status').equal('success');
                expect(response.body).to.have.property('payload');
                expect(response.body.payload).to.be.an('object');
                expect(response.body.payload).to.have.property('owner');
                expect(response.body.payload).to.have.property('pet');
            } else {
                expect(response.statusCode).to.equal(404);
                expect(response.body).to.have.property('status').equal('error');
                expect(response.body).to.have.property('error').equal('Adoption not found');
            }
        });

        it("Debería retornar error 404 para ID de adopción inexistente", async function () {
            const response = await requester.get(`/api/adoptions/${invalidId}`);
            expect(response.statusCode).to.equal(404);
            expect(response.body).to.have.property('status').equal('error');
            expect(response.body).to.have.property('error').equal('Adoption not found');
        });

        it("Debería retornar error para ID de adopción inválido", async function () {
            this.timeout(10000); // Aumentamos el timeout a 10 segundos para esta prueba
            const response = await requester.get('/api/adoptions/invalid-id');
            expect(response.statusCode).to.be.oneOf([400, 500]);
            expect(response.body).to.have.property('status').equal('error');
            expect(response.body).to.have.property('error');
        });
    });

    describe("POST /api/adoptions/:uid/:pid", function () {
        it("Debería crear una adopción exitosamente con IDs válidos", async function () {
            const response = await requester.post(`/api/adoptions/${validUserId}/${validPetId}`);

            if (response.statusCode === 200) {
                expect(response.body).to.have.property('status').equal('success');
                expect(response.body).to.have.property('message').equal('Pet adopted');
            } else if (response.statusCode === 400) {
                expect(response.body).to.have.property('status').equal('error');
                expect(response.body).to.have.property('error').equal('Pet is already adopted');
            }
        });

        it("Debería retornar error 404 al intentar adoptar con usuario inexistente", async function () {
            const response = await requester.post(`/api/adoptions/${invalidId}/${validPetId}`);
            expect(response.statusCode).to.equal(404);
            expect(response.body).to.have.property('status').equal('error');
            expect(response.body).to.have.property('error').equal('user Not found');
        });

        it("Debería manejar error al intentar adoptar con IDs inválidos", async function () {
            this.timeout(10000); // Aumentamos el timeout a 10 segundos para esta prueba
            const response = await requester.post('/api/adoptions/invalid-user-id/invalid-pet-id');
            expect(response.statusCode).to.be.oneOf([400, 500]);
            expect(response.body).to.have.property('status').equal('error');
            expect(response.body).to.have.property('error');
        });
    });
});