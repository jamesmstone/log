const Octokit = require("@octokit/rest"),
    owner = 'jamesmstone',
    repo = 'log';

module.exports = (req, response) => {


    try {
        const octokit = new Octokit({auth: process.env['GITHUB_TOKEN']});

        let path = 'data/requests.json';
        return octokit.repos.getContents({
            owner,
            repo,
            path
        }).then(result => {
            let buff = Buffer.from(result.data.content, 'base64');
            let requestsRaw = buff.toString('utf-8');
            let requestsJson = JSON.parse(requestsRaw);
            let message = 'Updated requests';
            let content = '';
            let sha = result.data.sha;
            requestsJson.requests.push({body: req.body, query: req.query});
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
            }).then(result => {
                response.json({
                    statusCode: 200,
                    body: '{"success":"true"}'
                })
            }).catch(console.error)
        }).catch(console.error);


    } catch (err) {
        response.json({statusCode: 500, body: err.toString()});
    }

};
