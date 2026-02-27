"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { isMobile, getMobileAnimationConfig } from "@/lib/utils";

// Project Data with Media & Layout Configuration


const projects = [
  {
    id: "nuva",
    title: "Nuva – AI Voice & Chat Platform",
    category: "Backend • Real-time Systems",
    description:
      "Telecom-grade AI voice & chat platform with real-time messaging.",
    longDescription:
      "Nuva is a telecom-grade AI voice and chat platform built to reduce contact center hold times using real-time messaging, ASR, and Human-in-the-Loop workflows. I worked on backend services, real-time infrastructure, and performance optimization.",
    techStack: [
      "Python",
      "Django",
      "Django Channels",
      "WebSockets",
      "Redis",
      "AWS",
      "Docker",
    ],
    repo: "#",
    demo: "#",
    color: "from-blue-600/20 to-cyan-500/20",
    hoverColor: "group-hover:from-blue-600/40 group-hover:to-cyan-500/40",
    span: "md:col-span-2 md:row-span-2",
    mediaType: "image",
    mediaUrl:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    demoUrl:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
  },

  {
    id: "nuropedia",
    title: "Nuropedia – AI Chatbot Plugin",
    category: "AI • Document Systems",
    description:
      "AI-powered WordPress chatbot with document intelligence.",
    longDescription:
      "Nuropedia is an AI chatbot plugin that provides instant answers from documents, supports multilingual queries, calendar syncing, and intelligent document processing. I contributed to backend logic, integrations, and optimization.",
    techStack: [
      "Python",
      "Django",
      "REST APIs",
      "LLMs",
      "WordPress",
    ],
    repo: "#",
    demo: "#",
    color: "from-purple-600/20 to-pink-500/20",
    hoverColor: "group-hover:from-purple-600/40 group-hover:to-pink-500/40",
    span: "md:col-span-1 md:row-span-2",
    mediaType: "image",
    mediaUrl:
      "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
    demoUrl:
      "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg",
  },

  {
    id: "nurae",
    title: "Nurae – Booking & Payments Platform",
    category: "Full Stack • Payments",
    description:
      "Secure booking workflows with escrow-based payments.",
    longDescription:
      "Nurae is a full stack platform featuring booking workflows, provider KYC, and escrow-based payments using Stripe Connect. Focused on security, scalability, and real-world financial flows.",
    techStack: [
      "Python",
      "Django",
      "Stripe Connect",
      "PostgreSQL",
      "Redis",
    ],
    repo: "#",
    demo: "#",
    color: "from-green-600/20 to-teal-500/20",
    hoverColor: "group-hover:from-green-600/40 group-hover:to-teal-500/40",
    span: "md:col-span-1 md:row-span-1",
    mediaType: "image",
    mediaUrl:
      "https://images.pexels.com/photos/4386325/pexels-photo-4386325.jpeg",
    demoUrl:
      "https://images.pexels.com/photos/4386376/pexels-photo-4386376.jpeg",
  },

  {
    id: "trawayl",
    title: "Trawayl – Travel Booking Platform",
    category: "Full Stack • Scalable Systems",
    description:
      "High-concurrency travel booking platform.",
    longDescription:
      "A full stack travel booking platform built with Django and React, designed to handle 10,000+ concurrent users. Includes real-time communication, optimized APIs, and cloud deployment.",
    techStack: [
      "Django",
      "React",
      "PostgreSQL",
      "Redis",
      "AWS",
      "Docker",
    ],
    repo: "#",
    demo: "#",
    color: "from-orange-500/20 to-red-500/20",
    hoverColor: "group-hover:from-orange-500/40 group-hover:to-red-500/40",
    span: "md:col-span-1 md:row-span-1",
    mediaType: "image",
    mediaUrl:
      "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg",
    demoUrl:
      "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
  },

  {
    id: "doctime",
    title: "DocTime – Doctor Consultation Platform",
    category: "Real-time • Healthcare",
    description:
      "Real-time doctor consultation system.",
    longDescription:
      "DocTime is a real-time doctor consultation platform featuring appointment automation, secure authentication, and WebSocket-based communication supporting hundreds of concurrent users.",
    techStack: [
      "Django REST Framework",
      "WebSockets",
      "Google OAuth",
      "PostgreSQL",
    ],
    repo: "#",
    demo: "#",
    color: "from-indigo-600/20 to-purple-500/20",
    hoverColor: "group-hover:from-indigo-600/40 group-hover:to-purple-500/40",
    span: "md:col-span-1 md:row-span-1",
    mediaType: "image",
    mediaUrl:
      "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg",
    demoUrl:
      "https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg",
  },
];


const INITIAL_VISIBLE_COUNT = 5;

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const animationConfig = getMobileAnimationConfig();

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  const selectedProject = projects.find((p) => p.id === selectedId);
  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  return (
    <section className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-4 md:px-12 overflow-hidden" id="projects">
      {/* Background Ambience (hidden on small screens) */}
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
            Selected <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Works</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            A curated selection of projects demonstrating full-stack capabilities,
            microservices architecture, and modern interface design.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layoutId={isMobileDevice ? undefined : project.id}
                onClick={() => setSelectedId(project.id)}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: isMobileDevice ? 0.2 : 0.3 }}
                viewport={{ once: true }}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-white/5 backdrop-blur-md ${project.span}`}
                whileHover={isMobileDevice ? {} : { scale: 1.015 }}
              >
                {/* Media Background - Always 'mediaUrl' for Grid */}
                <div className="absolute inset-0">
                  <Image
                    src={project.mediaUrl}
                    alt={project.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index < 6} // preload first few items
                  />
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-linear-to-br ${project.color} ${project.hoverColor} transition-all duration-500 opacity-60 group-hover:opacity-80 mix-blend-overlay`} />

                {/* Darkener */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                {/* Noise */}
                <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="inline-block px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs font-mono text-blue-300 backdrop-blur-md">
                      {project.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:translate-x-1 transition-transform drop-shadow-lg">{project.title}</h3>
                    <p className="text-gray-200 text-sm line-clamp-3 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-md">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      {project.techStack.slice(0, 3).map(t => (
                        <span key={t} className="text-[10px] uppercase tracking-wider text-white/80 bg-black/40 px-2 py-1 rounded backdrop-blur-sm border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination Buttons */}
        <motion.div layout className="flex justify-center mt-12">
          {hasMore ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-md flex items-center gap-2 group"
            >
              View More Projects
              <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>
          ) : projects.length > INITIAL_VISIBLE_COUNT && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
                setVisibleCount(INITIAL_VISIBLE_COUNT);
              }}
              className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-md flex items-center gap-2 group"
            >
              Show Less
              <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </motion.button>
          )}
        </motion.div>

        {/* Enhanced Modal */}
        <AnimatePresence>
          {selectedId && selectedProject && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-xl z-60"
              />
              <div className="fixed inset-0 flex items-center justify-center z-70 pointer-events-auto p-4 md:p-8">
                <motion.div
                  layoutId={selectedId}
                  className="bg-[#121212] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-4xl border border-white/10 shadow-2xl relative scrollbar-hide"
                >
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-6 right-6 z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white/70 hover:text-white transition-colors border border-white/10"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="flex flex-col md:flex-row h-full">
                    { /* Visual Side - Prioritize 'demoUrl', fallback to 'mediaUrl' */}
                    <div className={`w-full md:w-2/5 min-h-[300px] relative overflow-hidden flex flex-col justify-end p-8`}>
                      <div className="absolute inset-0">
                        <Image
                          src={selectedProject.demoUrl || selectedProject.mediaUrl}
                          alt={selectedProject.title}
                          fill
                          className="object-cover opacity-80"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                      </div>
                      <div className={`absolute inset-0 bg-linear-to-b ${selectedProject.color} mix-blend-overlay opacity-80`} />
                      <div className="absolute inset-0 bg-black/20" />

                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative z-10 inline-block px-3 py-1 rounded-full bg-black/40 text-xs font-mono text-white mb-4 w-fit border border-white/10 backdrop-blur-md"
                      >
                        {selectedProject.category}
                      </motion.span>
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative z-10 text-4xl font-bold text-white leading-none tracking-tight drop-shadow-xl"
                      >
                        {selectedProject.title}
                      </motion.h3>
                    </div>

                    {/* Content Side */}
                    <div className="w-full md:w-3/5 p-8 md:p-12 bg-[#121212]">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">About the project</h4>
                        <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                          {selectedProject.longDescription}
                        </p>

                        <div className="mb-10">
                          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Core Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.techStack.map((tech, i) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + (i * 0.05) }}
                                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-gray-200 border border-white/5 transition-colors cursor-default"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-white/10">
                          <a
                            href={selectedProject.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-4 rounded-xl bg-white text-black font-bold text-center hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            View Code
                          </a>
                          <a
                            href={selectedProject.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-4 rounded-xl bg-white/5 text-white font-bold text-center hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center gap-2"
                          >
                            Live Demo
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
