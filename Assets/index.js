const inquirer = require('inquirer');
const fs = require('fs');

// Function to generate SVG content
function generateSVG(color, shape, text) {
    let shapeElement;

    switch (shape) {
        case 'circle':
            shapeElement = `<circle cx="50" cy="50" r="40" fill="${color}" />`;
            break;
        case 'square':
            shapeElement = `<rect x="10" y="10" width="80" height="80" fill="${color}" />`;
            break;
        case 'triangle':
            shapeElement = `<polygon points="50,10 90,90 10,90" fill="${color}" />`;
            break;
        default:
            shapeElement = `<circle cx="50" cy="50" r="40" fill="${color}" />`;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  ${shapeElement}
  <text x="50%" y="50%" font-size="12" text-anchor="middle" fill="white" dy=".3em">${text}</text>
</svg>`;
}

// Prompt the user for input
async function main() {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'color',
                message: 'Enter the color for the logo (e.g., red, #ff0000):',
                default: 'blue'
            },
            {
                type: 'list',
                name: 'shape',
                message: 'Choose a shape for the logo:',
                choices: ['circle', 'square', 'triangle'],
                default: 'circle'
            },
            {
                type: 'input',
                name: 'text',
                message: 'Enter the text for the logo:',
                default: 'Logo'
            }
        ]);

        const { color, shape, text } = answers;
        const svgContent = generateSVG(color, shape, text);

        fs.writeFile('logo.svg', svgContent, (err) => {
            if (err) {
                console.error('Error writing SVG file:', err);
            } else {
                console.log('SVG logo generated and saved as logo.svg');
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

main();


