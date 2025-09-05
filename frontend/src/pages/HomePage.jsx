import React from 'react';
import LeadForm from '../components/LeadForm';

const HomePage = () => {
    return (
        <div className="container">
            <header className="header">
                <h1>Automated B2B Sales Lead Qualification</h1>
                <p>Submit your company details below to get a consultation from our sales team.</p>
            </header>
            <LeadForm />
        </div>
    );
};

export default HomePage;