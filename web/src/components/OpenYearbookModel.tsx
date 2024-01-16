import * as THREE from "three";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useGLTF, Text, Billboard } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { TextureLoader } from "three";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { useLoader } from "@react-three/fiber";

type GLTFResult = GLTF & {
    nodes: {
        Cover: THREE.Mesh;
        Paper: THREE.Mesh;
    };
    materials: {};
};

interface Preview {
    affiliations: any[];
    awards: any[];
    seminars: any[];
    dataPreview: String;
}

export default function (props: JSX.IntrinsicElements["group"]) {
    const { nodes, materials } = useGLTF("/assets/open-yearbook.glb") as GLTFResult;
    const colorMap = useLoader(TextureLoader, "/assets/yearbook-cover-photo.jpg");
    const [text, setText] = useState<Preview>();
    const [affiliations, setAffiliations] = useState("");
    const [awards, setAwards] = useState("");
    const [seminars, setSeminars] = useState("");


    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/clubs/user-preview`, {
                    credentials: "include"
                });

                const data = await response.json();

                if (data) {
                    setAffiliations(data?.affiliations.reduce((affil: any) => (`${affil}\n`)))
                    setAwards(data?.awards.reduce((award: any) => (`${award}\n`)))
                    setSeminars(data?.seminars.reduce((seminar: any) => (`${seminar}\n`)))
                }
            } catch {

            }
        })();
    }, []);

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cover.geometry}
                material={nodes.Cover.material}
                position={[-0.967, 0.377, 0.509]}
                scale={[1, 0.026, 0.446]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Paper.geometry}
                material={nodes.Paper.material}
                position={[0, 0.405, -0.501]}
                rotation={[-1.571, 0.017, -1.574]}
                scale={[-0.334, -0.409, -0.409]}
            >
                <Text position={[0, 2.5, -1]} fontSize={0.5} color="#e69e22" anchorX="center" anchorY="middle">
                    {`
                        Affiliation
                        ${affiliations}
                        Awards
                        ${awards}\n
                        Seminars
                        ${seminars}
                    `}
                </Text>
                <meshStandardMaterial map={colorMap} />
            </mesh>

        </group>
    );
}

useGLTF.preload("/assets/open-yearbook.glb");
