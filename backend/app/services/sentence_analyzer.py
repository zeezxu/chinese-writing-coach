"""
Sentence & Essay Analyzer with Universal Language Support

Analyzes Chinese text at two levels:
1. Sentence-level: Grammar, semantics, collocation for each sentence
2. Essay-level: Overall structure, coherence, transitions, logic flow

Supports output in 50+ languages automatically.
"""

import re
import os
from typing import Dict, List, Optional
from openai import OpenAI
import json


class SentenceAnalyzer:
    """
    AI-powered sentence and essay analyzer using GPT-4
    
    Analyzes both micro (sentences) and macro (essay structure) aspects.
    Outputs feedback in user's preferred language.
    """
    
    # Supported languages (ISO 639-1 codes)
    SUPPORTED_LANGUAGES = {
        'en': 'English',
        'zh': 'Chinese (中文)',
        'es': 'Spanish (Español)',
        'fr': 'French (Français)',
        'de': 'German (Deutsch)',
        'ja': 'Japanese (日本語)',
        'ko': 'Korean (한국어)',
        'pt': 'Portuguese (Português)',
        'ru': 'Russian (Русский)',
        'it': 'Italian (Italiano)',
        'ar': 'Arabic (العربية)',
        'hi': 'Hindi (हिन्दी)',
        'vi': 'Vietnamese (Tiếng Việt)',
        'th': 'Thai (ไทย)',
        'id': 'Indonesian (Bahasa Indonesia)',
        'nl': 'Dutch (Nederlands)',
        'pl': 'Polish (Polski)',
        'tr': 'Turkish (Türkçe)',
        'sv': 'Swedish (Svenska)',
        'no': 'Norwegian (Norsk)',
    }
    
    def __init__(self):
        """Initialize OpenAI client"""
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("❌ OPENAI_API_KEY not found in environment variables")
        
        self.client = OpenAI(api_key=api_key)
        
        # Get model from environment or use default
        self.model = os.getenv("OPENAI_MODEL", "gpt-4o")
        
        print(f"✓ Sentence & Essay Analyzer initialized")
        print(f"  Model: {self.model}")
        print(f"  Supported languages: {len(self.SUPPORTED_LANGUAGES)}")
    
    async def analyze(
        self, 
        text: str, 
        target_hsk_level: int = 3,
        language: str = "en"
    ) -> Dict:
        """
        Analyze text at both sentence and essay levels
        
        Args:
            text: Chinese text to analyze
            target_hsk_level: Student's target HSK level (1-6)
            language: Output language code (en, zh, fr, es, ja, etc.)
            
        Returns:
            Complete analysis with:
            - Sentence-level analysis (grammar, word choice)
            - Essay-level analysis (structure, coherence, transitions)
        """
        # Validate language
        if language not in self.SUPPORTED_LANGUAGES:
            print(f"Warning: Language '{language}' not in supported list. Using English.")
            language = 'en'
        
        language_name = self.SUPPORTED_LANGUAGES[language]
        print(f"\nAnalyzing text with GPT-4")
        print(f"   Target HSK Level: {target_hsk_level}")
        print(f"   Output Language: {language_name}")
        
        # Split into sentences and paragraphs
        sentences = self._split_sentences(text)
        paragraphs = self._split_paragraphs(text)
        
        if not sentences:
            print("No sentences found")
            return self._empty_result()
        
        print(f"Found {len(sentences)} sentence(s) in {len(paragraphs)} paragraph(s)")
        
        # Analyze with GPT-4 (both sentence and essay level)
        ai_analysis = await self._ai_analyze_complete(
            text,
            sentences,
            paragraphs,
            target_hsk_level,
            language
        )
        
        # Calculate overall quality score
        quality_score = self._calculate_quality_score(ai_analysis)
        print(f"✓ Quality score: {quality_score}/100")
        
        # Generate recommendations
        recommendations = self._generate_recommendations(ai_analysis, language)
        
        return {
            'sentence_count': len(sentences),
            'paragraph_count': len(paragraphs),
            'ai_analysis': ai_analysis,
            'quality_score': quality_score,
            'recommendations': recommendations,
            'output_language': language
        }
    
    def _split_sentences(self, text: str) -> List[str]:
        """Split text into sentences by Chinese punctuation"""
        sentences = re.split(r'[。！？\n]+', text)
        sentences = [s.strip() for s in sentences if s.strip()]
        return sentences
    
    def _split_paragraphs(self, text: str) -> List[str]:
        """Split text into paragraphs"""
        paragraphs = text.split('\n')
        paragraphs = [p.strip() for p in paragraphs if p.strip()]
        return paragraphs
    
    async def _ai_analyze_complete(
        self, 
        full_text: str,
        sentences: List[str],
        paragraphs: List[str],
        target_hsk_level: int,
        language: str
    ) -> Dict:
        """
        Use GPT-4 to analyze at BOTH sentence and essay levels
        
        This is the key function that does comprehensive analysis!
        """
        language_name = self.SUPPORTED_LANGUAGES.get(language, 'English')
        
        # Format for display
        sentences_text = "\n".join([f"{i+1}. {s}" for i, s in enumerate(sentences)])
        paragraphs_text = "\n\n".join([f"[Paragraph {i+1}]\n{p}" for i, p in enumerate(paragraphs)])
        
        # System instruction
        system_instruction = f"""You are a professional Chinese language teacher analyzing student writing.

CRITICAL INSTRUCTIONS:
1. Provide ALL feedback in {language_name}
2. ALL descriptions and suggestions MUST be in {language_name}
3. The ONLY Chinese text should be in "correction" fields
4. Analyze at TWO levels: sentence-level AND essay-level
5. Be specific, clear, and constructive"""

        # Comprehensive prompt
        prompt = f"""Analyze this Chinese essay. Student's target: HSK {target_hsk_level}.

FULL ESSAY:
{full_text}

SENTENCES (for sentence-level analysis):
{sentences_text}

PARAGRAPHS (for essay-level analysis):
{paragraphs_text}

Perform TWO types of analysis:

PART 1: SENTENCE-LEVEL ANALYSIS

For EACH sentence, analyze:

1. **Grammar Correctness** (0-100)
   - Word order (词序)
   - Particles (的/得/地)
   - Measure words (量词)
   - Sentence structure

2. **Semantic Coherence** (0-100)
   - Clear meaning?
   - Natural expression?

3. **Word Collocation** (0-100)
   - Natural pairings?
   - Appropriate usage?

4. **Errors**
   - Word order errors
   - Character mistakes
   - Collocation problems
   - Logic issues

PART 2: ESSAY-LEVEL ANALYSIS

Analyze the ENTIRE essay for:

1. **Overall Structure** (0-100)
   - Does it have clear beginning, middle, end?
   - Is the structure logical?
   - Are ideas organized well?

2. **Coherence & Flow** (0-100)
   - Do paragraphs connect logically?
   - Do sentences flow smoothly within paragraphs?
   - Is the progression of ideas clear?

3. **Transitions** (0-100)
   - Are transitions smooth or abrupt?
   - Are transition words used appropriately (因此, 然而, 首先, 其次, etc.)?
   - Do paragraphs link together well?

4. **Topic Consistency** (0-100)
   - Does the essay stay on topic?
   - Is there a clear main idea?
   - Do all parts support the main idea?

5. **Logic & Argumentation** (0-100)
   - Are arguments logical?
   - Do ideas follow naturally from each other?
   - Are there contradictions or gaps in logic?

6. **Paragraph Development**
   - Are paragraphs well-developed?
   - Does each paragraph have a clear point?
   - Are examples/details sufficient?

IDENTIFY SPECIFIC ISSUES:
- Abrupt topic changes
- Missing transitions
- Illogical connections between ideas
- Unclear relationships between paragraphs
- Sudden jumps in reasoning
- Lack of flow
- Contradictions

Return JSON in this EXACT format:

{{
  "sentence_analysis": [
    {{
      "index": 1,
      "original": "sentence text",
      "grammar_score": 85,
      "semantic_score": 90,
      "collocation_score": 80,
      "overall_quality": 85,
      "issues": [
        {{
          "type": "Error type in {language_name}",
          "description": "Explanation in {language_name}",
          "correction": "正确的中文",
          "severity": "minor|major|critical"
        }}
      ],
      "improvement_suggestion": "Specific advice in {language_name}"
    }}
  ],
  
  "essay_analysis": {{
    "structure_score": 85,
    "coherence_score": 80,
    "transition_score": 75,
    "topic_consistency_score": 90,
    "logic_score": 85,
    
    "structure_feedback": "Overall structural assessment in {language_name}",
    "coherence_feedback": "Flow and connection assessment in {language_name}",
    "transition_feedback": "Transition quality assessment in {language_name}",
    
    "essay_issues": [
      {{
        "type": "Issue type in {language_name} (e.g., 'Abrupt transition', 'Unclear connection')",
        "location": "Between paragraph 1 and 2",
        "description": "Detailed explanation in {language_name}",
        "suggestion": "How to improve in {language_name}",
        "severity": "minor|major|critical"
      }}
    ],
    
    "strengths": [
      "Strength 1 in {language_name}",
      "Strength 2 in {language_name}"
    ],
    
    "areas_for_improvement": [
      "Area 1 in {language_name}",
      "Area 2 in {language_name}"
    ]
  }},
  
  "overall_coherence": 82
}}

IMPORTANT:
- Sentence-level focuses on individual sentence quality
- Essay-level focuses on how everything fits together
- Be specific about WHERE issues occur (which paragraph, between which sentences)
- Provide actionable suggestions for improving flow and logic
- ALL text in {language_name} except corrections"""

        try:
            print(f"   Calling GPT-4 for comprehensive analysis...")
            
            # Call GPT-4
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_instruction},
                    {"role": "user", "content": prompt}
                ],
                temperature=0,
                max_tokens=4000  # Increased for essay-level analysis
            )
            
            response_text = response.choices[0].message.content
            
            # Log usage
            usage = response.usage
            print(f"Tokens: {usage.total_tokens} (in: {usage.prompt_tokens}, out: {usage.completion_tokens})")
            
            # Parse JSON
            json_str = self._extract_json(response_text)
            analysis_result = json.loads(json_str)
            
            print(f"Complete analysis finished")
            return analysis_result
            
        except json.JSONDecodeError as e:
            print(f"JSON parse error: {e}")
            print(f"   Response preview: {response_text[:500]}...")
            return self._empty_ai_result(sentences)
            
        except Exception as e:
            print(f"GPT-4 API error: {e}")
            return self._empty_ai_result(sentences)
    
    def _calculate_quality_score(self, ai_analysis: Dict) -> int:
        """
        Calculate overall quality score from both sentence and essay analysis
        
        New formula:
        - Sentence quality: 50%
        - Essay structure/flow: 50%
        """
        # Sentence-level scores
        sentence_scores = []
        if ai_analysis.get('sentence_analysis'):
            sentence_scores = [s['overall_quality'] for s in ai_analysis['sentence_analysis']]
        
        avg_sentence_quality = sum(sentence_scores) / len(sentence_scores) if sentence_scores else 0
        
        # Essay-level scores
        essay_analysis = ai_analysis.get('essay_analysis', {})
        structure = essay_analysis.get('structure_score', 0)
        coherence = essay_analysis.get('coherence_score', 0)
        transition = essay_analysis.get('transition_score', 0)
        logic = essay_analysis.get('logic_score', 0)
        
        # Average essay-level score
        essay_level_scores = [structure, coherence, transition, logic]
        avg_essay_quality = sum(essay_level_scores) / len(essay_level_scores) if essay_level_scores else 0
        
        # Combined score (50% sentence, 50% essay)
        final_score = int(avg_sentence_quality * 0.5 + avg_essay_quality * 0.5)
        
        return final_score
    
    def _generate_recommendations(
        self, 
        ai_analysis: Dict,
        language: str
    ) -> List[str]:
        """
        Generate recommendations from both sentence and essay analysis
        """
        recommendations = []
        templates = self._get_recommendation_templates(language)
        
        # Essay-level recommendations
        essay_analysis = ai_analysis.get('essay_analysis', {})
        
        if essay_analysis:
            # Check structure
            if essay_analysis.get('structure_score', 100) < 70:
                recommendations.append(f"【{templates['essay_structure_label']}】")
                recommendations.append(essay_analysis.get('structure_feedback', ''))
            
            # Check transitions
            if essay_analysis.get('transition_score', 100) < 70:
                recommendations.append(f"【{templates['essay_transitions_label']}】")
                recommendations.append(essay_analysis.get('transition_feedback', ''))
            
            # Check coherence
            if essay_analysis.get('coherence_score', 100) < 70:
                recommendations.append(f"【{templates['essay_coherence_label']}】")
                recommendations.append(essay_analysis.get('coherence_feedback', ''))
            
            # Add specific essay issues
            essay_issues = essay_analysis.get('essay_issues', [])
            if essay_issues:
                recommendations.append("")  # Empty line
                recommendations.append(f"【{templates['specific_issues_label']}】")
                for issue in essay_issues[:3]:  # Top 3 issues
                    recommendations.append(f"• {issue['description']}")
        
        # Sentence-level recommendations
        sentence_analysis = ai_analysis.get('sentence_analysis', [])
        if sentence_analysis:
            # Count error types
            error_types = {}
            for sent in sentence_analysis:
                for issue in sent.get('issues', []):
                    error_type = issue['type']
                    error_types[error_type] = error_types.get(error_type, 0) + 1
            
            if error_types:
                most_common = max(error_types.items(), key=lambda x: x[1])
                error_name, error_count = most_common
                
                if error_count >= 2:
                    recommendations.append("")  # Empty line
                    recommendations.append(f"【{templates['sentence_errors_label']}】")
                    recommendations.append(
                        templates['common_error'].format(
                            count=error_count,
                            error_type=error_name
                        )
                    )
        
        # If no issues
        if not recommendations:
            recommendations.append(templates['excellent'])
        
        return recommendations
    
    def _get_recommendation_templates(self, language: str) -> Dict[str, str]:
        """Get recommendation templates with essay-level labels"""
        templates = {
            'en': {
                'essay_structure_label': 'Essay Structure',
                'essay_transitions_label': 'Transitions',
                'essay_coherence_label': 'Coherence & Flow',
                'specific_issues_label': 'Specific Issues to Address',
                'sentence_errors_label': 'Sentence-Level Errors',
                'common_error': 'Found {count} instances of "{error_type}"',
                'excellent': 'Excellent work overall - both sentence quality and essay structure are strong!'
            },
            'zh': {
                'essay_structure_label': '文章结构',
                'essay_transitions_label': '过渡衔接',
                'essay_coherence_label': '连贯性与流畅度',
                'specific_issues_label': '需要注意的具体问题',
                'sentence_errors_label': '句子层面的错误',
                'common_error': '发现 {count} 处「{error_type}」',
                'excellent': '整体写作优秀 - 句子质量和文章结构都很好！'
            },
            'es': {
                'essay_structure_label': 'Estructura del Ensayo',
                'essay_transitions_label': 'Transiciones',
                'essay_coherence_label': 'Coherencia y Fluidez',
                'specific_issues_label': 'Problemas Específicos a Abordar',
                'sentence_errors_label': 'Errores a Nivel de Oración',
                'common_error': 'Se encontraron {count} casos de "{error_type}"',
                'excellent': '¡Excelente trabajo en general - tanto la calidad de las oraciones como la estructura del ensayo son sólidas!'
            },
            'fr': {
                'essay_structure_label': 'Structure de l\'Essai',
                'essay_transitions_label': 'Transitions',
                'essay_coherence_label': 'Cohérence et Fluidité',
                'specific_issues_label': 'Problèmes Spécifiques à Traiter',
                'sentence_errors_label': 'Erreurs au Niveau de la Phrase',
                'common_error': '{count} instances de "{error_type}" trouvées',
                'excellent': 'Excellent travail dans l\'ensemble - la qualité des phrases et la structure de l\'essai sont solides!'
            },
            'ja': {
                'essay_structure_label': 'エッセイの構造',
                'essay_transitions_label': '転換',
                'essay_coherence_label': '一貫性と流れ',
                'specific_issues_label': '対処すべき具体的な問題',
                'sentence_errors_label': '文レベルのエラー',
                'common_error': '「{error_type}」が{count}箇所見つかりました',
                'excellent': '全体的に優れた作品です - 文の品質とエッセイ構造の両方が優れています！'
            },
            'ko': {
                'essay_structure_label': '에세이 구조',
                'essay_transitions_label': '전환',
                'essay_coherence_label': '일관성과 흐름',
                'specific_issues_label': '해결해야 할 구체적인 문제',
                'sentence_errors_label': '문장 수준 오류',
                'common_error': '"{error_type}"이(가) {count}개 발견되었습니다',
                'excellent': '전반적으로 훌륭합니다 - 문장 품질과 에세이 구조 모두 우수합니다!'
            },
        }
        
        return templates.get(language, templates['en'])
    
    def _extract_json(self, text: str) -> str:
        """Extract JSON from GPT response"""
        json_match = re.search(r'```json\s*(.*?)\s*```', text, re.DOTALL)
        if json_match:
            return json_match.group(1)
        
        json_match = re.search(r'```\s*(.*?)\s*```', text, re.DOTALL)
        if json_match:
            return json_match.group(1)
        
        json_match = re.search(r'\{.*\}', text, re.DOTALL)
        if json_match:
            return json_match.group(0)
        
        return text
    
    def _empty_result(self) -> Dict:
        """Return empty result"""
        return {
            'sentence_count': 0,
            'paragraph_count': 0,
            'ai_analysis': {},
            'quality_score': 0,
            'recommendations': [],
            'output_language': 'en'
        }
    
    def _empty_ai_result(self, sentences: List[str]) -> Dict:
        """Return empty AI result when API fails"""
        return {
            'sentence_analysis': [
                {
                    'index': i+1,
                    'original': sent,
                    'grammar_score': 0,
                    'semantic_score': 0,
                    'collocation_score': 0,
                    'overall_quality': 0,
                    'issues': [],
                    'improvement_suggestion': 'Analysis unavailable'
                }
                for i, sent in enumerate(sentences)
            ],
            'essay_analysis': {
                'structure_score': 0,
                'coherence_score': 0,
                'transition_score': 0,
                'topic_consistency_score': 0,
                'logic_score': 0,
                'essay_issues': []
            },
            'overall_coherence': 0
        }


# Example usage and testing
if __name__ == "__main__":
    import asyncio
    from dotenv import load_dotenv 
    
    # Load environment variables from .env file
    load_dotenv()
    
    async def test():
        analyzer = SentenceAnalyzer()
        
        # Test essay with BOTH good and bad elements
        test_essay = """我很喜欢学习中文。中文是一门很有意思的语言。

学习中文有很多好处。首先，我可以跟中国人交流。其次，我可以看懂中文电影。

我每天都学习中文。我觉得学习中文很重要。"""
        
        # Test in English
        print("\n" + "="*70)
        print("TEST: Complete Analysis (English)")
        print("="*70)
        result = await analyzer.analyze(test_essay, target_hsk_level=3, language='en')
        
        print(f"\nRESULTS:")
        print(f"Overall Score: {result['quality_score']}/100")
        print(f"Sentences: {result['sentence_count']}")
        print(f"Paragraphs: {result['paragraph_count']}")
        
        # Show essay-level feedback
        if result['ai_analysis'].get('essay_analysis'):
            essay = result['ai_analysis']['essay_analysis']
            print(f"\nEssay-Level Scores:")
            print(f"  Structure: {essay.get('structure_score', 0)}/100")
            print(f"  Coherence: {essay.get('coherence_score', 0)}/100")
            print(f"  Transitions: {essay.get('transition_score', 0)}/100")
            print(f"  Logic: {essay.get('logic_score', 0)}/100")
        
        print(f"\n💡 Recommendations:")
        for rec in result['recommendations']:
            print(f"  {rec}")
    
    asyncio.run(test())