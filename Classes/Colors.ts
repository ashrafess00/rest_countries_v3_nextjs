export class Colours {
  background;
  text;
  whiteBlack;

  constructor(mode: "light" | "dark") {
    switch (mode) {
      case "light":
        this.background = "hsl(0, 0%, 98%)";
        this.text = "hsl(0, 0%, 52%)";
        this.whiteBlack = "white";
        break;
      case "dark":
        this.background = "hsl(207, 26%, 17%)";
        this.text = "hsl(0, 0%, 100%)";
        this.whiteBlack = "black";
    }
  }

  changeMode() {
    document.documentElement.style.setProperty("--background", this.background);
    document.documentElement.style.setProperty("--text", this.text);
    document.documentElement.style.setProperty("--white", this.whiteBlack);
    // document.documentElement.style.setProperty("--darkGray", "green");
  }
}
