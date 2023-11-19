document.getElementById('loadData').addEventListener('click', () => {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('dataContainer');
            container.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error('Error fetching data:', error));
});
