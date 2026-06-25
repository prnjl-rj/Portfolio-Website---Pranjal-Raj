// --- Particle Text Effect Splash Screen ---
// Ported from 21st.dev React component to vanilla JS

(function () {
    const canvas = document.getElementById('splash-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const PIXEL_STEPS = 6;
    let particles = [];
    let animFrameId;

    // Resize canvas to fill viewport
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // --- Particle Class ---
    class Particle {
        constructor() {
            this.pos = { x: 0, y: 0 };
            this.vel = { x: 0, y: 0 };
            this.acc = { x: 0, y: 0 };
            this.target = { x: 0, y: 0 };
            this.closeEnoughTarget = 100;
            this.maxSpeed = 1.0;
            this.maxForce = 0.1;
            this.particleSize = 3;
            this.isKilled = false;
            this.startColor = { r: 0, g: 0, b: 0 };
            this.targetColor = { r: 0, g: 0, b: 0 };
            this.colorWeight = 0;
            this.colorBlendRate = 0.01;
        }

        move() {
            let proximityMult = 1;
            const dx = this.pos.x - this.target.x;
            const dy = this.pos.y - this.target.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.closeEnoughTarget) {
                proximityMult = distance / this.closeEnoughTarget;
            }

            const toTarget = { x: this.target.x - this.pos.x, y: this.target.y - this.pos.y };
            const mag = Math.sqrt(toTarget.x * toTarget.x + toTarget.y * toTarget.y);
            if (mag > 0) {
                toTarget.x = (toTarget.x / mag) * this.maxSpeed * proximityMult;
                toTarget.y = (toTarget.y / mag) * this.maxSpeed * proximityMult;
            }

            const steer = { x: toTarget.x - this.vel.x, y: toTarget.y - this.vel.y };
            const sm = Math.sqrt(steer.x * steer.x + steer.y * steer.y);
            if (sm > 0) {
                steer.x = (steer.x / sm) * this.maxForce;
                steer.y = (steer.y / sm) * this.maxForce;
            }

            this.acc.x += steer.x;
            this.acc.y += steer.y;
            this.vel.x += this.acc.x;
            this.vel.y += this.acc.y;
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
            this.acc.x = 0;
            this.acc.y = 0;
        }

        draw(ctx) {
            if (this.colorWeight < 1.0) {
                this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0);
            }
            const r = Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight);
            const g = Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight);
            const b = Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight);

            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
        }

        kill() {
            if (!this.isKilled) {
                const angle = Math.random() * Math.PI * 2;
                const dist = (canvas.width + canvas.height) / 2;
                this.target.x = canvas.width / 2 + Math.cos(angle) * dist;
                this.target.y = canvas.height / 2 + Math.sin(angle) * dist;

                this.startColor = {
                    r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
                    g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
                    b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
                };
                this.targetColor = { r: 0, g: 0, b: 0 };
                this.colorWeight = 0;
                this.isKilled = true;
            }
        }
    }

    function nextWord(word) {
        const offscreen = document.createElement('canvas');
        offscreen.width = canvas.width;
        offscreen.height = canvas.height;
        const offCtx = offscreen.getContext('2d');

        // Dynamic font size based on viewport
        const fontSize = Math.min(canvas.width / 5, 140);
        offCtx.fillStyle = 'white';
        offCtx.font = `bold ${fontSize}px 'Outfit', 'Inter', Arial, sans-serif`;
        offCtx.textAlign = 'center';
        offCtx.textBaseline = 'middle';
        offCtx.fillText(word, canvas.width / 2, canvas.height / 2);

        const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        // Neon accent colors
        const palette = [
            { r: 236, g: 72, b: 153 },   // magenta
            { r: 139, g: 92, b: 246 },   // purple
            { r: 14, g: 165, b: 233 },   // cyan
            { r: 251, g: 146, b: 60 },   // orange
        ];
        const newColor = palette[Math.floor(Math.random() * palette.length)];

        let particleIndex = 0;

        // Collect and shuffle coordinates
        const coords = [];
        for (let i = 0; i < pixels.length; i += PIXEL_STEPS * 4) {
            coords.push(i);
        }
        for (let i = coords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [coords[i], coords[j]] = [coords[j], coords[i]];
        }

        for (const ci of coords) {
            if (pixels[ci + 3] > 0) {
                const x = (ci / 4) % canvas.width;
                const y = Math.floor(ci / 4 / canvas.width);

                let p;
                if (particleIndex < particles.length) {
                    p = particles[particleIndex];
                    p.isKilled = false;
                    particleIndex++;
                } else {
                    p = new Particle();
                    const angle = Math.random() * Math.PI * 2;
                    const dist = (canvas.width + canvas.height) / 2;
                    p.pos.x = canvas.width / 2 + Math.cos(angle) * dist;
                    p.pos.y = canvas.height / 2 + Math.sin(angle) * dist;
                    p.maxSpeed = Math.random() * 6 + 4;
                    p.maxForce = p.maxSpeed * 0.05;
                    p.particleSize = Math.random() * 6 + 6;
                    p.colorBlendRate = Math.random() * 0.0275 + 0.0025;
                    particles.push(p);
                }

                p.startColor = {
                    r: p.startColor.r + (p.targetColor.r - p.startColor.r) * p.colorWeight,
                    g: p.startColor.g + (p.targetColor.g - p.startColor.g) * p.colorWeight,
                    b: p.startColor.b + (p.targetColor.b - p.startColor.b) * p.colorWeight,
                };
                p.targetColor = newColor;
                p.colorWeight = 0;
                p.target.x = x;
                p.target.y = y;
            }
        }

        // Kill remaining particles
        for (let i = particleIndex; i < particles.length; i++) {
            particles[i].kill();
        }
    }

    function animate() {
        // Motion blur trail
        ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.move();
            p.draw(ctx);
            if (p.isKilled) {
                if (p.pos.x < -50 || p.pos.x > canvas.width + 50 || p.pos.y < -50 || p.pos.y > canvas.height + 50) {
                    particles.splice(i, 1);
                }
            }
        }

        animFrameId = requestAnimationFrame(animate);
    }

    // Start the effect with only HELLO
    nextWord('Hey there !');
    animate();

    // --- Auto-dismiss splash after 2 seconds ---
    setTimeout(() => {
        const splashOverlay = document.getElementById('splash-overlay');
        const mainContent = document.querySelector('.portfolio-content');

        if (splashOverlay) {
            splashOverlay.classList.add('splash-exit');
        }
        if (mainContent) {
            mainContent.classList.add('portfolio-enter');
        }

        // Clean up after transition
        setTimeout(() => {
            cancelAnimationFrame(animFrameId);
            if (splashOverlay) splashOverlay.remove();
        }, 1200);
    }, 5500);
})();
