const fetch = require('node-fetch');
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

export function fetchAircraft(flightNum: string): Promise<object> {
	const url = `http://api.aviationstack.com/v1/flights?access_key=0341f5c9d3ef986327b8a0c3a3443446&flight_iata=sq24${flightNum}`;
	return fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) =>
			data.data
				.map((flight) => flight.aircraft.iata)
				.catch((error) => {
					console.error('There has been a problem with your fetch operation:', error);
				})
		);
}

rl.question('Enter flight number: ', (flightNum) => {
	fetchAircraft(flightNum).then((iataCodes) => {
		console.log('Aircraft IATA Codes:', iataCodes);
		rl.close();
	});
});
