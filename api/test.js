const { execSync } = require('child_process');

function run() {

    return execSync('ls');
}
module.exports = (req, res) => {
    res.json({
        body: req.body,
        query: req.query,
        cookies: req.cookies,
        command: run()
    })
}