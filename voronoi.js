const numOfPoints = 40;
const widthOfCanvas = canvas.width = 500;
const heightOfCanvas = canvas.height = 500;

const ctx = canvas.getContext('2d')
ctx.fillStyle = 'red'

//Main loop
const arrOfPoints = generatePoints(numOfPoints)
arrOfPoints.sort(function (a, b) {
    return a.y - b.y;
});
// arrOfPoints.forEach(element => {console.log("This is the arrOfPoints" , element)})

generateSweepLine()

function generateSweepLine(y = 0, index = 0) {
    ctx.clearRect(0,0,widthOfCanvas,heightOfCanvas)
    arrOfPoints.forEach(element => {
        circle(element.x,element.y,2)
    })

    if(y === heightOfCanvas || index === arrOfPoints.length) {return}

    if (y !== arrOfPoints[index].y) {y++} else {
        parabola(y, arrOfPoints[index])
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

function circle(x,y,r) {
    ctx.beginPath()
    ctx.arc(x,y,r,0,7)
    ctx.closePath()
    ctx.fill()
}

//The control point for a quadratic curve is the intersection point of the tangents.
function parabola(directrix, Point){
    this.directrix = directrix;
    this.Point = Point;
    console.log("directrix:", directrix, "point", Point)
    for( x=0; x < heightOfCanvas; x++) {
        // const y = ((x-this.Point.x)**2 + (this.Point.y)**2 - directrix) / (2*this.Point.y*directrix)

        const y = .5 * (this.Point.y - directrix) * (x - this.Point.x)**2 + .5 * (this.Point.y + directrix) 
        circle(x,y,10)
        //You need to solve for x, not just use the x asis/for loop
    }
// //The equation of the parabola with focus (a,b) and directrix y=c is (x−a)^2+b2−c2=2(b−c)y  
}