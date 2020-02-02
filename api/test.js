import {updateFile} from "./_updateFile";

module.exports = (req, response) => {
    updateFile('data/requests.json', (oldContent => {
        let requestsJson = JSON.parse(oldContent);
        requestsJson.requests.push({body: req.body, query: req.query});
        return JSON.stringify(requestsJson)
    })).then(() => {
        response.json({success: true})
    }).catch((error) => {
        response.status(400);
        response.json({success: false, error: error})
    })
};
