"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getCourse } from "@/data/courses";
import { getTopicProgress } from "@/lib/storage";
import { useEffect, useState } from "react";

export default function CoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const course = getCourse(courseId);
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
            <Link href="/courses" className="hover:text-indigo-600">
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <span className="inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm font-semibold px-3 py-1 rounded mb-4">
          {course.code}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {course.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">{course.description}</p>
      </div>

      {/* Topics List */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Topics
      </h2>
      <div className="space-y-4">
        {course.topics.map((topic, index) => {
          const mastery = progress[topic.id] || 0;
          const isLocked = false; // All topics unlocked

          return (
            <div
              key={topic.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow ${
                isLocked ? "opacity-60" : ""
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {index + 1}.
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {topic.name}
                      </h3>
                      {mastery >= 80 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Mastered
                        </span>
                      )}
                      {isLocked && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-slate-200">
                          Locked
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
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              mastery >= 80
                                ? "bg-green-500"
                                : mastery >= 50
                                ? "bg-yellow-500"
                                : "bg-indigo-600"
                            }`}
                            style={{ width: `${mastery}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4 flex flex-col gap-2">
                    {!isLocked && (
                      <>
                        <Link
                          href={`/courses/${courseId}/${topic.id}`}
                          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium"
                        >
                          Study
                        </Link>
                        <Link
                          href={`/courses/${courseId}/${topic.id}/quiz`}
                          className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium"
                        >
                          Quiz
                        </Link>
                      </>
                    )}
                    {isLocked && (
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Complete previous topic first
                      </span>
                    )}
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
