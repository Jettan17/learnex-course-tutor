"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getTopic, getCourse } from "@/data/courses";
import TopicChat from "@/components/TopicChat";

const courseColors: Record<string, { gradient: string; bg: string; text: string }> = {
  sc1006: { gradient: "from-amber-500 to-orange-500", bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-700 dark:text-amber-300" },
  sc1007: { gradient: "from-indigo-500 to-purple-500", bg: "bg-indigo-50 dark:bg-indigo-900/20", text: "text-indigo-700 dark:text-indigo-300" },
  sc1008: { gradient: "from-emerald-500 to-teal-500", bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-700 dark:text-emerald-300" },
  sc2002: { gradient: "from-pink-500 to-rose-500", bg: "bg-pink-50 dark:bg-pink-900/20", text: "text-pink-700 dark:text-pink-300" },
};

export default function TopicPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const topicId = params.topicId as string;

  const course = getCourse(courseId);
  const topic = getTopic(courseId, topicId);
  const colors = courseColors[courseId] || courseColors.sc1007;

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
        <ol className="flex items-center space-x-2 text-sm text-neutral-500">
          <li>
            <Link href="/courses" className="hover:text-foreground transition-colors">
              Courses
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href={`/courses/${courseId}`} className="hover:text-foreground transition-colors">
              {course.code}
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground font-medium">{topic.name}</li>
        </ol>
      </nav>

      {/* Topic Header */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <span className={`inline-block ${colors.bg} ${colors.text} text-xs font-semibold px-2.5 py-0.5 rounded-lg mb-3 uppercase tracking-wider`}>
              {course.code}
            </span>
            <h1 className="text-3xl font-bold mb-4">{topic.name}</h1>
            <Link
              href={`/courses/${courseId}/${topicId}/quiz`}
              className="btn-primary inline-flex items-center gap-2"
            >
              Take Quiz
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex-shrink-0`} />
        </div>
      </div>

      {/* Summary */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className={`w-1 h-5 rounded-full bg-gradient-to-b ${colors.gradient}`} />
          Summary
        </h2>
        <div className="space-y-3">
          {topic.summary.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-sm text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Key Points */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className={`w-1 h-5 rounded-full bg-gradient-to-b ${colors.gradient}`} />
          Key Points
        </h2>
        <ul className="space-y-2">
          {topic.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                {i + 1}
              </span>
              <span className="text-neutral-700 dark:text-neutral-200 leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Code Examples */}
      {topic.codeExamples && topic.codeExamples.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className={`w-1 h-5 rounded-full bg-gradient-to-b ${colors.gradient}`} />
            Code Examples
          </h2>
          <div className="space-y-4">
            {topic.codeExamples.map((example, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-neutral-200 dark:border-neutral-800">
                  <h3 className="text-sm font-semibold">{example.title}</h3>
                </div>
                <pre className="p-5 overflow-x-auto bg-neutral-950 text-neutral-100">
                  <code className="text-xs font-mono leading-relaxed">{example.code}</code>
                </pre>
                <div className="px-5 py-3 border-t border-neutral-200 dark:border-neutral-800">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{example.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Chat */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className={`w-1 h-5 rounded-full bg-gradient-to-b ${colors.gradient}`} />
          Study Chat
        </h2>
        <TopicChat topic={topic} />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Link href={`/courses/${courseId}`} className="btn-secondary inline-flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back to Course
        </Link>
        <Link
          href={`/courses/${courseId}/${topicId}/quiz`}
          className="btn-primary inline-flex items-center gap-2"
        >
          Take Quiz
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
