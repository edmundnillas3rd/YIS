import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

type GLTFResult = GLTF & {
    nodes: {
        Back: THREE.Mesh;
        Front: THREE.Mesh;
        Spine: THREE.Mesh;
    };
    materials: {
        ["Material.003"]: THREE.MeshStandardMaterial;
        ["Material.002"]: THREE.MeshStandardMaterial;
        Material: THREE.MeshStandardMaterial;
    };
};

export default function (props: JSX.IntrinsicElements["group"]) {
    const { nodes, materials } = useGLTF("/assets/yearbook.glb") as GLTFResult;
    const colorMap = useLoader(TextureLoader, "/assets/cover.jpg");

   

    return (
        nodes.Spine?.geometry && nodes.Front?.geometry && nodes.Back?.geometry &&
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Back.geometry}
                material={materials["Material.003"]}
                position={[-0.357, 1, 0]}
                rotation={[Math.PI / 2, 355, -Math.PI / 2]}
                scale={[0.653, 0.653, 0.846]}
            >
                <meshStandardMaterial map={colorMap} />

            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Front.geometry}
                material={materials["Material.002"]}
                position={[0, 1, 0]}
                rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                scale={[0.653, 0.653, 0.846]}
            >
                <meshStandardMaterial map={colorMap} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Spine.geometry}
                material={materials.Material}
                position={[-0.18, 1, -0.658]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[0.178, 0.653, 0.846]}
            />
        </group>
    );
}

useGLTF.preload("/assets/yearbook.glb");