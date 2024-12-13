export class Font {
  private fontFamily: string;
  private canvas: HTMLCanvasElement;

  constructor(fontFamily: string = "Encode Sans") {
    this.fontFamily = fontFamily;
    this.canvas = document.createElement("canvas");
  }

  width(text: string, fontSize: string, fontWeight: string) {
    const context = this.canvas.getContext("2d");

    if (context) {
      context.font = `${fontWeight} ${fontSize} ${this.fontFamily}`;
      context.textAlign = "start";
      context.textBaseline = "alphabetic";
      const { width } = context.measureText(text);
      return width;
    }

    return 0;
  }

  public static getTextWidth(
    text: string,
    fontSize: string,
    fontWeight: string
  ) {
    const font = new Font();
    return font.width(text, fontSize, fontWeight);
  }
}
