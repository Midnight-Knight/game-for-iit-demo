import s from './App.module.css';
import { useState, useEffect } from "react";
import { RESULTS } from "./configs/results.config";
import type { Elements, Results } from "./types/results.types";
import Draggable from "./components/DraggableItem/DraggableItem";
import Modal from "./components/Modals/Modal.tsx";
import Header from "./components/Header/Header.tsx";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "./configs/messages.config.ts";
import { motion, AnimatePresence } from "framer-motion";
import { randomMessage } from "./utils/randomMessage.ts";
import { mix } from "./utils/mix.ts";
import Gears from "./components/Gears/Gears.tsx";
import DropzoneSlider from "./components/DropzoneLayout/DropzoneLayout.tsx";
import DEFAULT_CHERTEZH from "/default_chertezh.jpg";
import { useIsSmallScreen } from "./hooks/useIsSmallScreen.tsx";
import {
    flip,
    offset,
    shift,
    useFloating,
    useHover,
    useInteractions,
    useRole
} from "@floating-ui/react-dom-interactions";

type Recipe = Results;


function App() {
    const successMessages = SUCCESS_MESSAGES;
    const errorMessages = ERROR_MESSAGES;

    const [play, setPlay] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [dragItems, setDragItems] = useState<(Elements | null)[]>([]);
    const [droppedByZone, setDroppedByZone] = useState<Record<number, Elements | null>>({});
    const [result, setResult] = useState<{ isSuccess?: boolean } & Record<number, boolean>>({});
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);
    const [initialShuffled, setInitialShuffled] = useState<Elements[]>([]);
    const [countTrue, setCountTrue] = useState<string>("");
    const [countFalse, setCountFalse] = useState<string>("");
    const [availableRecipes, setAvailableRecipes] = useState<typeof RESULTS>([]);
    const [completedRecipesIds, setCompletedRecipesIds] = useState<number[]>([]);
    const [discoveredRecipes, setDiscoveredRecipes] = useState<Recipe[]>([]);
    const [isDiscoveredModalOpen, setIsDiscoveredModalOpen] = useState(false);
    const isSmallScreen = useIsSmallScreen();

    function DiscoveredItem({ recipe }: { recipe: Recipe }) {
        const [open, setOpen] = useState(false);
        const { x, y, reference, floating, strategy, context } = useFloating({
            placement: "top",
            open,
            onOpenChange: setOpen,
            middleware: [offset(15), flip(), shift()],
        });

        const hover = useHover(context);
        const role = useRole(context, { role: "tooltip" });
        const interactions = useInteractions([hover, role]);
        return (
            <div>
                <div ref={reference} {...interactions.getReferenceProps()} className={s.discoveredItem}>
                    <img src={recipe.image} alt={recipe.name} className={s.imageAchiv} />
                    <p className={s.nameAchiv}>{recipe.name}</p>
                </div>

                {open && (
                    <div
                        ref={floating}
                        {...interactions.getFloatingProps()}
                        style={{ position: strategy, top: y ?? 0, left: x ?? 0, zIndex: 999 }}
                        className={s.floating}
                    >
                        {recipe.description}
                    </div>
                )}
            </div>
        );
    }


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
        }
    }, [recipe]);

    useEffect(() => {
        function handleTouchMove(e: TouchEvent) {
            if (!e.target) return;
            const margin = 80;
            const y = e.touches[0].clientY;

            if (y < margin) {
                window.scrollBy({ top: -30, behavior: 'smooth' });
            } else if (y > window.innerHeight - margin) {
                window.scrollBy({ top: 30, behavior: 'smooth' });
            }
        }

        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => window.removeEventListener('touchmove', handleTouchMove);
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
        setPlay(true);

        setTimeout(() => {
            const droppedElements = Object.values(droppedByZone).filter(Boolean) as Elements[];
            const correctIds = correctElements.map(e => e.id).sort((a, b) => a - b);
            const droppedIds = droppedElements.map(e => e.id).sort((a, b) => a - b);

            const allCorrectPresent = JSON.stringify(correctIds) === JSON.stringify(droppedIds);

            setResult({ isSuccess: allCorrectPresent });
            setIsOpen(true);

            if (allCorrectPresent) {
                setCompletedRecipesIds(prev =>
                    prev.includes(recipe.id) ? prev : [...prev, recipe.id]
                );
            }

            setPlay(false);
        }, 3000);
    };

    const resetDropzone = () => {
        setDroppedByZone({});
        setDragItems(initialShuffled);
        setResult({});
        setIsOpen(false);
    };

    const nextRecipe = () => {
        setIsOpen(false);

        if (stepIndex + 1 < availableRecipes.length) setStepIndex(stepIndex + 1);
        else setIsResultModalOpen(true);
    };

    if (!recipe) return <div>Нет доступных рецептов</div>;

    return (
        <>
            <Header onOpenDiscovered={() => setIsDiscoveredModalOpen(true)} />

            <div className={s.app}>
                <div className={s.containerInfo}>
                    <div className={s.miniContainerInfo}>
                        <p className={s.info}>Подбери {correctElements.length} правильных компонента и запусти создание изобретения</p>
                        {!isSmallScreen &&
                            <div className={s.containerDrop}>
                                <DropzoneSlider
                                    correctElements={correctElements}
                                    droppedByZone={droppedByZone}
                                    onDrop={handleDrop}
                                    onClear={clearDropzone}
                                />
                            </div>
                        }
                        <div className={s.counter}>
                            <p>Успешных попыток:</p>
                            <p>{countTrue}</p>
                            <p>Неудачных попыток:</p>
                            <p>{countFalse}</p>
                        </div>
                    </div>
                </div>

                {isSmallScreen &&
                    <div className={s.containerDrop}>
                        <DropzoneSlider
                            correctElements={correctElements}
                            droppedByZone={droppedByZone}
                            onDrop={handleDrop}
                            onClear={clearDropzone}
                        />
                    </div>
                }

                <img src={DEFAULT_CHERTEZH} alt={"CHERTEZH"} className={s.drawing} />

                <div className={s.list}>
                    {dragItems.map((el, i) => (
                        <div
                            key={el ? el.id : `empty-${i}`}
                            className={s.item}
                        >
                            {el ? (
                                <Draggable element={el} />
                            ) : (
                                <div className={s.draggablezoneContainer}>
                                    <div className={s.draggablezone}></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>


                <motion.button
                    className={s.checkButton}
                    onClick={check}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={Object.keys(droppedByZone).length !== correctElements.length}
                >
                    Старт эксперимента
                </motion.button>

                <AnimatePresence>
                    {result.isSuccess !== undefined && isOpen && (
                        <Modal>
                            <div>
                                <div className={s.modalInfo}>
                                    <h2 className={s.modalMessage}>{result.isSuccess ? randomMessage(successMessages) : randomMessage(errorMessages)}</h2>

                                    {result.isSuccess && (
                                        <>
                                            <motion.div className={s.modalInfoRecipe} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                                <p className={s.recipeName}>{recipe.name}</p>
                                                <p className={s.recipeDescription}>- {recipe.description}</p>
                                            </motion.div>
                                            <img src={recipe.image} alt={recipe.name} className={s.modalImage} />
                                        </>
                                    )}

                                    <motion.button
                                        onClick={() => {
                                            if (result.isSuccess) {
                                                setCountTrue(prev => prev + " ✅");
                                                setDiscoveredRecipes(prev => [...prev, recipe]);
                                                nextRecipe();
                                            } else {
                                                setCountFalse(prev => prev + " ❌");
                                                resetDropzone();
                                            }
                                        }}
                                        className={s.modalButton}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {stepIndex + 1 >= availableRecipes.length
                                            ? "Результат"
                                            : result.isSuccess
                                                ? "Продолжить изобретать"
                                                : "Попытаться ещё раз"}
                                    </motion.button>
                                </div>
                            </div>
                        </Modal>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isResultModalOpen && (
                        <Modal>
                            <h2 className={s.headerRes}>Результат🏆</h2>
                            <div className={s.containerRes}>
                                <p>Успешных попыток: {countTrue}</p>
                                <p>Неудачных попыток: {countFalse}</p>
                            </div>
                            <motion.button
                                onClick={() => window.location.reload()}
                                className={s.modalButton}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Заново
                            </motion.button>
                        </Modal>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isDiscoveredModalOpen && (
                        <Modal>
                            <div className={s.modalInfo}>
                                <h2 className={s.headerAchiv}>Открытые изобретения</h2>
                                {discoveredRecipes.length > 0 ? (
                                        <div className={s.containerAchiv}>
                                            {discoveredRecipes.map(r => <DiscoveredItem key={r.id} recipe={r} />)}
                                        </div>
                                ) : (
                                    <div>
                                        <p style={{textAlign: "center"}}>Пока ничего не открыто</p>
                                    </div>
                                )}

                                <motion.button
                                    onClick={() => setIsDiscoveredModalOpen(false)}
                                    className={s.modalButton}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Закрыть
                                </motion.button>
                            </div>
                        </Modal>
                    )}
                </AnimatePresence>

                <Gears play={play} />
            </div>
        </>
    );
}

export default App;
