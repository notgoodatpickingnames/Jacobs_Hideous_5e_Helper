export class Grid {
    public squareCountX: number;
    public squareCountY: number;

    public squareSizeInPixels: number;

    private canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D;

    constructor(canvasRef: HTMLCanvasElement, width: number, height: number, squareSize: number) {
        this.canvas = canvasRef;
        this.canvasContext = this.canvas.getContext('2d');

        this.squareCountX = width;
        this.squareCountY = height;

        this.squareSizeInPixels = squareSize;
    }

    public get pixelWidth(): number {
        return this.squareCountX * this.squareSizeInPixels;
    }

    public get pixelHeight(): number {
        return this.squareCountY * this.squareSizeInPixels;
    }

    public render(): void {
        this.canvasContext.lineWidth = 1;

        this.canvasContext.beginPath();

        for (let x = 0; x <= this.canvas.width / this.squareSizeInPixels; x++) {
            this.canvasContext.moveTo(x * this.squareSizeInPixels, 0);
            this.canvasContext.lineTo(x * this.squareSizeInPixels, this.canvas.height);
        }

        for (let y = 0; y <= this.canvas.height / this.squareSizeInPixels; y++) {
            this.canvasContext.moveTo(0, y * this.squareSizeInPixels);
            this.canvasContext.lineTo(this.canvas.width, y * this.squareSizeInPixels);
        }

        this.canvasContext.strokeStyle = "white";
        this.canvasContext.stroke();
    }
}