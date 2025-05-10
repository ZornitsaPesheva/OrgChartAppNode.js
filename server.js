const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const DATA_PATH = path.join(__dirname, 'public', 'json.json');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Helper function to read/write json.json
function readData() {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
}

function writeData(data) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// API to update node
app.post('/api/update', (req, res) => {
    const updatedNode = req.body.newData;
    let data = readData();
    data = data.map(node => node.id === updatedNode.id ? { ...node, ...updatedNode } : node);
    writeData(data);
    res.json({ status: 'updated', node: updatedNode });
});

// API to remove node
app.post('/api/remove', (req, res) => {
    const nodeId = req.body.id;
    let data = readData();

    data = data.filter(node => node.id !== nodeId && node.pid !== nodeId);

    writeData(data);
    res.json({ status: 'removed', id: nodeId });
});

// API to add node
app.post('/api/add', (req, res) => {
    const newNode = req.body;
    let data = readData();

    data.push(newNode);

    writeData(data);
    res.json({ status: 'added', node: newNode });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
