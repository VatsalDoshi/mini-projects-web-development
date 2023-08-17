// Set up canvas
const canvas = document.getElementById('calculatorCanvas');
const c = canvas.getContext('2d');
const buttonSize = 70;
const buttonPadding = 1;


// Set up state
let expression = '';

// Define ES6-functions

const drawButton = (x, y, label) => {
  // Draw button background
  c.fillStyle = '#787a7e';
  c.fillRect(x, y+150, buttonSize, buttonSize);
  c.strokeStyle = "#000000";
  c.strokeRect(x, y+150, buttonSize, buttonSize);

  // Draw button label
  c.fillStyle = '#ebebec';
  c.font = '24px Arial';
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillText(label, x + buttonSize / 2, y+150 + buttonSize / 2);
};

const drawButton2 = (x, y, label) => {
  // Draw button background for right side
  c.fillStyle = '#f2a33c';
  c.fillRect(x+285, y+150, buttonSize, buttonSize);

  c.strokeStyle = "#000000";
  c.strokeRect(x, y+150, buttonSize, buttonSize);

  // Draw button label
  c.fillStyle = '#ebebec';
  c.font = '24px Arial';
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillText(label, x+285 + buttonSize / 2, y+150 + buttonSize / 2);
};

const handleClick = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;


  // Determine which button was clicked
  const row = Math.floor((y- buttonPadding-150) / (buttonSize + buttonPadding));
  const col = Math.floor((x - buttonPadding) / (buttonSize + buttonPadding));
  //const buttonLabel = buttonLabels[row][col];

  // Check if row and column values are within bounds of the buttonLabels array
  if (row >= 0 && row < buttonLabels.length && col >= 0 && col < buttonLabels[row].length) {
  const buttonLabel = buttonLabels[row][col];

  // Update expression based on button clicked
  if (buttonLabel === 'Back') {
    expression = expression.slice(0, -1);
    // result='';
  } else if (buttonLabel === '=') {
    const result = evaluateExpression(expression);
    if (result !== null) {
      // //c.fillText(result , 300,100);

      // //c.clearRect(300,100);
      c.clearRect(0,85,360,60);
      c.fillText(result , 300,100);

      //expression=result.toString();    
    } else {
      expression = 'Invalid expression';
    }
  } else {
    expression += buttonLabel;
  }

  // Redraw calculator display
  drawDisplay();
}
};

const drawDisplay=() => {
  // Clear calculator display

  c.clearRect(buttonPadding, buttonPadding, (buttonSize * 4 + buttonPadding * 3), buttonSize);

  c.beginPath();
  c.arc(15,15,8,0, Math.PI*2,false);
  c.fillStyle="red";
  c.fill();

  c.beginPath();
  c.arc(40,15,8,0, Math.PI*2,false);
  c.fillStyle="yellow";
  c.fill();

  c.beginPath();
  c.arc(65,15,8,0, Math.PI*2,false);
  c.fillStyle="green";
  c.fill();

  // Draw expression on calculator display
  c.fillStyle = '#ebebec';
  c.font = '30px Arial';
  c.textAlign = 'right';
  c.textBaseline = 'middle';
  //c.clearRect(150, 70, 300, 100); // clear the old result
  c.fillText(expression , buttonPadding + buttonSize * 4 + buttonPadding * 2, buttonPadding + buttonSize / 2);

};

const infixToPostfix = (expression) => {
    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '%': 2,
      '(': 0,
      ')': 0
    };
  
    let output = [];
    let operatorStack = [];
  
    const tokens = expression.match(/(\d+(\.\d+)?|[+\-*\/%()])/g);
    console.log(tokens);
  
    tokens.forEach(token => {
      if (!Object.keys(precedence).includes(token)) {
        // Token is an operand, add to output
        output.push(token);
      } else if (token === '(') {
        // Token is a left parenthesis, push to operator stack
        operatorStack.push(token);
      } else if (token === ')') {
        // Token is a right parenthesis, pop operators from stack and add to output until left parenthesis is found
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
          output.push(operatorStack.pop());
        }
        operatorStack.pop(); // Discard left parenthesis
      } else {
        // Token is an operator, pop operators from stack and add to output until an operator with lower precedence is found
        while (operatorStack.length > 0 && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
          output.push(operatorStack.pop());
        }
        operatorStack.push(token);
      }
    });
  
    // Pop remaining operators from stack and add to output
    while (operatorStack.length > 0) {
      output.push(operatorStack.pop());
    }
  
    return output.join(' ');
  };
  
  const evaluatePostfix = (expression) => {
    const operators = ['+', '-', '*', '/', '%','(',')'];
    let stack = [];
  
    const tokens = expression.split(' ');
  
    tokens.forEach(token => {
      if (!operators.includes(token)) {
        // Token is an operand, push to stack
        stack.push(parseFloat(token));
      } else {
        // Token is an operator, pop operands from stack, apply operator and push result to stack
        const rightOperand = stack.pop();
        const leftOperand = stack.pop();
  
        switch (token) {
          case '+':
            stack.push(leftOperand + rightOperand);
            break;
          case '-':
            stack.push(leftOperand - rightOperand);
            break;
          case '*':
            stack.push(leftOperand * rightOperand);
            break;
          case '/':
            stack.push(leftOperand / rightOperand);
            break;
          case '%':
            stack.push(leftOperand % rightOperand);
            break;
        }
      }
    });
  
    return stack.pop();
  };
  
  const evaluateExpression = (expression) => {
    const postfixExpression = infixToPostfix(expression);
    return evaluatePostfix(postfixExpression);
  };
  
  
  
  // Draw calculator
  // Define button labels
  const buttonLabels = [
  [' ',' ', ' ', '%','/'],
  ['(','7', '8', '9','*'],
  [')','4', '5', '6','-'],
  ['Back','1', '2', '3','+'],
  ['0','0','0','.','=']
  ];
  // Draw buttons
  for (let row = 0; row < buttonLabels.length; row++) {
  for (let col = 0; col < buttonLabels[row].length; col++) {
  const x = buttonPadding + col * (buttonSize + buttonPadding);
  const y = buttonPadding + row * (buttonSize + buttonPadding);
  const label = buttonLabels[row][col];
  drawButton(x, y, label);
  }
  }
  
  
  const buttonLabels2 = [
    ['/'],
    ['*'],
    ['-'],
    ['+'],
    ['=']
    ];
    // Draw buttons
    for (let row = 0; row < buttonLabels2.length; row++) {
    for (let col = 0; col < buttonLabels2[row].length; col++) {
    const x = buttonPadding + col * (buttonSize + buttonPadding);
    const y = buttonPadding + row * (buttonSize + buttonPadding);
    const label = buttonLabels2[row][col];
    drawButton2(x, y, label);
    }
    }
  
    c.fillStyle = '#787a7e';
    c.fillRect(1, 435, 212, 139);
    c.strokeStyle = "#000000";
    c.strokeRect(1, 435, 212, 139);
  
    // Draw button label
    c.fillStyle = '#ebebec';
    c.font = '24px Arial';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText('0', 70 + buttonSize / 2, 435 + buttonSize / 2);
  
  // Draw calculator display
  drawDisplay();
  
  
  
  
  
  // Add event listener for button clicks
  canvas.addEventListener('click', handleClick);