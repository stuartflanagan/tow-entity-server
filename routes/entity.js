var express = require('express');
var router = express.Router();
var lodash = require('lodash');
/*
 * GET entity collection.
 */
router.get('/entity.json', function(req, res) {
    var db = req.db;

    var query =  lodash.omit(req.query, 'limit','offset','cursor');
    var limit   = +req.query.limit  || 9;
    var offset  = +req.query.offset || 0;
    var cursor  = req.query.cursor  || 0;

    db.collection('entity').find(query).limit(limit).skip(offset).toArray(function (err, items) {
        res.json(items);
    });
});

/*
 * POST entity.
 */
router.post('/entity.json', function(req, res) {
    var db = req.db;
    db.collection('entity').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * GET entity.
 */
router.get('/entity/:id.json', function(req, res) {
    var db = req.db;
    var entityId = req.params.id;
    db.collection('entity').findById(entityId, function(err, result) {
        if(result !== null){
            res.json(result);
        } else {
            res.status(404).send({ msg: "Not found" });
        }
    });
});

/*
 * UPDATE entity.
 */
router.put('/entity/:id.json', function(req, res) {
    var db = req.db;
    var entityId = req.params.id;
    db.collection('entity').updateById(entityId, req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE entity.
 */
router.delete('/entity/:id.json', function(req, res) {
    var db = req.db;
    var entityId = req.params.id;
    db.collection('entity').removeById(entityId, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;