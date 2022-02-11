require('dotenv').config({ path: 'variables.env' });

const limit_page = process.env.LIMIT_PAGE;

exports.paginatedResults = (model) => {
    return async (req, res, next) => {

        let page = parseInt(req.query.page);
        let title = req.query.title;
        let year = req.query.year;
        let _id = req.query._id;

        const limit = parseInt(limit_page);

        let skipIndex = (page - 1) * limit;
        skipIndex = !skipIndex ? 0 : skipIndex;

        try {
            const results = await model.find({$or:[{year:year}, {title:title}, {_id:_id}, {}
              ]}).setOptions({ sanitizeFilter: true })
                .sort({ _id: 1 })
                .limit(limit)
                .skip(skipIndex)
                .exec();
            res.paginatedResults = results;
            next();
        } catch (e) {
            res.status(500).send('Pelicula no encontrada');
        }
    };
};
