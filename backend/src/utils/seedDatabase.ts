import { PrismaClient } from '@prisma/client';

export async function seedIntroLesson(prisma: PrismaClient) {
  console.log('🔄 Seeding Introduction to Python lesson...');

  // Delete the old lesson
  await prisma.lesson.deleteMany({
    where: { slug: 'python-basics-intro' }
  });

  // Create the new comprehensive lesson
  await prisma.lesson.create({
    data: {
      title: 'Introduction to Python',
      slug: 'python-basics-intro',
      description: 'A comprehensive introduction to Python programming',
      difficulty: 'beginner',
      estimatedTime: 45,
      orderIndex: 1,
      topic: 'Python Basics',
      prerequisites: [],
      content: `# Introduction to Python Programming

## Welcome to Python! 🐍

Python is one of the most popular and versatile programming languages in the world today. Whether you're interested in web development, data science, artificial intelligence, automation, or just learning to code, Python is an excellent choice.

---

## Navigation

[Next: History & Background →](#history-background)

---

## History & Background

### The Birth of Python

Python was created by **Guido van Rossum** and first released in 1991. Van Rossum began working on Python in the late 1980s at Centrum Wiskunde & Informatica (CWI) in the Netherlands as a successor to the ABC programming language.

The name "Python" doesn't come from the snake! Van Rossum was reading scripts from the BBC comedy series "Monty Python's Flying Circus" and thought Python was a short, unique, and slightly mysterious name.

### Key Milestones

• **1991**: Python 0.9.0 released with classes, exception handling, and functions
• **2000**: Python 2.0 introduced list comprehensions and garbage collection
• **2008**: Python 3.0 released (not backward compatible)
• **2020**: Python 2 officially sunset
• **Today**: Python 3.x continues to evolve with active development

---

## Navigation

[← Previous: Introduction](#welcome-to-python) | [Next: Why Python? →](#why-python)

---

## Why Python?

### Strengths of Python

**1. Readable and Clean Syntax**
Python's syntax emphasizes readability, making it easier to write and understand code.

**2. Versatile and Powerful**
From web apps to machine learning, Python handles it all.

**3. Massive Ecosystem**
Over 400,000 packages available on PyPI (Python Package Index).

**4. Great for Beginners**
Python's simplicity makes it perfect for learning programming fundamentals.

**5. Industry Standard**
Used by Google, NASA, Netflix, Instagram, Spotify, and thousands more.

**6. Strong Community**
Millions of developers worldwide contribute tutorials, libraries, and support.

### Why Python for Students?

• **Immediate Results**: See your code work right away
• **Less Boilerplate**: Focus on logic, not syntax overhead
• **Real-World Applications**: Build practical projects quickly
• **Career Opportunities**: High demand for Python developers
• **Foundation for Advanced Topics**: Gateway to AI, data science, and more

---

## Navigation

[← Previous: History](#history-background) | [Next: Career Opportunities →](#career-opportunities)

---

## Career Opportunities

### Python in the Job Market

Python developers are in high demand across industries:

**Average Salaries (USD, 2024)**

• Junior Python Developer: $60,000 - $80,000
• Mid-Level Python Developer: $80,000 - $120,000
• Senior Python Developer: $120,000 - $180,000
• Python Data Scientist: $100,000 - $160,000
• Machine Learning Engineer: $130,000 - $200,000+

**Popular Career Paths**

1. **Web Development** (Django, Flask)
2. **Data Science & Analytics** (Pandas, NumPy)
3. **Machine Learning/AI** (TensorFlow, PyTorch)
4. **Automation & Scripting** (DevOps, Testing)
5. **Scientific Computing** (Research, Academia)
6. **Game Development** (Pygame)
7. **Cybersecurity** (Penetration Testing, Security Tools)

---

## Navigation

[← Previous: Why Python?](#why-python) | [Next: Your First Program →](#your-first-program)

---

## Your First Program

### Example 1: Hello World

Let's start with the traditional first program!

\`\`\`python
print("Hello, World!")
\`\`\`

**What's happening?**
• \`print()\` is a built-in function that displays text
• Text in quotes is called a "string"
• Python executes code line by line, top to bottom

**Try it yourself!** Click "Run Code" above and see the output.

---

## Navigation

[← Previous: Career Opportunities](#career-opportunities) | [Next: Math Operations →](#math-operations)

---

## Math Operations

### Example 2: Python as a Calculator

Python can perform all basic math operations:

\`\`\`python
# Addition
print(5 + 3)

# Subtraction
print(10 - 4)

# Multiplication
print(6 * 7)

# Division (always returns a decimal)
print(15 / 3)

# Integer division (returns whole number)
print(15 // 4)

# Modulo (remainder)
print(17 % 5)

# Exponentiation (power)
print(2 ** 8)
\`\`\`

**Output:**
\`\`\`
8
6
42
5.0
3
2
256
\`\`\`

**Note:** Lines starting with \`#\` are comments - Python ignores them.

---

## Navigation

[← Previous: Your First Program](#your-first-program) | [Next: Variables →](#variables)

---

## Variables

### Example 3: Storing Information

Variables let you store and reuse values:

\`\`\`python
# Create variables
name = "Alice"
age = 25
height = 5.6
is_student = True

# Use variables
print(name)
print(age)
print("Height:", height)
print("Student status:", is_student)

# Variables can change
age = age + 1
print("Next year:", age)
\`\`\`

**Key Concepts:**
• Variable names should be descriptive
• Python is case-sensitive (\`name\` ≠ \`Name\`)
• No need to declare variable types
• Use \`snake_case\` for variable names

---

## Navigation

[← Previous: Math Operations](#math-operations) | [Next: User Input →](#user-input)

---

## User Input

### Example 4: Interactive Programs

Make your programs interactive with user input:

\`\`\`python
# Get user's name
name = input("What's your name? ")
print("Hello, " + name + "!")

# Get a number (input returns a string, so convert it)
age = input("How old are you? ")
age_number = int(age)
print("Next year you'll be", age_number + 1)
\`\`\`

**Important:**
• \`input()\` always returns a string
• Use \`int()\` to convert to a number
• Use \`float()\` for decimals

---

## Navigation

[← Previous: Variables](#variables) | [Next: String Manipulation →](#string-manipulation)

---

## String Manipulation

### Example 5: Working with Text

Python has powerful string manipulation features:

\`\`\`python
text = "Python Programming"

# String methods
print(text.upper())        # PYTHON PROGRAMMING
print(text.lower())        # python programming
print(text.replace("Python", "Java"))  # Java Programming

# String slicing
print(text[0:6])           # Python
print(text[-11:])          # Programming

# String formatting (f-strings)
language = "Python"
version = 3.11
print(f"I'm learning {language} version {version}")

# Multi-line strings
poem = """
Roses are red,
Violets are blue,
Python is awesome,
And so are you!
"""
print(poem)
\`\`\`

---

## Navigation

[← Previous: User Input](#user-input) | [Next: Conditionals →](#conditionals)

---

## Conditionals

### Example 6: Making Decisions

Use \`if\`, \`elif\`, and \`else\` to make decisions:

\`\`\`python
age = 18

if age < 13:
    print("You're a child")
elif age < 20:
    print("You're a teenager")
elif age < 60:
    print("You're an adult")
else:
    print("You're a senior")

# Comparison operators
x = 10
print(x == 10)    # Equal to: True
print(x != 5)     # Not equal: True
print(x > 5)      # Greater than: True
print(x <= 10)    # Less than or equal: True

# Logical operators
age = 25
has_license = True

if age >= 16 and has_license:
    print("You can drive!")
\`\`\`

**Indentation matters!** Python uses indentation (spaces) to define code blocks.

---

## Navigation

[← Previous: String Manipulation](#string-manipulation) | [Next: Loops →](#loops)

---

## Loops

### Example 7: Repeating Actions

**For Loops** - Iterate over sequences:

\`\`\`python
# Loop through a range
for i in range(5):
    print(i)  # Prints 0, 1, 2, 3, 4

# Loop through a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

**While Loops** - Repeat while condition is true:

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1  # Same as count = count + 1
\`\`\`

**Loop Control:**

\`\`\`python
# Break - exit loop
for i in range(10):
    if i == 5:
        break
    print(i)  # Prints 0-4

# Continue - skip to next iteration
for i in range(5):
    if i == 2:
        continue
    print(i)  # Prints 0, 1, 3, 4
\`\`\`

---

## Navigation

[← Previous: Conditionals](#conditionals) | [Next: Lists →](#lists)

---

## Lists

### Example 8: Collections of Data

Lists store multiple items in a single variable:

\`\`\`python
# Create a list
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# Access items (indexing starts at 0)
print(numbers[0])      # 1
print(numbers[-1])     # 5 (last item)

# List methods
numbers.append(6)      # Add to end
numbers.insert(0, 0)   # Insert at position
numbers.remove(3)      # Remove specific value
last = numbers.pop()   # Remove and return last item

# List operations
print(len(numbers))    # Length
print(2 in numbers)    # Check membership: True
print(numbers + [7, 8])  # Concatenation

# List slicing
numbers = [0, 1, 2, 3, 4, 5]
print(numbers[1:4])    # [1, 2, 3]
print(numbers[:3])     # [0, 1, 2]
print(numbers[3:])     # [3, 4, 5]

# List comprehension (advanced)
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
\`\`\`

---

## Navigation

[← Previous: Loops](#loops) | [Next: Functions →](#functions)

---

## Functions

### Example 9: Reusable Code Blocks

Functions let you organize and reuse code:

\`\`\`python
# Define a function
def greet(name):
    print(f"Hello, {name}!")

# Call the function
greet("Alice")
greet("Bob")

# Function with return value
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # 8

# Function with default parameters
def power(base, exponent=2):
    return base ** exponent

print(power(5))      # 25 (default exponent=2)
print(power(5, 3))   # 125

# Multiple return values
def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)

minimum, maximum, total = get_stats([1, 2, 3, 4, 5])
print(f"Min: {minimum}, Max: {maximum}, Sum: {total}")
\`\`\`

**Best Practices:**
• Give functions descriptive names
• Keep functions focused on one task
• Use docstrings to document what functions do
• Return values instead of printing when possible

---

## Navigation

[← Previous: Lists](#lists) | [Next: Final Project →](#final-project)

---

## Final Project

### Example 10: Number Guessing Game

Let's combine everything you've learned into a complete program:

\`\`\`python
import random

def number_guessing_game():
    # Generate random number
    secret_number = random.randint(1, 100)
    attempts = 0
    max_attempts = 10
    
    print("Welcome to the Number Guessing Game!")
    print(f"I'm thinking of a number between 1 and 100.")
    print(f"You have {max_attempts} attempts to guess it.")
    
    while attempts < max_attempts:
        # Get user guess
        guess = input(f"\\nAttempt {attempts + 1}/{max_attempts} - Enter your guess: ")
        
        # Validate input
        if not guess.isdigit():
            print("Please enter a valid number!")
            continue
        
        guess = int(guess)
        attempts += 1
        
        # Check guess
        if guess < secret_number:
            print("Too low! Try again.")
        elif guess > secret_number:
            print("Too high! Try again.")
        else:
            print(f"🎉 Congratulations! You guessed it in {attempts} attempts!")
            return
    
    print(f"\\nGame Over! The number was {secret_number}.")

# Run the game
number_guessing_game()
\`\`\`

**This program demonstrates:**
• Importing modules (\`random\`)
• Function definition
• Variables and data types
• User input and validation
• Conditionals (if/elif/else)
• Loops (while)
• String formatting (f-strings)

---

## Navigation

[← Previous: Functions](#functions) | [Next: What's Next? →](#whats-next)

---

## What's Next?

### Continue Your Python Journey

**You've learned the fundamentals! Here's what to explore next:**

**1. Data Structures**
• Dictionaries and sets
• Tuples and named tuples
• Advanced list operations

**2. Object-Oriented Programming**
• Classes and objects
• Inheritance and polymorphism
• Encapsulation

**3. File Operations**
• Reading and writing files
• Working with CSV and JSON
• File system operations

**4. Error Handling**
• Try/except blocks
• Custom exceptions
• Debugging techniques

**5. Modules and Packages**
• Creating your own modules
• Using pip for package management
• Virtual environments

**6. Specializations**
• Web Development: Django, Flask
• Data Science: Pandas, NumPy, Matplotlib
• Machine Learning: TensorFlow, scikit-learn
• Automation: Selenium, pytest

### Practice Resources

• **LeetCode**: Coding challenges
• **HackerRank**: Python exercises
• **Real Python**: Tutorials and articles
• **Python.org**: Official documentation

### Final Tips

✓ **Practice daily** - Even 15 minutes helps
✓ **Build projects** - Learn by doing
✓ **Read others' code** - Learn from experience
✓ **Join communities** - Reddit, Stack Overflow, Discord
✓ **Don't give up** - Everyone struggles at first!

---

## Navigation

[← Previous: Final Project](#final-project)

---

## Congratulations! 🎓

You've completed the Introduction to Python! You now have a solid foundation to build amazing things with Python. Keep coding, keep learning, and most importantly, have fun!

**Happy Coding!** 🐍✨`,
    }
  });

  console.log('✅ Introduction to Python lesson seeded successfully!');
}

export async function seedMLLesson(prisma: PrismaClient) {
  console.log('🔄 Seeding Machine Learning lesson...');

  await prisma.lesson.deleteMany({
    where: { slug: 'machine-learning-basics' }
  });

  await prisma.lesson.create({
    data: {
      title: 'Machine Learning Basics',
      slug: 'machine-learning-basics',
      description: 'Introduction to machine learning concepts with Python',
      difficulty: 'intermediate',
      estimatedTime: 60,
      orderIndex: 2,
      topic: 'Machine Learning',
      prerequisites: ['python-basics-intro'],
      content: `# Machine Learning Basics

Learn the fundamentals of machine learning with hands-on examples.

## What You'll Learn

• Pattern recognition basics
• K-Nearest Neighbors algorithm  
• Distance calculations
• Data normalization
• Accuracy metrics

## Example 1: Simple Pattern Recognition

\`\`\`python
# Recognize simple patterns
def classify_number(n):
    if n % 2 == 0:
        return "even"
    return "odd"

print(classify_number(4))  # even
print(classify_number(7))  # odd
\`\`\`

Continue exploring ML concepts in the next examples!`,
    }
  });

  console.log('✅ Machine Learning lesson seeded successfully!');
}
