const inquirer = require("inquirer");
const fs = require("fs");
const { Triangle, Circle, Square } = require("./library/shapes");

let newShape;

const questions = [
  {
    type: "list",
    name: "shape",
    message: "What shape do you want?",
    choices: ["Circle", "Square", "Triangle"],
  },
  {
    type: "input",
    name: "text",
    message: "What letters do you want (must be 3)",
  },
  {
    type: "input",
    name: "textColor",
    message: "What color do you want the text to be?",
  },
  {
    type: "input",
    name: "shapeColor",
    message: "What color do you want the shape to be?",
  },
];

inquirer.prompt(questions).then((answers) => {
  if (answers.shape === "Circle") {
    newShape = new Circle(answers.text, answers.textColor, answers.shapeColor);
    fs.writeFileSync(`${answers.shape}.svg`, newShape.render(), "utf-8");
  } else if (answers.shape === "Triangle") {
    newShape = new Triangle(
      answers.text,
      answers.textColor,
      answers.shapeColor
    );
    fs.writeFileSync(`${answers.shape}.svg`, newShape.render(), "utf-8");
  } else if (answers.shape === "Square") {
    newShape = new Square(answers.text, answers.textColor, answers.shapeColor);
    fs.writeFileSync(`${answers.shape}.svg`, newShape.render(), "utf-8");
  }
});
