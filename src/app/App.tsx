import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Github, BookOpen, ChevronDown, Calendar, Users, Briefcase, ExternalLink } from 'lucide-react';

type ViewMode = 'projects' | 'profile';

interface Project {
  id: number;
  title: string;
  period: string;
  description: string;
  role: string;
  tech: string[];
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    period: '2025.09 - 2026.02',
    description: '대규모 쇼핑몰 플랫폼 개발 및 운영. 실시간 재고 관리 시스템과 추천 알고리즘을 구현하여 매출 30% 향상.',
    role: '풀스택 개발자',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'AI 챗봇 서비스',
    period: '2025.03 - 2025.08',
    description: '자연어 처리 기반 고객 응대 챗봇 개발. GPT API를 활용하여 고객 만족도 45% 개선.',
    role: 'AI 엔지니어',
    tech: ['Python', 'FastAPI', 'OpenAI', 'Docker'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    title: '데이터 분석 대시보드',
    period: '2024.10 - 2025.02',
    description: '실시간 비즈니스 인텔리전스 대시보드 구축. 데이터 시각화를 통해 의사결정 속도 60% 향상.',
    role: '데이터 엔지니어',
    tech: ['React', 'D3.js', 'Python', 'Spark'],
    color: 'from-green-500 to-emerald-500'
  }
];

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('projects');
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const handleProjectClick = (id: number) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  const isProjectExpanded = (id: number) => {
    return expandedProject === id || hoveredProject === id;
  };

  return (
    <div className="size-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex overflow-hidden">
      {/* 좌측 사이드바 */}
      <motion.div
        className="bg-slate-800/50 backdrop-blur-sm border-r border-slate-700/50 flex flex-col gap-3 p-6"
        animate={{
          width: viewMode === 'profile' ? '0px' : '280px',
          opacity: viewMode === 'profile' ? 0 : 1,
          padding: viewMode === 'profile' ? '0px' : '24px'
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <motion.button
          onClick={() => setViewMode('profile')}
          className="flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <User className="size-6" />
          <span className="font-semibold">프로필</span>
        </motion.button>

        <motion.a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-4 rounded-xl bg-slate-700/50 text-slate-200 hover:bg-slate-700 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Github className="size-6" />
          <span className="font-semibold">깃허브</span>
        </motion.a>

        <motion.a
          href="https://blog.example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-4 rounded-xl bg-slate-700/50 text-slate-200 hover:bg-slate-700 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <BookOpen className="size-6" />
          <span className="font-semibold">블로그</span>
        </motion.a>
      </motion.div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === 'projects' ? (
            // 프로젝트 그리드 뷰
            <motion.div
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 p-12 overflow-y-auto"
            >
              <h1 className="text-5xl font-bold text-white mb-12">프로젝트</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => {
                  const isExpanded = isProjectExpanded(project.id);
                  return (
                    <motion.div
                      key={project.id}
                      layout
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onClick={() => handleProjectClick(project.id)}
                      animate={{
                        scale: isExpanded ? 1.05 : 1,
                        zIndex: isExpanded ? 10 : 1
                      }}
                      transition={{ duration: 0.3 }}
                      className="relative cursor-pointer"
                    >
                      <div className={`relative bg-gradient-to-br ${project.color} rounded-2xl p-8 shadow-2xl overflow-hidden`}>
                        {/* 배경 패턴 */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent)]" />
                        </div>

                        {/* 컨텐츠 */}
                        <div className="relative z-10">
                          <h2 className="text-2xl font-bold text-white mb-4">{project.title}</h2>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                              >
                                <div className="flex items-center gap-2 text-white/90">
                                  <Calendar className="size-4" />
                                  <span className="text-sm">{project.period}</span>
                                </div>

                                <div className="flex items-center gap-2 text-white/90">
                                  <Briefcase className="size-4" />
                                  <span className="text-sm">{project.role}</span>
                                </div>

                                <p className="text-white/90 text-sm leading-relaxed">
                                  {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                  {project.tech.map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>

                                {expandedProject === project.id && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedProject(null);
                                    }}
                                    className="mt-4 flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white text-sm transition-all"
                                  >
                                    <ChevronDown className="size-4" />
                                    접기
                                  </button>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            // 프로필 상세 뷰
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex-1 flex"
            >
              {/* 좌측-중앙: 프로필 상세 */}
              <div className="flex-1 p-12 overflow-y-auto">
                <div className="max-w-3xl">
                  {/* 상단 바로가기 버튼들 */}
                  <div className="flex gap-4 mb-8">
                    <motion.button
                      onClick={() => setViewMode('projects')}
                      className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-200 rounded-xl transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      ← 프로젝트로 돌아가기
                    </motion.button>
                    <motion.a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-200 rounded-xl transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="size-5" />
                      깃허브
                      <ExternalLink className="size-4" />
                    </motion.a>
                    <motion.a
                      href="https://blog.example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-200 rounded-xl transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <BookOpen className="size-5" />
                      블로그
                      <ExternalLink className="size-4" />
                    </motion.a>
                  </div>

                  {/* 프로필 헤더 */}
                  <div className="mb-12">
                    <div className="size-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-6">
                      <User className="size-16 text-white" />
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-4">김개발</h1>
                    <p className="text-xl text-slate-300">풀스택 개발자 · AI 엔지니어</p>
                  </div>

                  {/* 소개 */}
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-slate-700/50">
                    <h2 className="text-2xl font-bold text-white mb-4">소개</h2>
                    <p className="text-slate-300 leading-relaxed">
                      5년 차 소프트웨어 엔지니어로, 웹 개발부터 AI/ML까지 다양한 프로젝트를 경험했습니다.
                      사용자 중심의 제품을 만드는 것을 좋아하며, 새로운 기술을 배우고 적용하는 것에 열정을 가지고 있습니다.
                    </p>
                  </div>

                  {/* 기술 스택 */}
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-slate-700/50">
                    <h2 className="text-2xl font-bold text-white mb-6">기술 스택</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200 mb-3">Frontend</h3>
                        <div className="flex flex-wrap gap-2">
                          {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux'].map((tech) => (
                            <span key={tech} className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200 mb-3">Backend</h3>
                        <div className="flex flex-wrap gap-2">
                          {['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker'].map((tech) => (
                            <span key={tech} className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200 mb-3">AI/ML</h3>
                        <div className="flex flex-wrap gap-2">
                          {['TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain'].map((tech) => (
                            <span key={tech} className="px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-lg text-green-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 경력 */}
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                    <h2 className="text-2xl font-bold text-white mb-6">경력</h2>
                    <div className="space-y-6">
                      <div className="border-l-2 border-blue-500 pl-6">
                        <div className="flex items-center gap-2 text-slate-400 mb-2">
                          <Calendar className="size-4" />
                          <span className="text-sm">2023.03 - 현재</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">시니어 개발자</h3>
                        <p className="text-slate-300 mb-2">테크 스타트업 A</p>
                        <p className="text-slate-400 text-sm">
                          AI 기반 서비스 개발 및 팀 리딩. 백엔드 아키텍처 설계 및 프론트엔드 개발 총괄.
                        </p>
                      </div>
                      <div className="border-l-2 border-purple-500 pl-6">
                        <div className="flex items-center gap-2 text-slate-400 mb-2">
                          <Calendar className="size-4" />
                          <span className="text-sm">2021.01 - 2023.02</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">풀스택 개발자</h3>
                        <p className="text-slate-300 mb-2">IT 기업 B</p>
                        <p className="text-slate-400 text-sm">
                          웹 애플리케이션 개발 및 유지보수. React, Node.js 기반 서비스 구축.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 우측: 프로젝트 카드 */}
              <div className="w-96 bg-slate-800/30 backdrop-blur-sm border-l border-slate-700/50 p-6 overflow-y-auto">
                <h2 className="text-2xl font-bold text-white mb-6">프로젝트</h2>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className={`bg-gradient-to-br ${project.color} rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform`}
                      onClick={() => setViewMode('projects')}
                    >
                      <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-sm text-white/80 mb-3">{project.period}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}