import {updateFile} from "./_updateFile";

module.exports = (req, response) => {
    try {
        let data = []
        req.on('data', chunk => {
            data.push(chunk)
        })
        req.on('end', () => {
            const body = JSON.parse(data)
            updateFile('data/locations.json', (oldContent => {
                let json = JSON.parse(oldContent);
                json.locations.push(body);
                return JSON.stringify(json)
            })).then(() => {
                response.json({success: true})
            }).catch((error) => {
                response.status(400);
                response.json({success: false, error: error})

            })
        })


    } catch (e) {
        console.error(e, req)
        response.status(400);
        response.json({success: false, error: e})
    }


};
