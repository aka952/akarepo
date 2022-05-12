const axios = require('axios').default;
require('dotenv').config();

let gistController = {};

gistController.getGistsForUser = async function (req, res) {
    const { username } = req.body;
    try {
        let result = await axios.get(`${process.env.GIT_URL}users/${username}/gists`);
        if (result) {
            res.status(200).json({data: result['data'].map(obj => obj.files) })
        }
        else {
            res.status(404).json({ res: "No data found" })
        }
    }
    catch (err) {
        console.log(err);
    }

}

gistController.getGistsById = async function (req, res) {
    const { gistId } = req.body;

    try {
        let result = await axios.get(`${process.env.GIT_URL}gists/${gistId}`);
        let data = [];

        if (result) {
            data.push(result['data']['files']);
            res.status(200).json({data: data, msg: "Retrived Successfully"})
        }
        else {
            res.status(404).json({ res: "No data found" });
        }
    }
    catch (err) {
        console.log(err);
    }
}

gistController.markAsFavourite = async function (req, res) {

    const { gistId } = req.body;

    try {

        let result = await axios.put(`${process.env.GIT_URL}gists/${gistId}/star`, {}, { headers: { 'Content-Length': 0, 'Authorization': process.env.AUTH_TOKEN } });
        if (result) {
            res.status(200).json({data: result['status'], msg:"Marked as starred"});
        }
        else {
            res.status(404).json({ res: "No data found" });
        }
    }
    catch (err) {
        console.log(err);
    }
}

gistController.unMarkFavourite = async function (req, res) {
    const { gistId } = req.body;

    try {
        let result = await axios.delete(`${process.env.GIT_URL}gists/${gistId}/star`, { headers: { 'Authorization': process.env.AUTH_TOKEN } });

        if (result) {
            console.log(result);
            res.status(200).json({result: result['status'], msg: "Unstarred Succesfull"});
        }
        else {
            res.status(404).json({ res: "No data found" });
        }
    }
    catch (err) {
        console.log(err);
    }
}

gistController.getFavourites = async function (req, res) {
    try {
        let result = await axios.get(`${process.env.GIT_URL}gists/starred`, { headers: { 'Authorization': process.env.AUTH_TOKEN } });
        if (result && result['data'].length > 0) {
            console.log(result['data'].length);
            res.status(200).json({data:result['data'].map(obj => obj.files)})
        }
        else {
            res.status(404).json({msg: 'No data found'});
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = gistController;