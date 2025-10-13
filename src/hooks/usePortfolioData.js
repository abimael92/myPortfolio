// src/hooks/usePortfolioData.js
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../auth/firebaseConfig';

// Custom hook for main data
const useMainData = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const docRef = doc(db, 'portfolio', 'main_data');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setData(docSnap.data().data || {});
                } else {
                    console.warn("No portfolio data document found!");
                    setData({});
                }
            } catch (err) {
                console.error("Error fetching portfolio data:", err);
                setError(err.message);
                setData({});
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

// Specific data hooks
export const useProjects = () => {
    const { data, loading, error } = useMainData();
    return {
        projects: data.projects || [],
        loading,
        error
    };
};

export const useTimeline = () => {
    const { data, loading, error } = useMainData();
    const sortedTimeline = (data.experience || [])
        .sort((a, b) => b.year - a.year || b.date.localeCompare(a.date));

    return {
        timeline: sortedTimeline,
        loading,
        error
    };
};

export const useSkills = () => {
    const { data, loading, error } = useMainData();
    return {
        skills: data.skills || [],
        loading,
        error
    };
};

export const useEducation = () => {
    const { data, loading, error } = useMainData();
    return {
        education: data.education || [],
        loading,
        error
    };
};

export const useAchievements = () => {
    const { data, loading, error } = useMainData();
    return {
        achievements: data.achievements || [],
        loading,
        error
    };
};