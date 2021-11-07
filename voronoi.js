const numOfPoints = 4;
const widthOfCanvas = canvas.width = 500;
const heightOfCanvas = canvas.height = 500;

const ctx = canvas.getContext('2d')
ctx.fillStyle = 'red'

//Main loop
const arrOfPoints = generatePoints(numOfPoints)
const arrOfFoci = []
const arrOfParabolas = []
arrOfPoints.sort(function (a, b) {
    return a.y - b.y})

generateSweepLine()

function generateSweepLine(y = 0, index = 0) {
    ctx.clearRect(0,0,widthOfCanvas,heightOfCanvas)
    arrOfPoints.forEach(element => {
        circle(element.x,element.y,2)
    })
    arrOfFoci.forEach(element =>  drawParabola(y,element))
 

    if(y === heightOfCanvas || index === arrOfPoints.length) {return}

    if (y !== arrOfPoints[index].y) {y++} else {
        arrOfFoci[index] = arrOfPoints[index]
        index++
    }
    
    ctx.strokeStyle = '#112233';
    ctx.moveTo(0,y);
    ctx.lineTo(widthOfCanvas,y);
    ctx.stroke();
    setTimeout(() => generateSweepLine(y,index),10)
    // setTimeout(generateSweepLine.bind(null,x,index),10)    
    // debugger;
}

function generatePoints(nPoints) {
    const arrOfPoints = []

    for (let i = 0; i < nPoints; i++) {
        const x = Math.floor(Math.random() * widthOfCanvas)
        const y = Math.floor(Math.random() * heightOfCanvas)

        arrOfPoints.push(new Point(x,y));
    }
    return arrOfPoints;
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function slopeOfTangent(x,y) {
    const m = ((4*x) + Math.sqrt(Math.abs((-4*x) - (16 * y))))/2
    const negativeM = ((4*x) - Math.sqrt(Math.abs((-4*x) - (16 * y))))/2
    // console.log("X", x, "Y", y)
    // console.log("slope", m, "negSlope", negativeM)
    return [m,negativeM]
}

function drawParabola(directrix, Point) {
        if(Point.y === directrix) {return}
        const a = (1 / (2 * (Point.y - directrix )))
        const b = (.5 * (Point.y + directrix))
        const xStart = Math.sqrt(Math.abs((0 - b) / a)) + Point.x
        const xEnd = Point.x - Math.abs(xStart - Point.x)
        // console.log("xStart:" , xStart, "xEnd", xEnd, "Focus" , Point.x, "/", Point.y)


        const slopeLeft = slopeOfTangent(xEnd, 0)
        const slopeRight = slopeOfTangent(xStart,0)
        // console.log("Slope left:", slopeLeft, "Slope right:", slopeRight)
        const intersection = slopeLeft[0] * (xStart - xEnd)
        console.log("Start:", xStart, "End", xEnd, "SlopeLeft", slopeLeft[0])
        console.log("Y:", 0, "X:", intersection)     

        ctx.moveTo(xStart,0)
        // ctx.quadraticCurveTo(Point.x,Point.y,xEnd,0)        
        // ctx.quadraticCurveTo(,,xEnd,0)
}

function circle(x,y,r) {
    ctx.beginPath()
    ctx.arc(x,y,r,0,7)
    ctx.closePath()
    ctx.fill()
}

//The control point for a quadratic curve is the intersection point of the tangents.
//The equation of the parabola with focus (a,b) and directrix y=c is (x−a)^2+b2−c2=2(b−c)y  
//Midpoint formula - (x, y) = [(x1 + x2)/2, (y1 + y2)/2]


/*


//Vertex should be a point, not a half point



Gather the foci
For each foci generate a parabola
Calculate the current vertex, and calculate the point on the parabola where y = 0 , and plot bezier curve as (Vx,Vy),(Sx,Sy)(Ex,Ey)


*/