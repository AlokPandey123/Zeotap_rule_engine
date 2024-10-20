// routes/rules.js
const express = require('express');
const Rule = require('../models/rule');
const { createAST, combineAST, evaluateAST } = require('../utils/astUtils'); // Import utility functions
const router = express.Router();

// Create a rule and generate AST
router.post('/create_rule', async (req, res) => {
    const { rule_string } = req.body;
    const ast = createAST(rule_string);
    const newRule = new Rule({ ruleString: rule_string, ast });
    await newRule.save();
    res.json(newRule);
});

// Combine rules
router.post('/combine_rules', async (req, res) => {
    const { rules } = req.body;
    const asts = rules.map(rule => createAST(rule)); // Create AST for each rule
    const combinedAST = combineAST(asts);
    res.json(combinedAST);
});

// Evaluate rule against JSON data
router.post('/evaluate_rule', (req, res) => {
    const { ast, data } = req.body;
    const result = evaluateAST(ast, data);
    res.json({ result });
});

module.exports = router;
