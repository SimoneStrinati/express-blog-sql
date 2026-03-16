function errorHandler(err, req, res, next) {

    // console.error(req.method, req.originalUrl, err.message )
    
    res.status(500).json({ error: "The website cannot display the page" })

}

module.exports = errorHandler;