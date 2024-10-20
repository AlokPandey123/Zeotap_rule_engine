// utils/astUtils.js

function createAST(rule_string) {
    // A simple parser for the rule_string
    // You might want to use a proper parsing library for complex rules
    const operators = {
        'AND': 'operator',
        'OR': 'operator',
    };

    const stack = [];
    const output = [];

    rule_string.replace(/\s+/g, ' ').trim(); // Clean up spaces

    // Simple tokenizer to split by operators and parentheses
    const tokens = rule_string.match(/([()])|([^()]+)/g).map(token => token.trim()).filter(token => token);

    for (let token of tokens) {
        if (token in operators) {
            while (stack.length && stack[stack.length - 1] === 'AND' && token === 'OR') {
                output.push(stack.pop());
            }
            stack.push(token);
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop(); // Remove '('
        } else {
            // This is an operand, create a node
            const parts = token.split(/(>|<|=)/).map(part => part.trim()).filter(part => part);
            const node = {
                type: 'operand',
                value: {
                    attribute: parts[0],
                    operator: parts[1],
                    comparison: parts[2],
                },
            };
            output.push(node);
        }
    }

    while (stack.length) {
        output.push(stack.pop());
    }

    // Build the AST from output (not fully implemented, you may need a more complex logic)
    const rootNode = buildAST(output);
    return rootNode;
}

function buildAST(output) {
    // Implement a function to construct the actual AST from the output
    // This is a placeholder function and needs your implementation.
    return {}; // Return the root node of the AST
}

function combineAST(rules) {
    // A simple approach to combine multiple ASTs
    const combinedAST = {
        type: 'operator',
        operator: 'AND', // You can change this based on your logic
        left: rules[0], // First rule AST
        right: rules[1], // Second rule AST
    };

    // Here you could implement more complex logic to combine multiple rules
    return combinedAST;
}

function evaluateAST(ast, data) {
    if (!ast) return false;

    if (ast.type === 'operand') {
        const { attribute, operator, comparison } = ast.value;
        const value = data[attribute];

        switch (operator) {
            case '>':
                return value > comparison;
            case '<':
                return value < comparison;
            case '=':
                return value == comparison; // Use strict equality if necessary
            default:
                return false;
        }
    } else if (ast.type === 'operator') {
        const leftEval = evaluateAST(ast.left, data);
        const rightEval = evaluateAST(ast.right, data);

        switch (ast.operator) {
            case 'AND':
                return leftEval && rightEval;
            case 'OR':
                return leftEval || rightEval;
            default:
                return false;
        }
    }
}

module.exports = {
    createAST,
    combineAST,
    evaluateAST,
};
