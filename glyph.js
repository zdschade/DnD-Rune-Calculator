const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const points = [(3, 9), (7.5, 6), (10, 1.5), (9, -4), (5.5, -8.5), (0, -10), (-5.5, -8.5), (-9, -4), (-10, 1.5), (-7.5, 6), (-3, 9)];

const schools = ["abjuration", "conjuration", "divination", "enchantment", "evocation", "illusion", "necromancy", "transmutation"]

const damages = ["acid", "bludgeoning", "cold", "fire", "force", "lightning", "necrotic", "piercing", "poison", "psychic", "radiant", "slashing", "thunder"]

const areas = ["single", "multi", "self", "circle", "square", "line", "cone", "sphere", "cube", "wall"]

const ranges = ["5", "30", "60", "90", "120", "150", "300", "500", "1000", "1m", "radius", "line", "cone", "self", "sight", "touch", ]

function convertPoints(point) {
    var x = point[0];
    var y = point[1];

    var x1 = x/10;
    var y2 = y/10;

    return (x1, y1);
};

function convertBinary(num) {
    var bin = num.toString(2);

    while (bin.length < 10) {
        bin = "0" + bin;
    }

    return bin
}

function drawLine(point1, point2, color) {
    var point1F = convertPoints(point1);
    var point2F = convertPoints(point2);

    ctx.beginPath();
    ctx.moveTo(point1F[0], point1F[1]);
    ctx.lineTo(point2F[0], point2F[1]);
    ctx.stroke();
};

function drawOutline() {
    for (let i=0; i<points.length; i++) {
        var j = i+1;

        var x = (points[i][0], points[j][0]);
        var y = (points[i][1], points[j][1]);

        drawLine(x, y);

        if (j == (points.length)-1) {
            var x = (points[j][0], points[0][0]);
            var y = (points[j][1], points[0][1]);
            drawLine(x, y);
        };
    };
};

function glyphPiece(index, k,) {
    var ind = convertBinary(index);
    var indr = ind.split("").reverse().join(""); //reverse binary number

    var f = 0;

    for (i=0; i<indr.length; i++) {
        if (indr[i] === "1") {
            drawLine(points[f], points[f+k]);
        };
        f = f - 1;
    };
}

function plotGlyph(level, school, damage, area, range) {
    var schoolI = schools.findIndex(school);
    var damageI = damages.findIndex(damage);
    var areaI = areas.findIndex(area);
    var rangeI = areas.findIndex(range);

    glyphPiece(level+1, 1);
    glyphPiece(school, 2);
    glyphPiece(damage, 3);
    glyphPiece(area, 4);
    glyphPiece(range, 5);
}