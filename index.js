const inquirer = require('inquirer');
const fs = require('fs');
const svgwrite = require('svgwrite');
const { Triangle, Circle, Square } = require('./lib/shapes');

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
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the text: ',
      validate: (input) => /^[a-zA-Z0-9]{0,3}$/.test(input),
    });
    this.text = text.toUpperCase();
  }

  async getTextColorInput() {
    const { textColor } = await this.rl({
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hexadecimal number): ',
      default: 'black',
    });
    this.textColor = textColor;
  }

  async getShapeInput() {
    const { shape } = await this.rl({
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square'],
    });
    this.shape = shape;
  }

  async getShapeColorInput() {
    const { shapeColor } = await this.rl({
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hexadecimal number): ',
      default: 'blue',
    });
    this.shapeColor = shapeColor;
  }

  generateLogo() {
    const svgDocument = svgwrite('logo.svg');
    const shape = this.getShapeInstance();
    shape.setColor(this.shapeColor);

    svgDocument.add(shape.render());
    svgDocument.text(this.text).move('130px', '150px').fill(this.textColor);
    svgDocument.save();
  }

  getShapeInstance() {
    switch (this.shape) {
      case 'triangle':
        return new Triangle();
      case 'circle':
        return new Circle();
      case 'square':
        return new Square();
      default:
        return new Circle(); // Default to circle if the shape is not recognized
    }
  }

  closeReadline() {
    this.rl.ui.close();
  }
}

async function main() {
  const logoGenerator = new LogoGenerator();
  await logoGenerator.getTextInput();
  await logoGenerator.getTextColorInput();
  await logoGenerator.getShapeInput();
  await logoGenerator.getShapeColorInput();

  logoGenerator.generateLogo();
  console.log('Generated logo.svg');

  logoGenerator.closeReadline();
}

main();