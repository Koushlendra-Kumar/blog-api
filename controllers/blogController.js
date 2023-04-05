const BlogModel = require('../models/Blog');

exports.get_blogs = (req, res, next) => {
    res.status(200).json({msg: 'Not implemented yet!'})
}

exports.post_blog = (req, res, next) => {
    console.log(req.body);
    res.status(200).json({msg: 'Not implemented yet!'})
}

exports.delete_blog = (req, res, next) => {
    res.status(200).json({msg: 'Not implemented yet!'})
}

exports.update_blog = (req, res, next) => {
    res.status(200).json({msg: 'Not implemented yet!'})
}