# Pranjal Raj — Interactive 3D Developer Portfolio

Modern full-stack developer portfolio for **Pranjal Raj** (*Software Engineer & MERN Stack Developer*), featuring an interactive **3D WebGL2/GPGPU Fur Simulation (`Mochi-Puff`)** background, 3D perspective mouse-tilt cards, scroll-linked animations, a **JavaScript (Node.js + Express)** backend, and a **PostgreSQL** relational database schema.

## Tech Stack

- **Frontend:** React 18, Framer Motion, shadcn/ui, Lucide React, Vite
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer, Custom CSS Variables (Dark & Light Themes)
- **3D & Shaders:** Three.js, WebGL2, GPGPU Ping-Pong Verlet Physics (`GPUComputationRenderer`), 64 Volumetric Shells + 60,000 GPU-Instanced 3D Hair Strands, Marschner / Kajiya-Kay Dual-Specular Physical Hair BSDF
- **Backend Logic:** JavaScript (ES Modules), Node.js, Express.js (`server/index.js`, `server/apiRouter.js`, `server/db.js`)
- **Database:** PostgreSQL 15+ (`pg` Pool) with complete relational DDL schema (`database/schema.sql`) and seed data (`database/seed.sql`)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure PostgreSQL (Optional — includes automatic fallback store):**
   Set `DATABASE_URL=postgresql://user:password@localhost:5432/pranjal_portfolio` in `.env` and initialize the schema:
   ```bash
   npm run db:init
   ```

3. **Run the development server (Frontend + API Middleware):**
   ```bash
   npm run dev
   ```

4. **Build and run the production Express + PostgreSQL server:**
   ```bash
   npm run build
   npm start
   ```
