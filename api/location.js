import {updateFile} from "./_updateFile";

module.exports = (req, response) => {
    updateFile('data/locations.json', (oldContent => {
        let json = JSON.parse(oldContent);
        json.locations.push({...JSON.parse(req.body)});
        return JSON.stringify(json)
    })).then(() => {
        response.json({success: true})
    }).catch((error) => {
        response.status(400);
        response.json({success: false, error: error})

    })


};
