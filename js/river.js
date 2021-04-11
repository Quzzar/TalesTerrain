export default class River {
  constructor(heightMapData, unitSize, startPoint) {

    this.oceanHeight = 0.3;

    this.riverPoints = [];
    this.lakePoints = [];

    this.generate(heightMapData, unitSize, startPoint);

  }

  get points(){
    return this.riverPoints;
  }

  get lake_points(){
    return this.lakePoints;
  }

  generate = (heightMapData, unitSize, currentPoint) => {

    let currentHeight = heightMapData[currentPoint.x][currentPoint.y];
    if(this.oceanHeight >= currentHeight) { return; }

    let surroundingPoints = [{x: currentPoint.x-unitSize, y: currentPoint.y},
                            {x: currentPoint.x+unitSize, y: currentPoint.y},
                            {x: currentPoint.x, y: currentPoint.y-unitSize},
                            {x: currentPoint.x, y: currentPoint.y+unitSize}];

    let lowestHeightNotCurrent = 1.00;
    let lowestPointNotCurrent = null;

    let lowestPoint = currentPoint;
    for(let point of surroundingPoints){
      let height;
      try{
        height = heightMapData[point.x][point.y];
      } catch(err){ continue; }
      if(heightMapData[lowestPoint.x][lowestPoint.y] > height){
        lowestPoint = point;
      }
      if(lowestHeightNotCurrent > height){
        lowestHeightNotCurrent = height;
        lowestPointNotCurrent = point;
      }
    }

    if(lowestPoint != currentPoint){
      this.riverPoints.push(lowestPoint);
      this.generate(heightMapData, unitSize, lowestPoint);
    } else {

      //console.log('River ended');
      //console.log(lowestPointNotCurrent);
      if(lowestPointNotCurrent != null){

        //console.log('Generate lake point');
        this.lakePoints.push(lowestPointNotCurrent);
        this.generate(heightMapData, unitSize, lowestPointNotCurrent);
        /*
          Mark points that are already lake or river points?
          Concerned that points may be infiently looping in a circle.
        */

      }

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
    for(const point of this.lakePoints){
      colorFill.b += 20;
      setColor(imgData, colorFill, point.x, point.y, unitSize, canvasId);
    }
  }

}