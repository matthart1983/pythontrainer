import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateIntroLesson() {
  console.log('🔄 Updating Introduction to Python lesson...\n');

  // Delete the old lesson
  await prisma.lesson.deleteMany({
    where: { slug: 'python-basics-intro' }
  });

  // Create the new comprehensive lesson
  const lesson = await prisma.lesson.create({
    data: {
      title: 'Introduction to Python: Your Journey Begins',
      slug: 'python-basics-intro',
      description: 'Discover Python programming from the ground up - learn its history, why it\'s perfect for beginners, and write your first programs with 10 hands-on examples.',
      difficulty: 'beginner',
      estimatedTime: 60,
      orderIndex: 1,
      topic: 'Basics',
      prerequisites: [],
      content: `# Introduction to Python: Your Journey Begins

Welcome to the exciting world of Python programming! Whether you're a complete beginner or have some coding experience, Python is an excellent choice for learning programming. Let's explore why Python has become one of the most popular programming languages in the world.

---

## The Story of Python: Where It All Began

### The Creator: Guido van Rossum

Python was created in the late 1980s by **Guido van Rossum**, a Dutch programmer working at Centrum Wiskunde & Informatica (CWI) in the Netherlands. During Christmas break in December 1989, Guido decided to start a hobby project: creating a new programming language that would be:
- **Easy to read** - Code should look like English sentences
- **Fun to use** - Programming should be enjoyable, not frustrating
- **Powerful** - Simple syntax doesn't mean limited capabilities

### Why "Python"?

You might think the name comes from the snake, but actually, Guido named it after the British comedy group **"Monty Python's Flying Circus"**! He was a big fan of their absurd and clever humor. This playful origin reflects Python's philosophy: programming should be fun and accessible to everyone.

### Python's First Release

Python 0.9.0 was released in **February 1991**. It already included:
- Classes with inheritance
- Exception handling
- Functions
- Core data types (lists, dictionaries, strings)

Fast forward to today, and Python 3.x (released in 2008) is the modern standard, with Python 3.11 and 3.12 offering incredible performance improvements!

---

## What Makes Python Special?

### 1. **Readable and Simple Syntax**

Python reads almost like English. Compare these two programs that do the same thing:

**Java (another programming language):**
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

**Python:**
\`\`\`python
print("Hello, World!")
\`\`\`

See the difference? Python gets straight to the point!

### 2. **Beginner-Friendly**

- **No complex setup** - Start coding immediately
- **Clear error messages** - Python tells you what went wrong
- **Forgiving syntax** - Less punctuation, more natural language
- **Huge community** - Millions of developers ready to help

### 3. **Versatile and Powerful**

Python is used by:
- **Google** - For web searches and YouTube
- **Netflix** - For recommendation algorithms
- **NASA** - For analyzing space data
- **Instagram** - For their entire platform backend
- **Spotify** - For music recommendations

### 4. **"Batteries Included" Philosophy**

Python comes with a massive **standard library** - pre-built tools for:
- Working with files and folders
- Connecting to the internet
- Processing data and mathematics
- Creating graphical interfaces
- And much, much more!

---

## Why Python Is Perfect for Learning Programming

### For High School Students

**1. Quick Results = More Motivation**
You can write a working program in your first 5 minutes. No waiting weeks to see something cool happen!

**2. Gentle Learning Curve**
Focus on learning programming concepts (loops, variables, functions) instead of fighting with complicated syntax.

**3. Real-World Applications**
The skills you learn apply directly to:
- Building games
- Analyzing data for school projects
- Creating websites
- Automating boring homework tasks
- Building AI and machine learning projects

**4. Career Opportunities**
Python developers are in high demand! It's consistently ranked as one of the top 3 most popular programming languages worldwide.

### Python's Design Philosophy: The Zen of Python

Python has guiding principles called "The Zen of Python." Here are some highlights:

> **"Beautiful is better than ugly."**  
> **"Simple is better than complex."**  
> **"Readability counts."**  
> **"If the implementation is easy to explain, it may be a good idea."**

These principles make Python code elegant and enjoyable to write and read.

---

## Your First Python Programs: 10 Working Examples

Let's dive in with real, working examples you can try right now! Each example builds on the previous ones.

### Example 1: Hello, World! 👋

The traditional first program every programmer writes:

\`\`\`python
print("Hello, World!")
\`\`\`

**What it does:** Displays text on the screen.  
**Try it:** Change "World" to your name!

---

### Example 2: Simple Math Calculator ➕

Python can do math just like a calculator:

\`\`\`python
# Addition
print(10 + 5)

# Subtraction
print(20 - 7)

# Multiplication
print(6 * 8)

# Division
print(100 / 4)

# Exponents (powers)
print(2 ** 10)
\`\`\`

**What you'll see:** 15, 13, 48, 25.0, 1024  
**Note:** Lines starting with \`#\` are comments - Python ignores them. Use comments to explain your code!

---

### Example 3: Variables - Storing Information 📦

Variables are like labeled boxes that hold information:

\`\`\`python
# Store your information
name = "Alex"
age = 16
favorite_subject = "Computer Science"
grade_average = 92.5

# Use the variables
print("My name is", name)
print("I am", age, "years old")
print("I love", favorite_subject)
print("My average grade is", grade_average)
\`\`\`

**What it does:** Stores data in named containers you can reuse.  
**Try it:** Change the values to match your own information!

---

### Example 4: User Input - Interactive Programs 💬

Make your program interactive by asking questions:

\`\`\`python
# Ask the user for their name
name = input("What is your name? ")

# Greet them personally
print("Hello,", name + "!")
print("Nice to meet you!")
\`\`\`

**What it does:** Waits for you to type something, then responds.  
**Try it:** Type your name when prompted!

---

### Example 5: String Magic - Text Manipulation ✨

Python makes working with text (strings) super easy:

\`\`\`python
message = "Python is awesome"

# Convert to uppercase
print(message.upper())

# Convert to lowercase
print(message.lower())

# Count letters
print("The word 'awesome' appears", message.count("awesome"), "times")

# Replace words
print(message.replace("awesome", "fantastic"))

# Get the length
print("The message is", len(message), "characters long")
\`\`\`

**What you'll learn:** Python has built-in tools (methods) for working with text.

---

### Example 6: Making Decisions with if Statements 🤔

Teach your program to make choices:

\`\`\`python
temperature = 75

if temperature > 80:
    print("It's hot outside! 🌞")
elif temperature > 60:
    print("Perfect weather! 😊")
else:
    print("It's cold! 🥶")
\`\`\`

**What it does:** Program makes different decisions based on conditions.  
**Try it:** Change the temperature number and see what happens!

---

### Example 7: Loops - Doing Things Repeatedly 🔄

Instead of writing the same code over and over, use loops:

\`\`\`python
# Count from 1 to 10
for number in range(1, 11):
    print("Count:", number)

# Print a multiplication table
print("\\n5 times table:")
for i in range(1, 11):
    result = 5 * i
    print(f"5 x {i} = {result}")
\`\`\`

**What it does:** Repeats code automatically - saves tons of time!  
**Try it:** Change the number 5 to make a different times table.

---

### Example 8: Lists - Organizing Multiple Items 📋

Lists let you store multiple pieces of information together:

\`\`\`python
# Create a list of your favorite things
favorite_fruits = ["apple", "banana", "strawberry", "mango"]

# Print the whole list
print("My favorite fruits:", favorite_fruits)

# Access individual items (counting starts at 0!)
print("My #1 favorite is:", favorite_fruits[0])

# Add a new favorite
favorite_fruits.append("pineapple")
print("Updated list:", favorite_fruits)

# Count how many favorites you have
print("I have", len(favorite_fruits), "favorite fruits")
\`\`\`

**What you'll learn:** Lists are perfect for organizing related data.

---

### Example 9: Functions - Reusable Code Blocks 🔧

Functions let you create your own custom commands:

\`\`\`python
# Define a function to greet someone
def greet_student(name, grade):
    print(f"Hello, {name}!")
    print(f"Welcome to grade {grade}!")
    print("Let's learn Python together!")

# Use the function
greet_student("Sarah", 10)
print()  # Empty line
greet_student("Michael", 11)
\`\`\`

**What it does:** Create reusable code you can call anytime with different inputs.  
**Try it:** Add your own name and grade!

---

### Example 10: Building a Simple Game 🎮

Let's put it all together with a number guessing game:

\`\`\`python
import random

# Computer picks a random number
secret_number = random.randint(1, 10)
print("I'm thinking of a number between 1 and 10...")

# Get player's guess
guess = int(input("What's your guess? "))

# Check if they got it right
if guess == secret_number:
    print("🎉 Amazing! You guessed it!")
elif guess < secret_number:
    print("Too low! The number was", secret_number)
else:
    print("Too high! The number was", secret_number)
\`\`\`

**What it does:** Creates an interactive guessing game combining variables, input, conditions, and random numbers!  
**Try it:** Play a few rounds - can you guess the number?

---

## Python's Strengths: Why It Dominates

### 1. **Cross-Platform**
Write once, run anywhere - Windows, Mac, Linux, even mobile devices!

### 2. **Extensive Libraries**
- **NumPy & Pandas** - Data analysis and science
- **Django & Flask** - Web development
- **TensorFlow & PyTorch** - Artificial Intelligence
- **Pygame** - Game development
- **Beautiful Soup** - Web scraping
- Thousands more available for free!

### 3. **Active Community**
- Over **10 million** Python developers worldwide
- Thousands of free tutorials and courses
- Stack Overflow has **2+ million** Python questions answered
- PyCon conferences held globally

### 4. **Job Market Leader**
- **#1 or #2** most in-demand programming language
- Average Python developer salary: **$100,000+** per year
- Used in growing fields: AI, Data Science, Cloud Computing

### 5. **Educational Standard**
- Taught in **80% of U.S. universities**
- Used in AP Computer Science courses
- First language for many coding bootcamps

---

## What You'll Build As You Learn

As you progress through these lessons, you'll be able to create:

✅ **Calculators and converters** (temperature, currency, unit conversion)  
✅ **Text-based games** (adventure games, quiz games, puzzles)  
✅ **Data analysis tools** (grade calculators, statistics)  
✅ **Automation scripts** (file organizers, web scrapers)  
✅ **Web applications** (blogs, to-do lists, social networks)  
✅ **AI projects** (image recognition, chatbots, predictions)

---

## Best Practices: Starting Strong

### 1. **Write Clean Code**
\`\`\`python
# Good - clear variable names
student_name = "Emma"
test_score = 95

# Avoid - unclear names
x = "Emma"
ts = 95
\`\`\`

### 2. **Use Comments**
\`\`\`python
# Calculate the area of a rectangle
length = 10  # in meters
width = 5    # in meters
area = length * width
print(f"Area: {area} square meters")
\`\`\`

### 3. **Test Your Code**
Run your code frequently to catch errors early!

### 4. **Read Error Messages**
Python's error messages are helpful - they tell you exactly what went wrong and where.

---

## Common Beginner Mistakes (And How to Avoid Them)

### Mistake 1: Forgetting Quotation Marks
\`\`\`python
# Wrong
print(Hello)  # Python looks for a variable named Hello

# Correct
print("Hello")  # This is text
\`\`\`

### Mistake 2: Mixing Up = and ==
\`\`\`python
# = is for assignment
age = 16  # Store 16 in age

# == is for comparison
if age == 16:  # Check if age equals 16
    print("You're 16!")
\`\`\`

### Mistake 3: Capitalization Matters
\`\`\`python
name = "Python"
print(name)   # Works
print(Name)   # Error! Python is case-sensitive
\`\`\`

---

## Learning Resources: Continue Your Journey

### Official Resources
- **Python.org** - Official documentation and tutorials
- **Python Tutorial (docs.python.org)** - Comprehensive guide

### Interactive Practice
- **Python Tutor** - Visualize code execution
- **Replit** - Code online with instant feedback
- **HackerRank** - Coding challenges

### Video Tutorials
- **Corey Schafer (YouTube)** - Clear, detailed Python tutorials
- **freeCodeCamp** - Full Python courses
- **Sentdex** - Advanced Python projects

### Books for Students
- "Python Crash Course" by Eric Matthes
- "Automate the Boring Stuff with Python" by Al Sweigart (free online!)
- "Python for Kids" by Jason R. Briggs

---

## Next Steps: Your Learning Path

After completing this introduction, you'll move on to:

1. **Variables and Data Types** - Master different types of data
2. **Control Flow** - Make your programs smart with decisions
3. **Loops** - Repeat actions efficiently
4. **Functions** - Build reusable code
5. **Data Structures** - Organize complex information
6. **And beyond!** - Web development, AI, game development

---

## Key Takeaways

✅ Python was created by Guido van Rossum in 1989 as a readable, fun language  
✅ Python is perfect for beginners due to simple syntax and clear error messages  
✅ It's used by major tech companies for real-world applications  
✅ Python has a massive ecosystem of libraries and an active community  
✅ Learning Python opens doors to many career paths in technology  
✅ The best way to learn is by doing - practice with the examples above!  

---

## Your Challenge

Before moving to the next lesson, try these exercises:

1. **Personalize Example 3** - Change all the variables to your own information
2. **Modify Example 7** - Create a multiplication table for your favorite number
3. **Extend Example 10** - Add more guesses before revealing the answer
4. **Create something new** - Combine what you learned into your own program!

Remember: Every expert programmer started exactly where you are now. The only difference is practice. Start coding, make mistakes, learn from them, and have fun!

**Welcome to the Python community! 🐍🎉**`
    }
  });

  console.log('✅ Updated:', lesson.title);
  console.log(`\n📚 Total lessons in database: ${await prisma.lesson.count()}`);
}

updateIntroLesson()
  .catch((e) => {
    console.error('Error updating lesson:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
