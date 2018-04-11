let getRoutes = {};
let postRoutes = {};
let patchRoutes = {};

let methodRoutes = {
	'get': getRoutes,
	'post': postRoutes,
	'patch': patchRoutes
}

const get = (path, handler) => { getRoutes[path] = handler }
const post = (path, handler) => { postRoutes[path] = handler }
const patch = (path, handler) => { patchRoutes[path] = handler }

const execute = (req, res) => {
	console.log('Request received ', req.method)
	let router = methodRoutes[req.method.toLowerCase()];
	let handler = undefined;

	if(router) {
		handler = router[req.url.toLowerCase()];
	}

	if(handler) {
		handler(req, res);
	} else {
		res.writeHead(404);
		res.end('page not found..!');
	}
}

module.exports = {
	get,
	post,
	patch,
	execute
}