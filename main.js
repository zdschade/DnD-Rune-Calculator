const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const points = [[3, 9], [7.5, 6], [10, 1.5], [9, -4], [5.5, -8.5], [0, -10], [-5.5, -8.5], [-9, -4], [-10, 1.5], [-7.5, 6], [-3, 9]];
console.log(points);
const schools = ["abjuration", "conjuration", "divination", "enchantment", "evocation", "illusion", "necromancy", "transmutation"]

const damages = ["acid", "bludgeoning", "cold", "fire", "force", "lightning", "necrotic", "piercing", "poison", "psychic", "radiant", "slashing", "thunder"]

const areas = ["none", "single", "multi", "self", "circle", "square", "line", "cone", "sphere", "cube", "wall"]

const ranges = ["none", "5", "30", "60", "90", "120", "150", "300", "500", "1000", "1m", "radius", "line", "cone", "self", "sight", "touch", ]

function convertPoints(point) {
    //console.log("yer")
    //console.log("Point object: " + point);
    var x = point[0];
    var y = point[1];

    //console.log("Before conversion: " + x + ", " + y);

    var height = canvas.height
    var width = canvas.width

    glyphHeight = (height/2) - 20
    glyphWidth = (width/2) - 20

    var x1 = ((glyphHeight * (x/10))) + height/2;
    var y1 = ((glyphWidth * (y/10))*-1) + ((height/2)-10);

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

function updateBinary(level, school, damage, area, range) {
    document.getElementById("level-details").innerHTML = "Level: " + convertBinary(level) + " | K=1";
    document.getElementById("school-details").innerHTML = "School: " + convertBinary(school) + " | K=2";
    document.getElementById("damage-details").innerHTML = "Damage: " + convertBinary(damage) + " | K=3";
    document.getElementById("area-details").innerHTML = "Area: " + convertBinary(area) + " | K=4";
    document.getElementById("range-details").innerHTML = "Range: " + convertBinary(range) + " | K=5";
}

function drawLine(point1, point2, color="black") {
    var point1F = convertPoints(point1);
    var point2F = convertPoints(point2);

    //console.log("Final points:");
    //console.log(point1F);
    //console.log(point2F);

    const colorChoice = document.getElementById("color");
    console.log("colorChoice: " + colorChoice.value);

    if (colorChoice.checked) {
        ctx.strokeStyle = color;
    } else {
        ctx.strokeStyle = "black";
    }

    ctx.lineWidth = 4;

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

function drawPoints() {
    for (let i=0; i<points.length; i++) {

        var convertedPoint = convertPoints(points[i]);

        ctx.beginPath();
        ctx.arc(convertedPoint[0], convertedPoint[1], 7, 0, 2 * Math.PI);
        ctx.fill();
    };
}

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
    var schoolIndex = schools.indexOf(school);
    var damageIndex = damages.indexOf(damage);
    var areaIndex = areas.indexOf(area);
    var rangeIndex = ranges.indexOf(range);

    console.log("Plotting level")
    glyphPiece(level+1, 1, "red");
    console.log("Plotting school")
    glyphPiece(schoolIndex, 2, "green");
    console.log("Plotting damage")
    glyphPiece(damageIndex, 3, "blue");
    console.log("Plotting area")
    glyphPiece(areaIndex, 4, "purple");
    console.log("Plotting range")
    glyphPiece(rangeIndex, 5, "orange");

    updateBinary(level, schoolIndex, damageIndex, areaIndex, rangeIndex);
}

// ----------------------------------------------------------------

var levelInput = document.getElementById("level")

var schoolsDropdown = document.getElementById("schools");
var damagesDropdown = document.getElementById("damages");
var areasDropdown = document.getElementById("areas");
var rangesDropdown = document.getElementById("ranges");

var isGlyphDrawn = false;

drawPoints(); // Set up the glyph format

function showDetails() {
    if (document.getElementById("details").checked) {
        document.getElementById("details-block").style.display = "inline";
    } else {
        document.getElementById("details-block").style.display = "none";
    }
    return
}

function colorAttributes() {
    if (document.getElementById("color").checked) {
        document.getElementById("level").style.color = "red";
        document.getElementById("schools").style.color = "green";
        document.getElementById("damages").style.color = "blue";
        document.getElementById("areas").style.color = "purple";
        document.getElementById("ranges").style.color = "orange";
    } else {
        document.getElementById("level").style.color = "black";
        document.getElementById("schools").style.color = "black";
        document.getElementById("damages").style.color = "black";
        document.getElementById("areas").style.color = "black";
        document.getElementById("ranges").style.color = "black";
    }
    return
}


function drawGlyph() {    
    var selectedLevel = parseInt(levelInput.value);
    var selectedSchool = schoolsDropdown.value;
    var selectedDamages = damagesDropdown.value;
    var selectedAreas = areasDropdown.value;
    var selectedRanges = rangesDropdown.value.toString();

    console.log("Selected level: " + selectedLevel);
    
    console.log("Selected school: " + selectedSchool);
    console.log("Selected damages: " + selectedDamages);
    console.log("Selected areas: " + selectedAreas);
    console.log("Selected ranges: " + selectedRanges);
    
    if (selectedLevel === NaN ||
        selectedLevel > 9 ||
        selectedSchool === "School of Magic" ||
        selectedDamages === "Damage type" ||
        selectedAreas === "Area of Effect" ||
        selectedRanges === "Range") 
        {
            alert("Please select a valid level, school, damage type, area of effect, and range.\nLevel must be a number between 0 and 9. Cantrips are level 0.");
            return;
        }

    if (isGlyphDrawn) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPoints();
    } else {
        isGlyphDrawn = true;
    }

    plotGlyph(selectedLevel, selectedSchool, selectedDamages, selectedAreas, selectedRanges);
    drawPoints();
}