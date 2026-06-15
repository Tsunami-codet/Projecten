<?php
/**
 * Student Grade Calculator
 * Author: Vadym Rusanov
 * School: Astrum College - MBO4 Software Developer 2025-2026
 */

class GradeCalculator {
    private array $grades = [];

    public function addGrade(string $subject, float $grade): void {
        if ($grade < 1 || $grade > 10) {
            throw new InvalidArgumentException("Grade must be between 1 and 10.");
        }
        $this->grades[$subject] = $grade;
    }

    public function getAverage(): float {
        if (empty($this->grades)) return 0;
        return array_sum($this->grades) / count($this->grades);
    }

    public function getHighest(): array {
        if (empty($this->grades)) return [];
        $max = max($this->grades);
        return array_filter($this->grades, fn($g) => $g === $max);
    }

    public function getLowest(): array {
        if (empty($this->grades)) return [];
        $min = min($this->grades);
        return array_filter($this->grades, fn($g) => $g === $min);
    }

    public function isPassing(): bool {
        return $this->getAverage() >= 5.5;
    }

    public function getReport(): string {
        $avg = round($this->getAverage(), 2);
        $status = $this->isPassing() ? "GESLAAGD ✓" : "GEZAKT ✗";
        $report = "=== RAPPORT VADYM RUSANOV ===\n";
        $report .= "School: Astrum College | MBO4 Software Developer\n\n";
        foreach ($this->grades as $subject => $grade) {
            $report .= sprintf("  %-25s %s\n", $subject . ":", $grade);
        }
        $report .= str_repeat("-", 35) . "\n";
        $report .= sprintf("  %-25s %s\n", "Gemiddelde:", $avg);
        $report .= "  Status: $status\n";
        return $report;
    }
}

// Demo
$calc = new GradeCalculator();
$calc->addGrade("Programmeren (PHP)", 8.5);
$calc->addGrade("Databases (SQL)", 7.0);
$calc->addGrade("Netwerken", 6.5);
$calc->addGrade("Web Development", 9.0);
$calc->addGrade("Project Management", 7.5);
$calc->addGrade("Engels", 8.0);

echo $calc->getReport();
echo "\nHoogste vak: " . implode(", ", array_keys($calc->getHighest())) . "\n";
echo "Laagste vak: "  . implode(", ", array_keys($calc->getLowest())) . "\n";
