const dataModel = require('../models/dataModel');

const getData = (req, res) => {
    const data = dataModel.fetchData();
    res.json(data);
};

module.exports = {
    getData
};
