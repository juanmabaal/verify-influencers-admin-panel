require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app  = express();



app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const influencerRoutes = require('./routes/influencerRoutes');
app.use('/', influencerRoutes);

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'This is a test endpoint' })
})


const PORT = process.env.PORT || 5000;
app.listen (PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
