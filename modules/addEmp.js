const addNewEmployee = (req, res) => {
	let emp = req.body;

	res.writeHead(201);
	res.end(`New employee ${emp.name} added...!`);
}

module.exports = addNewEmployee;