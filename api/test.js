const { execSync } = require('child_process');

function run() {

   return  execSync('git status', (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            console.error(err)
            return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });

}
module.exports = (req, res) => {
    res.json({
        body: req.body,
        query: req.query,
        cookies: req.cookies,
        command: run()
    })
}