const ctx = canvas.getContext('2d')
ctx.beginPath();
ctx.strokeStyle = 'orange';
for(i=-2;i<=2;i++) {
  // Current point
  x1 = i;        
  y1 = x1 * x1;
  y1p = 2 * x1; // derivitive

  // Previous point
  x0 = i - 1;
  y0 = x0 * x0;
  y0p = 2 * x0; // derivitive

  // Find intersection of tangents
  // line0: y - y0 = y0p * (x - x0)
  // line1: y - y1 = y1p * (x - x1)
  //
  // line0: y = y0p * x - y0p * x0 + y0
  // line1: y = y1p * x - y1p * x1 + y1
  //
  // y0p * x - y0p * x0 + y0 = y1p * x - y1p * x1 + y1
  // y0p * x - y1p * x = y0p * x0 - y0 - y1p * x1 + y1
  // x = (y0p * x0 - y0 - y1p * x1 + y1) / (y0p - y1p)

  // Intersection point of tangents
  xi = (y0p * x0 - y0 - y1p * x1 + y1) / (y0p - y1p);
  yi = y0p * xi - y0p * x0 + y0;
  console.log("xi:", xi, "yi:", yi, "x1:", x1, "y1:", y1)
  // Rescale for rendering
  cx = (5 + x1) * 30;
  cy = (5 + y1) * 30;

  cix = (5 + xi) * 30;
  ciy = (5 + yi) * 30;

  if (i == -2) {
    ctx.moveTo(cx, cy);
  }
  else {
  ``
    ctx.quadraticCurveTo(cix, ciy, cx, cy);
  }
}
ctx.stroke();