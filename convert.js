// Select all elements with class 'recharts-surface'
const svgElements = document.querySelectorAll('svg.recharts-surface');

// Get the fourth chart (index 3 since it's zero-based)
if (svgElements.length > 1) {
    const secondSvg = svgElements[3];

    // Get all <path> elements with a stroke inside the second SVG
    const paths = [...secondSvg.querySelectorAll('path[stroke]')];

    // Extract and format the "d" values
    const pathData = paths.map(path => path.getAttribute('d').split(/[MmLlHhVvCcSsQqTtAaZz]/).filter(Boolean));

    // Find the maximum number of segments
    const maxRows = Math.max(...pathData.map(d => d.length));

    // Transpose the data into rows and columns
    const table = [];
    for (let i = 0; i < maxRows; i++) {
        table.push(pathData.map(d => d[i] || ''));
    }

    // Convert to CSV format
    let csvContent = table.map(row => row.join(",")).join("\n");

    // Function to filter only even columns from a CSV string
    function filterEvenColumns(csvContent) {
        // Split CSV into rows
        const rows = csvContent.split("\n").map(row => row.split(","));

        // Extract only even-indexed columns (1-based: 2nd, 4th, 6th, etc.)
        const filteredRows = rows.map(row => row.filter((_, index) => (index + 1) % 2 === 0));

        // Convert back to CSV format
        return filteredRows.map(row => row.join(",")).join("\n");
    }

    // Apply the filtering function
    csvContent = filterEvenColumns(csvContent);

    // Function to trigger CSV download
    function downloadCSV(content, filename = "data.csv") {
        const blob = new Blob([content], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Download the filtered CSV
    downloadCSV(csvContent, "siteground_cpu_data.csv");
} else {
    console.log("The fourth 'recharts-surface' SVG element was not found.");
}
