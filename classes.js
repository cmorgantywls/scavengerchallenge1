class Clicky{
  constructor(x,y,i=0){
    this.x = x
    this.y = y
    this.identity = i
    this.theColor = color(180, 171, 184)
  }

  display(){
    noStroke()
    fill(this.theColor)
    ellipse(this.x,this.y,100)
  }

  hoverReact(){
        noStroke()
    fill(this.theColor)
    ellipse(this.x,this.y,100)

    if(collidePointCircle(mouseX,mouseY,this.x,this.y,100)){
      this.theColor = color(0,0,255)
    }
    else{
      this.theColor = color(180, 171, 184)
    }
  }

  colorChange(){
    noStroke()
    fill(255,0,255)
    ellipse(this.x,this.y,100)
  }

}
