import { useState, useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import * as S from './EditPortfoliostyles';

type Achievement = { achievement: string; role: string };
type PortfolioData = { achievements?: Achievement[];[key: string]: any };

const EditPortfolio = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [newAchievement, setNewAchievement] = useState({ achievement: "", role: "" });
    const [status, setStatus] = useState<{ message: string; success: boolean } | null>(null);
    const [portfolioData, setPortfolioData] = useState<PortfolioData>({});
    const [openSections, setOpenSections] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'portfolio', 'main_data');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const firebaseData = docSnap.data().data || {};
                    setAchievements(firebaseData.achievements || []);
                    setPortfolioData(firebaseData);
                    // Open all sections by default
                    setOpenSections(new Set(Object.keys(firebaseData)));
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
        } else {
            newOpenSections.add(key);
        }
        setOpenSections(newOpenSections);
    };

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

    const handleSave = async () => {
        try {
            const res = await fetch("/api/portfolio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ achievements }),
            });
            const data = await res.json();
            if (data.success) {
                setStatus({ message: "Achievements updated successfully! 🎉", success: true });
                setPortfolioData({ ...portfolioData, achievements });
            } else {
                throw new Error("Failed to update");
            }
        } catch (error) {
            setStatus({ message: "Error updating achievements", success: false });
        }
    };

    const isAddDisabled = !newAchievement.achievement || !newAchievement.role;

    return (
        <S.Container>
            {/* Left: Editor Panel */}
            <S.EditorPanel>
                <S.PanelHeader>
                    <S.Title>Edit Achievements</S.Title>
                </S.PanelHeader>

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

                <S.ActionBar>
                    {status && (
                        <S.StatusMessage $success={status.success}>
                            {status.message}
                        </S.StatusMessage>
                    )}
                    <S.SaveButton onClick={handleSave}>
                        Save Changes
                    </S.SaveButton>
                </S.ActionBar>
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