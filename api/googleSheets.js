const fetch = require('node-fetch'); // Fetch library for making HTTP requests

const spreadsheetId = '13ZRyh5wqtrVa0rPUrCQLv91Au2UpW4q5NO4FMzwiCnk'; // Your Spreadsheet ID
const range = 'New Sales 2025!A1:E20'; // Desired range in your Google Sheet
const apiKey = 'AIzaSyCNxI7k3QFgDYVwaHh9LoG-H4eu9NsRfs0'; // Your API key

async function getGoogleSheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data.values; // Returns an array of rows
        } else {
            throw new Error(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error fetching Google Sheets data:', error);
        throw error;
    }
}

// Export a default function for Vercel
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const data = await getGoogleSheetData();
            res.status(200).json(data); // Send the data as JSON
        } catch (error) {
            res.status(500).json({ error: 'Error fetching data' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
