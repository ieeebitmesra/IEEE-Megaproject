export default async function addVenue(venue, type, id) {
	try {
		const newVenue = await fetch(
			`/api/venue/${type}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ venue: {...venue, id} }),
			}
		);
		const res = await newVenue.json();
		return res.ok;
	} catch (err) {
		console.log(err);
		return false;
	}
}

export async function deleteVenue(type, id) {
	try {
		const newVenue = await fetch(
			`/api/venue/${type}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ type, id}),
			}
		);
		const res = await newVenue.json();
		return res.ok;
	} catch (err) {
		console.log(err);
		return false;
	}
}
