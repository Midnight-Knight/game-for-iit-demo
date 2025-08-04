import Wave from "react-wavify";

export default function LiquidFlask() {
    return (
        <Wave fill="#e62315" mask="url(#mask)" options={{ points: 10, speed: 0.2, amplitude: 10 }}>
            <mask id="mask">
                <path d="M10 10 H110 V110 H10 Z" fill="white" />
            </mask>
        </Wave>
    );
}
