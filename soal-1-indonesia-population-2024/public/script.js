document.addEventListener("DOMContentLoaded", async () => {
    const ctx = document.getElementById('populationChart').getContext('2d');
    const chartTypeSelector = document.getElementById("chartType");
    let chart;

    async function fetchData() {
        const response = await fetch('/data');
        const data = await response.json();
        return {
            labels: Object.keys(data),
            values: Object.values(data)
        };
    }

    async function createChart(type = "bar") {
        const { labels, values } = await fetchData();
        if (chart) chart.destroy();
        
        chart = new Chart(ctx, {
            type,
            data: {
                labels,
                datasets: [{
                    label: 'Population',
                    data: values,
                    backgroundColor: ['red', 'blue', 'green', 'orange', 'purple'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });
    }

    chartTypeSelector.addEventListener("change", (e) => createChart(e.target.value));
    
    createChart();
});
