import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { defaultMaterial } from "./SelectMaterial";

import SelectMaterial from "./SelectMaterial";

export default function Bubble() {
  const [materialType, setMaterialType] = useState(defaultMaterial);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const colors = {
    "zinc-900": 0x18181b,
  };

  useEffect(() => {
    if (!canvasRef.current || !statsRef.current) return;

    let canvasRefValue = null as HTMLCanvasElement | null;
    canvasRefValue = canvasRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(colors["zinc-900"]);

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRefValue,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    new OrbitControls(camera, renderer.domElement);
    const geometry = new THREE.SphereGeometry();

    const material = new THREE[materialType]({ wireframe: true });
    const bubble = new THREE.Mesh(geometry, material);
    scene.add(bubble);

    const stats = Stats();
    statsRef.current.appendChild(stats.dom);

    let clock = new THREE.Clock();

    function animate() {
      let t = clock.getElapsedTime();

      const scale = 0.8 + Math.sin(t) * 0.5;
      bubble.scale.set(scale, scale, scale);

      renderer.render(scene, camera);

      requestAnimationFrame(animate);

      stats.update();
    }

    animate();

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onWindowResize, false);

    return () => window.removeEventListener("resize", onWindowResize);
  });

  const onMaterialChange = (type: string) => setMaterialType(type);

  return (
    <>
      <SelectMaterial onMaterialChange={onMaterialChange} />
      <div ref={statsRef} />
      <canvas ref={canvasRef} />
    </>
  );
}
