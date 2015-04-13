'use strict';

var inside = require('point-in-polygon');
var polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];

exports.isPointInPolygon = function(req, res) {
    var x = req.body.x;
    var y = req.body.y;

    if (!x || !y) {
        res.send(400);
    } else {
        var result = {
            result: inside([ x, y ], polygon)
        };
        res.send(result);
    }

};

