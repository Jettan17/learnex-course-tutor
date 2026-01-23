"use client";

import Link from "next/link";
import { courses } from "@/data/courses";

const courseColors: Record<string, { gradient: string; bg: string; text: string; icon: string }> = {
  sc1006: {
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-700 dark:text-amber-300",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  },
  sc1007: {
    gradient: "from-indigo-500 to-purple-500",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    text: "text-indigo-700 dark:text-indigo-300",
    icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
  },
  sc1008: {
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    text: "text-emerald-700 dark:text-emerald-300",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  sc2002: {
    gradient: "from-pink-500 to-rose-500",
    bg: "bg-pink-50 dark:bg-pink-900/20",
    text: "text-pink-700 dark:text-pink-300",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
};

export default function CoursesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"></span>
          All Courses
        </h1>
        <p className="text-gray-600 dark:text-gray-300 ml-5">
          Browse all available courses and start learning
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => {
          const colors = courseColors[course.id] || courseColors.sc1007;
          const questionsCount = course.topics.length * 15; // Approximate

          return (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group glass-card rounded-2xl overflow-hidden gradient-border"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={colors.icon} />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-block ${colors.bg} ${colors.text} text-sm font-semibold px-2.5 py-0.5 rounded-lg`}>
                        {course.code}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {course.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>{course.topics.length} topics</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{questionsCount}+ questions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-200/50 dark:border-gray-700/50">
                <span className={`text-sm font-medium bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent flex items-center gap-1`}>
                  Start Learning
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'currentColor' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
