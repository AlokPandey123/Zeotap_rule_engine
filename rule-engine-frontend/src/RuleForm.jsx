// RuleForm.js
console.log("RuleForm component loaded"); // Add this line

import React, { useState } from 'react';
import axios from 'axios';

const RuleForm = () => {
    const [ruleString, setRuleString] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/api/rules/create_rule', { rule_string: ruleString });
        console.log(response.data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={ruleString}
                onChange={(e) => setRuleString(e.target.value)}
                placeholder="Enter rule string"
            />
            <button type="submit">Create Rule</button>
        </form>
    );
};

export default RuleForm;
