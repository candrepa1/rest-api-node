const axios = require("axios");
const express = require("express");
const api = express();

api.get("/", (req, res) => {
	res.send(
		"This API has two endpoints: '/hello' that returns 'Hello world' and '/show' that returns a random show name so you can finally decide what to watch :)"
	);
});

api.get("/hello", (req, res) => {
	res.send("Hello world");
});

api.get("/show", async (req, res) => {
	const showId = Math.floor(Math.random() * 5000) + 1;

	try {
		const { data } = await axios.get(`https://api.tvmaze.com/shows/${showId}`);
		if (data) {
			const hasSite = data.officialSite
				? `<a href=${data.officialSite} target='_blank'>You can find it here</a>`
				: "";

			res.send(`The show I recommend is: <b>${data.name}</b>. ${hasSite}`);
		}
	} catch (error) {
		console.error(error);
	}
});

const listener = api.listen(process.env.PORT || 3000, () =>
	console.log(`API listening on port ${listener.address().port}`)
);

module.exports = listener;
