class Grid{
    //what is passed in is the
    constructor(boxSize , c, ctx){

        // come back to this idea latter but maybe just 
        // make 2 arrays that hold all the objects 
        // in the grid and their row and col respective to the grid
        // so that instead of draw grid reading every tile 
        // it just reads the array list and draws the entities at 
        // their respective row,col 
        this.cHeight=c.height;
        this.cWidth=c.width;

        this.actorList= [];
        this.bulletList= [];

        var p=this.cWidth%10;
        this.cWidth-=p;
        p=this.cHeight%10;
        this.cHeight-=p;

        this.grid = [];
        this.boxSize = boxSize;
        this.rows = this.cHeight/this.boxSize;
        this.collumns = this.cWidth/this.boxSize;

    }
    makeGrid(){
        console.log(this.grid);
        for(var row = 0; row < this.rows; row++) {
            this.grid.push([]);
            for (var col = 0; col < this.collumns; col++){
                this.grid[row].push([]);
                this.grid[row][col].push([]);
            }
        }
        //this.boxSize = this.length/size;
    }

    insert(arry){
    for(var i = 0; i < arry.length; i++){


        var pRow = arry[i].row;
        var pCol = arry[i].col;

        if(pRow < this.rows || pRow > 0 || pCol < this.collumns || pCol > 0){
            console.log(arry[i]);
            this.grid[pRow][pCol][0].push(arry[i]);
            console.log("something was inserted at "+pRow+" "+pCol);
         }
        }
    }

    remove(pObj){
        var pRow = pObj.row;
        var pCol = pObj.col;

        if(this.grid[pRow][pCol][0].length===1){
            this.grid[pRow][pCol][0].splice(0);
        }else{
            for(i = 0;i<this.grid[pRow][pCol][0].length;i++){
                if(this.grid[pRow][pCol][0][i].type === pObj.type)
                    this.grid[pRow][pCol][0].splice(i);
            }
        }
    }

    updateGrid(){  
        for(var row=0;row<this.rows;row++){
            for(var col=0;col<this.collumns;col++){
                //this if statement checks to see if there are any entities in 
                //this space on the grid
                if(this.grid[row][col][0].length > 0){
                    var arry = this.grid[row][col][0];
                    var dmg = 0;
                    var entity;
                    for(var i =0; i<arry.length;i++){
                        //console.log(arry[i]+": this is in update")
                        if(arry[i].isBullet){
                            dmg += this.grid[row][col][i].dmg;
                            this.grid[row][col][i].splice(i);
                        }else{
                            entity = arry[i];
                        }

                    }


                }
            }
        }
    }

    drawGrid(){
        var arry = [];
        for(var row=0;row<this.rows;row++){
            for(var col=0;col<this.collumns;col++){
                var color;
                    if(this.grid[row][col].length>0){
                        color = this.grid[row][col][0].color;
                        ctx.fillStyle=color;
                        ctx.fillRect(this.boxSize*row, this.boxSize*col, this.boxSize, this.boxSize);
                        ctx.stroke();
                    }else{
                        ctx.rect(this.boxSize*row, this.boxSize*col, this.boxSize, this.boxSize);
                        ctx.stroke();
                }
            }
        }
        
       
    }

}

class Bullet{
    constructor(row,col,grid, direction){
        this.row = row;
        this.col = col;
        this.grid = grid;
        this.color = 51;
        this.isBullet = true;
        this.dmg = 1;
        this.direction = direction;
    }
    /**
    So everything will only be able to move front back side to side
    because diagonal movment will be implemented eventually;
    Also, once a bullet has a direction
    **/
    move(){
        switch(this.direction){
            case "n":
                this.col-=1;
                this.direction="n";
                break;
            case "e":
                this.row += 1;
                this.direction="e"; 
                break;
            case "s":
                this.col+=1;
                this.direction = "s";
                break;
            case "w":
                this. row -=1;
                this.direction="w";
        }
    }
}

class Player {

    /**
     *
     * Make is so every classes x and y are just indexes in the array,
     * to move them around the canvas accurately you can just multiply the
     * array indexes by the length of a grid piece(which should be a square)
     *
     */
    constructor(row,col, grid){
        this.type = "player";
        this.row = row;
        this.col = col;
        this.grid = grid;
        this.rows = this.grid.rows;
        this.collumns = this.grid.collumns;
        this.color = "#3232FF";
        this.direction = "s";
        this.isBullet = false;
    }

    move(keys){
        // W
            if (keys[87]) {
                if (this.col > 0) {
                    this.col-=1;
                    this.direction="n";
                }
            }
            // A
            else if (keys[65]) {
                if (this.row > 0) {
                    this.row -= 1;
                    this.direction = "w";
                }
            }
            // S
            else if (keys[83]) {
                if (this.col < this.collumns-1) {
                    this.col += 1;
                    this.direction="s";
                }
            }
            // D
            else if (keys[68]) {
                if (this.row < this.rows-1) {
                    this.row += 1;
                    this.direction="e";
                }
            }
            else if (keys[32]){
                //create a bullet and return it
                var b = new Bullet(this.row, this.col, this.grid, this.direction);
                b.move();
                return b;
            }
    }

}







var c = document.getElementById("canvas");
var ctx= c.getContext('2d');


var gameGrid = new Grid(50, c, ctx);
var player = new Player(0,0, gameGrid);


var listOfdoods = [];//Fill this list with all the moving things on screen
listOfdoods.push(player);

var listOfBullets=[];

gameGrid.makeGrid();
gameGrid.insert(listOfdoods);
gameGrid.drawGrid();

var keys=[];
var eMove=false;//So the enemy moves when u do

animationCanvas();

document.addEventListener('keydown', function(event){
    keys[event.keyCode]=true;
    console.log("key-down")
    eMove = true;
});

//When the key is let up it stops listening
document.addEventListener('keyup', function(event){
    keys[event.keyCode]=false;
    eMove = false;
});



var counter=0;

function draw(){

    //if(counter === 6) {
        gameGrid.remove(player);
        if(keys[32]){ 
            listOfBullets.push(player.move(keys));
        }else{
            player.move(keys);
        }
        

        gameGrid.insert(listOfdoods);
        //gameGrid.insert(listOfBullets);
        //console.log(player.row+ " " + player.col);
        counter =0;
    // }else{
    //     counter++;
    // }

    ctx.clearRect(0,0,c.width,c.height);
    gameGrid.updateGrid();
    gameGrid.drawGrid();
}



function animationCanvas(){

    draw();
    window.requestAnimationFrame(animationCanvas);
}







