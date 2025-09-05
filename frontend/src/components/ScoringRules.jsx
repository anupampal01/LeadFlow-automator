import React, { useState, useEffect } from 'react';
import { getScoringRules, createScoringRule, updateScoringRule, deleteScoringRule } from '../services/api';

const ScoringRules = () => {
    const [rules, setRules] = useState([]);
    const [newRule, setNewRule] = useState({ ruleName: '', criteria: '', scoreValue: 0, description: '' });
    const [editingRule, setEditingRule] = useState(null);

    useEffect(() => {
        const fetchRules = async () => {
            try {
                const res = await getScoringRules();
                setRules(res.data);
            } catch (err) {
                console.error('Failed to fetch rules', err);
            }
        };
        fetchRules();
    }, []);

    const handleChange = (e) => {
        setNewRule({ ...newRule, [e.target.name]: e.target.value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await createScoringRule(newRule);
            setRules([...rules, res.data]);
            setNewRule({ ruleName: '', criteria: '', scoreValue: 0, description: '' });
        } catch (err) {
            console.error('Failed to create rule', err);
        }
    };

    const handleUpdate = async (ruleId) => {
        try {
            const res = await updateScoringRule(ruleId, editingRule);
            setRules(rules.map(rule => rule._id === ruleId ? res.data : rule));
            setEditingRule(null);
        } catch (err) {
            console.error('Failed to update rule', err);
        }
    };

    const handleDelete = async (ruleId) => {
        try {
            await deleteScoringRule(ruleId);
            setRules(rules.filter(rule => rule._id !== ruleId));
        } catch (err) {
            console.error('Failed to delete rule', err);
        }
    };

    return (
        <div className="rules-container">
            <h3>Manage Lead Scoring Rules</h3>
            <form onSubmit={handleCreate} className="rule-form">
                <h4>Add New Rule</h4>
                <input type="text" name="ruleName" value={newRule.ruleName} onChange={handleChange} placeholder="Rule Name" required />
                <input type="text" name="criteria" value={newRule.criteria} onChange={handleChange} placeholder="Criteria (e.g., company.metrics.employees > 500)" required />
                <input type="number" name="scoreValue" value={newRule.scoreValue} onChange={handleChange} placeholder="Score Value" required />
                <input type="text" name="description" value={newRule.description} onChange={handleChange} placeholder="Description" />
                <button type="submit" className="btn btn-add">Add Rule</button>
            </form>
            <div className="rules-list">
                <h4>Current Rules</h4>
                <ul>
                    {rules.map(rule => (
                        <li key={rule._id} className="rule-item">
                            {editingRule && editingRule._id === rule._id ? (
                                <div className="edit-form">
                                    <input type="text" name="ruleName" value={editingRule.ruleName} onChange={(e) => setEditingRule({...editingRule, ruleName: e.target.value})} />
                                    <input type="text" name="criteria" value={editingRule.criteria} onChange={(e) => setEditingRule({...editingRule, criteria: e.target.value})} />
                                    <input type="number" name="scoreValue" value={editingRule.scoreValue} onChange={(e) => setEditingRule({...editingRule, scoreValue: e.target.value})} />
                                    <button onClick={() => handleUpdate(rule._id)}>Save</button>
                                    <button onClick={() => setEditingRule(null)}>Cancel</button>
                                </div>
                            ) : (
                                <div className="rule-details">
                                    <p><strong>{rule.ruleName}</strong>: {rule.description}</p>
                                    <p>Criteria: <code>{rule.criteria}</code> | Score: {rule.scoreValue}</p>
                                    <button onClick={() => setEditingRule(rule)}>Edit</button>
                                    <button onClick={() => handleDelete(rule._id)}>Delete</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ScoringRules;