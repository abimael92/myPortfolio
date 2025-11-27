import { useState, useEffect, useRef } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import * as S from '../styles/EditPortfolioStyles';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type PortfolioData = {
    achievements?: Achievement[];
    skills?: Skill[];
    education?: Education[];
    projects?: Project[];
    experience?: Experience[];
    [key: string]: any
};

type Education = {
    title: string;
    institution: string;
    startDate?: string;
    endDate?: string;
    date: string;
    id?: string;
};

type Experience = {
    description: string;
    company: string;
    project: string;
    achievements: string[];
    technologies: string[];
    position: string;
    industry: string;
    startDate?: string;
    endDate?: string;
    isCurrent: boolean;
    date: string;
    year: string;
    period: string;
    id?: string;
};

type Achievement = { achievement: string; role: string };

type Skill = {
    name: string;
    percent: number;
    category: string;
    id?: string;
};

type Project = {
    image: string;
    title: string;
    description: string;
    id: string;
    tags: string;
    source: string;
};

const EditPortfolio = () => {
    const [status, setStatus] = useState<{ message: string; success: boolean } | null>(null);
    const [portfolioData, setPortfolioData] = useState<PortfolioData>({});
    const [openSections, setOpenSections] = useState<Set<string>>(new Set());
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [openCurrentSections, setOpenCurrentSections] = useState<Set<string>>(new Set());

    const [originalData, setOriginalData] = useState<{ [key: string]: any[] }>({
        achievements: [],
        skills: [],
        education: [],
        experience: [],
        projects: []
    });
    const [editingItems, setEditingItems] = useState<{ [key: string]: Set<string> }>({
        achievements: new Set(),
        skills: new Set(),
        education: new Set(),
        experience: new Set(),
        projects: new Set()
    });

    // Upload function (you'll need to implement based on your backend)
    const uploadToServer = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            return data.imageUrl;
        } catch (error) {
            console.error('Upload failed:', error);
            throw error;
        }
    };

    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [newAchievement, setNewAchievement] = useState({ achievement: "", role: "" });
    const [skills, setSkills] = useState<Skill[]>([]);
    const [newSkill, setNewSkill] = useState<Skill>({
        name: "", percent: 0, category: ""
    });
    const [education, setEducation] = useState<Education[]>([]);
    const [newEducation, setNewEducation] = useState<Education>({
        title: "",
        institution: "",
        startDate: "",
        endDate: "",
        date: ""
    });
    const [projects, setProjects] = useState<Project[]>([]);
    const [newProject, setNewProject] = useState<Project>({
        image: "",
        title: "",
        description: "",
        id: "",
        tags: "",
        source: ""
    });

    const [experience, setExperience] = useState<Experience[]>([]);
    const [newExperience, setNewExperience] = useState<Experience>({
        description: "",
        company: "",
        project: "",
        achievements: [""],
        technologies: [""],
        position: "",
        industry: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        date: "",
        year: "",
        period: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'portfolio', 'main_data');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const firebaseData = docSnap.data().data || {};
                    setPortfolioData(firebaseData);

                    setAchievements(firebaseData.achievements || []);
                    setSkills(firebaseData.skills || []);
                    setEducation(firebaseData.education || []);
                    setExperience(firebaseData.experience || []);
                    setProjects(firebaseData.projects || []);
                    setOpenSections(new Set());
                }
            } catch (err) {
                console.error(err);
                setStatus({ message: "Error fetching data", success: false });
            }
        };
        fetchData();
    }, []);

    const toggleSection = (key: string) => {
        const newOpenSections = new Set(openSections);

        if (newOpenSections.has(key)) {
            newOpenSections.delete(key);
            setActiveSection(null);
        } else {
            newOpenSections.add(key);
            setActiveSection(key);
        }
        setOpenSections(newOpenSections);
    };

    const toggleCurrentSection = (section: string) => {
        const newOpenCurrentSections = new Set(openCurrentSections);
        if (newOpenCurrentSections.has(section)) {
            newOpenCurrentSections.delete(section);
        } else {
            newOpenCurrentSections.add(section);
        }
        setOpenCurrentSections(newOpenCurrentSections);
    };

    // Toggle edit mode for items
    const toggleEditItem = (section: string, index: number) => {
        const newEditingItems = { ...editingItems };
        const sectionSet = new Set(newEditingItems[section]);

        if (sectionSet.has(index.toString())) {

            if (originalData[section] && originalData[section][index]) {

                if (section === 'achievements') {
                    const updated = [...achievements];
                    updated[index] = originalData[section][index] as Achievement;
                    setAchievements(updated);
                } else if (section === 'skills') {
                    const updated = [...skills];
                    updated[index] = originalData[section][index] as Skill;
                    setSkills(updated);
                } else if (section === 'education') {
                    const updated = [...education];
                    updated[index] = originalData[section][index] as Education;
                    setEducation(updated);
                } else if (section === 'experience') {
                    const updated = [...experience];
                    updated[index] = originalData[section][index] as Experience;
                    setExperience(updated);
                } else if (section === 'projects') {
                    const updated = [...projects];
                    updated[index] = originalData[section][index] as Project;
                    setProjects(updated);
                }
            }
            sectionSet.delete(index.toString());
        } else {

            const newOriginalData = { ...originalData };
            if (!newOriginalData[section]) newOriginalData[section] = [];

            if (section === 'achievements') {
                newOriginalData[section][index] = { ...achievements[index] };
            } else if (section === 'skills') {
                newOriginalData[section][index] = { ...skills[index] };
            } else if (section === 'education') {
                newOriginalData[section][index] = { ...education[index] };
            } else if (section === 'experience') {
                newOriginalData[section][index] = { ...experience[index] };
            } else if (section === 'projects') {
                newOriginalData[section][index] = { ...projects[index] };
            }

            setOriginalData(newOriginalData);
            sectionSet.add(index.toString());
        }

        newEditingItems[section] = sectionSet;
        setEditingItems(newEditingItems);
    };

    const formatDateString = (startDate: string | undefined, endDate: string | undefined, isCurrent: boolean = false): string => {
        if (!startDate) return "";

        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        };

        const startFormatted = formatDate(startDate);
        let endFormatted = isCurrent ? 'Present' : (endDate ? formatDate(endDate) : 'Present');


        if (endDate) {
            endFormatted = formatDate(endDate);

            // Calculate period if both dates are valid
            const start = new Date(startDate);
            const end = new Date(endDate);
            if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
                const months = (end.getFullYear() - start.getFullYear()) * 12 +
                    (end.getMonth() - start.getMonth());
                if (months > 0) {
                    const years = Math.floor(months / 12);
                    const remainingMonths = months % 12;
                    let periodString = '';
                    if (years > 0) periodString += `${years} year${years > 1 ? 's' : ''}`;
                    if (remainingMonths > 0) {
                        if (years > 0) periodString += ' ';
                        periodString += `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
                    }
                    // You can set the period field here if needed
                    // updated.period = periodString;
                }
            }
        }

        return `${startFormatted} - ${endFormatted}`;
    };

    const calculateDuration = (startDate: string | undefined, endDate: string | undefined, isCurrent: boolean = false): string => {
        if (!startDate) return "";

        const start = new Date(startDate);
        const end = isCurrent ? new Date() : (endDate ? new Date(endDate) : new Date());

        if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";

        const months = (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth());

        if (months <= 0) return "Less than 1 month";

        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        let durationString = '';

        if (years > 0) {
            durationString += `${years} year${years > 1 ? 's' : ''}`;
        }

        if (remainingMonths > 0) {
            if (years > 0) durationString += ' ';
            durationString += `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
        }

        return durationString;
    };

    // Achievement functions
    const handleAddAchievement = () => {
        if (!newAchievement.achievement || !newAchievement.role) {
            setStatus({ message: "Please fill in both fields", success: false });
            return;
        }
        setAchievements([...achievements, newAchievement]);
        setNewAchievement({ achievement: "", role: "" });
        setStatus({ message: "Achievement added!", success: true });
    };

    const handleRemoveAchievement = (index: number) => {
        const updated = [...achievements];
        updated.splice(index, 1);
        setAchievements(updated);

        // Remove from editing items if it was being edited
        const newEditingItems = { ...editingItems };
        const sectionSet = new Set(newEditingItems.achievements);
        sectionSet.delete(index.toString());
        newEditingItems.achievements = sectionSet;
        setEditingItems(newEditingItems);
    };

    // Skill functions
    const handleAddSkill = () => {
        if (!newSkill.name || !newSkill.category) {
            setStatus({ message: "Please fill in name and category", success: false });
            return;
        }
        setSkills([...skills, { ...newSkill, id: Date.now().toString() }]);
        setNewSkill({ name: "", percent: 0, category: "" });
        setStatus({ message: "Skill added!", success: true });
    };

    const handleRemoveSkill = (index: number) => {
        const updated = [...skills];
        updated.splice(index, 1);
        setSkills(updated);

        // Remove from editing items if it was being edited
        const newEditingItems = { ...editingItems };
        const sectionSet = new Set(newEditingItems.skills);
        sectionSet.delete(index.toString());
        newEditingItems.skills = sectionSet;
        setEditingItems(newEditingItems);
    };

    // Education func
    const handleAddEducation = () => {
        if (!newEducation.title || !newEducation.date || !newEducation.institution) {
            setStatus({ message: "Please fill in all fields", success: false });
            return;
        }
        setEducation([...education, { ...newEducation, id: Date.now().toString() }]);
        setNewEducation({ title: "", date: "", institution: "" });
        setStatus({ message: "Education added!", success: true });
    };

    const handleRemoveEducation = (index: number) => {
        const updated = [...education];
        updated.splice(index, 1);
        setEducation(updated);

        // Remove from editing items if it was being edited
        const newEditingItems = { ...editingItems };
        const sectionSet = new Set(newEditingItems.education);
        sectionSet.delete(index.toString());
        newEditingItems.education = sectionSet;
        setEditingItems(newEditingItems);
    };

    // Experience functions
    const handleAddExperience = () => {
        if (!newExperience.company || !newExperience.position || !newExperience.date) {
            setStatus({ message: "Please fill in company, position and date fields", success: false });
            return;
        }
        setExperience([...experience, { ...newExperience, id: Date.now().toString() }]);
        setNewExperience({
            description: "",
            company: "",
            project: "",
            achievements: [""],
            technologies: [""],
            position: "",
            industry: "",
            startDate: "", // Add this
            endDate: "",   // Add this
            isCurrent: false, // Add this
            date: "",
            year: "",
            period: ""
        });
        setStatus({ message: "Experience added!", success: true });
    };

    const handleRemoveExperience = (index: number) => {
        const updated = [...experience];
        updated.splice(index, 1);
        setExperience(updated);

        // Remove from editing items if it was being edited
        const newEditingItems = { ...editingItems };
        const sectionSet = new Set(newEditingItems.experience);
        sectionSet.delete(index.toString());
        newEditingItems.experience = sectionSet;
        setEditingItems(newEditingItems);
    };

    // Projects functions
    const handleAddProject = () => {
        if (!newProject.title || !newProject.description || !newProject.image) {
            setStatus({ message: "Please fill in title, description and image", success: false });
            return;
        }
        setProjects([...projects, { ...newProject, id: Date.now().toString() }]);
        setNewProject({
            image: "",
            title: "",
            description: "",
            id: "",
            tags: "",
            source: ""
        });
        setStatus({ message: "Project added!", success: true });
    };

    const handleRemoveProject = (index: number) => {
        const updated = [...projects];
        updated.splice(index, 1);
        setProjects(updated);

        // Remove from editing items if it was being edited
        const newEditingItems = { ...editingItems };
        const sectionSet = new Set(newEditingItems.projects);
        sectionSet.delete(index.toString());
        newEditingItems.projects = sectionSet;
        setEditingItems(newEditingItems);
    };

    // Helper functions for achievements and technologies arrays
    const addAchievementField = () => {
        setNewExperience({
            ...newExperience,
            achievements: [...newExperience.achievements, ""]
        });
    };

    const removeAchievementField = (index: number) => {
        const updatedAchievements = newExperience.achievements.filter((_, i) => i !== index);
        setNewExperience({
            ...newExperience,
            achievements: updatedAchievements
        });
    };

    const updateAchievementField = (index: number, value: string) => {
        const updatedAchievements = [...newExperience.achievements];
        updatedAchievements[index] = value;
        setNewExperience({
            ...newExperience,
            achievements: updatedAchievements
        });
    };

    const addTechnologyField = () => {
        setNewExperience({
            ...newExperience,
            technologies: [...newExperience.technologies, ""]
        });
    };

    const removeTechnologyField = (index: number) => {
        const updatedTechnologies = newExperience.technologies.filter((_, i) => i !== index);
        setNewExperience({
            ...newExperience,
            technologies: updatedTechnologies
        });
    };

    const updateTechnologyField = (index: number, value: string) => {
        const updatedTechnologies = [...newExperience.technologies];
        updatedTechnologies[index] = value;
        setNewExperience({
            ...newExperience,
            technologies: updatedTechnologies
        });
    };

    // Unified save function
    const handleSave = async () => {
        if (!activeSection) return;

        try {
            const dataToSave = activeSection === 'achievements' ? { achievements } :
                activeSection === 'skills' ? { skills } :
                    activeSection === 'education' ? { education } :
                        activeSection === 'experience' ? { experience } :
                            activeSection === 'projects' ? { projects } : {};

            const res = await fetch("/api/portfolio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSave),
            });
            const data = await res.json();

            if (data.success) {
                setStatus({ message: `${activeSection} updated successfully! `, success: true });
                setPortfolioData({ ...portfolioData, ...dataToSave });

                // Exit all edit modes after save
                setEditingItems({
                    achievements: new Set(),
                    skills: new Set(),
                    education: new Set(),
                    experience: new Set(),
                    projects: new Set()
                });
            } else {
                throw new Error("Failed to update");
            }
        } catch (error) {
            setStatus({ message: `Error updating ${activeSection}`, success: false });
        }
    };

    const isAddDisabled = !newAchievement.achievement || !newAchievement.role;
    const isAddSkillDisabled = !newSkill.name || !newSkill.category;
    const isAddEducationDisabled = !newEducation.title || !newEducation.date || !newEducation.institution;


    // Inside your component
    const sliderTrackRef = useRef<HTMLDivElement>(null);

    const updatePercent = useCallback((clientX: number) => {
        if (!sliderTrackRef.current) return;

        const trackRect = sliderTrackRef.current.getBoundingClientRect();
        const relativeX = clientX - trackRect.left;
        const percentage = Math.max(0, Math.min(100, (relativeX / trackRect.width) * 100));

        setNewSkill(prev => ({ ...prev, percent: Math.round(percentage) }));
    }, []);

    const handleSliderClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        updatePercent(e.clientX);
    }, [updatePercent]);

    const handleThumbMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        const handleMouseMove = (moveEvent: MouseEvent) => {
            updatePercent(moveEvent.clientX);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [updatePercent]);

    const handleThumbTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
        const handleTouchMove = (moveEvent: TouchEvent) => {
            if (moveEvent.touches[0]) {
                updatePercent(moveEvent.touches[0].clientX);
            }
        };

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    }, [updatePercent]);

    // Render section content based on active section
    const renderSectionContent = () => {
        switch (activeSection) {
            case 'achievements':
                return (
                    <>
                        <S.AddForm>
                            <S.SectionTitle>Add New Achievement</S.SectionTitle>
                            <S.AchievementFormRow>
                                <S.InputAchievementGroup style={{ flex: 1 }}>
                                    <S.InputLabel>Role</S.InputLabel>
                                    <S.StyledInput
                                        placeholder="Your role in this achievement"
                                        value={newAchievement.role}
                                        onChange={(e) => setNewAchievement({ ...newAchievement, role: e.target.value })}
                                    />
                                </S.InputAchievementGroup>

                                <S.InputGroup style={{ flex: 2 }}>
                                    <S.InputLabel>Achievement</S.InputLabel>
                                    <S.AchievementTextArea
                                        placeholder="What did you accomplish?"
                                        value={newAchievement.achievement}
                                        onChange={(e) => setNewAchievement({ ...newAchievement, achievement: e.target.value })}
                                        rows={4}
                                    />
                                </S.InputGroup>


                            </S.AchievementFormRow>
                            <S.InputGroup style={{ flex: 0.5, justifyContent: 'flex-end' }}>
                                <S.AddButton
                                    onClick={handleAddAchievement}
                                    disabled={isAddDisabled}
                                    style={{ minWidth: '120px', height: '42px' }}
                                >
                                    Add +
                                </S.AddButton>
                            </S.InputGroup>
                        </S.AddForm>

                        <S.Section>
                            <S.SectionTitle onClick={() => toggleCurrentSection('achievements')}>
                                {openCurrentSections.has('achievements') ? '▼' : '▶'} Current Achievements ( {achievements.length} )
                            </S.SectionTitle>
                            {openCurrentSections.has('achievements') && (
                                <S.AchievementList>
                                    {achievements.map((a, idx) => {
                                        const isEditing = editingItems.achievements.has(idx.toString());
                                        return (
                                            <S.AchievementItem key={idx}>
                                                {isEditing ? (
                                                    <>
                                                        <S.AchievementInput
                                                            value={a.role}
                                                            placeholder="Your role"
                                                            onChange={(e) => {
                                                                const updated = [...achievements];
                                                                updated[idx].role = e.target.value;
                                                                setAchievements(updated);
                                                            }}
                                                        />
                                                        <S.AchievementInput
                                                            value={a.achievement}
                                                            placeholder="Achievement description"
                                                            onChange={(e) => {
                                                                const updated = [...achievements];
                                                                updated[idx].achievement = e.target.value;
                                                                setAchievements(updated);
                                                            }}
                                                        />
                                                        <S.IconButton
                                                            onClick={() => toggleEditItem('achievements', idx)}
                                                            title="Save"
                                                        >
                                                            <FaSave size={14} />
                                                        </S.IconButton>
                                                    </>
                                                ) : (
                                                    <>
                                                        <S.AchievementText>{a.role}</S.AchievementText>
                                                        <S.AchievementText>{a.achievement}</S.AchievementText>
                                                        <S.IconButton
                                                            onClick={() => toggleEditItem('achievements', idx)}
                                                            title="Edit"
                                                        >
                                                            <FaEdit size={14} />
                                                        </S.IconButton>
                                                    </>
                                                )}
                                                <S.IconButton
                                                    onClick={() => isEditing ? toggleEditItem('achievements', idx) : handleRemoveAchievement(idx)}
                                                    $danger={!isEditing}
                                                    $secondary={isEditing}
                                                    title={isEditing ? "Cancel" : "Remove"}
                                                >
                                                    {isEditing ? <FaTimes size={14} /> : <FaTrash size={14} />}
                                                </S.IconButton>
                                            </S.AchievementItem>
                                        );
                                    })}
                                    {achievements.length === 0 && (
                                        <S.EmptyState>
                                            No achievements yet. Add your first one below!
                                        </S.EmptyState>
                                    )}
                                </S.AchievementList>)}
                        </S.Section>
                    </>
                );

            case 'education':
                return (
                    <>
                        <S.AddForm>
                            <S.SectionTitle>Add New Education</S.SectionTitle>

                            {/* First Row: Title and Institution */}
                            {/* First Row: Title and Institution */}
                            <S.FormRowColumns>
                                <S.InputGroup>
                                    <S.InputLabel>Title *: </S.InputLabel>
                                    <S.StyledInput
                                        placeholder="e.g., Bachelor's Degree in Computer Science"
                                        value={newEducation.title}
                                        onChange={(e) => setNewEducation({ ...newEducation, title: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.InputGroup>
                                    <S.InputLabel>Institution *: </S.InputLabel>
                                    <S.StyledInput
                                        placeholder="e.g., Instituto Tecnológico de Cd. Jiménez"
                                        value={newEducation.institution}
                                        onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                                    />
                                </S.InputGroup>
                            </S.FormRowColumns>

                            {/* Second Row: Date Range */}
                            <S.FormRowColumns>
                                <S.InputGroup>
                                    <S.InputLabel>Start Date *: </S.InputLabel>
                                    <S.StyledInput
                                        type="date"
                                        value={newEducation.startDate}
                                        onChange={(e) => {
                                            const updated = {
                                                ...newEducation,
                                                startDate: e.target.value
                                            };
                                            updated.date = formatDateString(updated.startDate, updated.endDate);
                                            setNewEducation(updated);
                                        }}
                                    />
                                </S.InputGroup>

                                <S.InputGroup>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.125rem', width: '100%' }}>
                                        <S.InputLabel style={{ margin: 0, width: '60%' }}>End Date *: </S.InputLabel>
                                    </div>
                                    <S.StyledInput
                                        type="date"
                                        value={newEducation.endDate}
                                        onChange={(e) => {
                                            const updated = {
                                                ...newEducation,
                                                endDate: e.target.value
                                            };
                                            updated.date = formatDateString(updated.startDate, updated.endDate)
                                            setNewEducation(updated);
                                        }}
                                    />
                                </S.InputGroup>
                            </S.FormRowColumns>

                            {/* Third Row: Display Date */}
                            <S.FormRow>
                                <S.InputGroup style={{ flex: 1.5 }}>
                                    <S.InputLabel>Display Date: </S.InputLabel>
                                    <S.DateDisplay>
                                        {newEducation.date || "Auto-generated date range"}
                                    </S.DateDisplay>
                                </S.InputGroup>
                                <S.AddButton
                                    onClick={handleAddEducation}
                                    disabled={!newEducation.title || !newEducation.institution || !newEducation.startDate || !newEducation.endDate}
                                >
                                    Add Education +
                                </S.AddButton>
                            </S.FormRow>


                        </S.AddForm>

                        <S.Section>
                            <S.SectionTitle onClick={() => toggleCurrentSection('education')}>
                                {openCurrentSections.has('education') ? '▼' : '▶'} Current Education ( {education.length} )
                            </S.SectionTitle>
                            {openCurrentSections.has('education') && (
                                <S.AchievementList>
                                    {education.map((edu, idx) => {
                                        const isEditing = editingItems.education.has(idx.toString());
                                        return (
                                            <S.AchievementItem key={edu.id || idx}>
                                                {isEditing ? (
                                                    <>
                                                        <S.AchievementInput
                                                            value={edu.title}
                                                            placeholder="Degree title"
                                                            onChange={(e) => {
                                                                const updated = [...education];
                                                                updated[idx].title = e.target.value;
                                                                setEducation(updated);
                                                            }}
                                                        />
                                                        <S.AchievementInput
                                                            value={edu.date}
                                                            placeholder="Date range"
                                                            onChange={(e) => {
                                                                const updated = [...education];
                                                                updated[idx].date = e.target.value;
                                                                setEducation(updated);
                                                            }}
                                                        />
                                                        <S.AchievementInput
                                                            value={edu.institution}
                                                            placeholder="Institution name"
                                                            onChange={(e) => {
                                                                const updated = [...education];
                                                                updated[idx].institution = e.target.value;
                                                                setEducation(updated);
                                                            }}
                                                        />
                                                        <S.IconButton
                                                            onClick={() => toggleEditItem('education', idx)}
                                                            title="Save"
                                                        >
                                                            <FaSave size={14} />
                                                        </S.IconButton>
                                                    </>
                                                ) : (
                                                    <>
                                                        <S.AchievementText>{edu.title}</S.AchievementText>
                                                        <S.AchievementText>{edu.date}</S.AchievementText>
                                                        <S.AchievementText>{edu.institution}</S.AchievementText>
                                                        <S.IconButton
                                                            onClick={() => toggleEditItem('education', idx)}
                                                            title="Edit"
                                                        >
                                                            <FaEdit size={14} />
                                                        </S.IconButton>
                                                    </>
                                                )}
                                                <S.IconButton
                                                    onClick={() => isEditing ? toggleEditItem('education', idx) : handleRemoveEducation(idx)}
                                                    $danger={!isEditing}
                                                    $secondary={isEditing}
                                                    title={isEditing ? "Cancel" : "Remove"}
                                                >
                                                    {isEditing ? <FaTimes size={14} /> : <FaTrash size={14} />}
                                                </S.IconButton>
                                            </S.AchievementItem>
                                        );
                                    })}
                                    {education.length === 0 && (
                                        <S.EmptyState>
                                            No education entries yet. Add your first one below!
                                        </S.EmptyState>
                                    )}
                                </S.AchievementList>)}
                        </S.Section>
                    </>
                );

            case 'experience':
                return (
                    <>
                        <S.AddForm>
                            <S.SectionTitle>Add New Experience</S.SectionTitle>

                            {/* Company & Position - Top Row */}
                            <S.FormRow>
                                <S.InputGroup style={{ flex: 2 }}>
                                    <S.InputLabel>Company *: </S.InputLabel>
                                    <S.StyledInput
                                        placeholder="Company name"
                                        value={newExperience.company}
                                        onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.InputGroup style={{ flex: 2 }}>
                                    <S.InputLabel>Position *: </S.InputLabel>
                                    <S.StyledInput
                                        placeholder="Your position/role"
                                        value={newExperience.position}
                                        onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.InputGroup style={{ flex: 1 }}>
                                    <S.InputLabel>Industry: </S.InputLabel>
                                    <S.StyledInput
                                        placeholder="e.g., Tech, Finance"
                                        value={newExperience.industry}
                                        onChange={(e) => setNewExperience({ ...newExperience, industry: e.target.value })}
                                    />
                                </S.InputGroup>
                            </S.FormRow>

                            {/* Date Range - Improved Layout */}
                            <S.FormRow>
                                <S.InputGroup style={{ flex: 1 }}>
                                    <S.InputLabel>Start Date *: </S.InputLabel>
                                    <S.StyledInput
                                        type="date"
                                        value={newExperience.startDate}
                                        onChange={(e) => {
                                            const updated = {
                                                ...newExperience,
                                                startDate: e.target.value
                                            };
                                            updated.date = formatDateString(updated.startDate, updated.endDate, updated.isCurrent);
                                            updated.period = calculateDuration(updated.startDate, updated.endDate, updated.isCurrent);
                                            setNewExperience(updated);
                                        }}
                                    />
                                </S.InputGroup>

                                <S.InputGroup style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.125rem', width: '100%' }}>
                                        <S.InputLabel style={{ margin: 0, width: '60%' }}>End Date *: </S.InputLabel>
                                        <S.CurrentJobLabel style={{ margin: 0 }}>

                                            <S.ToggleContainer>

                                                <S.CurrentJobText>
                                                    Current Job
                                                </S.CurrentJobText>

                                                <S.ToggleInput
                                                    type="checkbox"
                                                    checked={newExperience.isCurrent}
                                                    onChange={(e) => {
                                                        const updated = {
                                                            ...newExperience,
                                                            isCurrent: e.target.checked,
                                                            endDate: e.target.checked ? '' : newExperience.endDate
                                                        };
                                                        updated.date = formatDateString(updated.startDate, updated.endDate, updated.isCurrent);
                                                        updated.period = calculateDuration(updated.startDate, updated.endDate, updated.isCurrent);
                                                        setNewExperience(updated);
                                                    }}
                                                />

                                                <S.ToggleSwitch $isChecked={newExperience.isCurrent || false} />

                                            </S.ToggleContainer>

                                        </S.CurrentJobLabel>

                                    </div>

                                    {newExperience.isCurrent ? (
                                        <S.CurrentJobPlaceholder>Present</S.CurrentJobPlaceholder>
                                    ) : (
                                        <S.StyledInput
                                            type="date"
                                            value={newExperience.endDate}
                                            onChange={(e) => {
                                                const updated = {
                                                    ...newExperience,
                                                    endDate: e.target.value
                                                };
                                                updated.date = formatDateString(updated.startDate, updated.endDate, updated.isCurrent);
                                                updated.period = calculateDuration(updated.startDate, updated.endDate, updated.isCurrent);
                                                setNewExperience(updated);
                                            }}
                                        />
                                    )}
                                </S.InputGroup>

                                <S.InputGroup style={{ flex: 1.5 }}>
                                    <S.InputLabel>Display Date: </S.InputLabel>
                                    <S.DateDisplay>
                                        {newExperience.date || "Auto-generated date range"}
                                    </S.DateDisplay>
                                    {/* <S.HelpText>This will auto-update based on your dates</S.HelpText> */}
                                </S.InputGroup>

                            </S.FormRow>

                            {/* Project & Description */}
                            <S.FormRow>
                                <S.InputGroup style={{ flex: 1 }}>
                                    <S.InputLabel>Project: </S.InputLabel>
                                    <S.StyledInput
                                        placeholder="Project name (optional)"
                                        value={newExperience.project}
                                        onChange={(e) => setNewExperience({ ...newExperience, project: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.InputGroup style={{ flex: 1 }}>
                                    <S.InputLabel>Duration: </S.InputLabel>
                                    <S.DateDisplay>
                                        {newExperience.period || "Auto-calculated duration"}
                                    </S.DateDisplay>
                                </S.InputGroup>
                            </S.FormRow>

                            <S.InputGroup>
                                <S.InputLabel>Role Description: </S.InputLabel>
                                <S.StyledTextArea
                                    placeholder="Describe your responsibilities, contributions, and achievements in this role..."
                                    value={newExperience.description}
                                    onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                                    rows={4}
                                />
                            </S.InputGroup>

                            {/* Achievements Section */}
                            <S.ArraySection>
                                <S.SectionHeader>
                                    <S.InputLabel>Achievements: </S.InputLabel>
                                    <S.SmallButton onClick={addAchievementField}>+ Add Achievement</S.SmallButton>
                                </S.SectionHeader>
                                {newExperience.achievements.map((achievement, index) => (
                                    <S.ArrayInputRow key={index}>
                                        <S.ArrayIndex>{index + 1}.</S.ArrayIndex>
                                        <S.StyledInput
                                            placeholder={`Describe achievement ${index + 1}...`}
                                            value={achievement}
                                            onChange={(e) => updateAchievementField(index, e.target.value)}
                                        />
                                        <S.SmallButton
                                            $danger
                                            onClick={() => removeAchievementField(index)}
                                            disabled={newExperience.achievements.length === 1}
                                        >
                                            Remove
                                        </S.SmallButton>
                                    </S.ArrayInputRow>
                                ))}
                            </S.ArraySection>

                            {/* Technologies Section */}
                            <S.ArraySection>
                                <S.SectionHeader>
                                    <S.InputLabel>Technologies & Skills: </S.InputLabel>
                                    <S.SmallButton onClick={addTechnologyField}>+ Add Technology</S.SmallButton>
                                </S.SectionHeader>
                                {newExperience.technologies.map((technology, index) => (
                                    <S.ArrayInputRow key={index}>
                                        <S.ArrayIndex>{index + 1}.</S.ArrayIndex>
                                        <S.StyledInput
                                            placeholder={`Technology ${index + 1} (e.g., React, Node.js)`}
                                            value={technology}
                                            onChange={(e) => updateTechnologyField(index, e.target.value)}
                                        />
                                        <S.SmallButton
                                            $danger
                                            onClick={() => removeTechnologyField(index)}
                                            disabled={newExperience.technologies.length === 1}
                                        >
                                            Remove
                                        </S.SmallButton>
                                    </S.ArrayInputRow>
                                ))}
                            </S.ArraySection>

                            <S.AddButton
                                onClick={handleAddExperience}
                                disabled={!newExperience.company || !newExperience.position || !newExperience.startDate || (!newExperience.isCurrent && !newExperience.endDate)}
                                style={{ marginTop: '1rem' }}
                            >
                                Add Experience +
                            </S.AddButton>
                        </S.AddForm >
                        {/* Rest of the current experience list remains the same */}
                    </>
                );

            case 'skills':
                return (
                    <>
                        <S.AddForm>
                            <S.SectionTitle>Add New Skill</S.SectionTitle>
                            <S.FormRow>
                                <S.InputRow>
                                    <S.InputGroup>
                                        <S.InputLabel>Skill Name</S.InputLabel>
                                        <S.StyledInput
                                            placeholder="e.g., React, TypeScript"
                                            value={newSkill.name}
                                            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                        />
                                    </S.InputGroup>

                                    <S.InputGroup>
                                        <S.InputLabel>Category</S.InputLabel>
                                        <S.SelectWrapper>
                                            <S.StyledSelect
                                                value={newSkill.category}
                                                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                                            >
                                                <option value="frontend">Libraries & Frameworks</option>
                                                <option value="backend">Backend & APIs</option>
                                                <option value="cloud">Infrastructure & Tools</option>
                                                <option value="testing">Testing & QA</option>
                                                <option value="design">Design & UI/UX</option>
                                            </S.StyledSelect>
                                        </S.SelectWrapper>
                                    </S.InputGroup>
                                </S.InputRow>

                                <S.SliderContainer>
                                    <S.SliderHeader>
                                        <S.InputLabel>Skill Level</S.InputLabel>
                                        <S.PercentValue>{newSkill.percent}%</S.PercentValue>
                                    </S.SliderHeader>
                                    <S.SliderTrack
                                        onClick={handleSliderClick}
                                        ref={sliderTrackRef}
                                    >
                                        <S.SliderProgress $percent={newSkill.percent} />
                                        <S.SliderThumb
                                            $percent={newSkill.percent}
                                            onMouseDown={handleThumbMouseDown}
                                            onTouchStart={handleThumbTouchStart}
                                        />
                                    </S.SliderTrack>
                                </S.SliderContainer>

                                <S.AddButton onClick={handleAddSkill} disabled={isAddSkillDisabled}>
                                    Add Skill +
                                </S.AddButton>
                            </S.FormRow>
                        </S.AddForm>

                        <S.Section>
                            <S.SectionTitle onClick={() => toggleCurrentSection('skills')}>
                                {openCurrentSections.has('skills') ? '▼' : '▶'}  Current Skills   ( {skills.length} )
                            </S.SectionTitle>
                            {openCurrentSections.has('skills') && (
                                <S.AchievementList>
                                    {skills.map((skill, idx) => {
                                        const isEditing = editingItems.skills.has(idx.toString());
                                        return (
                                            <S.AchievementItem key={skill.id || idx}>
                                                {isEditing ? (
                                                    <>
                                                        <S.AchievementInput
                                                            value={skill.name}
                                                            placeholder="Skill name"
                                                            onChange={(e) => {
                                                                const updated = [...skills];
                                                                updated[idx].name = e.target.value;
                                                                setSkills(updated);
                                                            }}
                                                        />
                                                        <S.AchievementInput
                                                            type="number"
                                                            value={skill.percent}
                                                            placeholder="Percent"
                                                            onChange={(e) => {
                                                                const updated = [...skills];
                                                                updated[idx].percent = parseInt(e.target.value) || 0;
                                                                setSkills(updated);
                                                            }}
                                                        />
                                                        <S.AchievementInput
                                                            value={skill.category}
                                                            placeholder="Category"
                                                            onChange={(e) => {
                                                                const updated = [...skills];
                                                                updated[idx].category = e.target.value;
                                                                setSkills(updated);
                                                            }}
                                                        />
                                                        <S.IconButton
                                                            onClick={() => toggleEditItem('skills', idx)}
                                                            title="Save"
                                                        >
                                                            <FaSave size={14} />
                                                        </S.IconButton>
                                                    </>
                                                ) : (
                                                    <>
                                                        <S.AchievementText>{skill.name}</S.AchievementText>
                                                        <S.AchievementText>{skill.percent}%</S.AchievementText>
                                                        <S.AchievementText>{skill.category}</S.AchievementText>
                                                        <S.IconButton
                                                            onClick={() => toggleEditItem('skills', idx)}
                                                            title="Edit"
                                                        >
                                                            <FaEdit size={14} />
                                                        </S.IconButton>
                                                    </>
                                                )}
                                                <S.IconButton
                                                    onClick={() => isEditing ? toggleEditItem('skills', idx) : handleRemoveSkill(idx)}
                                                    $danger={!isEditing}
                                                    $secondary={isEditing}
                                                    title={isEditing ? "Cancel" : "Remove"}
                                                >
                                                    {isEditing ? <FaTimes size={14} /> : <FaTrash size={14} />}
                                                </S.IconButton>
                                            </S.AchievementItem>
                                        );
                                    })}
                                    {skills.length === 0 && (
                                        <S.EmptyState>
                                            No skills yet. Add your first one below!
                                        </S.EmptyState>
                                    )}
                                </S.AchievementList>)}
                        </S.Section>
                    </>
                );

            case 'projects':
                return (
                    <>
                        <S.AddForm>
                            <S.SectionTitle>Add New Project</S.SectionTitle>
                            <S.FormRow>
                                <S.InputGroup>
                                    <S.InputLabel>Project Image: </S.InputLabel>
                                    <S.ImageInputContainer>
                                        <S.StyledInput
                                            placeholder="/images/project-preview.png"
                                            value={newProject.image}
                                            onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                                        />
                                        <S.UploadButton type="button" onClick={() => document.getElementById('file-input')?.click()}>
                                            Upload
                                        </S.UploadButton>
                                        <input
                                            id="file-input"
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    // Handle file upload or base64 conversion
                                                    const reader = new FileReader();
                                                    reader.onload = (event) => {
                                                        if (event.target?.result) {
                                                            setNewProject({ ...newProject, image: event.target.result as string });
                                                        }
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </S.ImageInputContainer>
                                    {newProject.image && newProject.image.startsWith('data:image') && (
                                        <S.ImagePreview>
                                            <img src={newProject.image} alt="Preview" style={{ maxWidth: '200px', maxHeight: '150px' }} />
                                        </S.ImagePreview>
                                    )}
                                </S.InputGroup>
                                <S.InputGroup>
                                    <S.InputLabel>Title: </S.InputLabel>
                                    <S.StyledInput
                                        placeholder="Project Title"
                                        value={newProject.title}
                                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.InputGroup>
                                    <S.InputLabel>Description: </S.InputLabel>
                                    <S.StyledInput
                                        placeholder="Project description"
                                        value={newProject.description}
                                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.InputGroup>
                                    <S.InputLabel>Tags: </S.InputLabel>
                                    <S.StyledInput
                                        placeholder="React,TypeScript,SCSS"
                                        value={newProject.tags}
                                        onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.InputGroup>
                                    <S.InputLabel>Source URL: </S.InputLabel>
                                    <S.StyledInput
                                        placeholder="https://github.com/username/project"
                                        value={newProject.source}
                                        onChange={(e) => setNewProject({ ...newProject, source: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.AddButton onClick={handleAddProject} disabled={!newProject.title || !newProject.description || !newProject.image}>
                                    Add Project +
                                </S.AddButton>
                            </S.FormRow>
                        </S.AddForm>

                        <S.Section>
                            <S.SectionTitle onClick={() => toggleCurrentSection('projects')}>
                                {openCurrentSections.has('projects') ? '▼' : '▶'} Current Projects ( {projects.length} )
                            </S.SectionTitle>
                            {openCurrentSections.has('projects') && (
                                <S.AchievementList>
                                    {projects.map((project, idx) => {
                                        const isEditing = editingItems.projects.has(idx.toString());
                                        return (
                                            <S.AchievementItem key={project.id || idx}>
                                                {isEditing ? (
                                                    <>
                                                        <S.AchievementInput
                                                            value={project.image}
                                                            placeholder="Image URL"
                                                            onChange={(e) => {
                                                                const updated = [...projects];
                                                                updated[idx].image = e.target.value;
                                                                setProjects(updated);
                                                            }}
                                                        />
                                                        <S.AchievementInput
                                                            value={project.title}
                                                            placeholder="Project title"
                                                            onChange={(e) => {
                                                                const updated = [...projects];
                                                                updated[idx].title = e.target.value;
                                                                setProjects(updated);
                                                            }}
                                                        />
                                                        <S.AchievementInput
                                                            value={project.description}
                                                            placeholder="Project description"
                                                            onChange={(e) => {
                                                                const updated = [...projects];
                                                                updated[idx].description = e.target.value;
                                                                setProjects(updated);
                                                            }}
                                                        />
                                                        <S.AchievementInput
                                                            value={project.tags}
                                                            placeholder="React,TypeScript,SCSS"
                                                            onChange={(e) => {
                                                                const updated = [...projects];
                                                                updated[idx].tags = e.target.value;
                                                                setProjects(updated);
                                                            }}
                                                        />
                                                        <S.AchievementInput
                                                            value={project.source}
                                                            placeholder="Source URL"
                                                            onChange={(e) => {
                                                                const updated = [...projects];
                                                                updated[idx].source = e.target.value;
                                                                setProjects(updated);
                                                            }}
                                                        />
                                                        <S.IconButton
                                                            onClick={() => toggleEditItem('projects', idx)}
                                                            title="Save"
                                                        >
                                                            <FaSave size={14} />
                                                        </S.IconButton>
                                                    </>
                                                ) : (
                                                    <>
                                                        <S.ImagePreview>
                                                            <img src={project.image} alt={project.title} onError={(e) => {
                                                                e.currentTarget.style.display = 'none';
                                                            }} />
                                                        </S.ImagePreview>
                                                        <S.AchievementText>{project.title}</S.AchievementText>
                                                        <S.AchievementTextArea >
                                                            {project.description}
                                                        </S.AchievementTextArea>
                                                        <S.AchievementText $scrollY>
                                                            {String(project.tags || '')
                                                                .split(',')
                                                                .map((tag) => tag.trim())
                                                                .join(', ')}
                                                        </S.AchievementText>
                                                        <S.AchievementText $linkText as="a" href={project.source} target="_blank" rel="noopener noreferrer">
                                                            {project.source}
                                                        </S.AchievementText>
                                                        <S.IconButton
                                                            onClick={() => toggleEditItem('projects', idx)}
                                                            title="Edit"
                                                        >
                                                            <FaEdit size={14} />
                                                        </S.IconButton>
                                                    </>
                                                )}
                                                <S.IconButton
                                                    onClick={() => isEditing ? toggleEditItem('projects', idx) : handleRemoveProject(idx)}
                                                    $danger={!isEditing}
                                                    $secondary={isEditing}
                                                    title={isEditing ? "Cancel" : "Remove"}
                                                >
                                                    {isEditing ? <FaTimes size={14} /> : <FaTrash size={14} />}
                                                </S.IconButton>
                                            </S.AchievementItem>
                                        );
                                    })}
                                    {projects.length === 0 && (
                                        <S.EmptyState>
                                            No projects yet. Add your first one below!
                                        </S.EmptyState>
                                    )}
                                </S.AchievementList>)}
                        </S.Section>
                    </>
                );

            default:
                return (
                    <S.EmptyState>
                        Click on a section in the preview to start editing
                    </S.EmptyState>
                );
        }
    };

    return (
        <S.Container>
            {/* Left: Editor Panel */}
            <S.EditorPanel>
                <S.PanelHeader>
                    <S.Title>
                        {activeSection ? `Edit ${activeSection}` : 'Edit Portfolio'}
                    </S.Title>
                </S.PanelHeader>

                {renderSectionContent()}

                {activeSection && (
                    <S.ActionBar>
                        {status && (
                            <S.StatusMessage $success={status.success}>
                                {status.message}
                            </S.StatusMessage>
                        )}
                        <S.SaveButton onClick={handleSave}>
                            Save {activeSection}
                        </S.SaveButton>
                    </S.ActionBar>
                )}
            </S.EditorPanel>

            {/* Right: Preview Panel */}
            <S.PreviewPanel>
                <S.PreviewHeader>
                    <S.PreviewTitle>Live Preview</S.PreviewTitle>
                </S.PreviewHeader>

                <S.DataContainer>
                    {Object.keys(portfolioData).length === 0 ? (
                        <S.EmptyState>
                            No portfolio data loaded
                        </S.EmptyState>
                    ) : (
                        Object.keys(portfolioData).sort().map((key) => (
                            <S.AccordionSection key={key}>
                                <S.AccordionHeader onClick={() => toggleSection(key)}>
                                    <S.AccordionTitle className={openSections.has(key) ? 'open' : ''}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </S.AccordionTitle>
                                    {Array.isArray(portfolioData[key]) && (
                                        <S.AccordionCount>
                                            {portfolioData[key].length} items
                                        </S.AccordionCount>
                                    )}
                                </S.AccordionHeader>
                                {openSections.has(key) && (
                                    <S.AccordionContent>
                                        {Array.isArray(portfolioData[key]) ? (
                                            portfolioData[key].map((item: any, i: number) => (
                                                <S.DataItem key={i}>
                                                    {typeof item === "object" ? (
                                                        Object.keys(item).map((k) => (
                                                            <div key={k}>
                                                                <S.DataKey>{k}:</S.DataKey>
                                                                <S.DataValue>
                                                                    {k === "tags" ? (
                                                                        Array.isArray(item[k]) ? item[k].join(', ') : String(item[k])
                                                                    ) : (
                                                                        String(item[k])
                                                                    )}
                                                                </S.DataValue>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <S.DataValue>{item.toString()}</S.DataValue>
                                                    )}
                                                </S.DataItem>
                                            ))
                                        ) : (
                                            <S.DataItem>
                                                <S.DataValue>{portfolioData[key].toString()}</S.DataValue>
                                            </S.DataItem>
                                        )}
                                    </S.AccordionContent>
                                )}
                            </S.AccordionSection>
                        ))
                    )}
                </S.DataContainer>
            </S.PreviewPanel>
        </S.Container>
    );
};

export default EditPortfolio;