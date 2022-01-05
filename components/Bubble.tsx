import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Bubble() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const colors = {
      "slate-300": 0xc9d5e2,
      "slate-900": 0x0d172c,
    };

    let sceneRefValue: HTMLDivElement | null = null;
    sceneRefValue = sceneRef.current;

    const width = sceneRefValue.clientWidth;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      sceneRefValue.clientWidth / sceneRefValue.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    scene.background = new THREE.Color(colors["slate-900"]);
    renderer.setSize(sceneRefValue.clientWidth, sceneRefValue.clientHeight);

    sceneRefValue.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: colors["slate-300"],
    });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    const onWindowResize = function () {
      if (!sceneRefValue) return;

      camera.aspect = sceneRefValue.clientWidth / sceneRefValue.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(sceneRefValue.clientWidth, sceneRefValue.clientHeight);
    };

    window.addEventListener("resize", onWindowResize, false);

    animate();

    return () => {
      if (sceneRefValue) {
        sceneRefValue.removeChild(renderer.domElement);
        window.removeEventListener("resize", onWindowResize);
      }
    };
  }, [sceneRef]);

  return <div ref={sceneRef} className="w-full h-full" />;
}
