import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

export default function Bubble() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const colors = {
    "zinc-900": 0x18181b,
  };

  useEffect(() => {
    if (!canvasRef.current || !statsRef.current) return;

    let canvasRefValue = null as HTMLCanvasElement | null;
    canvasRefValue = canvasRef.current;

    // scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(colors["zinc-900"]);

    // camera
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 7;

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRefValue,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // controls
    new OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.SphereGeometry();

    // material
    const material = new THREE.MeshNormalMaterial({
      wireframe: true,
    });

    // mesh
    const bubble = new THREE.Mesh(geometry, material);
    scene.add(bubble);

    // stats
    const stats = Stats();
    statsRef.current.appendChild(stats.dom);

    function animate() {
      requestAnimationFrame(animate);

      bubble.rotation.x += 0.005;
      bubble.rotation.y += 0.005;

      renderer.render(scene, camera);

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

  return (
    <>
      <div ref={statsRef} />
      <canvas ref={canvasRef} />
    </>
  );
}
