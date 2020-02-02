const Octokit = require("@octokit/rest"),
    owner = 'jamesmstone',
    repo = 'log';

module.exports = (req, res) => {


    try {
        const octokit = new Octokit({auth: process.env['github-token']});

        let path = 'data/requests.json';
        return octokit.repos.getContents({
            owner,
            repo,
            path
        }).then(res => {
            console.log(res);
            let buff = Buffer.from(res.data.content, 'base64');
            let requestsRaw = buff.toString('utf-8');
            let requestsJson = JSON.parse(requestsRaw);
            let message = 'Updated requests';
            let content = '';
            let sha = res.data.sha;
            requestsJson.requests.push(req);
            requestsRaw = JSON.stringify(requestsJson);
            buff = Buffer.from(requestsRaw);
            content = buff.toString('base64');
            return octokit.repos.createOrUpdateFile({
                owner,
                repo,
                path,
                message,
                content,
                sha
            }).then(res => {
                return {
                    statusCode: 200,
                    body: '{"success":"true"}'
                }
            })
        });


    } catch (err) {
        return {statusCode: 500, body: err.toString()};
    }

};
