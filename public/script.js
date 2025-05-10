let chart = new OrgChart(document.getElementById("tree"), {
    nodeBinding: {
        field_0: "name",
        field_1: "title"
    },
    nodeMenu: {
        add: {text: "Add New"},
        edit: {text: "Edit"},
        remove: {text: "Remove"}
    }
});

// Update node
chart.onUpdateNode(function(args) {
    fetch('/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(args)
    }).then(res => res.json()).then(data => {
        console.log("Node updated:", data);
    });
});

// Remove node
chart.onRemoveNode(function(args) {
    console.log(args)
    fetch('/api/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: args.node.id })
    }).then(res => res.json()).then(data => {
        console.log("Node removed:", data);
    });
});

// Add node
chart.onAddNode(function(args) {
    fetch('/api/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(args.node)
    }).then(res => res.json()).then(data => {
        console.log("Node added:", data);
    });
});

fetch('json.json') 
  .then((response) => response.json())
  .then((data) => chart.load(data));
