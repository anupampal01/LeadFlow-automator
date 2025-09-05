import React from 'react';

const LeadTable = ({ leads, setLeads }) => {
    // You can add logic to update status on button click here
    const handleStatusChange = async (leadId, newStatus) => {
        // Implement API call to update lead status
        // For now, let's just simulate the change
        const updatedLeads = leads.map(lead => 
            lead._id === leadId ? { ...lead, status: newStatus } : lead
        );
        setLeads(updatedLeads);
    };

    return (
        <div className="table-container">
            <h3>Recent Leads</h3>
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Contact</th>
                        <th>Website</th>
                        <th>Score</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.length > 0 ? leads.map(lead => (
                        <tr key={lead._id}>
                            <td>{lead.companyName}</td>
                            <td>{lead.contactName}</td>
                            <td><a href={`http://${lead.website}`} target="_blank" rel="noopener noreferrer">{lead.website}</a></td>
                            <td>{lead.score}</td>
                            <td>{lead.status}</td>
                            <td>{lead.assignedTo || 'Unassigned'}</td>
                            <td>
                                <select value={lead.status} onChange={(e) => handleStatusChange(lead._id, e.target.value)}>
                                    <option value="New">New</option>
                                    <option value="Qualified">Qualified</option>
                                    <option value="Unqualified">Unqualified</option>
                                    <option value="Contacted">Contacted</option>
                                </select>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="7">No leads found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LeadTable;