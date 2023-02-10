const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cluster = require('cluster');
const worker = require('os').cpus().length;
const compression = require('compression');
const path = require('path');
app.use(compression());
const _app_folder = path.join(process.cwd(), '.');

app.get('*.*', express.static(_app_folder, { maxAge: '1y' }));
app.all('*', function (req, res) {
	res.status(200).sendFile(`/`, { root: _app_folder });
});
if (cluster.isPrimary) {
	let exitWorker = {};
	for (let i = 1; i <= worker; i++) {
		cluster.fork();
		cluster.on('exit', (worker, code, signal) => {
			console.info(`[worker ${worker.process.pid}] died`);
			if (code == 96) {
				exitWorker[worker.process.pid] = true;
				if (exitWorker.length == worker) {
					process.exit(69);
				}
			}
		});
	}
} else {
	app.listen(PORT, () =>
		console.log(`Server running ${PORT} pid ${process.pid} worker ${cluster.worker.id}`)
	);
}

// Export the Express API
module.exports = app;
