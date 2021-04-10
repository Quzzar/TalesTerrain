export default class River {
  constructor(heightMapData, unitSize, startPoint) {

    this.oceanHeight = 0.3;

    this.riverPoints = [];

    this.generate(heightMapData, unitSize, startPoint);

  }

  get points(){
    return this.riverPoints;
  }

  generate = (heightMapData, unitSize, currentPoint) => {

    let currentHeight = heightMapData[currentPoint.x][currentPoint.y];
    if(this.oceanHeight >= currentHeight) { return; }

    let surroundingPoints = [{x: currentPoint.x-unitSize, y: currentPoint.y},
                            {x: currentPoint.x+unitSize, y: currentPoint.y},
                            {x: currentPoint.x, y: currentPoint.y-unitSize},
                            {x: currentPoint.x, y: currentPoint.y+unitSize}];

    let lowestPoint = currentPoint;
    for(let point of surroundingPoints){
      let height;
      try{
        height = heightMapData[point.x][point.y];
      } catch(err){ continue; }
      if(heightMapData[lowestPoint.x][lowestPoint.y] > height){
        lowestPoint = point;
      }
    }

    if(lowestPoint != currentPoint){
      this.riverPoints.push(lowestPoint);
      this.generate(heightMapData, unitSize, lowestPoint);
    } else {
      /*
      console.log('Current Height: '+currentHeight);
      for(let point of surroundingPoints){
        let height;
        try{
          height = heightMapData[point.x][point.y];
        } catch(err){ continue; }
        console.log('H: '+(height-currentHeight));
      }
      */
    }

  }

  setColor = (imgData, colorFill, unitSize, canvasId) => {
    //console.log('Coloring River Points: '+this.riverPoints.length);
    for(const point of this.riverPoints){
      setColor(imgData, colorFill, point.x, point.y, unitSize, canvasId);
    }
  }

}