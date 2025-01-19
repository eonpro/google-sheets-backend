const fetch = require('node-fetch');

const spreadsheetId = '13ZRyh5wqtrVa0rPUrCQLv91Au2UpW4q5NO4FMzwiCnk';
const range = 'New Sales 2025!A1:E20';
const apiKey = 'AIzaSyCNxI7k3QFgDYVwaHh9LoG-H4eu9NsRfs0';

async function getGoogleSheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.values;
        } else {
            throw new Error(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error fetching Google Sheets data:', error);
        throw error;
    }
}

export default async (req, res) => {
    try {
        const data = await getGoogleSheetData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
};
