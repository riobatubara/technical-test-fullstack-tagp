const express = require('express');
const axios = require('axios');
const https = require('https');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/data', async (req, res) => {
    try {
        const response = await axios.get(
            'https://api-e-database.kemendagri.go.id/api/dukcapil_jumlah_penduduk_kabkot?token=51F890E2DF',
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0',
                    'Accept': 'application/json'
                },
                httpsAgent: new https.Agent({ rejectUnauthorized: false })
            }
        );

        // console.log("API Response:", response.data);

        const rawData = response.data.data;

        // Group by province and sum population
        const groupedData = rawData.reduce((acc, item) => {
            if (!acc[item.prov]) {
                acc[item.prov] = 0;
            }
            acc[item.prov] += parseInt(item.jumlah_penduduk);
            return acc;
        }, {});

        res.json(groupedData);
    } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
