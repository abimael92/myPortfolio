// src/hooks/usePortfolioData.ts
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../auth/firebaseConfig';
import { PortfolioData, Project, Experience, Skill, Education, Achievement } from '../types/portfolio';

interface UseMainDataReturn {
    data: PortfolioData;
    loading: boolean;
    error: string | null;
}

// Custom hook for main data
const useMainData = (): UseMainDataReturn => {
    const [data, setData] = useState < PortfolioData > ({
        projects: [],
        experience: [],
        skills: [],
        education: [],
        achievements: []
    });
    const [loading, setLoading] = useState < boolean > (true);
    const [error, setError] = useState < string | null > (null);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                setLoading(true);
                setError(null);

                const docRef = doc(db, 'portfolio', 'main_data');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const firebaseData = docSnap.data().data || {};
                    setData({
                        projects: firebaseData.projects || [],
                        experience: firebaseData.experience || [],
                        skills: firebaseData.skills || [],
                        education: firebaseData.education || [],
                        achievements: firebaseData.achievements || []
                    });
                } else {
                    console.warn("No portfolio data document found!");
                    setData({
                        projects: [],
                        experience: [],
                        skills: [],
                        education: [],
                        achievements: []
                    });
                }
            } catch (err) {
                console.error("Error fetching portfolio data:", err);
                setError((err as Error).message);
                setData({
                    projects: [],
                    experience: [],
                    skills: [],
                    education: [],
                    achievements: []
                });
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
        projects: data.projects,
        loading,
        error
    };
};

export const useTimeline = () => {
    const { data, loading, error } = useMainData();
    const sortedTimeline: Experience[] = data.experience
        .sort((a: Experience, b: Experience) => b.year - a.year || b.date.localeCompare(a.date));

    return {
        timeline: sortedTimeline,
        loading,
        error
    };
};

export const useSkills = () => {
    const { data, loading, error } = useMainData();
    return {
        skills: data.skills,
        loading,
        error
    };
};

export const useEducation = () => {
    const { data, loading, error } = useMainData();
    return {
        education: data.education,
        loading,
        error
    };
};

export const useAchievements = () => {
    const { data, loading, error } = useMainData();
    return {
        achievements: data.achievements,
        loading,
        error
    };
};