import './App.css'
import {RESULTS} from "./configs/results.config.ts";
import {useState} from "react";
import type {Elements} from "./types/results.types.ts";
import Draggable from "./components/DraggableItem/DraggableItem.tsx";
import Dropzone from "./components/Dropzone/Dropzone.tsx";

function App() {
    const recipe = RESULTS[0];

    const correctElements = recipe.elements.filter((elem) => elem.isCorrect);

    const [dropped, setDropped] = useState<Record<string, Elements | null>>({});
    const [result, setResult] = useState({});

    const handleDrop = (zoneId: number, item: Elements) => {
        setDropped((prev) => ({...prev, [zoneId]: item}));
        setResult({});
    }

    const check = () => {
        const res: Record<string, boolean> = {};
        for (const correctEl of correctElements) {
            const droppedEl = dropped[correctEl.id];
            res[correctEl.id] = droppedEl?.id === correctEl.id;
        }
        setResult(res);
    }

    return (
        <div>
            <h1>Создание {recipe.name}</h1>
            <div>
                <h2>Элементы</h2>
                {recipe.elements.map((el) => (
                    <Draggable element={el} key={el.id}/>
                ))}
            </div>
            <div>
                <h2>Зоны для создания рецептов</h2>
                {correctElements.map((el) => (
                    <Dropzone key={el.id} zoneId={el.id} dropped={dropped[el.id] || null} onDrop={(item) => handleDrop(el.id, item)} correct={result[el.id]}/>
                ))}
            </div>
            <button onClick={check}>Проверка</button>
        </div>
    )
}

export default App
