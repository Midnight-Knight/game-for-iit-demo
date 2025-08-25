import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { MultiBackend, TouchTransition } from 'dnd-multi-backend';
import CustomDragPreview from "./components/DragLayer/DragLayer.tsx";

const HTML5toTouch = {
    backends: [
        {
            backend: HTML5Backend,
            transition: undefined,
        },
        {
            backend: TouchBackend,
            options: {
                enableMouseEvents: true,
                enableAutoScroll: true,
                scrollContainer: window,
            },
            preview: true,
            transition: TouchTransition,
        },
    ],
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            <App />
            <CustomDragPreview/>
        </DndProvider>
    </StrictMode>
);
