// src/pages/AnalysisResultsPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  BookOpen,
  MessageSquare,
  FileText,
} from "lucide-react";
import { essaysApi } from "@/api/essays";
import type { Analysis, Essay, SentenceDetail, SentenceIssue } from "@/types";
import ElementBadge from "@/components/shared/ElementBadge";
import { calculateElement } from "@/utils/fiveElements";

export default function AnalysisResultsPage() {
  const { essayId } = useParams<{ essayId: string }>();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [essay, setEssay] = useState<Essay | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!essayId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [analysisData, essayData] = await Promise.all([
          essaysApi.getAnalysis(essayId),
          essaysApi.getById(essayId),
        ]);
        setAnalysis(analysisData);
        setEssay(essayData);
      } catch (error) {
        console.error("Failed to fetch analysis:", error);
        alert("Failed to load analysis");
        navigate("/practice");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [essayId, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analysis...</p>
        </div>
      </div>
    );
  }

  if (!analysis || !essay) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Analysis not found</p>
      </div>
    );
  }

  // Calculate current element for celebration
  const totalEssays = 1; // TODO: Get from user stats
  const element = calculateElement(totalEssays, analysis.overall_score);

  return (
    <div className="space-y-6 pb-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/profile")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to My Essays</span>
      </button>

      {/* Celebration Header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-8 text-center">
        <div className="mb-4">
          <div className="inline-block">
            <ElementBadge
              element={element.name}
              level={element.level}
              size="lg"
              showLevel={false}
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Analysis Complete!
        </h1>

        <div className="text-6xl font-bold text-blue-600 mb-2">
          {analysis.overall_score}/100
        </div>

        <p className="text-gray-700 text-lg">
          {analysis.overall_score >= 90
            ? "Outstanding work!"
            : analysis.overall_score >= 80
            ? "Great job!"
            : analysis.overall_score >= 70
            ? "Good effort!"
            : analysis.overall_score >= 60
            ? "Keep practicing!"
            : "You can do better!"}
        </p>
      </div>

      {/* Essay Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{essay.title}</h2>
            <div className="flex gap-4 mt-2 text-sm text-gray-600">
              <span>HSK {essay.target_hsk_level}</span>
              <span>•</span>
              <span>{analysis.char_count} 字</span>
              <span>•</span>
              <span>{analysis.word_count} words</span>
              <span>•</span>
              <span>{analysis.sentence_count} sentences</span>
            </div>
          </div>
        </div>

        {/* Essay Content */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
            {essay.content}
          </p>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Score Breakdown
        </h3>

        <div className="space-y-4">
          {/* Vocabulary */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                📚 Vocabulary (词汇)
              </span>
              <span className="text-sm font-bold text-blue-600">
                {analysis.vocabulary_score}/100
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${analysis.vocabulary_score}%` }}
              />
            </div>
          </div>

          {/* Sentence Quality */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                ✍️ Sentence Quality (句子质量)
              </span>
              <span className="text-sm font-bold text-green-600">
                {analysis.sentence_quality_score}/100
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${analysis.sentence_quality_score}%` }}
              />
            </div>
          </div>

          {/* Structure (if available) */}
          {analysis.structure_score && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  🏗️ Structure (结构)
                </span>
                <span className="text-sm font-bold text-purple-600">
                  {analysis.structure_score}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-purple-500 h-3 rounded-full transition-all"
                  style={{ width: `${analysis.structure_score}%` }}
                />
              </div>
            </div>
          )}

          {/* Coherence (if available) */}
          {analysis.coherence_score && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  🔗 Coherence (连贯性)
                </span>
                <span className="text-sm font-bold text-indigo-600">
                  {analysis.coherence_score}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-indigo-500 h-3 rounded-full transition-all"
                  style={{ width: `${analysis.coherence_score}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-500" />
            Recommendations (建议)
          </h3>

          <div className="space-y-3">
            {analysis.recommendations
              .filter((rec) => rec.trim() !== "") // ← Filter out empty lines
              .map((rec, index) => {
                // Check if it's a section header (contains 【】)
                const isHeader = rec.includes("【") && rec.includes("】");

                if (isHeader) {
                  // Section header style
                  return (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-indigo-100 to-purple-100 border-l-4 border-indigo-500 px-4 py-3 rounded-r-lg"
                    >
                      <p className="font-bold text-indigo-900 text-base">
                        {rec}
                      </p>
                    </div>
                  );
                } else {
                  // Regular content style
                  return (
                    <div
                      key={index}
                      className="bg-blue-50 border-l-4 border-blue-500 px-4 py-3 rounded-r-lg"
                    >
                      <p className="text-gray-800">{rec}</p>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      )}

      {/* HSK Distribution */}
      {analysis.hsk_distribution && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-green-500" />
            HSK Vocabulary Distribution
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(analysis.hsk_distribution).map(([level, count]) => (
              <div
                key={level}
                className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {level === "unknown" ? "Unknown" : `HSK ${level}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sentence Details (if available) */}
      {analysis.sentence_details && analysis.sentence_details.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-500" />
            Sentence Analysis
          </h3>

          <div className="space-y-4">
            {analysis.sentence_details
              .slice(0, 5)
              .map((sentence: SentenceDetail, index: number) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-gray-800 font-medium flex-1">
                      {sentence.original}
                    </p>
                    <span
                      className={`ml-4 px-2 py-1 rounded text-sm font-medium ${
                        sentence.overall_quality >= 80
                          ? "bg-green-100 text-green-700"
                          : sentence.overall_quality >= 60
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {sentence.overall_quality}/100
                    </span>
                  </div>

                  {sentence.issues && sentence.issues.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {sentence.issues.map(
                        (issue: SentenceIssue, issueIndex: number) => (
                          <div
                            key={issueIndex}
                            className="bg-red-50 border-l-4 border-red-400 p-3 text-sm"
                          >
                            <div className="font-medium text-red-700">
                              {issue.type}
                            </div>
                            <div className="text-gray-700 mt-1">
                              {issue.description}
                            </div>
                            {issue.correction && (
                              <div className="text-green-700 mt-1">
                                ✓ Correction: {issue.correction}
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {sentence.improvement_suggestion && (
                    <div className="mt-2 text-sm text-gray-600 italic">
                      💡 {sentence.improvement_suggestion}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/practice")}
          className="flex-1 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Write Another Essay
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          View My Essays
        </button>
      </div>
    </div>
  );
}
