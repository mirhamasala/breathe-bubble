import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Bubble() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const colors = {
      "slate-300": 0xc9d5e2,
      "slate-900": 0x0d172c,
    };

    let canvasRefValue = null as HTMLCanvasElement | null;
    canvasRefValue = canvasRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      canvasRefValue.clientWidth / canvasRefValue.clientHeight,
      0.1,
      1000
    );

    scene.background = new THREE.Color(colors["slate-900"]);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRefValue });
    renderer.setSize(canvasRefValue.clientWidth, canvasRefValue.clientHeight);

    new OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: colors["slate-300"],
      wireframe: true,
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();

    function onWindowResize() {
      if (!canvasRefValue) return;

      camera.aspect = canvasRefValue.clientWidth / canvasRefValue.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRefValue.clientWidth, canvasRefValue.clientHeight);
    }

    window.addEventListener("resize", onWindowResize, false);

    return () => window.removeEventListener("resize", onWindowResize);
  }, [canvasRef]);

  return <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />;
}
