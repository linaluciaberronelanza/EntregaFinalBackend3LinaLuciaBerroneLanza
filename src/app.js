import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

//Importamos el nuevo router de mocks: 
import mocksRouter from "./routes/mocks.router.js";

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(`mongodb+srv://coderhouse69990:coderhouse@cluster0.k8gmho6.mongodb.net/Backend3?retryWrites=true&w=majority&appName=Cluster0`)

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use("/api/mocks", mocksRouter);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`))
}

export default app;
