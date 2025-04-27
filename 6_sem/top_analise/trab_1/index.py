def is_even(number):
    return number % 2 == 0


def format_text(text_list):
    return ", ".join(text_list)


def is_vowel(letter):
    vowels = ["a", "e", "i", "o", "u"]
    return letter.lower() in vowels
