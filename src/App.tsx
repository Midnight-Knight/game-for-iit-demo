import s from './App.module.css';
import { useState, useEffect } from "react";
import { RESULTS } from "./configs/results.config";
import type { Elements } from "./types/results.types";
import Draggable from "./components/DraggableItem/DraggableItem";
import Dropzone from "./components/Dropzone/Dropzone";
import Slider from "./components/Slider/Slider";
import Modal from "./components/Modals/Modal.tsx";
import Header from "./components/Header/Header.tsx";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "./configs/messages.config.ts";
import BubbleButton from "./components/BubbleButton/BubbleButton.tsx";
import Stopwatch from "./components/Stopwatch/Stopwatch.tsx";
import { motion, AnimatePresence } from "framer-motion";
import LiquidFlask from "./components/Flask/Flask.tsx";
import { calculateScore } from "./utils/calculateScore";
import { MAX_RECIPES } from "./constants/rules.ts";
import { randomMessage } from "./utils/randomMessage.ts";
import { mix } from "./utils/mix.ts";
import { getVisibleCount } from "./utils/getVisibleCount.ts";
import ModalFinal from "./components/Modals/ModalFinal/ModalFinal.tsx";


function App() {
    const successMessages = SUCCESS_MESSAGES;
    const errorMessages = ERROR_MESSAGES;

    const [bubbleActive, setBubbleActive] = useState(false);
    const [shuffledIndexes, setShuffledIndexes] = useState<number[]>([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [dragItems, setDragItems] = useState<(Elements | null)[]>([]);
    const [droppedByZone, setDroppedByZone] = useState<Record<number, Elements | null>>({});
    const [result, setResult] = useState<{ isSuccess?: boolean } & Record<number, boolean>>({});
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [stopTime, setStopTime] = useState(false);
    const [scorePerStep, setScorePerStep] = useState<number[]>([]);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);
    const [startTime, setStartTime] = useState<number>(Date.now());

    useEffect(() => {
        const count = Math.min(MAX_RECIPES, RESULTS.length);
        const indexes = mix([...Array(RESULTS.length).keys()]).slice(0, count);
        setShuffledIndexes(indexes);
        setStepIndex(0);
        setStartTime(Date.now());
    }, []);


    const currentRecipeIndex = shuffledIndexes[stepIndex];
    const recipe = RESULTS[currentRecipeIndex];

    useEffect(() => {
        if (recipe) {
            const shuffledElements = mix(recipe.elements);
            setDragItems(shuffledElements);
            setDroppedByZone({});
            setResult({});
        }
    }, [recipe]);

    const [visibleCount, setVisibleCount] = useState(getVisibleCount());

    useEffect(() => {
        const handleResize = () => {
            setVisibleCount(getVisibleCount());
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (shuffledIndexes.length === 0) return null;

    const correctElements = recipe.elements.filter(el => el.isCorrect);


    const handleDrop = (zoneId: number, item: Elements) => {
        setDroppedByZone(prev => ({ ...prev, [zoneId]: item }));
        setDragItems(prev => prev.map(el => (el?.id === item.id ? null : el)));
        setResult({});
    };


    const runWithBubbles = (callback: () => void) => {
        setBubbleActive(true);
        setTimeout(() => {
            callback();
            setBubbleActive(false);
        }, 3000);
    };


    const check = () => {
        const elapsedTime = Date.now() - startTime;
        setStopTime(true);

        runWithBubbles(() => {
            const res: Record<number, boolean> = {};
            const droppedElements = Object.values(droppedByZone).filter(Boolean) as Elements[];

            const correctIds = correctElements.map(e => e.id).sort((a, b) => a - b);
            const droppedIds = droppedElements.map(e => e.id).sort((a, b) => a - b);

            const allCorrectPresent = JSON.stringify(correctIds) === JSON.stringify(droppedIds);

            if (allCorrectPresent) {
                const score = calculateScore(recipe.points, elapsedTime);
                setScorePerStep(prev => [...prev, score]);
            }

            setResult({ isSuccess: allCorrectPresent, ...res });
            setIsOpen(true);
        });
    };



    const nextRecipe = () => {
        setStopTime(false);
        setIsOpen(false);
        setStartTime(Date.now());
        if (stepIndex + 1 < shuffledIndexes.length) {
            setStepIndex(stepIndex + 1);
        } else {
            const count = Math.min(MAX_RECIPES, RESULTS.length);
            const newIndexes = mix([...Array(RESULTS.length).keys()]).slice(0, count);
            setShuffledIndexes(newIndexes);
            setStepIndex(0);
        }
    };


    const clearDropzone = (zoneId: number) => {
        setDroppedByZone(prev => {
            const newDropped = { ...prev };
            const removedElement = newDropped[zoneId];
            delete newDropped[zoneId];
            if (removedElement) {
                setDragItems(prevDragItems => {
                    const newDragItems = [...prevDragItems];
                    const originalIndex = recipe.elements.findIndex(el => el.id === removedElement.id);
                    if (originalIndex !== -1) {
                        newDragItems[originalIndex] = removedElement;
                    } else {
                        newDragItems.push(removedElement);
                    }
                    return newDragItems;
                });
            }
            setResult({});
            return newDropped;
        });
    };


    return (
        <div className={s.app}>
            <Header />
            <div className={s.containerInfo}>
                <p className={s.countExperiment}>Опыт {stepIndex + 1} из {shuffledIndexes.length}</p>
                <div className={s.miniContainerInfo}>
                    <p className={s.info}>Подбери {correctElements.length} правильных компонента опыта и запусти реакцию</p>
                    <div className={s.time}>
                        <Stopwatch stopTime={stopTime} onStop={() => {}} />
                    </div>
                </div>
            </div>

            {correctElements.length >= 4 ? (
                <div className={s.containerDrop}>
                    <div className={s.dropzoneWrapper}>
                        {correctElements.map((el, index) => {
                            const total = correctElements.length;
                            const radius = correctElements.length >= 5 ? 140 : 120;
                            const angle = (index / (total - 1)) * Math.PI;
                            const x = Math.cos(angle - Math.PI) * radius;
                            const y = Math.sin(angle - Math.PI) * radius;

                            return (
                                <div
                                    key={el.id}
                                    className={s.dropzoneArc}
                                    style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
                                >
                                    <Dropzone
                                        zoneId={el.id}
                                        dropped={droppedByZone[el.id] || null}
                                        onDrop={(item) => handleDrop(el.id, item)}
                                        onClear={() => clearDropzone(el.id)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <LiquidFlask flag={false}/>
                </div>
            ) : (
                <div className={s.miniContainerDrop}>
                    <div className={s.dropzoneList}>
                        {correctElements.map(el => (
                            <Dropzone
                                key={el.id}
                                zoneId={el.id}
                                dropped={droppedByZone[el.id] || null}
                                onDrop={(item) => handleDrop(el.id, item)}
                                onClear={() => clearDropzone(el.id)}
                            />
                        ))}
                    </div>
                    <LiquidFlask flag={true}/>
                </div>
            )}

            <Slider
                items={dragItems}
                visibleCount={visibleCount}
                renderItem={(el) => {
                    if (el === null) {
                        return <div className={s.draggablezone}></div>;
                    }
                    return <Draggable element={el} />;
                }}
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
                    <Modal>
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.3 }}
                        >
                            {result.isSuccess ? (
                                <div className={s.modalInfo}>
                                    <h2>{randomMessage(successMessages)}</h2>
                                    <motion.div
                                        className={s.modalInfoRecipe}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <p className={s.recipeName}>{recipe.name}</p>
                                        <p>{recipe.description}</p>
                                    </motion.div>
                                    <img src={recipe.image} alt={recipe.name} className={s.modalImage} />
                                    {stepIndex + 1 < shuffledIndexes.length && (
                                        <motion.button
                                            onClick={nextRecipe}
                                            className={s.modalButton}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Следующий рецепт →
                                        </motion.button>
                                    )}
                                    {stepIndex + 1 === shuffledIndexes.length && (
                                        <motion.button
                                            onClick={() => {
                                                setIsResultModalOpen(true);
                                                setStopTime(true);
                                                setIsOpen(false);
                                            }}
                                            className={s.modalButton}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Результат
                                        </motion.button>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <h2>{randomMessage(errorMessages)}</h2>
                                    {stepIndex + 1 < shuffledIndexes.length && (
                                        <motion.button
                                            onClick={nextRecipe}
                                            className={s.modalButton}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Следующий рецепт →
                                        </motion.button>
                                    )}
                                    {stepIndex + 1 === shuffledIndexes.length && (
                                        <motion.button
                                            onClick={() => {
                                                setIsResultModalOpen(true);
                                                setStopTime(true);
                                                setIsOpen(false);
                                            }}
                                            className={s.modalButton}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Результат
                                        </motion.button>
                                    )}
                                </div>
                            )}

                        </motion.div>
                    </Modal>
                )}
            </AnimatePresence>


            <AnimatePresence>
                {isResultModalOpen && (
                    <Modal>
                        <ModalFinal totalScore={scorePerStep} />
                    </Modal>
                )}
            </AnimatePresence>


            <BubbleButton active={bubbleActive} />
        </div>
    );
}

export default App;
