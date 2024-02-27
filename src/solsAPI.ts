export interface solution {
	word: string;
	score: number;
	tags: string[];
}

export function fetchWords(theme: string): Promise<object> {
	const url = `https://api.datamuse.com/words?ml=${theme}`;
	return fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) =>
			data.map(
				(sol): solution => ({
					word: sol.word,
					score: sol.score,
					tags: sol.tags
				})
			)
		)
		.catch((error) => {
			console.error('There has been a problem with your fetch operation:', error);
		});
}

export function validateWord(sol: solution, wordLength: number): boolean {
	return sol.word.length === wordLength
}


