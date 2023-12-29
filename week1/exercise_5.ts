console.clear();
class Rectangle {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  rectangular() {
    return this.width * this.height;
  }
}

let area = new Rectangle(4, 5);

let rectangularArea = area.rectangular();

console.log(rectangularArea);