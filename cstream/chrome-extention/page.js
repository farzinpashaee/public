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
            
            let news = `<div class="row flex-nowrap overflow-auto py-2">`;
            data.channels.forEach(channel => {

                news += `<div class="col-2">
                        <a target="_blank" href="${channel.sources[0].link}"><img src="${channel.image}" class="channel-image img-fluid" alt="${channel.name}"></a>
                        <div class="card-body text-center p-2">
                            <h5 class="card-title text-sm mb-0">${channel.name}</h5>
                        </div>
                    </div>`;
            });
            news += `</div>`;


            container.innerHTML = `
                <div class="container-fluid">
                    <div id="channels-container" class="channels-row">
                        ${news}
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