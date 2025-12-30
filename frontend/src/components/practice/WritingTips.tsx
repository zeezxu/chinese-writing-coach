// src/components/practice/WritingTips.tsx
import { Lightbulb } from 'lucide-react';

export default function WritingTips() {
  const tips = [
    {
      title: 'Use varied vocabulary',
      chinese: '使用多样的词汇',
      description: 'Try to use different words instead of repeating the same ones.',
    },
    {
      title: 'Check your grammar',
      chinese: '检查你的语法',
      description: 'Pay attention to word order, particles (的/得/地), and measure words.',
    },
    {
      title: 'Write clearly',
      chinese: '写得清楚',
      description: 'Make sure each sentence has a clear meaning and flows naturally.',
    },
    {
      title: 'Structure your essay',
      chinese: '组织你的文章',
      description: 'Use paragraphs: introduction, body, and conclusion.',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-blue-900">
          Writing Tips (写作提示)
        </h3>
      </div>

      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
              {index + 1}
            </div>
            <div>
              <div className="font-medium text-gray-900">
                {tip.title}
                <span className="text-sm text-gray-600 ml-2">({tip.chinese})</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}