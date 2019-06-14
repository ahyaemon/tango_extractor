import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

if (dev) {
	const https = require('https');
	const url = "https://tango-extractor.herokuapp.com/";
	const interval = 1000 * 60 * 15;
	setInterval(() => {
		const req = https.request(url, (res) => {
			console.log("IT IS SA");
		});
		req.end();
	}, interval);
}

polka()
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
