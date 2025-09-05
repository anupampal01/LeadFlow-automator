import React, { useState } from 'react';
import { submitLead } from '../services/api';

const LeadForm = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        contactName: '',
        email: '',
        phoneNumber: '',
        website: ''
    });

    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await submitLead(formData);
            setMessage(res.data.message);
            setFormData({ companyName: '', contactName: '', email: '', phoneNumber: '', website: '' }); // Clear form
        } catch (err) {
            setMessage('Failed to submit lead. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="lead-form-container">
            <form onSubmit={handleSubmit} className="lead-form">
                <div className="form-group">
                    <label>Company Name</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Contact Name</label>
                    <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Work Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Company Website</label>
                    <input type="url" name="website" value={formData.website} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-submit" disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Submit Lead'}
                </button>
            </form>
            {message && <p className="form-message">{message}</p>}
        </div>
    );
};

export default LeadForm;