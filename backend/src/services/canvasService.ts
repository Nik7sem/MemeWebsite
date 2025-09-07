type canvasArrayType = ({ color: string } | null)[][]
type canvasRectsType = { row: number; col: number; color: string }[]

export class CanvasService {
  private _array: canvasArrayType = [];

  constructor(private gridRows: number, private gridCols: number) {
    this.createArray()
  }

  private createArray() {
    this._array = Array(this.gridRows).fill(null).map(() => Array(this.gridCols).fill(null));
  }

  public getArraySize() {
    return {rows: this.gridRows, cols: this.gridCols};
  }

  public draw(array: canvasRectsType) {
    array.forEach(({row, col, color}) => {
      if (typeof this._array[row]?.[col] !== 'undefined') {
        this._array[row][col] = {color}
      }
    })
  }

  public clear() {
    this.createArray()
  }

  public setSize(rows: number, cols: number) {
    this.gridRows = rows;
    this.gridCols = cols;
    this.createArray()
  }

  get array() {
    return this._array;
  }
}