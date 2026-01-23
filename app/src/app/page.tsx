"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { courses } from "@/data/courses";
import { getOverallStats, getProgress } from "@/lib/storage";

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

export default function Home() {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    totalCorrect: 0,
    topicsStudied: 0,
    averageMastery: 0,
  });
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    setStats(getOverallStats());
    const prog = getProgress();
    const masteryByTopic: Record<string, number> = {};
    Object.entries(prog).forEach(([topicId, p]) => {
      masteryByTopic[topicId] = p.masteryLevel;
    });
    setProgress(masteryByTopic);
  }, []);

  const accuracy =
    stats.totalQuestions > 0
      ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100)
      : 0;

  const totalTopics = courses.reduce((sum, c) => sum + c.topics.length, 0);
  const masteredTopics = Object.values(progress).filter((m) => m >= 80).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Master Your <span className="text-indigo-600 dark:text-indigo-400">Semester</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Adaptive quizzes powered by spaced repetition. Study smarter with
          <span className="font-medium text-indigo-600 dark:text-indigo-400"> 510 questions </span>
          across 34 topics.
        </p>
      </div>

      {/* Bento Stats Grid */}
      <div className="bento-grid mb-12">
        {/* Progress Overview - Wide Card */}
        <div className="bento-wide glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Overall Progress</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white stat-number">
                {masteredTopics}/{totalTopics}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">topics mastered</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="progress-bar h-3 rounded-full transition-all duration-500"
              style={{ width: `${totalTopics > 0 ? (masteredTopics / totalTopics) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Topics Studied */}
        <div className="glass-card rounded-2xl p-6 gradient-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Topics Studied</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white stat-number">
            {stats.topicsStudied}
          </p>
        </div>

        {/* Questions Answered */}
        <div className="glass-card rounded-2xl p-6 gradient-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Questions</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white stat-number">
            {stats.totalQuestions}
          </p>
        </div>

        {/* Accuracy */}
        <div className="glass-card rounded-2xl p-6 gradient-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Accuracy</span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white stat-number">
            {accuracy}<span className="text-xl">%</span>
          </p>
        </div>

        {/* Mastery */}
        <div className="glass-card rounded-2xl p-6 gradient-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg Mastery</span>
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white stat-number">
            {stats.averageMastery}<span className="text-xl">%</span>
          </p>
        </div>
      </div>

      {/* Courses Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"></span>
          Your Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => {
            const colors = courseColors[course.id] || courseColors.sc1007;
            const topicsMastered = course.topics.filter(
              (t) => (progress[t.id] || 0) >= 80
            ).length;
            const progressPercent = (topicsMastered / course.topics.length) * 100;

            return (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="group glass-card rounded-2xl p-6 gradient-border transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={colors.icon} />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-block ${colors.bg} ${colors.text} text-xs font-semibold px-2 py-0.5 rounded-md`}>
                        {course.code}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r ${colors.gradient} transition-all duration-500`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        {topicsMastered}/{course.topics.length}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Quick Start
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/courses" className="btn-primary inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Browse Courses
          </Link>
          <Link href="/review" className="btn-secondary inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Review Due Cards
          </Link>
        </div>
      </div>
    </div>
  );
}
