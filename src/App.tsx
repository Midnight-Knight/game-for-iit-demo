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

function randomMessage(messages: string[]): string {
    const random = Math.floor(Math.random() * messages.length);
    return messages[random];
}

function fisherYatesShuffle<T>(array: T[]): T[] {
    const newArray = [...array];
    let currentIndex = newArray.length;

    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [newArray[currentIndex], newArray[randomIndex]] = [
            newArray[randomIndex],
            newArray[currentIndex],
        ];
    }

    return newArray;
}

function App() {
    const MAX_RECIPES = 5;
    const successMessages = SUCCESS_MESSAGES;
    const errorMessages = ERROR_MESSAGES;

    const [bubbleActive, setBubbleActive] = useState(false);
    const [shuffledIndexes, setShuffledIndexes] = useState<number[]>([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [dragItems, setDragItems] = useState<(Elements | null)[]>([]);
    const [droppedByZone, setDroppedByZone] = useState<Record<number, Elements | null>>({});
    const [result, setResult] = useState<{ isSuccess?: boolean } & Record<number, boolean>>({});
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const count = Math.min(MAX_RECIPES, RESULTS.length);
        const indexes = fisherYatesShuffle([...Array(RESULTS.length).keys()]).slice(0, count);
        setShuffledIndexes(indexes);
        setStepIndex(0);
    }, []);

    const currentRecipeIndex = shuffledIndexes[stepIndex];
    const recipe = RESULTS[currentRecipeIndex];

    useEffect(() => {
        if (recipe) {
            setDragItems(recipe.elements);
            setDroppedByZone({});
            setResult({});
        }
    }, [recipe]);

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
        runWithBubbles(() => {
            const res: Record<number, boolean> = {};
            const droppedElements = Object.values(droppedByZone).filter(Boolean) as Elements[];

            const correctIds = correctElements.map(e => e.id).sort((a, b) => a - b);
            const droppedIds = droppedElements.map(e => e.id).sort((a, b) => a - b);

            const allCorrectPresent = JSON.stringify(correctIds) === JSON.stringify(droppedIds);

            correctElements.forEach(el => {
                res[el.id] = droppedIds.includes(el.id);
            });

            setResult({ isSuccess: allCorrectPresent, ...res });
            setIsOpen(true);
        });
    };

    const nextRecipe = () => {
        setIsOpen(false);
        if (stepIndex + 1 < shuffledIndexes.length) {
            setStepIndex(stepIndex + 1);
        } else {
            alert("Вы прошли все рецепты!");
            const count = Math.min(MAX_RECIPES, RESULTS.length);
            const newIndexes = fisherYatesShuffle([...Array(RESULTS.length).keys()]).slice(0, count);
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
                <p className={s.info}>Подбери {correctElements.length} правильных компонента опыта и запусти реакцию</p>
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
                    <img src={"/flask.png"} alt="" className={s.flask} />
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
                    <img src={"/flask.png"} alt="" style={{ width: '150px' }} />
                </div>
            )}

            <Slider
                items={dragItems}
                visibleCount={3}
                renderItem={(el) => {
                    if (el === null) {
                        return <div className={s.draggablezone}></div>;
                    }
                    return <Draggable element={el} />;
                }}
            />

            <button
                className={s.checkButton}
                onClick={check}
            >
                Проверка
            </button>

            {result.isSuccess !== undefined && isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    <div>
                        <div>
                            {result.isSuccess ? (
                                <div className={s.modalInfo}>
                                    <h2>{randomMessage(successMessages)}</h2>
                                    <div className={s.modalInfoRecipe}>
                                        <p className={s.recipeName}>{recipe.name}</p>
                                        <p>{recipe.description}</p>
                                    </div>
                                    <img src={recipe.image} alt={recipe.name} className={s.modalImage} />
                                </div>
                            ) : (
                                <div>
                                    <h2>{randomMessage(errorMessages)}</h2>
                                </div>
                            )}
                        </div>
                        {stepIndex + 1 < shuffledIndexes.length && (
                            <button onClick={nextRecipe}>
                                Следующий рецепт →
                            </button>
                        )}
                        {stepIndex + 1 === shuffledIndexes.length && (
                            <button onClick={() => alert("Здесь будет финальный результат")}>
                                Результат
                            </button>
                        )}
                    </div>
                </Modal>
            )}

            <BubbleButton active={bubbleActive} />
        </div>
    );
}

export default App;
