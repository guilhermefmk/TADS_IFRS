import unittest

from index import is_even


class TestIsEven(unittest.TestCase):

    def test_even_numbers(self):
        self.assertTrue(is_even(2))
        self.assertTrue(is_even(4))
        self.assertTrue(is_even(100))
        self.assertTrue(is_even(0))  # Zero is considered even

    def test_odd_numbers(self):
        self.assertFalse(is_even(1))
        self.assertFalse(is_even(3))
        self.assertFalse(is_even(99))

    def test_negative_numbers(self):
        self.assertTrue(is_even(-2))
        self.assertTrue(is_even(-4))
        self.assertTrue(is_even(-100))
        self.assertFalse(is_even(-1))
        self.assertFalse(is_even(-3))
        self.assertFalse(is_even(-99))


if __name__ == "__main__":
    unittest.main()
