import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createBlobCreature } from '@/fur/blobCreature.js';
import { createGPUFurPhysics } from '@/fur/gpuPhysics.js';
import { createGPUFurSystem } from '@/fur/furSystem.js';
import { createEnvironmentManager } from '@/fur/environments.js';
import { FUR_PRESETS } from '@/fur/presets.js';

/**
 * Full-Viewport Interactive 3D WebGL2/GPGPU Fur Simulation Background
 * - 64 Volumetric Shells + 60,000 GPU-Instanced 3D Tapered Strands
 * - Marschner / Kajiya-Kay Dual-Specular Physical Hair BSDF
 * - Real-time cursor petting, parting, combing & click-to-boop shockwaves
 * - Scroll-synchronized 3D camera & creature choreography across portfolio sections
 */
export function FurBackground({
  presetId = 'sakura',
  envId = 'studio',
  gpuFurEnabled = true,
  windStrength = 0.95,
  furLength,
  curliness,
  interactiveOrbit = false,
  boopTrigger = 0,
  onCreatureBoop,
}) {
  const containerRef = useRef(null);
  const simRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initialPreset = FUR_PRESETS.find((p) => p.id === presetId) || FUR_PRESETS[0];

    const simState = {
      ...initialPreset,
      keyColor: '#fff7ed',
      lightAngle: -74,
      lightIntensity: 1.35,
      rimIntensity: 1.35,
      windStrength: windStrength ?? 0.95,
      environment: envId || 'studio',
      gpuFurEnabled: Boolean(gpuFurEnabled),
    };

    // 1. WebGL2 Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / Math.max(1, window.innerHeight),
      0.1,
      80
    );
    camera.position.set(0.0, 0.45, 6.4);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 2.6;
    controls.maxDistance = 14.0;
    controls.maxPolarAngle = Math.PI * 0.64;
    controls.enableZoom = false;
    controls.enabled = false;
    controls.target.set(0, 0.05, 0);

    // 3. Synchronized 3-Point Studio Lighting Rig
    const keyLight = new THREE.DirectionalLight('#fff7ed', simState.lightIntensity * 1.4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.radius = 2.5;
    keyLight.shadow.camera.left = -2.2;
    keyLight.shadow.camera.right = 2.2;
    keyLight.shadow.camera.top = 2.2;
    keyLight.shadow.camera.bottom = -2.2;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 10.0;
    keyLight.shadow.camera.updateProjectionMatrix();
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#c4b5fd', simState.rimIntensity * 1.2);
    rimLight.position.set(-2.4, 1.8, -3.2);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight('#f5d0fe', '#1e1b4b', 0.85);
    scene.add(hemiLight);

    // 4. Create Stylized Blob Creature ("Mochi-Puff") + Hybrid GPU Fur + GPGPU Physics
    const creature = createBlobCreature();
    scene.add(creature.root);

    const gpuPhysics = createGPUFurPhysics(renderer);
    if (simState.gpuFurEnabled && !gpuPhysics.isGPGPUActive) {
      simState.gpuFurEnabled = false;
    }
    const furSystem = createGPUFurSystem(creature.bodyGeometry, simState);

    creature.root.add(furSystem.shellMesh);
    creature.root.add(furSystem.strandMesh);

    const envManager = createEnvironmentManager({
      scene,
      renderer,
      container,
      keyLight,
      rimLight,
      hemiLight,
      furSystem,
      camera,
    });

    function updateLightingFromState() {
      const rad = (simState.lightAngle * Math.PI) / 180.0;
      const lx = Math.sin(rad) * 2.8;
      const ly = 2.1;
      const lz = Math.cos(rad) * 2.8;

      keyLight.position.set(lx, ly, lz);
      keyLight.intensity = simState.lightIntensity * 1.35;
      rimLight.intensity = simState.rimIntensity * 1.15;
      if (simState.keyColor) {
        keyLight.color.set(simState.keyColor);
        furSystem.sharedUniforms.uKeyLightColor.value.set(simState.keyColor);
      }

      furSystem.sharedUniforms.uKeyLightDir.value.set(lx, ly, lz).normalize();
      furSystem.sharedUniforms.uKeyLightIntensity.value = simState.lightIntensity;
      furSystem.sharedUniforms.uRimIntensity.value = simState.rimIntensity;
      creature.skinMaterial.color.set(simState.baseColor).multiplyScalar(0.55);
    }

    function applyEnvironment(nextEnvId) {
      simState.environment = nextEnvId;
      const envPreset = envManager.setEnvironment(nextEnvId);
      const u = furSystem.sharedUniforms;
      if (envPreset) {
        if (envPreset.keyColor !== undefined) simState.keyColor = envPreset.keyColor;
        simState.lightAngle = envPreset.lightAngle;
        simState.lightIntensity = envPreset.lightIntensity;
        simState.rimIntensity = envPreset.rimIntensity;
        u.uWindStrength.value = simState.windStrength;
      }

      const isDesk = nextEnvId === 'highrise';
      const s = isDesk ? 0.25 : 1.0;
      const deskX = isDesk ? -0.14 : 0.0;
      const deskZ = isDesk ? 0.42 : 0.0;
      creature.setEnvironmentScale(s, deskX, deskZ);

      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const aspect = window.innerWidth / Math.max(1, window.innerHeight);
      const mobileZoomOut = isMobile
        ? Math.max(1.45, Math.min(1.95, 0.82 / Math.max(0.42, aspect)))
        : 1.0;

      const targetY = -0.94 * (1.0 - s) + 0.05 * s;
      controls.target.set(deskX, targetY, deskZ);
      camera.position.set(deskX, targetY + 0.4 * s, deskZ + 6.4 * s * mobileZoomOut);
      controls.minDistance = 2.6 * s;
      controls.maxDistance = 15.0 * s * mobileZoomOut;
      controls.update();
      updateLightingFromState();
    }

    applyEnvironment(simState.environment);

    // 5. Interactive 3D Pointer Raycasting for Petting, Combing & Booping
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2(0, 0);
    const pointerLocalPos = new THREE.Vector3(0, 0, 2);
    const prevPointerLocalPos = new THREE.Vector3(0, 0, 2);
    const pointerVelocity = new THREE.Vector3(0, 0, 0);
    let isPointerOverCreature = false;
    let pointerDownPos = { x: 0, y: 0 };
    let boopShockwave = 0.0;

    function handlePointerMove(e) {
      pointerNDC.x = (e.clientX / Math.max(1, window.innerWidth)) * 2.0 - 1.0;
      pointerNDC.y = -(e.clientY / Math.max(1, window.innerHeight)) * 2.0 + 1.0;

      raycaster.setFromCamera(pointerNDC, camera);
      const hits = raycaster.intersectObject(creature.bodyMesh, false);
      if (hits.length > 0) {
        prevPointerLocalPos.copy(pointerLocalPos);
        pointerLocalPos.copy(hits[0].point);
        creature.root.worldToLocal(pointerLocalPos);

        if (isPointerOverCreature) {
          pointerVelocity.subVectors(pointerLocalPos, prevPointerLocalPos).multiplyScalar(32.0);
        }
        isPointerOverCreature = true;
      } else {
        isPointerOverCreature = false;
        pointerVelocity.multiplyScalar(0.5);
      }
    }

    function handlePointerDown(e) {
      pointerDownPos.x = e.clientX;
      pointerDownPos.y = e.clientY;
    }

    function handlePointerUp(e) {
      const moveDist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (moveDist < 8 && isPointerOverCreature) {
        // Ignore clicks on buttons/links/inputs in the foreground DOM
        const tag = e.target?.tagName?.toLowerCase();
        if (tag && ['a', 'button', 'input', 'textarea', 'select'].includes(tag)) return;
        if (e.target?.closest?.('a, button, input, textarea, [data-ui-interactive="true"]')) return;

        creature.triggerBoop();
        boopShockwave = 1.0;
        if (onCreatureBoop) onCreatureBoop();
      }
    }

    function handleResize() {
      camera.aspect = window.innerWidth / Math.max(1, window.innerHeight);
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('resize', handleResize);

    // 6. Real-Time Render Loop with Scroll-Reactive 3D Choreography
    const clock = new THREE.Clock();
    let elapsedTime = 0.0;
    let animFrameId = null;
    let smoothScrollProgress = 0.0;

    const webglInertiaDisp = new THREE.Vector3(0, 0, 0);
    const webglInertiaVel = new THREE.Vector3(0, 0, 0);
    const webglForceTmp = new THREE.Vector3(0, 0, 0);

    function animate() {
      animFrameId = requestAnimationFrame(animate);

      const dt = Math.min(clock.getDelta(), 0.033);
      elapsedTime += dt;

      // Smooth scroll progress [0..1] across document height
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const rawScroll = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      smoothScrollProgress += (rawScroll - smoothScrollProgress) * Math.min(1.0, dt * 6.0);

      if (simRef.current?.interactiveOrbit) {
        controls.enabled = true;
        controls.enableZoom = true;
        controls.update();
      } else {
        controls.enabled = false;
        controls.enableZoom = false;
        // Choreography: gently weave Mochi-Puff in 3D space as user scrolls so it frames content beautifully
        const isDesk = simState.environment === 'highrise';
        const s = isDesk ? 0.25 : 1.0;
        if (!isDesk) {
          const isDesktop = window.innerWidth >= 1024;
          const scrollAngle = smoothScrollProgress * Math.PI * 2.0;
          const offsetX = isDesktop
            ? Math.cos(scrollAngle) * 0.45
            : 0.0;
          const offsetY = Math.sin(smoothScrollProgress * Math.PI) * 0.15;
          const camZ = 6.2 + Math.sin(smoothScrollProgress * Math.PI) * 0.55;

          camera.position.x += (-offsetX - camera.position.x) * Math.min(1, dt * 4);
          camera.position.y += (0.42 + offsetY - camera.position.y) * Math.min(1, dt * 4);
          camera.position.z += (camZ * s - camera.position.z) * Math.min(1, dt * 4);
          camera.lookAt(0, 0.05 * s, 0);
        }
      }

      if (boopShockwave > 0.001) {
        boopShockwave *= Math.exp(-dt * 2.8);
      } else {
        boopShockwave = 0.0;
      }

      pointerVelocity.multiplyScalar(Math.exp(-dt * 12.0));

      creature.update(dt, pointerNDC, camera.position, false);
      envManager.update(elapsedTime, simState.windStrength, creature.root);

      let physicsTexture = gpuPhysics.fallbackTexture;
      if (simState.gpuFurEnabled) {
        physicsTexture = gpuPhysics.step({
          time: elapsedTime,
          dt,
          windStrength: simState.windStrength,
          creatureVelocity: creature.animState.velocity,
          creatureAngularVel: creature.animState.angularVelocity,
          pointerLocalPos,
          pointerVelocity,
          pointerActive: isPointerOverCreature,
          boopShockwave,
        });
      } else {
        webglForceTmp.set(0, -0.32, 0);
        webglForceTmp.addScaledVector(creature.animState.velocity, -1.65);
        if (isPointerOverCreature) {
          webglForceTmp.addScaledVector(pointerVelocity, 0.85);
        }
        webglForceTmp.addScaledVector(webglInertiaDisp, -24.0);
        webglInertiaVel.addScaledVector(webglForceTmp, dt);
        webglInertiaVel.multiplyScalar(Math.exp(-5.5 * dt));
        webglInertiaDisp.addScaledVector(webglInertiaVel, dt);
        if (webglInertiaDisp.lengthSq() > 0.64) {
          webglInertiaDisp.normalize().multiplyScalar(0.8);
        }
      }

      const u = furSystem.sharedUniforms;
      u.uPhysicsTex.value = physicsTexture;
      u.uTime.value = elapsedTime;
      u.uPointerLocalPos.value.copy(pointerLocalPos);
      u.uPointerActive.value = isPointerOverCreature ? 1.0 : 0.0;
      u.uWebGLInertia.value.copy(webglInertiaDisp);
      u.uBoopShockwave.value = boopShockwave;

      renderer.render(scene, camera);
    }

    animate();

    simRef.current = {
      simState,
      creature,
      furSystem,
      applyEnvironment,
      updateLightingFromState,
      triggerManualBoop: () => {
        creature.triggerBoop();
        boopShockwave = 1.0;
      },
      interactiveOrbit: Boolean(interactiveOrbit),
    };

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Sync preset changes dynamically without re-creating WebGL context
  useEffect(() => {
    const sim = simRef.current;
    if (!sim) return;
    const preset = FUR_PRESETS.find((p) => p.id === presetId) || FUR_PRESETS[0];
    const u = sim.furSystem.sharedUniforms;

    Object.assign(sim.simState, preset);
    u.uBaseColor.value.set(preset.baseColor);
    u.uTipColor.value.set(preset.tipColor);
    u.uFurLength.value = furLength ?? preset.furLength;
    u.uClumping.value = preset.clumping;
    u.uCurliness.value = curliness ?? preset.curliness;
    u.uRoughness.value = preset.roughness;
    u.uSpecular.value = preset.specular;
    sim.furSystem.updateDensity(preset.furDensity);
    sim.creature.skinMaterial.color.set(preset.baseColor).multiplyScalar(0.55);
  }, [presetId, furLength, curliness]);

  // Sync environment changes
  useEffect(() => {
    const sim = simRef.current;
    if (!sim) return;
    sim.applyEnvironment(envId);
  }, [envId]);

  // Sync GPU Fur vs WebGL analytical mode
  useEffect(() => {
    const sim = simRef.current;
    if (!sim) return;
    sim.simState.gpuFurEnabled = Boolean(gpuFurEnabled);
    sim.furSystem.setGPUFurEnabled(Boolean(gpuFurEnabled));
  }, [gpuFurEnabled]);

  // Sync wind strength
  useEffect(() => {
    const sim = simRef.current;
    if (!sim) return;
    sim.simState.windStrength = windStrength;
    sim.furSystem.sharedUniforms.uWindStrength.value = windStrength;
  }, [windStrength]);

  // Sync interactive free-orbit mode
  useEffect(() => {
    const sim = simRef.current;
    if (!sim) return;
    sim.interactiveOrbit = Boolean(interactiveOrbit);
  }, [interactiveOrbit]);

  // Sync manual boop button triggers
  useEffect(() => {
    if (boopTrigger > 0 && simRef.current) {
      simRef.current.triggerManualBoop();
    }
  }, [boopTrigger]);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{
        pointerEvents: interactiveOrbit ? 'auto' : 'none',
      }}
      aria-label="Interactive 3D WebGL2/GPGPU Fur Simulation Background"
    >
      {/* Ambient studio backdrop gradient that harmonizes with the 3D Fur Simulation */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background:
            envId === 'studio'
              ? 'radial-gradient(circle at 50% 38%, rgba(88, 28, 135, 0.28) 0%, rgba(15, 23, 42, 0.65) 52%, rgba(5, 5, 15, 0.94) 100%)'
              : 'transparent',
        }}
      />
      <div ref={containerRef} className="w-full h-full" />
      {/* Subtle vignette overlay in scroll mode so typography remains high-contrast and effortless to read */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: interactiveOrbit ? 0.05 : envId === 'meadow' ? 0.14 : 0.38,
          background:
            envId === 'meadow'
              ? 'radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.05) 0%, rgba(15, 23, 42, 0.18) 100%)'
              : 'radial-gradient(circle at 50% 45%, rgba(6, 7, 20, 0.15) 0%, rgba(6, 7, 20, 0.72) 100%)',
        }}
      />
    </div>
  );
}

