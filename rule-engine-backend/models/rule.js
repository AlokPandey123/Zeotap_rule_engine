const mongoose = require('mongoose');

// Define the AST node schema
const NodeSchema = new mongoose.Schema({
    type: { type: String, required: true }, // "operator" or "operand"
    left: { type: mongoose.Schema.Types.Mixed }, // Recursively reference another Node (left child)
    right: { type: mongoose.Schema.Types.Mixed }, // Recursively reference another Node (right child)
    value: { type: String } // Value for operand nodes (e.g., "age", "department", ">", "30", etc.)
});

// Define the rule schema that includes the ruleString and the AST
const RuleSchema = new mongoose.Schema({
    ruleString: { type: String, required: true }, // Store the original rule as a string
    ast: { type: NodeSchema, required: true } // Store the AST representing the rule
});

// Create the Rule model
const Rule = mongoose.model('Rule', RuleSchema);

module.exports = Rule;
