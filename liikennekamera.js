document.addEventListener('DOMContentLoaded', () => {
    const cameraContent = document.getElementById('camera-content');
    
    fetch('https://tie.digitraffic.fi/api/weathercam/v1/stations/C01508/data')
        .then(response => response.json())
        .then(data => {
            console.log('API Data:', data); 
            
            let cameraImages = '';

            if (data.presets && Array.isArray(data.presets)) {
                data.presets.forEach(preset => {
                    console.log('Preset:', preset); 
                    
                    const imageUrl = `https://weathercam.digitraffic.fi/${preset.id}.jpg`;
                    const timestamp = new Date(preset.measuredTime).toLocaleString('fi-FI');

                    if (imageUrl) {
                        cameraImages += `
                            <div class="camera-item">
                                <p>Kuva otettu: ${timestamp}</p>
                                <img src="${imageUrl}" alt="Liikennekameran kuva" loading="lazy">
                            </div>
                        `;
                    } else {
                        cameraImages += '<p>Kuvaa ei saatavilla.</p>';
                    }
                });

                cameraContent.innerHTML = cameraImages;
            } else {
                console.log('No presets available.');
                cameraContent.innerHTML = '<p>Ei kameradataa saatavilla.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            cameraContent.innerHTML = '<p>Tiedon haku epäonnistui.</p>';
        });
});
