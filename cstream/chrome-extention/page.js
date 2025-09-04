document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('data-content');
    const statusElement = document.getElementById('status');

    const timestamp = Date.now();
    const apiUrl = 'https://raw.githubusercontent.com/farzinpashaee/public/refs/heads/main/cstream/data/json/repository.json?timestamp=' + timestamp;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            statusElement.textContent = 'Data loaded successfully!';
            statusElement.classList.add('text-green-600');
            
            // Display the fetched data
            

            container.innerHTML = `
                <div class="container-fluid py-4">
                    <div class="movie-row">
                        <h2>${data.name}</h2>
                    </div>
                </div>
            `;           
        })
        .catch(error => {
            console.error('Fetch error:', error);
            statusElement.textContent = 'Failed to load data. Check the console for details.';
            statusElement.classList.remove('text-green-600');
            statusElement.classList.add('text-red-600');
        });
});