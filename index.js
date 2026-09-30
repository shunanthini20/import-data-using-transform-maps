function importData() {

    const fileInput = document.getElementById("csvFile");
    const output = document.getElementById("output");

    // Check file selected
    if (!fileInput.files.length) {
        alert("Please choose a CSV file first.");
        return;
    }

    const file = fileInput.files[0];

    // Check CSV file
    if (!file.name.toLowerCase().endsWith(".csv")) {
        alert("Please select a CSV file.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {

        const text = event.target.result.trim();

        if (!text) {
            alert("CSV file is empty.");
            return;
        }

        // Split CSV into rows
        const rows = text.split(/\r?\n/);

        // First row contains field names
        const headers = rows[0]
            .split(",")
            .map(header => header.trim().replace(/^"|"$/g, ""));

        // Create Transform Map output
        output.innerHTML = `
            <h2>Transform Map</h2>

            <h3>Source Fields</h3>

            <div class="fields">
                ${headers.map(field => `
                    <div class="field">
                        ${field}
                    </div>
                `).join("")}
            </div>

            <h3>Target Fields</h3>

            <div class="target-fields">
                ${headers.map(field => `
                    <div class="mapping-row">
                        <span>${field}</span>
                        <span>→</span>
                        <span>${field}</span>
                    </div>
                `).join("")}
            </div>

            <p class="success">
                ✓ CSV data imported successfully
            </p>
        `;

        alert("CSV data imported successfully!");
    };

    reader.onerror = function() {
        alert("Unable to read the CSV file.");
    };

    reader.readAsText(file);
}