const inquirer = require("inquirer");
const fs = require("fs");
const { Triangle, Circle, Square } = require("./library/shapes");

class LogoGenerator {
  constructor() {
    this.text = null;
    this.textColor = null;
    this.shape = null;
    this.shapeColor = null;
    this.rl = inquirer.createPromptModule();
  }

  async getTextInput() {
    const { text } = await this.rl({
      type: "input",
      name: "text",
      message: "Enter up to three characters for the text: ",
      // using regex for varible input characters
      validate: (input) => /^[a-zA-Z0-9]{0,3}$/.test(input),
    });
    this.text = text.toUpperCase();
  }

  async getTextColorInput() {
    const { textColor } = await this.rl({
      type: "input",
      name: "textColor",
      message: "Enter the text color (keyword or hexadecimal number): ",
      default: "black",
    });
    this.textColor = textColor;
  }

  async getShapeInput() {
    const { shape } = await this.rl({
      type: "list",
      name: "shape",
      message: "Choose a shape:",
      choices: ["circle", "triangle", "square"],
    });
    this.shape = shape;
  }

  async getShapeColorInput() {
    const { shapeColor } = await this.rl({
      type: "input",
      name: "shapeColor",
      message: "Enter the shape color (keyword or hexadecimal number): ",
      default: "blue",
    });
    this.shapeColor = shapeColor;
  }

  generateLogo() {
    const data = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.textColor}">${this.text}</text>
  
  </svg>`;

    fs.writeFileSync(`"${answers.shape}.svg", data, "utf-8"`);
    return data;
  }

  getShapeInstance() {
    switch (this.shape) {
      case "triangle":
        return new Triangle();
      // generatelogo(triangle.render)
      case "circle":
        return new Circle();
      case "square":
        return new Square();
      default:
        return new Circle(); // Default to circle if the shape is not recognized
    }
  }

  // // closeReadline() {
  // //   this.rl.ui.close();
  // }
}

async function main() {
  const circle = new Circle("BLC", "white", "pink");
  console.log(circle.render());
  const logoGenerator = new LogoGenerator();
  await logoGenerator.getTextInput();
  await logoGenerator.getTextColorInput();
  await logoGenerator.getShapeInput();
  await logoGenerator.getShapeInstance();
  await logoGenerator.getShapeColorInput();
  // Create Switch Statement here to run thru shapes.js to render the appropriate values/shape to use with the generate logo function.
  logoGenerator.generateLogo();
  // logoGenerator.closeReadline();
  // console.log(logoGenerator.generateLogo());
}

main();
