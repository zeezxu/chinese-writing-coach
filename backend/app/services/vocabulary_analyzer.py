# backend/app/services/vocabulary_analyzer.py
import jieba
from pypinyin import lazy_pinyin
from typing import Dict, List
from collections import Counter
import json
import os

class VocabularyAnalyzer:
    """Analyze vocabulary in Chinese text"""
    
    def __init__(self):
        self.hsk_vocab = self._load_hsk_vocabulary()
        print(f"✓ Loaded {len(self.hsk_vocab)} HSK vocabulary words")
    
    def _load_hsk_vocabulary(self) -> Dict:
        """Load HSK vocabulary from JSON file"""
        vocab_path = os.path.join(
            os.path.dirname(__file__), 
            '../../data/hsk_vocabulary.json'
        )
        
        try:
            with open(vocab_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"⚠️  Warning: HSK vocabulary file not found at {vocab_path}")
            return {}
    
    def analyze(self, text: str) -> Dict:
        """Analyze text vocabulary"""
        # Segment text
        words = [w for w in jieba.lcut(text) if len(w) > 1]
        
        if not words:
            return self._empty_result()
        
        # Basic stats
        total_words = len(words)
        unique_words = set(words)
        unique_count = len(unique_words)
        ttr = unique_count / total_words if total_words > 0 else 0
        
        # HSK distribution
        hsk_dist = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, 'unknown': 0}
        word_details = {}
        
        for word in unique_words:
            if word in self.hsk_vocab:
                level = str(self.hsk_vocab[word]['level'])
                hsk_dist[level] += words.count(word)
                word_details[word] = {
                    'level': self.hsk_vocab[word]['level'],
                    'pinyin': self.hsk_vocab[word]['pinyin'],
                    'translation': self.hsk_vocab[word].get('translation', ''),
                    'frequency': words.count(word)
                }
            else:
                hsk_dist['unknown'] += words.count(word)
                word_details[word] = {
                    'level': 0,
                    'pinyin': ' '.join(lazy_pinyin(word)),
                    'translation': '',
                    'frequency': words.count(word)
                }
        
        # Advanced vocab ratio
        advanced_count = hsk_dist['4'] + hsk_dist['5'] + hsk_dist['6']
        advanced_ratio = advanced_count / total_words if total_words > 0 else 0
        
        # Richness score
        richness_score = min(100, int(ttr * 60 + advanced_ratio * 40 * 100))
        
        return {
            'total_words': total_words,
            'unique_words': unique_count,
            'ttr': round(ttr, 3),
            'hsk_distribution': hsk_dist,
            'advanced_vocab_ratio': round(advanced_ratio, 3),
            'vocabulary_richness_score': richness_score,
            'word_details': word_details
        }
    
    def _empty_result(self):
        return {
            'total_words': 0,
            'unique_words': 0,
            'ttr': 0,
            'hsk_distribution': {},
            'advanced_vocab_ratio': 0,
            'vocabulary_richness_score': 0,
            'word_details': {}
        }