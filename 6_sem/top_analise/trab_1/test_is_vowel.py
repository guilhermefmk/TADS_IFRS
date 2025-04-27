import unittest

from index import is_vowel


class TestIsVowel(unittest.TestCase):

    def test_vowels(self):
        self.assertTrue(is_vowel("a"))
        self.assertTrue(is_vowel("e"))
        self.assertTrue(is_vowel("i"))
        self.assertTrue(is_vowel("o"))
        self.assertTrue(is_vowel("u"))
        self.assertTrue(is_vowel("A"))
        self.assertTrue(is_vowel("E"))
        self.assertTrue(is_vowel("I"))
        self.assertTrue(is_vowel("O"))
        self.assertTrue(is_vowel("U"))

    def test_non_vowels(self):
        self.assertFalse(is_vowel("b"))
        self.assertFalse(is_vowel("c"))
        self.assertFalse(is_vowel("d"))
        self.assertFalse(is_vowel("z"))
        self.assertFalse(is_vowel("B"))
        self.assertFalse(is_vowel("Z"))
        self.assertFalse(is_vowel("1"))
        self.assertFalse(is_vowel("@"))
        self.assertFalse(is_vowel(" "))


if __name__ == "__main__":
    unittest.main()
