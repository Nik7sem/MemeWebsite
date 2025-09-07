type canvasArrayType = ({ color: string } | null)[][]
export type canvasRectsType = { row: number; col: number; color: string }[]

export class DrawingCanvas {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D;
  private readonly onLocalDraw: (data: { row: number, col: number, color: string }[]) => void
  private gridRows: number
  private gridCols: number
  private width: number
  private height: number
  private cellSize: number
  private lineWidth = 1
  public rectColor: string = 'green'
  private buffer: canvasRectsType = []
  private intervalId: NodeJS.Timeout

  constructor(canvas: HTMLCanvasElement, onLocalDraw: (data: {
    row: number,
    col: number,
    color: string
  }[]) => void, array: canvasArrayType, rows: number, cols: number) {
    this.canvas = canvas
    this.gridRows = rows;
    this.gridCols = cols;
    this.onLocalDraw = onLocalDraw
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas graphics not supported!");

    this.cellSize = Math.min(
      Math.floor((window.screen.width * 0.85 - this.lineWidth) / this.gridCols - this.lineWidth),
      Math.floor((window.screen.height * 0.7 - this.lineWidth) / this.gridRows - this.lineWidth)
    )
    this.width = this.gridCols * (this.cellSize + this.lineWidth) + this.lineWidth
    this.height = this.gridRows * (this.cellSize + this.lineWidth) + this.lineWidth

    this.ctx = context;
    this.canvas.style.width = this.width.toString();
    this.canvas.style.height = this.height.toString();
    this.canvas.width = this.width
    this.canvas.height = this.height

    this.intervalId = setInterval(() => this.sendBuffered(), 100)
    this.drawArray(array)
    // this.drawGrid()
  }

  private sendBuffered() {
    if (this.buffer.length > 0) {
      this.onLocalDraw(this.buffer)
      this.buffer = []
    }
  }

  public cleanup() {
    clearInterval(this.intervalId)
  }

  private drawArray(array: canvasArrayType) {
    for (let row = 0; row < this.gridRows; row++) {
      for (let col = 0; col < this.gridCols; col++) {
        const val = array[row][col]
        if (val) {
          this.drawRect(row, col, val.color)
        }
      }
    }
  }

  private drawGrid() {
    this.ctx.strokeStyle = 'red'
    this.ctx.lineWidth = this.lineWidth
    this.ctx.beginPath();
    this.ctx.roundRect(this.lineWidth / 2, this.lineWidth / 2, this.width - this.lineWidth, this.height - this.lineWidth, [0]);

    // grid
    for (let col = 0; col < this.gridCols; col++) {
      const x = 0.5 * this.lineWidth + (this.cellSize + this.lineWidth) * col;
      this.ctx.moveTo(x, this.lineWidth);
      this.ctx.lineTo(x, this.height - this.lineWidth);
    }

    for (let row = 0; row < this.gridRows; row++) {
      const y = 0.5 * this.lineWidth + (this.cellSize + this.lineWidth) * row;
      this.ctx.moveTo(this.lineWidth, y);
      this.ctx.lineTo(this.width - this.lineWidth, y);
    }

    this.ctx.stroke();
  }

  posToPixels(row: number, col: number): [number, number] {
    return [
      col * (this.cellSize + this.lineWidth) + this.lineWidth,
      row * (this.cellSize + this.lineWidth) + this.lineWidth
    ]
  }

  pixelsToPos(x: number, y: number): [number, number] {
    return [
      Math.floor((y - this.lineWidth / 2) / (this.cellSize + this.lineWidth)),
      Math.floor((x - this.lineWidth / 2) / (this.cellSize + this.lineWidth))
    ]
  }

  drawRect(row: number, col: number, color: string) {
    this.ctx.fillStyle = color
    this.ctx.fillRect(...this.posToPixels(row, col), this.cellSize, this.cellSize)
  }

  public onClick(eventX: number, eventY: number) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const [row, col] = this.pixelsToPos((eventX - rect.left) * scaleX, (eventY - rect.top) * scaleY)
    this.buffer.push({row, col, color: this.rectColor})
    this.drawRect(row, col, this.rectColor)
  }

  public onRemoteRect(array: canvasRectsType) {
    array.forEach(({row, col, color}) => this.drawRect(row, col, color))
  }
}