import { useState, useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import * as S from '../styles/EditPortfolioStyles';

type PortfolioData = { achievements?: Achievement[]; skills?: Skill[];[key: string]: any };
type Achievement = { achievement: string; role: string };
type Skill = {
    name: string;
    percent: number;
    category: string;
    id?: string;
};

const EditPortfolio = () => {
    const [status, setStatus] = useState<{ message: string; success: boolean } | null>(null);
    const [portfolioData, setPortfolioData] = useState<PortfolioData>({});
    const [openSections, setOpenSections] = useState<Set<string>>(new Set());
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [newAchievement, setNewAchievement] = useState({ achievement: "", role: "" });
    const [skills, setSkills] = useState<Skill[]>([]);
    const [newSkill, setNewSkill] = useState<Skill>({
        name: "", percent: 0, category: ""
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

    // Achievement functions
    const handleAdd = () => {
        if (!newAchievement.achievement || !newAchievement.role) {
            setStatus({ message: "Please fill in both fields", success: false });
            return;
        }
        setAchievements([...achievements, newAchievement]);
        setNewAchievement({ achievement: "", role: "" });
        setStatus({ message: "Achievement added!", success: true });
    };

    const handleRemove = (index: number) => {
        const updated = [...achievements];
        updated.splice(index, 1);
        setAchievements(updated);
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
    };

    // Unified save function
    const handleSave = async () => {
        if (!activeSection) return;

        try {
            const dataToSave = activeSection === 'achievements' ? { achievements } :
                activeSection === 'skills' ? { skills } : {};

            const res = await fetch("/api/portfolio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSave),
            });
            const data = await res.json();
            if (data.success) {
                setStatus({ message: `${activeSection} updated successfully! 🎉`, success: true });
                setPortfolioData({ ...portfolioData, ...dataToSave });
            } else {
                throw new Error("Failed to update");
            }
        } catch (error) {
            setStatus({ message: `Error updating ${activeSection}`, success: false });
        }
    };

    const isAddDisabled = !newAchievement.achievement || !newAchievement.role;
    const isAddSkillDisabled = !newSkill.name || !newSkill.category;

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
                                <S.AddButton onClick={handleAdd} disabled={isAddDisabled}>
                                    Add +
                                </S.AddButton>
                            </S.FormRow>
                        </S.AddForm>

                        <S.Section>
                            <S.SectionTitle>Current Achievements ({achievements.length})</S.SectionTitle>
                            <S.AchievementList>
                                {achievements.map((a, idx) => (
                                    <S.AchievementItem key={idx}>
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
                                        <S.RemoveButton onClick={() => handleRemove(idx)}>
                                            Remove
                                        </S.RemoveButton>
                                    </S.AchievementItem>
                                ))}
                                {achievements.length === 0 && (
                                    <S.EmptyState>
                                        No achievements yet. Add your first one below!
                                    </S.EmptyState>
                                )}
                            </S.AchievementList>
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
                            <S.SectionTitle>Current Skills ({skills.length})</S.SectionTitle>
                            <S.AchievementList>
                                {skills.map((skill, idx) => (
                                    <S.AchievementItem key={skill.id || idx}>
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
                                        <S.RemoveButton onClick={() => handleRemoveSkill(idx)}>
                                            Remove
                                        </S.RemoveButton>
                                    </S.AchievementItem>
                                ))}
                                {skills.length === 0 && (
                                    <S.EmptyState>
                                        No skills yet. Add your first one below!
                                    </S.EmptyState>
                                )}
                            </S.AchievementList>
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