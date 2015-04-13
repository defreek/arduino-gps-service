'use strict';

var polyX = [ // X = Lon
    [ 4.039, 4.040, 4.040, 4.039 ], //1966
    [ 5.594, 5.595, 5.586, 5.586 ], //2
    [ 5.637, 5.637, 5.628, 5.628 ], //3
    [ 5.670, 5.670, 5.679, 5.678 ], //4
    [ 5.669, 5.669, 5.678, 5.677 ], //5
    [ 4.414, 4.415, 4.414, 4.413 ], //6
    [ 4.413, 4.412, 4.414, 4.415 ], //7
    [ 4.619, 4.619, 4.610, 4.610 ], //8
    [ 4.467, 4.468, 4.472, 4.471 ], //9
    [ 4.481, 4.480, 4.475, 4.476 ], //10
    [ 3.780, 3.780, 3.789, 3.788 ], //11
    [ 3.788, 3.788, 3.779, 3.780 ], //12
    [ 4.441, 4.442, 4.445, 4.444 ], //13
    [ 4.332, 4.331, 4.337, 4.338 ], //14
    [ 4.759, 4.758, 4.766, 4.767 ] //15
];

var polyY = [ // Y = Lat
    [ 50.978, 50.978, 50.977, 50.977 ], //1966
    [ 50.682, 50.681, 50.679, 50.679 ], //2
    [ 50.688, 50.687, 50.689, 50.690 ], //3
    [ 50.677, 50.678, 50.675, 50.674 ], //4
    [ 50.677, 50.678, 50.675, 50.675 ], //5
    [ 51.173, 51.173, 51.167, 51.167 ], //6
    [ 51.167, 51.167, 51.173, 51.172 ], //7
    [ 50.860, 50.860, 50.861, 50.861 ], //8
    [ 50.872, 50.872, 50.866, 50.866 ], //9
    [ 50.848, 50.848, 50.853, 50.853 ], //10
    [ 50.996, 50.997, 50.995, 50.994 ], //11
    [ 50.994, 50.994, 50.996, 50.997 ], //12
    [ 51.090, 51.090, 51.084, 51.084 ], //13
    [ 50.905, 50.906, 50.910, 50.910 ], //14
    [ 50.941, 50.941, 50.945, 50.944 ] //15
];

/**
 * Check if a point is inside a polygon
 */
function _isPointInPolygon(x, y) {
    var N;                      //check each row = each radar location
    var i, j = 3;
    var oddNodes = false;

    for ( N = 0; N < 20; N++ ) {  //check each row = each radar location
        for ( i = 0; i < 4; i++ ) {

          if ( (polyY[N][i] < y && polyY[N][j] >= y || polyY[N][j] < y && polyY[N][i] >= y) &&  (polyX[N][i] <= x || polyX[N][j] <= x) ) {
            oddNodes ^= ( polyX[N][i] + (y - polyY[N][i]) / (polyY[N][j] - polyY[N][i]) * (polyX[N][j] - polyX[N][i]) < x );
          }

          j = i;
        }
    }
    return oddNodes;
}

exports.isPointInPolygon = function(req, res) {
    var x = req.body.x;
    var y = req.body.y;

    if (!x || !y) {
        res.send(400);
    } else {
        var result = _isPointInPolygon(x, y);
        res.send(200, result);
    }

};

