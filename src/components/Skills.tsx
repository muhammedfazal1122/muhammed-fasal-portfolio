"use client";

import { motion } from "framer-motion";
import { getMobileAnimationConfig } from "@/lib/utils";

const skills = [
  {
    category: "Frontend",
    items: [
      "React",
      "React Native",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    category: "Backend",
    items: [
      "Python",
      "Django",
      "Django REST Framework",
      "FastAPI",
      "Flask",
      "WebSockets (Django Channels)",
      "PostgreSQL",
      "MongoDB",
      "Redis",
    ],
  },
  {
    category: "DevOps & Cloud",
    items: [
      "Docker",
      "AWS EC2",
      "Nginx",
      "Cloudflare",
      "GitHub Actions (CI/CD)",
      "Linux",
    ],
  },
];

export default function Skills() {
  const animationConfig = getMobileAnimationConfig();

  return (
    <section className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-4 md:px-12 overflow-hidden" id="skills">
      {/* Background Ambience (hidden on small screens to reduce repaints) */}
      <div className="hidden md:block absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={animationConfig.transition}
          viewport={animationConfig.viewport}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Stack</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            A comprehensive stack enabling production-ready full stack development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...animationConfig.transition, delay: idx * 0.05 }}
              viewport={animationConfig.viewport}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors"
            >
              <h3 className="text-2xl font-bold text-blue-300 mb-6 uppercase tracking-wider">{group.category}</h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-4 py-2 bg-black/40 rounded-full text-sm text-gray-300 border border-white/10 hover:border-white/30 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
