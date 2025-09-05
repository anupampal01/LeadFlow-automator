import React, { useEffect, useState } from 'react';
import LeadTable from '../components/LeadTable';
import ScoringRules from '../components/ScoringRules';
import { getLeads } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [leads, setLeads] = useState([]);
    const [view, setView] = useState('leads'); // 'leads' or 'rules'
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchLeads = async () => {
            try {
                const response = await getLeads();
                setLeads(response.data);
            } catch (err) {
                console.error('Failed to fetch leads:', err);
                if (err.response && err.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchLeads();
    }, [navigate]);

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>Admin Dashboard</h2>
                <div className="admin-nav">
                    <button onClick={() => setView('leads')} className={view === 'leads' ? 'active' : ''}>
                        Leads
                    </button>
                    <button onClick={() => setView('rules')} className={view === 'rules' ? 'active' : ''}>
                        Scoring Rules
                    </button>
                </div>
            </div>
            {view === 'leads' ? (
                <LeadTable leads={leads} setLeads={setLeads} />
            ) : (
                <ScoringRules />
            )}
        </div>
    );
};

export default AdminPage;