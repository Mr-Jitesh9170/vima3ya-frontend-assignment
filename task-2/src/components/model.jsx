import React, { useEffect, useRef, useState } from "react";

export default function ModelViewer() {
  const mountRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let renderer, scene, camera, controls, dracoLoader;

    const start = performance.now();

    (async () => {
      // ✅ Lazy load THREE (required in task)
      const THREE = await import("three");
      const { GLTFLoader } = await import(
        "three/examples/jsm/loaders/GLTFLoader.js"
      );
      const { DRACOLoader } = await import(
        "three/examples/jsm/loaders/DRACOLoader.js"
      );
      const { OrbitControls } = await import(
        "three/examples/jsm/controls/OrbitControls.js"
      );

      // ======================
      // SCENE
      // ======================
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x111111);

      // ======================
      // CAMERA
      // ======================
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(2, 2, 5);

      // ======================
      // RENDERER
      // ======================
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      // ======================
      // CONTROLS
      // ======================
      controls = new OrbitControls(camera, renderer.domElement);

      // ======================
      // LIGHTING
      // ======================
      const ambient = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambient);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
      dirLight.position.set(5, 5, 5);
      scene.add(dirLight);

      // ======================
      // DRACO LOADER
      // ======================
      dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(
        "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
      );

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      // ======================
      // LOAD MODEL
      // ======================
      loader.load(
        "/model-compressed.glb",

        (gltf) => {
          scene.add(gltf.scene);

          setLoading(false);

          console.log(
            `Model loaded in ${(performance.now() - start).toFixed(2)} ms`
          );

          animate();
        },

        (xhr) => {
          if (xhr.lengthComputable) {
            const percent = (xhr.loaded / xhr.total) * 100;
            setProgress(percent);
          }
        },

        (error) => {
          console.error("GLB Load Error:", error);
        }
      );

      // ======================
      // RENDER LOOP
      // ======================
      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }

      // ======================
      // RESIZE HANDLING
      // ======================
      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    })();

    // ======================
    // CLEANUP (IMPORTANT)
    // ======================
    return () => {
      if (renderer) renderer.dispose();
      if (dracoLoader) dracoLoader.dispose();
    };
  }, []);

  return (
    <>
      {loading && (
        <div style={styles.loader}>
          Loading {progress.toFixed(0)}%
        </div>
      )}

      <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />
    </>
  );
}

const styles = {
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
    fontSize: "18px",
    fontFamily: "Arial",
  },
};