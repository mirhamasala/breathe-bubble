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

    // clock
    let clock = new THREE.Clock();

    function animate() {
      let t = clock.getElapsedTime();

      if (t <= 4.0) {
        // Grow
        bubble.scale.x = 1.0 + t * (0.2 / 4.0);
        bubble.scale.y = 1.0 + t * (0.2 / 4.0);
        bubble.scale.z = 1.0 + t * (0.2 / 4.0);
      } else if (t > 4.0 && t <= 8.0) {
        // Shrink
        bubble.scale.x = 1.2 - t * (0.2 / 4.0);
        bubble.scale.y = 1.2 - t * (0.2 / 4.0);
        bubble.scale.z = 1.2 - t * (0.2 / 4.0);
      } else {
        clock = new THREE.Clock();
      }

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

  return (
    <>
      <div ref={statsRef} />
      <canvas ref={canvasRef} />
    </>
  );
}
