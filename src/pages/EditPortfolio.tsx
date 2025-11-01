import { useState, useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import * as S from '../styles/EditPortfolioStyles';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

type PortfolioData = { achievements?: Achievement[]; skills?: Skill[]; education?: Education[];[key: string]: any };

type Education = {
    title: string;
    date: string;
    institution: string;
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
        projects: []
    });
    const [editingItems, setEditingItems] = useState<{ [key: string]: Set<string> }>({
        achievements: new Set(),
        skills: new Set(),
        education: new Set(),
        projects: new Set()
    });

    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [newAchievement, setNewAchievement] = useState({ achievement: "", role: "" });
    const [skills, setSkills] = useState<Skill[]>([]);
    const [newSkill, setNewSkill] = useState<Skill>({
        name: "", percent: 0, category: ""
    });
    const [education, setEducation] = useState<Education[]>([]);
    const [newEducation, setNewEducation] = useState<Education>({
        title: "", date: "", institution: ""
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
            } else if (section === 'projects') {
                newOriginalData[section][index] = { ...projects[index] };
            }

            setOriginalData(newOriginalData);
            sectionSet.add(index.toString());
        }

        newEditingItems[section] = sectionSet;
        setEditingItems(newEditingItems);
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

    // Unified save function
    const handleSave = async () => {
        if (!activeSection) return;

        try {
            const dataToSave = activeSection === 'achievements' ? { achievements } :
                activeSection === 'skills' ? { skills } :
                    activeSection === 'education' ? { education } :
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
                    projects: new Set()
                });
            } else {
                throw new Error("Failed to update");
            }
        } catch (error) {
            setStatus({ message: `Error updating ${activeSection}`, success: false });
        }
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

    const isAddDisabled = !newAchievement.achievement || !newAchievement.role;
    const isAddSkillDisabled = !newSkill.name || !newSkill.category;
    const isAddEducationDisabled = !newEducation.title || !newEducation.date || !newEducation.institution;

    // Render section content based on active section
    const renderSectionContent = () => {
        switch (activeSection) {
            case 'achievements':
                return (
                    <>
                        <S.AddForm>
                            <S.SectionTitle>Add New Achievement</S.SectionTitle>
                            <S.FormRow>
                                <S.InputGroup>
                                    <S.InputLabel>Achievement</S.InputLabel>
                                    <S.StyledInput
                                        placeholder="What did you accomplish?"
                                        value={newAchievement.achievement}
                                        onChange={(e) => setNewAchievement({ ...newAchievement, achievement: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.InputGroup>
                                    <S.InputLabel>Role</S.InputLabel>
                                    <S.StyledInput
                                        placeholder="Your role in this achievement"
                                        value={newAchievement.role}
                                        onChange={(e) => setNewAchievement({ ...newAchievement, role: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.AddButton onClick={handleAddAchievement} disabled={isAddDisabled}>
                                    Add +
                                </S.AddButton>
                            </S.FormRow>
                        </S.AddForm>

                        <S.Section>
                            <S.SectionTitle onClick={() => toggleCurrentSection('achievements')}>
                                Current Achievements ({achievements.length}) {openCurrentSections.has('achievements') ? '▼' : '▶'}
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
                                                            value={a.achievement}
                                                            placeholder="Achievement description"
                                                            onChange={(e) => {
                                                                const updated = [...achievements];
                                                                updated[idx].achievement = e.target.value;
                                                                setAchievements(updated);
                                                            }}
                                                        />
                                                        <S.AchievementInput
                                                            value={a.role}
                                                            placeholder="Your role"
                                                            onChange={(e) => {
                                                                const updated = [...achievements];
                                                                updated[idx].role = e.target.value;
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
                                                        <S.AchievementText>{a.achievement}</S.AchievementText>
                                                        <S.AchievementText>{a.role}</S.AchievementText>
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
                            <S.FormRow>
                                <S.InputGroup>
                                    <S.InputLabel>Title</S.InputLabel>
                                    <S.StyledInput
                                        placeholder="e.g., Bachelor's Degree in Computer Science"
                                        value={newEducation.title}
                                        onChange={(e) => setNewEducation({ ...newEducation, title: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.InputGroup>
                                    <S.InputLabel>Date</S.InputLabel>
                                    <S.StyledInput
                                        placeholder="e.g., 04/2012 - 04/2016"
                                        value={newEducation.date}
                                        onChange={(e) => setNewEducation({ ...newEducation, date: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.InputGroup>
                                    <S.InputLabel>Institution</S.InputLabel>
                                    <S.StyledInput
                                        placeholder="e.g., Instituto Tecnológico de Cd. Jiménez"
                                        value={newEducation.institution}
                                        onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.AddButton onClick={handleAddEducation} disabled={isAddEducationDisabled}>
                                    Add Education +
                                </S.AddButton>
                            </S.FormRow>
                        </S.AddForm>

                        <S.Section>
                            <S.SectionTitle onClick={() => toggleCurrentSection('education')}>
                                Current Education ({education.length}) {openCurrentSections.has('education') ? '▼' : '▶'}
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

            case 'skills':
                return (
                    <>
                        <S.AddForm>
                            <S.SectionTitle>Add New Skill</S.SectionTitle>
                            <S.FormRow>
                                <S.InputGroup>
                                    <S.InputLabel>Skill Name</S.InputLabel>
                                    <S.StyledInput
                                        placeholder="e.g., React, TypeScript"
                                        value={newSkill.name}
                                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.InputGroup>
                                    <S.InputLabel>Percent (0-100)</S.InputLabel>
                                    <S.StyledInput
                                        type="number"
                                        min="0"
                                        max="100"
                                        placeholder="85"
                                        value={newSkill.percent}
                                        onChange={(e) => setNewSkill({ ...newSkill, percent: parseInt(e.target.value) || 0 })}
                                    />
                                </S.InputGroup>
                                <S.InputGroup>
                                    <S.InputLabel>Category</S.InputLabel>
                                    <S.StyledInput
                                        placeholder="e.g., frontend, backend"
                                        value={newSkill.category}
                                        onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.AddButton onClick={handleAddSkill} disabled={isAddSkillDisabled}>
                                    Add Skill +
                                </S.AddButton>
                            </S.FormRow>
                        </S.AddForm>

                        <S.Section>
                            <S.SectionTitle onClick={() => toggleCurrentSection('skills')}>
                                Current Skills ({skills.length}) {openCurrentSections.has('skills') ? '▼' : '▶'}
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
                                    <S.InputLabel>Image URL</S.InputLabel>
                                    <S.StyledInput
                                        placeholder="/images/project-preview.png"
                                        value={newProject.image}
                                        onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.InputGroup>
                                    <S.InputLabel>Title</S.InputLabel>
                                    <S.StyledInput
                                        placeholder="Project Title"
                                        value={newProject.title}
                                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.InputGroup>
                                    <S.InputLabel>Description</S.InputLabel>
                                    <S.StyledInput
                                        placeholder="Project description"
                                        value={newProject.description}
                                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.InputGroup>
                                    <S.InputLabel>Tags</S.InputLabel>
                                    <S.StyledInput
                                        placeholder="React,TypeScript,SCSS"
                                        value={newProject.tags}
                                        onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                                    />
                                </S.InputGroup>
                                <S.InputGroup>
                                    <S.InputLabel>Source URL</S.InputLabel>
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
                                Current Projects ({projects.length}) {openCurrentSections.has('projects') ? '▼' : '▶'}
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
                                                        <S.AchievementText $scrollY={true} >
                                                            {String(project.tags || '').split(',').map(tag => tag.trim()).join(', ')}
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
                        Object.keys(portfolioData).map((key) => (
                            <S.AccordionSection key={key}>
                                <S.AccordionHeader onClick={() => toggleSection(key)}>
                                    <S.AccordionTitle className={openSections.has(key) ? 'open' : ''}>
                                        {key}
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
                                                                <S.DataValue>{item[k]}</S.DataValue>
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