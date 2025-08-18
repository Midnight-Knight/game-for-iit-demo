import s from './App.module.css';
import { useState, useEffect } from "react";
import { RESULTS } from "./configs/results.config";
import type { Elements } from "./types/results.types";
import Draggable from "./components/DraggableItem/DraggableItem";
import Slider from "./components/Slider/Slider";
import Modal from "./components/Modals/Modal.tsx";
import Header from "./components/Header/Header.tsx";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "./configs/messages.config.ts";
import Stopwatch from "./components/Stopwatch/Stopwatch.tsx";
import { motion, AnimatePresence } from "framer-motion";
import { calculateScore } from "./utils/calculateScore";
import { randomMessage } from "./utils/randomMessage.ts";
import { mix } from "./utils/mix.ts";
import { getVisibleCount } from "./utils/getVisibleCount.ts";
import ModalFinal from "./components/Modals/ModalFinal/ModalFinal.tsx";
import Gears from "./components/Gears/Gears.tsx";
import DropzoneSlider from "./components/DropzoneLayout/DropzoneLayout.tsx";

type Recipe = {
    id: number;
    level: number;
    class: number[];
    points: number;
    name: string;
    description: string;
    image: string;
    drawing: string;
    elements: Elements[];
    dependsOn: number[];
    completed: boolean;
};


function App() {
    const successMessages = SUCCESS_MESSAGES;
    const errorMessages = ERROR_MESSAGES;

    const [play, setPlay] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [dragItems, setDragItems] = useState<(Elements | null)[]>([]);
    const [droppedByZone, setDroppedByZone] = useState<Record<number, Elements | null>>({});
    const [result, setResult] = useState<{ isSuccess?: boolean } & Record<number, boolean>>({});
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [stopTime, setStopTime] = useState(false);
    const [scorePerStep, setScorePerStep] = useState<number[]>([]);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);
    const [startTime, setStartTime] = useState<number>(Date.now());
    const [initialShuffled, setInitialShuffled] = useState<Elements[]>([]);

    const [availableRecipes, setAvailableRecipes] = useState<typeof RESULTS>([]);
    const [completedRecipesIds, setCompletedRecipesIds] = useState<number[]>([]);
    const [visibleCount, setVisibleCount] = useState(getVisibleCount());

    function canUnlockRecipe(
        recipe: Recipe,
        completed: number[],
        allRecipes: Recipe[]
    ): boolean {
        const depsOk = recipe.dependsOn.every(id => completed.includes(id));

        if (!recipe.class || recipe.class.length === 0) return depsOk;

        const cls = Math.min(...recipe.class);
        const lvl = recipe.level;

        const prevLevels = allRecipes.filter(
            r => r.class?.includes(cls) && r.level < lvl
        );

        const prevDone = prevLevels.every(r => completed.includes(r.id));

        return depsOk && prevDone;
    }

    useEffect(() => {
        const filtered = RESULTS.filter(r =>
            //@ts-ignore
            canUnlockRecipe(r, completedRecipesIds, RESULTS)
        );

        const sorted = filtered.sort((a, b) => {
            const classA = Math.min(...a.class);
            const classB = Math.min(...b.class);

            if (classA !== classB) return classA - classB;
            return a.level - b.level;
        });


        setAvailableRecipes(sorted);

        if (stepIndex >= sorted.length) setStepIndex(0);
    }, [completedRecipesIds]);

    const recipe = availableRecipes[stepIndex];
    const correctElements = recipe?.elements.filter(el => el.isCorrect) || [];

    useEffect(() => {
        if (recipe) {
            const shuffledElements = mix(recipe.elements);
            setInitialShuffled(shuffledElements);
            setDragItems(shuffledElements);
            setDroppedByZone({});
            setResult({});
            setStartTime(Date.now());
            setStopTime(false);
        }
    }, [recipe]);

    useEffect(() => {
        const handleResize = () => setVisibleCount(getVisibleCount());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);



    const handleDrop = (zoneId: number, item: Elements) => {
        setDroppedByZone(prev => ({ ...prev, [zoneId]: item }));
        setDragItems(prev => prev.map(el => (el?.id === item.id ? null : el)));
        setResult({});
    };

    const clearDropzone = (zoneId: number) => {
        setDroppedByZone(prev => {
            const newDropped = { ...prev };
            const removedElement = newDropped[zoneId];
            delete newDropped[zoneId];

            if (removedElement) {
                setDragItems(prevDragItems => {
                    const newDragItems = [...prevDragItems];
                    const originalIndex = initialShuffled.findIndex(el => el.id === removedElement.id);
                    if (originalIndex !== -1) newDragItems[originalIndex] = removedElement;
                    else newDragItems.push(removedElement);
                    return newDragItems;
                });
            }
            setResult({});
            return newDropped;
        });
    };

    const check = () => {
        const elapsedTime = Date.now() - startTime;
        setStopTime(true);

        setPlay(true);

        setTimeout(() => {
            const droppedElements = Object.values(droppedByZone).filter(Boolean) as Elements[];
            const correctIds = correctElements.map(e => e.id).sort((a, b) => a - b);
            const droppedIds = droppedElements.map(e => e.id).sort((a, b) => a - b);

            const allCorrectPresent = JSON.stringify(correctIds) === JSON.stringify(droppedIds);

            setResult({ isSuccess: allCorrectPresent });
            setIsOpen(true);

            if (allCorrectPresent) {
                const score = calculateScore(recipe.points!, elapsedTime);
                setScorePerStep(prev => [...prev, score]);

                setCompletedRecipesIds(prev =>
                    prev.includes(recipe.id) ? prev : [...prev, recipe.id]
                );
            }

            setPlay(false);
        }, 3000);
    };


    const nextRecipe = () => {
        setStopTime(false);
        setIsOpen(false);
        setStartTime(Date.now());

        if (stepIndex + 1 < availableRecipes.length) setStepIndex(stepIndex + 1);
        else setIsResultModalOpen(true);
    };

    if (!recipe) return <div>Нет доступных рецептов</div>;

    return (
        <div className={s.app}>
            <Header />

            <div className={s.containerInfo}>
                <div className={s.miniContainerInfo}>
                    <p className={s.info}>Подбери {correctElements.length} правильных компонента и запусти создание</p>
                    <div className={s.time}>
                        <Stopwatch stopTime={stopTime} onStop={() => {}} />
                    </div>
                </div>
            </div>

            <DropzoneSlider
                correctElements={correctElements}
                droppedByZone={droppedByZone}
                onDrop={handleDrop}
                onClear={clearDropzone}
                drawing={recipe.drawing}
                visibleCount={3}
            />

            <Slider
                items={dragItems}
                visibleCount={visibleCount}
                renderItem={(el) => el ? <Draggable element={el} /> : <div className={s.draggablezone}></div>}
            />

            <motion.button
                className={s.checkButton}
                onClick={check}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={Object.keys(droppedByZone).length !== correctElements.length}
            >
                Проверка
            </motion.button>

            <AnimatePresence>
                {result.isSuccess !== undefined && isOpen && (
                    <Modal onClose={() => setIsOpen(false)}>
                        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.3 }}>
                            <div className={s.modalInfo}>
                                <h2>{result.isSuccess ? randomMessage(successMessages) : randomMessage(errorMessages)}</h2>

                                {result.isSuccess && (
                                    <>
                                        <motion.div className={s.modalInfoRecipe} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                            <p className={s.recipeName}>{recipe.name}</p>
                                            <p>{recipe.description}</p>
                                        </motion.div>
                                        <img src={recipe.image} alt={recipe.name} className={s.modalImage} />
                                    </>
                                )}

                                <motion.button
                                    onClick={() => {
                                        if (result.isSuccess) nextRecipe();
                                    }}
                                    className={s.modalButton}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={!result.isSuccess}
                                >
                                    {stepIndex + 1 < availableRecipes.length ? "Попытаться ещё раз" : "Результат"}
                                </motion.button>

                            </div>
                        </motion.div>
                    </Modal>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isResultModalOpen && (
                    <Modal onClose={() => setIsOpen(true)}>
                        <ModalFinal totalScore={scorePerStep} />
                    </Modal>
                )}
            </AnimatePresence>

            <Gears play={play} />
        </div>
    );
}

export default App;
