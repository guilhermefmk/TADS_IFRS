import unittest

from index import format_text


class TestFormatText(unittest.TestCase):

    def test_format_text_normal_list(self):
        input_list = ["apple", "banana", "orange"]
        expected_output = "apple, banana, orange"
        self.assertMultiLineEqual(format_text(input_list), expected_output)

    def test_format_text_empty_list(self):
        input_list = []
        expected_output = ""
        self.assertMultiLineEqual(format_text(input_list), expected_output)

    def test_format_text_single_element(self):
        input_list = ["apple"]
        expected_output = "apple"
        self.assertMultiLineEqual(format_text(input_list), expected_output)

    def test_format_text_with_empty_strings(self):
        input_list = ["apple", "", "orange"]
        expected_output = "apple, , orange"
        self.assertMultiLineEqual(format_text(input_list), expected_output)

    def test_format_text_with_numbers(self):
        input_list = ["apple", "123", "orange"]
        expected_output = "apple, 123, orange"
        self.assertMultiLineEqual(format_text(input_list), expected_output)


if __name__ == "__main__":
    unittest.main()
