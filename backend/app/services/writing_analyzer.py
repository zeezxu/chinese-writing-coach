"""
Complete Writing Analyzer

Combines vocabulary and sentence analysis into a unified system.
"""
from typing import Dict, List
from app.services.vocabulary_analyzer import VocabularyAnalyzer
from app.services.sentence_analyzer import SentenceAnalyzer


class WritingAnalyzer:
    """
    Complete writing analysis system
    
    Combines:
    - Vocabulary analysis (HSK levels, richness, etc.)
    - Sentence analysis (grammar, semantics, collocation via AI)
    - Essay-level analysis (structure, coherence, transitions via AI)
    """
    
    def __init__(self):
        """Initialize all analyzers"""
        print("🔧 Initializing Writing Analyzer...")
        self.vocab_analyzer = VocabularyAnalyzer()
        self.sentence_analyzer = SentenceAnalyzer()
        print("✓ Writing Analyzer ready\n")
    
    async def analyze_essay(
        self, 
        text: str, 
        target_hsk_level: int = 3,
        language: str = "en"
    ) -> Dict:
        """
        Analyze a complete essay
        
        Args:
            text: Essay text in Chinese
            target_hsk_level: Student's target HSK level (1-6)
            language: Output language for feedback (en, zh, es, fr, etc.)
            
        Returns:
            Complete analysis results with:
            - basic_stats: char count, paragraph count
            - vocabulary: vocabulary analysis results
            - sentences: sentence and essay-level analysis from AI
            - scoring: overall scores
            - recommendations: actionable feedback
        """
        print(f"ANALYZING ESSAY")
        print(f"Target HSK Level: {target_hsk_level}")
        print(f"Output Language: {language}")
        
        # 1. Basic statistics
        basic_stats = self._calculate_basic_stats(text)
        print(f"Basic stats calculated")
        print(f" Characters: {basic_stats['char_count']}")
        print(f" Paragraphs: {basic_stats['paragraph_count']}")
        
        # 2. Vocabulary analysis
        print(f"\nAnalyzing vocabulary...")
        vocab_analysis = self.vocab_analyzer.analyze(text)
        print(f"Vocabulary analysis complete")
        print(f" Vocabulary score: {vocab_analysis['vocabulary_richness_score']}/100")
        print(f" Total words: {vocab_analysis['total_words']}")
        print(f" Unique words: {vocab_analysis['unique_words']}")
        
        # 3. Sentence & Essay analysis (AI-powered)
        print(f"\nAnalyzing sentences and essay structure with AI...")
        sentence_analysis = await self.sentence_analyzer.analyze(
            text, 
            target_hsk_level,
            language
        )
        print(f"Sentence & essay analysis complete")
        print(f" Sentence quality: {sentence_analysis['quality_score']}/100")
        
        # 4. Calculate overall scoring
        print(f"\nCalculating overall scores...")
        scoring = self._calculate_overall_score(
            vocab_analysis,
            sentence_analysis
        )
        print(f"Scoring complete")
        print(f" Overall score: {scoring['overall']}/100")
        
        # 5. Generate recommendations
        print(f"\nGenerating recommendations...")
        recommendations = self._generate_recommendations(
            vocab_analysis,
            sentence_analysis,
            target_hsk_level
        )
        print(f"✓ Generated {len(recommendations)} recommendation(s)")
        
        print(f"✅ ANALYSIS COMPLETE")
        return {
            'basic_stats': basic_stats,
            'vocabulary': vocab_analysis,
            'sentences': sentence_analysis,
            'scoring': scoring,
            'recommendations': recommendations,
            'target_level': target_hsk_level,
            'output_language': language
        }
    
    def _calculate_basic_stats(self, text: str) -> Dict:
        """Calculate basic text statistics"""
        import re
        
        # Chinese characters only
        chinese_chars = re.findall(r'[\u4e00-\u9fa5]', text)
        char_count = len(chinese_chars)
        
        # Paragraphs (split by newlines)
        paragraphs = [p.strip() for p in text.split('\n') if p.strip()]
        paragraph_count = len(paragraphs)
        
        return {
            'char_count': char_count,
            'paragraph_count': paragraph_count
        }
    
    def _calculate_overall_score(
        self,
        vocab_analysis: Dict,
        sentence_analysis: Dict
    ) -> Dict:
        """
        Calculate overall score
        
        Weighting:
        - Vocabulary: 40%
        - Sentence Quality: 30%
        - Essay Structure/Flow: 30%
        """
        vocab_score = vocab_analysis['vocabulary_richness_score']
        sentence_score = sentence_analysis['quality_score']
        
        # Get essay-level scores if available
        essay_data = sentence_analysis.get('ai_analysis', {}).get('essay_analysis', {})
        
        if essay_data:
            structure = essay_data.get('structure_score', 0)
            coherence = essay_data.get('coherence_score', 0)
            transition = essay_data.get('transition_score', 0)
            logic = essay_data.get('logic_score', 0)
            
            # Average essay-level scores
            essay_score = (structure + coherence + transition + logic) / 4
            
            # Weighted combination
            overall = int(vocab_score * 0.4 + sentence_score * 0.3 + essay_score * 0.3)
        else:
            # Fallback if no essay analysis (shouldn't happen with new analyzer)
            overall = int(vocab_score * 0.4 + sentence_score * 0.6)
            essay_score = 0
        
        # Get detailed breakdown from sentence analysis
        breakdown = {}
        if sentence_analysis.get('ai_analysis', {}).get('sentence_analysis'):
            sentences = sentence_analysis['ai_analysis']['sentence_analysis']
            import numpy as np
            
            breakdown = {
                'grammar': int(np.mean([s.get('grammar_score', 0) for s in sentences])),
                'semantics': int(np.mean([s.get('semantic_score', 0) for s in sentences])),
                'collocation': int(np.mean([s.get('collocation_score', 0) for s in sentences])),
            }
        
        # Add essay-level scores to breakdown
        if essay_data:
            breakdown.update({
                'structure': essay_data.get('structure_score', 0),
                'coherence': essay_data.get('coherence_score', 0),
                'transition': essay_data.get('transition_score', 0),
                'logic': essay_data.get('logic_score', 0)
            })
        
        return {
            'overall': overall,
            'dimensions': {
                'vocabulary': vocab_score,
                'sentence_quality': sentence_score,
                'essay_quality': int(essay_score) if essay_data else None
            },
            'breakdown': breakdown
        }
    
    def _generate_recommendations(
        self,
        vocab_analysis: Dict,
        sentence_analysis: Dict,
        target_level: int
    ) -> List[str]:
        """
        Generate comprehensive recommendations
        
        Priority order:
        1. Essay-level issues (structure, flow, transitions)
        2. Sentence-level issues (grammar, word order)
        3. Vocabulary suggestions
        """
        recommendations = []
        
        # Get recommendations from sentence analyzer (includes essay-level)
        sentence_recs = sentence_analysis.get('recommendations', [])
        if sentence_recs:
            recommendations.extend(sentence_recs)
        
        # Add vocabulary recommendations if needed
        vocab_recs = self._get_vocabulary_recommendations(vocab_analysis, target_level)
        if vocab_recs and not sentence_recs:
            # Only add vocab recs if no sentence/essay issues
            recommendations.extend(vocab_recs)
        
        # Default if no issues
        if not recommendations:
            recommendations.append("✓ Excellent work! Your writing quality is strong across all dimensions.")
        
        return recommendations
    
    def _get_vocabulary_recommendations(
        self, 
        vocab_analysis: Dict, 
        target_level: int
    ) -> List[str]:
        """Get vocabulary-specific recommendations"""
        recommendations = []
        
        ttr = vocab_analysis['ttr']
        if ttr < 0.5:
            recommendations.append(
                f"Consider using more diverse vocabulary (current diversity: {ttr:.2f}). "
                f"Try to avoid repeating the same words."
            )
        
        advanced_ratio = vocab_analysis['advanced_vocab_ratio']
        if advanced_ratio < 0.1 and target_level >= 4:
            recommendations.append(
                f"Try incorporating more HSK {target_level} level vocabulary "
                f"(currently {advanced_ratio*100:.1f}% advanced words)."
            )
        
        return recommendations


# For testing
if __name__ == "__main__":
    import asyncio
    from dotenv import load_dotenv
    load_dotenv()
    
    async def test():
        analyzer = WritingAnalyzer()
        
        test_essay = """我很喜欢学习中文。中文是一门很有意思的语言。

学习中文有很多好处。首先，我可以跟中国人交流。其次，我可以看懂中文电影。

我每天都学习中文。我觉得学习中文很重要。"""
        
        result = await analyzer.analyze_essay(
            text=test_essay,
            target_hsk_level=3,
            language="en"
        )
        
        print("FINAL RESULTS")
        print(f"Overall Score: {result['scoring']['overall']}/100")
        print(f"\nDimensions:")
        for key, value in result['scoring']['dimensions'].items():
            if value is not None:
                print(f"  {key}: {value}/100")
        
        print(f"\nRecommendations:")
        for rec in result['recommendations']:
            print(f"  • {rec}")
    
    asyncio.run(test())