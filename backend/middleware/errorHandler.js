const errorHandler = (error, req, res, next) => {
    console.log(`[ERROR]:: ${error}`);
    res.status(500).send({success:false, errorMessage: "Internal server error!" });
};

module.exports = errorHandler;
