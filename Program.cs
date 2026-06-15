// Task Manager Console App
// Author: Vadym Rusanov
// School: Astrum College - MBO4 Software Developer 2025-2026

using System;
using System.Collections.Generic;
using System.Linq;

namespace TaskManager
{
    enum Priority { Low, Medium, High }
    enum Status { Todo, InProgress, Done }

    class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Priority Priority { get; set; }
        public Status Status { get; set; }
        public DateTime CreatedAt { get; set; }

        public TaskItem(int id, string title, string description, Priority priority)
        {
            Id = id;
            Title = title;
            Description = description;
            Priority = priority;
            Status = Status.Todo;
            CreatedAt = DateTime.Now;
        }

        public override string ToString()
        {
            string priorityIcon = Priority switch {
                Priority.High   => "🔴",
                Priority.Medium => "🟡",
                Priority.Low    => "🟢",
                _ => ""
            };
            string statusIcon = Status switch {
                Status.Done       => "✅",
                Status.InProgress => "🔄",
                Status.Todo       => "📋",
                _ => ""
            };
            return $"[{Id}] {statusIcon} {priorityIcon} {Title} - {Description}";
        }
    }

    class TaskManager
    {
        private List<TaskItem> tasks = new();
        private int nextId = 1;

        public void AddTask(string title, string description, Priority priority)
        {
            tasks.Add(new TaskItem(nextId++, title, description, priority));
            Console.WriteLine($"✓ Taak '{title}' toegevoegd.");
        }

        public void UpdateStatus(int id, Status newStatus)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) { Console.WriteLine("Taak niet gevonden."); return; }
            task.Status = newStatus;
            Console.WriteLine($"✓ Status van '{task.Title}' bijgewerkt naar {newStatus}.");
        }

        public void ShowAll()
        {
            if (!tasks.Any()) { Console.WriteLine("Geen taken."); return; }
            Console.WriteLine("\n=== TAKENLIJST ===");
            foreach (var t in tasks.OrderByDescending(t => t.Priority))
                Console.WriteLine(t);
        }

        public void ShowStats()
        {
            Console.WriteLine($"\n📊 Statistieken:");
            Console.WriteLine($"  Totaal:      {tasks.Count}");
            Console.WriteLine($"  Te doen:     {tasks.Count(t => t.Status == Status.Todo)}");
            Console.WriteLine($"  Bezig:       {tasks.Count(t => t.Status == Status.InProgress)}");
            Console.WriteLine($"  Klaar:       {tasks.Count(t => t.Status == Status.Done)}");
            Console.WriteLine($"  Hoge prio:   {tasks.Count(t => t.Priority == Priority.High)}");
        }
    }

    class Program
    {
        static void Main()
        {
            Console.WriteLine("=== TASK MANAGER - Vadym Rusanov ===");
            Console.WriteLine("Astrum College | MBO4 Software Developer 2025-2026\n");

            var manager = new TaskManager();

            manager.AddTask("Portfolio website bouwen", "HTML/CSS/JS portfolio maken", Priority.High);
            manager.AddTask("PHP project afmaken", "Grade calculator afronden", Priority.High);
            manager.AddTask("C# studeren", "OOP herhalen voor toets", Priority.Medium);
            manager.AddTask("Database ontwerp", "ERD tekenen voor project", Priority.Medium);
            manager.AddTask("Git leren", "Branching strategie oefenen", Priority.Low);

            manager.UpdateStatus(1, Status.InProgress);
            manager.UpdateStatus(2, Status.Done);

            manager.ShowAll();
            manager.ShowStats();
        }
    }
}
