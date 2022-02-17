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

    const inDuration = 4;
    const outDuration = 8;
    const pause = 0;

    const outStartTime = inDuration + pause;
    const totalEndTime = inDuration + pause + outDuration;

    let t = 0;
    let scale = 1;
    const ease = (x: number) => x * x;

    function animate() {
      t += clock.getDelta();

      if (t < inDuration) {
        const factor = t / inDuration;
        scale = 1 + ease(factor);
      } else if (t < outStartTime) {
        scale = 2;
      } else if (t < totalEndTime) {
        const factor = (t - outStartTime) / (totalEndTime - outStartTime);
        scale = 2 - ease(factor);
      } else {
        t = 0;
      }

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

  return (
    <>
      <div ref={statsRef} />
      <canvas ref={canvasRef} />
    </>
  );
}
