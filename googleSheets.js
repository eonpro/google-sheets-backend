const express = require('express');
const app = express();
const fetch = require('node-fetch'); // Fetch library for making HTTP requests

// Your Google Sheets details
const spreadsheetId = '13ZRyh5wqtrVa0rPUrCQLv91Au2UpW4q5NO4FMzwiCnk'; // Replace with your Spreadsheet ID
const range = 'New Sales 2025!A1:E20'; // Replace with your desired range
const apiKey = 'AIzaSyCNxI7k3QFgDYVwaHh9LoG-H4eu9NsRfs0'; // Replace with your API key

// Function to fetch data from Google Sheets API
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

// API route to expose the data
app.get('/getGoogleSheetData', async (req, res) => {
    try {
        const data = await getGoogleSheetData();
        res.json(data); // Send the data as JSON
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});app.get('/getGoogleSheetData', async (req, res) => {
    try {
        const data = await getGoogleSheetData();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});
