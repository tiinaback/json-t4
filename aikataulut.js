document.addEventListener('DOMContentLoaded', () => {
    const trainBody = document.getElementById('train-body');
    
    fetch('https://rata.digitraffic.fi/api/v1/live-trains/station/HKI?departing_trains=100&include_nonstopping=false')
        .then(response => response.json())
        .then(data => {
            let trainRows = '';
            data.forEach(train => {
                const trainNumber = `${train.trainType} ${train.trainNumber}`;
                const departureStation = train.timeTableRows[0].stationShortCode;
                const destinationStation = train.timeTableRows[train.timeTableRows.length - 1].stationShortCode;
                const route = `${departureStation} → ${destinationStation}`;
                const departureTime = new Date(train.timeTableRows[0].scheduledTime).toLocaleString('fi-FI');
                const category = train.trainCategory;

                trainRows += `
                    <tr>
                        <td>${trainNumber}</td>
                        <td>${route}</td>
                        <td>${departureTime}</td>
                        <td>${category}</td>
                    </tr>
                `;
            });
            trainBody.innerHTML = trainRows;
        })
        .catch(error => {
            console.error('Error fetching train data:', error);
            trainBody.innerHTML = '<tr><td colspan="4">Tiedon haku epäonnistui.</td></tr>';
        });
});
