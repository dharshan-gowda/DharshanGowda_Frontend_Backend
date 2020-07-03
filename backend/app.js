const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true
}

app.use(cors(corsOptions));

//routes
app.use('/api/graph', require('./routes/graph'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening at PORT: ${PORT}`);
})