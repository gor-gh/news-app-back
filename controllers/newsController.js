const News = require('../models/news');
const TOKEN_FOR_NEWS_CREATION = "5sCt6DC21FaHvT4vWYxo";
const { authenticate } = require('./tokensController');
module.exports = {
    createNews: (req, res) => {
        const { token } = req.headers;
        const body = req.body;
        const sourceUrl = body.sourceUrl ? body.sourceUrl : null;
        const imgUrl = body.imgUrl ? body.imgUrl : null;
        const author = body.author ? body.author : null;
        const title = body.title ? body.title : null;
        const description = body.description ? body.description : null;
        const content = body.content ? body.content : null;
        const category = body.category ? body.category : null;

        if (token) {
            if (token === TOKEN_FOR_NEWS_CREATION) {
                if (imgUrl && title && content && category) {
                    const newNewsItem = {
                        sourceUrl,
                        imgUrl,
                        author,
                        title,
                        description,
                        content,
                        category
                    };
                    News.create(newNewsItem)
                        .then(news => res.send("News created successfully"))
                        .catch(err => {
                            console.log(err);
                            res.status(500).send("Can't create the news")
                        });
                } else {
                    res.status(400).send("Missing required fields");
                }
            }
            else {
                res.status(401).send("Token is invalid");
            }
        } else {
            res.status(401).send("No token specified");
        }
    },
    getAllNewses: (req, res) => {
        const { token } = req.headers;
        if (token) {
            authenticate(token)
                .then(() => {
                    News.find({}, (err, newses) => {
                        if (err) res.status(500).send("Can't load newses")
                        else res.json(newses);
                    })
                })
                .catch(err => res.status(401).send("Invalid token."))

        } else {
            console.log('stexa')
            res.status(401).send("Token is not specified.")
        }
    },
    getNewsCategories: (req, res) => {
        const { token } = req.headers;
        authenticate(token)
            .then(() => {
                News.find({}, (err, newses) => {
                    if (err) res.status(500).send("Can'y get categories")
                    else {
                        const allCategories = newses.map(news => news.category);
                        const allCategoriesUniqueSet = new Set(allCategories);
                        const allCategoriesUnique = Array.from(allCategoriesUniqueSet);
                        res.json(allCategoriesUnique);
                    }
                })
            })
            .catch(err => res.status(401).send("Invalid token."))
    }
}