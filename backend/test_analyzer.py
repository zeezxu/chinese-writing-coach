# backend/test_analyzer.py
from app.services.vocabulary_analyzer import VocabularyAnalyzer

# Test
analyzer = VocabularyAnalyzer()

test_text = """
我喜欢学习中文。学习中文很有意思。
我每天都会学习新的词汇。
"""

result = analyzer.analyze(test_text)

print("\n=== Vocabulary Analysis ===")
print(f"Total words: {result['total_words']}")
print(f"Unique words: {result['unique_words']}")
print(f"TTR: {result['ttr']}")
print(f"Richness score: {result['vocabulary_richness_score']}/100")
print(f"\nHSK Distribution:")
for level, count in result['hsk_distribution'].items():
    if count > 0:
        print(f"  HSK {level}: {count}")