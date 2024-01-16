import { Environment, OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import Loader from "../components/ModelLoader.tsx";
import Model from "../components/YearbookModel.tsx";
import Model2 from "../components/OpenYearbookModel.tsx";
import { Button } from "../components/Globals";

export default function () {
    const ref = useRef();
    const [index, setIndex] = useState(0);

    const models = [
        <Model />,
        <Model2 />
    ];

    return (
        <>
            <section className="flex flex-col p-1 flex-auto gap-1">
                <Button onClick={(e: any) => setIndex(0)}>
                    View Yearbook
                </Button>
                <Button onClick={(e: any) => setIndex(1)}>
                    View Yearbook Photo
                </Button>
            </section>
            <Canvas>
                <Suspense fallback={null}>
                    <Stage controls={ref as any} preset="rembrandt" intensity={1} shadows={false} environment="city">
                        {index !== -1 &&
                            <>
                                {models[index]}
                            </>
                        }
                    </Stage>
                </Suspense>
                <OrbitControls ref={ref as any} autoRotate={index === 0} />
            </Canvas>
        </>

    );
}