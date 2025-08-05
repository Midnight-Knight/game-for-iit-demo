import Wave from "react-wavify";

type FlaskProps = {
    flag: boolean;
}

export default function LiquidFlask({flag}: FlaskProps) {
    return (
        <div style={{position: flag ? "relative" :"absolute", bottom: flag ? "0" : "-50px"}} >
            <img src={"/flask.svg"} alt="Flask" />
            <Wave style={{position: "absolute", bottom: "-40px", left: "-5px"}} fill="#90ffe5" mask="url(#mask)" options={{ points: 5, speed: 0.3, amplitude: 5 }}>
                <mask id="mask">
                    <path d="M80 10 H90 L140 90 H20 Z" fill="white" stroke="black"/>
                </mask>
            </Wave>
        </div>
    );
}

