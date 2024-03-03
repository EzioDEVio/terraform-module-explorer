
// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/modules/:provider', async (req, res) => {
    const provider = req.params.provider;
    const url = `https://registry.terraform.io/v1/modules?provider=${provider}&limit=10`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch modules');
        const data = await response.json();
        res.json(data.modules);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error fetching modules from Terraform Registry');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
