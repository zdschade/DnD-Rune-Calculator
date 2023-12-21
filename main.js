const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const points = [[3, 9], [7.5, 6], [10, 1.5], [9, -4], [5.5, -8.5], [0, -10], [-5.5, -8.5], [-9, -4], [-10, 1.5], [-7.5, 6], [-3, 9]];
console.log(points);
const schools = ["abjuration", "conjuration", "divination", "enchantment", "evocation", "illusion", "necromancy", "transmutation"]

const damages = ["acid", "bludgeoning", "cold", "fire", "force", "lightning", "necrotic", "piercing", "poison", "psychic", "radiant", "slashing", "thunder"]

const areas = ["single", "multi", "self", "circle", "square", "line", "cone", "sphere", "cube", "wall"]

const ranges = ["5", "30", "60", "90", "120", "150", "300", "500", "1000", "1m", "radius", "line", "cone", "self", "sight", "touch", ]

function convertPoints(point) {
    //console.log("yer")
    //console.log("Point object: " + point);
    var x = point[0];
    var y = point[1];

    //console.log("Before conversion: " + x + ", " + y);

    var x1 = ((200 * (x/10)))+200;
    var y1 = ((200 * (y/10))*-1)+190;

    //console.log("Converted points: " + x1 + ", " + y1)

    return [x1, y1];
};

function convertBinary(num) {
    console.log("original number: " + num);
    var bin = num.toString(2);

    while (bin.length < 10) {
        bin = "0" + bin;
    }

    return bin
}

function drawLine(point1, point2, color="black") {
    var point1F = convertPoints(point1);
    var point2F = convertPoints(point2);

    //console.log("Final points:");
    //console.log(point1F);
    //console.log(point2F);

    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(point1F[0], point1F[1]);
    ctx.lineTo(point2F[0], point2F[1]);
    ctx.stroke();
};

function drawOutline() {
    for (let i=0; i<points.length-1; i++) {
        var j = i+1;

        var point1 = (points[i]);
        var point2 = (points[j]);

        drawLine(point1, point2);

        if (j == (points.length)-1) {
            point1 = (points[j]);
            point2 = (points[0]);
            drawLine(point1, point2);
        };
    };
};

function glyphPiece(index, k, color) {
    var ind = convertBinary(index);
    console.log("Binary number: " + ind);
    var indr = ind.split("").reverse().join(""); //reverse binary number

    //console.log(points);

    var f = 0;

    for (i=0; i<(indr.length-1); i++) {
        if (indr[i] === "1") {
            //console.log("F value: " + f);
            //console.log("K value: " + k);

            if (f === 0) {
                var location = points[f];
            } else {
                var location = points[points.length + f];
            }
            var locationK = points[points.length + f + k]

            //console.log("l+f+k=" + (points.length + f + k));

            if (points.length + f + k > points.length-1) {
                //console.log("Not Fuck");
                locationK = points[points.length + f + k - points.length];
            } else {
                //console.log("Fuck")
            }

            //console.log("Points at f: ");
            //console.log(location);
            //console.log("Points at f+k: ")
            //console.log(locationK);

            drawLine(location, locationK, color);
        };
        f = f - 1;
    };
}

function plotGlyph(level, school, damage, area, range) {
    var schoolI = schools.indexOf(school);
    var damageI = damages.indexOf(damage);
    var areaI = areas.indexOf(area);
    var rangeI = ranges.indexOf(range);

    console.log("Plotting level")
    glyphPiece(level+1, 1, "red");
    console.log("Plotting school")
    glyphPiece(schoolI, 2, "green");
    console.log("Plotting damage")
    glyphPiece(damageI, 3, "blue");
    console.log("Plotting area")
    glyphPiece(areaI, 4, "purple");
    console.log("Plotting range")
    glyphPiece(rangeI, 5, "orange");
}

// ----------------------------------------------------------------

var levelInput = document.getElementById("level")

var schoolsDropdown = document.getElementById("schools");
var damagesDropdown = document.getElementById("damages");
var areasDropdown = document.getElementById("areas");
var rangesDropdown = document.getElementById("ranges");

var isGlyphDrawn = false;

drawOutline();

function drawGlyph() {
    var selectedSchool = schoolsDropdown.value;
    var selectedDamages = damagesDropdown.value;
    var selectedAreas = areasDropdown.value;
    var selectedRanges = rangesDropdown.value.toString();

    console.log("Selected school: " + selectedSchool);
    console.log("Selected damages: " + selectedDamages);
    console.log("Selected areas: " + selectedAreas);
    console.log("Selected ranges: " + selectedRanges);

    var selectedLevel = parseInt(levelInput.value);

    var selectedSchoolText = schoolsDropdown.options[schoolsDropdown.selectedIndex].text;
    var selectedDamagesText = damagesDropdown.options[damagesDropdown.selectedIndex].text;
    var selectedAreasText = areasDropdown.options[areasDropdown.selectedIndex].text;
    var selectedRangesText = rangesDropdown.options[rangesDropdown.selectedIndex].text;

    if (isGlyphDrawn) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
        isGlyphDrawn = true;
    }

    plotGlyph(selectedLevel, selectedSchool, selectedDamages, selectedAreas, selectedRanges);
}