"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getCourse } from "@/data/courses";
import { getTopicProgress } from "@/lib/storage";
import { useEffect, useState } from "react";

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

export default function CoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const course = getCourse(courseId);
  const colors = courseColors[courseId] || courseColors.sc1007;
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    if (course) {
      const prog: Record<string, number> = {};
      course.topics.forEach((topic) => {
        const p = getTopicProgress(topic.id);
        prog[topic.id] = p?.masteryLevel || 0;
      });
      setProgress(prog);
    }
  }, [course]);

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Course not found
        </h1>
        <Link href="/courses" className="text-indigo-600 hover:underline mt-4 block">
          ← Back to courses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <li>
            <Link href="/courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Courses
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 dark:text-white font-medium">
            {course.code}
          </li>
        </ol>
      </nav>

      {/* Course Header */}
      <div className="glass-card rounded-2xl p-6 gradient-border mb-8">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center flex-shrink-0`}>
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={colors.icon} />
            </svg>
          </div>
          <div className="flex-1">
            <span className={`inline-block ${colors.bg} ${colors.text} text-sm font-semibold px-2.5 py-0.5 rounded-lg mb-2`}>
              {course.code}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {course.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">{course.description}</p>
          </div>
        </div>
      </div>

      {/* Topics List */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
        <span className={`w-1.5 h-6 rounded-full bg-gradient-to-b ${colors.gradient}`}></span>
        Topics
      </h2>
      <div className="space-y-4">
        {course.topics.map((topic, index) => {
          const mastery = progress[topic.id] || 0;

          return (
            <div
              key={topic.id}
              className="glass-card rounded-2xl gradient-border"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {index + 1}.
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {topic.name}
                      </h3>
                      {mastery >= 80 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          Mastered
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {topic.keyPoints.slice(0, 2).join(" • ")}
                    </p>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1 max-w-xs">
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300 mb-1">
                          <span>Mastery</span>
                          <span>{mastery}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${colors.gradient} transition-all duration-500`}
                            style={{ width: `${mastery}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4 flex flex-col gap-2">
                    <Link
                      href={`/courses/${courseId}/${topic.id}`}
                      className="btn-primary"
                    >
                      Study
                    </Link>
                    <Link
                      href={`/courses/${courseId}/${topic.id}/quiz`}
                      className="btn-secondary"
                    >
                      Quiz
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
