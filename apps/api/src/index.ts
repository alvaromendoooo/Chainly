import express from 'express';
import homeRoute from "./routes/home.route"

const app = express();

app.use("/", homeRoute);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});