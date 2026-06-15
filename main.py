"""
Password Generator & Strength Checker
Author: Vadym Rusanov
School: Astrum College - MBO4 Software Developer 2025-2026
"""

import random
import string
import re
from dataclasses import dataclass


@dataclass
class StrengthResult:
    score: int       # 0-100
    label: str
    feedback: list[str]


def check_strength(password: str) -> StrengthResult:
    """Analyseert de sterkte van een wachtwoord."""
    score = 0
    feedback = []

    if len(password) >= 8:
        score += 20
    else:
        feedback.append("Gebruik minimaal 8 tekens")

    if len(password) >= 12:
        score += 10

    if re.search(r'[a-z]', password):
        score += 15
    else:
        feedback.append("Voeg kleine letters toe")

    if re.search(r'[A-Z]', password):
        score += 15
    else:
        feedback.append("Voeg hoofdletters toe")

    if re.search(r'\d', password):
        score += 15
    else:
        feedback.append("Voeg cijfers toe")

    if re.search(r'[!@#$%^&*()_+\-=\[\]{};:\'",.<>?/\\|`~]', password):
        score += 25
    else:
        feedback.append("Voeg speciale tekens toe (!@#$...)")

    if score >= 80:
        label = "💪 Sterk"
    elif score >= 50:
        label = "🟡 Gemiddeld"
    elif score >= 25:
        label = "🟠 Zwak"
    else:
        label = "🔴 Zeer zwak"

    return StrengthResult(score=score, label=label, feedback=feedback)


def generate_password(
    length: int = 16,
    use_upper: bool = True,
    use_digits: bool = True,
    use_symbols: bool = True
) -> str:
    """Genereert een veilig wachtwoord."""
    chars = string.ascii_lowercase
    required = []

    if use_upper:
        chars += string.ascii_uppercase
        required.append(random.choice(string.ascii_uppercase))
    if use_digits:
        chars += string.digits
        required.append(random.choice(string.digits))
    if use_symbols:
        symbols = "!@#$%^&*()-_=+"
        chars += symbols
        required.append(random.choice(symbols))

    password_list = required + [random.choice(chars) for _ in range(length - len(required))]
    random.shuffle(password_list)
    return ''.join(password_list)


def print_result(label: str, password: str) -> None:
    result = check_strength(password)
    print(f"\n{label}")
    print(f"  Wachtwoord : {password}")
    print(f"  Score      : {result.score}/100  {result.label}")
    if result.feedback:
        print(f"  Tips       : {' | '.join(result.feedback)}")


if __name__ == "__main__":
    print("=" * 50)
    print("  PASSWORD GENERATOR - Vadym Rusanov")
    print("  Astrum College | MBO4 Software Developer")
    print("=" * 50)

    # Genereer verschillende wachtwoorden
    print_result("🔒 Sterk wachtwoord (16 tekens):", generate_password(16))
    print_result("🔒 Wachtwoord zonder symbolen:",   generate_password(12, use_symbols=False))
    print_result("🔒 Kort wachtwoord (8 tekens):",   generate_password(8))

    # Test zwakke wachtwoorden
    print_result("⚠️  Test 'welkom123':",  "welkom123")
    print_result("⚠️  Test '123456':",     "123456")
    print_result("⚠️  Test 'Vad@2025!':", "Vad@2025!")
