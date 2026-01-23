"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getTopic, getCourse } from "@/data/courses";

export default function TopicPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const topicId = params.topicId as string;

  const course = getCourse(courseId);
  const topic = getTopic(courseId, topicId);

  if (!course || !topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Topic not found
        </h1>
        <Link href={`/courses/${courseId}`} className="text-indigo-600 hover:underline mt-4 block">
          ← Back to course
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <li>
            <Link href="/courses" className="hover:text-indigo-600">
              Courses
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href={`/courses/${courseId}`} className="hover:text-indigo-600">
              {course.code}
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 dark:text-white font-medium">
            {topic.name}
          </li>
        </ol>
      </nav>

      {/* Topic Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {topic.name}
        </h1>
        <Link
          href={`/courses/${courseId}/${topicId}/quiz`}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium"
        >
          Take Quiz →
        </Link>
      </div>

      {/* Summary Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Summary
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          {topic.summary.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-wrap">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Key Points */}
      <div className="bg-indigo-100 dark:bg-indigo-900/40 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Key Points
        </h2>
        <ul className="space-y-2">
          {topic.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
              <span className="text-gray-700 dark:text-gray-200">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Code Examples */}
      {topic.codeExamples && topic.codeExamples.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Code Examples
          </h2>
          {topic.codeExamples.map((example, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {example.title}
                </h3>
              </div>
              <pre className="p-4 overflow-x-auto bg-gray-900 text-gray-100">
                <code className="text-sm font-mono">{example.code}</code>
              </pre>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {example.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <Link
          href={`/courses/${courseId}`}
          className="text-gray-600 dark:text-gray-300 hover:text-indigo-600"
        >
          ← Back to Course
        </Link>
        <Link
          href={`/courses/${courseId}/${topicId}/quiz`}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium"
        >
          Take Quiz →
        </Link>
      </div>
    </div>
  );
}
