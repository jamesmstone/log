const Octokit = require("@octokit/rest"),
    owner = 'jamesmstone',
    repo = 'log';


export const updateFile = (path, updater) => {
    return new Promise((resolveAll, rejectAll) => {
        const octokit = new Octokit({auth: process.env['GITHUB_TOKEN']});

        octokit.repos.getContents({
            owner,
            repo,
            path
        }).then(result => {
            let buff = Buffer.from(result.data.content, 'base64');
            let requestsRaw = buff.toString('utf-8');

            const newContent = updater(requestsRaw)
            let message = 'Updated from a request';
            let content = '';
            let sha = result.data.sha;
            buff = Buffer.from(newContent);
            content = buff.toString('base64');
            return octokit.repos.createOrUpdateFile({
                owner,
                repo,
                path,
                message,
                content,
                sha
            }).then(result => {
                resolveAll()
            }).catch(rejectAll)
        }).catch(rejectAll);


    })
}
