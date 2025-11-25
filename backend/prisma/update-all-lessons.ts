import { PrismaClient, LessonDifficulty } from '@prisma/client';

const prisma = new PrismaClient();

async function updateAllLessons() {
  console.log('🌱 Updating all lessons with comprehensive content...\n');

  const lessons = [
    {
      title: 'Variables and Data Types: Storing Information',
      slug: 'variables-and-data-types',
      description: 'Master the building blocks of programming - learn how to store and work with different types of data in Python.',
      difficulty: LessonDifficulty.beginner,
      estimatedTime: 50,
      orderIndex: 2,
      topic: 'Basics',
      prerequisites: ['python-basics-intro'],
      content: `# Variables and Data Types: Storing Information

Welcome to one of the most fundamental concepts in programming! Today you'll learn how to store and manipulate data in Python.

## What Are Variables?

Imagine your computer's memory as a huge warehouse with millions of storage boxes.

Variables are like labels you put on these boxes so you can find your stuff later!

**Simple Definition:**
A variable is a named container that stores a value you can use and change throughout your program.

**Why Variables Matter:**
Without variables, you'd have to rewrite the same values over and over. Variables let you:
- Store information for later use
- Give meaningful names to values
- Change values as your program runs
- Make your code easier to understand

---

## Creating Your First Variable

In Python, creating a variable is super easy - just pick a name and assign a value!

\`\`\`python
# Creating variables
name = "Alex"
age = 16
height = 5.7
is_student = True
\`\`\`

**What just happened?**
- We created 4 variables
- Each has a name (name, age, height, is_student)
- Each stores a different type of value
- The \`=\` sign means "store this value"

**Try it:**
Change the values to match your own information!

---

## Variable Naming Rules

Python has some rules about naming variables:

**Must Follow:**
- Start with a letter or underscore
- Use only letters, numbers, and underscores
- Cannot use Python keywords (like if, for, while)

**Best Practices:**
- Use descriptive names (\`student_name\` not \`sn\`)
- Use lowercase with underscores (\`first_name\` not \`firstName\`)
- Make names meaningful (\`score\` not \`x\`)

**Examples:**

\`\`\`python
# Good variable names
student_age = 16
total_score = 95
is_passing = True
first_name = "Sarah"

# Bad variable names (but legal)
x = 16          # Not descriptive
STUDENTAGE = 16 # Hard to read
s = "Sarah"     # Too short

# Invalid names (will cause errors!)
# 2fast = 10    # Can't start with number
# my-name = "Alex"  # Can't use hyphens
# for = 5       # Can't use keywords
\`\`\`

---

## Python's Built-in Data Types

Python has several types of data you can store. Let's explore each one!

### Integers (int)

Whole numbers without decimal points.

\`\`\`python
age = 16
score = 100
temperature = -5
year = 2025

print(type(age))  # <class 'int'>
\`\`\`

**Use integers for:**
- Counting things
- Ages, years, quantities
- Scores, points
- Array indices

---

### Floating-Point Numbers (float)

Numbers with decimal points.

\`\`\`python
height = 5.9
price = 19.99
pi = 3.14159
temperature = 98.6

print(type(height))  # <class 'float'>
\`\`\`

**Use floats for:**
- Measurements
- Money amounts
- Scientific calculations
- Percentages

**Important:**
Floats can have precision issues with very small differences!

\`\`\`python
# Floating point quirk
print(0.1 + 0.2)  # Gives 0.30000000000000004
# This is normal in all programming languages!
\`\`\`

---

### Strings (str)

Text data - anything between quotes.

\`\`\`python
name = "Alice"
message = 'Hello, World!'
address = """123 Main Street
Apartment 4B"""  # Multi-line string

print(type(name))  # <class 'str'>
\`\`\`

**Use strings for:**
- Names, labels, messages
- File paths
- User input
- Any text data

**Quote Styles:**
- Single quotes: \`'Hello'\`
- Double quotes: \`"Hello"\`
- Triple quotes: \`"""Hello"""\` (for multi-line text)

All work the same - pick one and be consistent!

---

### Booleans (bool)

True or False values - for yes/no decisions.

\`\`\`python
is_student = True
is_raining = False
has_license = True
is_adult = False

print(type(is_student))  # <class 'bool'>
\`\`\`

**Use booleans for:**
- Flags and switches
- Conditional checks
- Game states (is_game_over)
- Permissions (is_admin)

**Important:**
Must be capitalized: \`True\` and \`False\` (not true/false)

---

## Type Checking and Conversion

### Checking Types

Use \`type()\` to see what type a variable is:

\`\`\`python
age = 16
name = "Alex"
height = 5.9

print(type(age))    # <class 'int'>
print(type(name))   # <class 'str'>
print(type(height)) # <class 'float'>
\`\`\`

---

### Converting Between Types

Sometimes you need to change one type to another:

\`\`\`python
# String to integer
age_text = "16"
age_number = int(age_text)
print(age_number + 1)  # 17

# Integer to string
score = 95
score_text = str(score)
print("Your score: " + score_text)

# String to float
price_text = "19.99"
price = float(price_text)
print(price * 2)  # 39.98

# Float to integer (loses decimal part!)
height = 5.9
height_int = int(height)
print(height_int)  # 5 (not 6!)
\`\`\`

**Common Conversions:**
- \`int(x)\` - Convert to integer
- \`float(x)\` - Convert to float
- \`str(x)\` - Convert to string
- \`bool(x)\` - Convert to boolean

---

## Example 1: Basic Variable Operations

\`\`\`python
# Store personal information
first_name = "Emma"
last_name = "Johnson"
age = 15
grade_level = 10

# Combine information
full_name = first_name + " " + last_name
print("Student:", full_name)
print("Age:", age)
print("Grade:", grade_level)

# Calculate birth year (approximately)
current_year = 2025
birth_year = current_year - age
print("Born around:", birth_year)
\`\`\`

**What you learned:**
Variables can be combined and used in calculations.

---

## Example 2: Working with Numbers

\`\`\`python
# Math operations with variables
a = 10
b = 3

addition = a + b
subtraction = a - b
multiplication = a * b
division = a / b
floor_division = a // b  # Division without decimal
modulo = a % b           # Remainder
exponent = a ** b        # Power

print(f"{a} + {b} = {addition}")
print(f"{a} - {b} = {subtraction}")
print(f"{a} × {b} = {multiplication}")
print(f"{a} ÷ {b} = {division}")
print(f"{a} ÷ {b} (no decimal) = {floor_division}")
print(f"{a} mod {b} = {modulo}")
print(f"{a} ^ {b} = {exponent}")
\`\`\`

**What you learned:**
Python has many mathematical operators you can use with number variables.

---

## Example 3: String Operations

\`\`\`python
# String variables and operations
first = "Python"
second = "Programming"

# Concatenation (joining)
combined = first + " " + second
print(combined)

# Repetition
excited = "Cool! " * 3
print(excited)

# Length
message = "Hello, World!"
length = len(message)
print(f"Message length: {length} characters")

# Uppercase and lowercase
shout = message.upper()
whisper = message.lower()
print(shout)
print(whisper)
\`\`\`

**What you learned:**
Strings can be joined, repeated, and transformed in many ways.

---

## Example 4: String Indexing and Slicing

Strings are like sequences - you can access individual characters!

\`\`\`python
word = "Python"

# Indexing (position starts at 0)
first_letter = word[0]   # 'P'
second_letter = word[1]  # 'y'
last_letter = word[-1]   # 'n' (negative = from end)

print(f"First: {first_letter}")
print(f"Last: {last_letter}")

# Slicing (getting a range)
first_three = word[0:3]  # 'Pyt'
middle = word[2:5]       # 'tho'
last_three = word[-3:]   # 'hon'

print(f"First 3: {first_three}")
print(f"Middle: {middle}")
print(f"Last 3: {last_three}")
\`\`\`

**What you learned:**
You can access individual characters or slices of strings using indices.

---

## Example 5: User Input

Make your programs interactive by asking for input!

\`\`\`python
# Get user's name
name = input("What is your name? ")
print(f"Hello, {name}!")

# Get user's age (input returns a string, so convert it)
age_text = input("How old are you? ")
age = int(age_text)

# Calculate years until milestone
years_until_18 = 18 - age
if years_until_18 > 0:
    print(f"You'll be 18 in {years_until_18} years!")
else:
    print("You're already 18 or older!")
\`\`\`

**What you learned:**
Use \`input()\` to get data from users, and convert it to the right type.

---

## Example 6: Multiple Assignment

Python has shortcuts for creating multiple variables!

\`\`\`python
# Assign same value to multiple variables
x = y = z = 0
print(x, y, z)  # 0 0 0

# Assign different values in one line
name, age, grade = "Alex", 16, 10
print(name)  # Alex
print(age)   # 16
print(grade) # 10

# Swap variables (Python magic!)
a = 5
b = 10
print(f"Before: a={a}, b={b}")

a, b = b, a  # Swap!
print(f"After: a={a}, b={b}")
\`\`\`

**What you learned:**
Python has elegant ways to work with multiple variables at once.

---

## Example 7: Constants

Constants are variables that shouldn't change (by convention, use UPPERCASE names).

\`\`\`python
# Define constants
PI = 3.14159
GRAVITY = 9.8
SPEED_OF_LIGHT = 299792458  # meters per second
MAX_SCORE = 100

# Use constants in calculations
radius = 5
area = PI * radius ** 2
print(f"Circle area: {area:.2f}")

# Calculate falling object
time = 3  # seconds
distance = 0.5 * GRAVITY * time ** 2
print(f"Object falls {distance} meters in {time} seconds")
\`\`\`

**What you learned:**
Use UPPERCASE names for values that shouldn't change throughout your program.

---

## Example 8: Type Checking in Practice

\`\`\`python
def describe_value(value):
    """Describe what type a value is and show information about it"""
    value_type = type(value).__name__
    
    print(f"Value: {value}")
    print(f"Type: {value_type}")
    
    if isinstance(value, int):
        print(f"Is even: {value % 2 == 0}")
        print(f"Is positive: {value > 0}")
    elif isinstance(value, str):
        print(f"Length: {len(value)} characters")
        print(f"Uppercase: {value.upper()}")
    elif isinstance(value, float):
        print(f"Rounded: {round(value, 2)}")
        print(f"Integer part: {int(value)}")
    elif isinstance(value, bool):
        print(f"Opposite: {not value}")
    
    print("-" * 40)

# Test with different types
describe_value(42)
describe_value("Hello")
describe_value(3.14159)
describe_value(True)
\`\`\`

**What you learned:**
You can check variable types and handle them differently.

---

## Example 9: F-Strings for Formatting

Modern Python way to format strings (Python 3.6+):

\`\`\`python
name = "Alex"
age = 16
height = 5.9
score = 95.5

# F-strings (put f before the string)
message = f"My name is {name} and I'm {age} years old."
print(message)

# Format numbers
print(f"Height: {height:.1f} feet")  # 1 decimal place
print(f"Score: {score:.0f}%")        # No decimal places

# Expressions inside f-strings
print(f"In 5 years, I'll be {age + 5} years old")
print(f"My name has {len(name)} letters")

# Alignment and padding
print(f"{'Name':<10} {'Age':>5}")  # Left and right align
print(f"{name:<10} {age:>5}")
\`\`\`

**What you learned:**
F-strings are the modern, clean way to combine variables with text.

---

## Example 10: Building a Calculator

Let's put everything together!

\`\`\`python
print("=== Simple Calculator ===")
print()

# Get user input
num1_text = input("Enter first number: ")
num2_text = input("Enter second number: ")

# Convert to numbers
num1 = float(num1_text)
num2 = float(num2_text)

# Perform calculations
sum_result = num1 + num2
difference = num1 - num2
product = num1 * num2
quotient = num1 / num2 if num2 != 0 else "Cannot divide by zero"

# Display results
print()
print(f"Results:")
print(f"{num1} + {num2} = {sum_result}")
print(f"{num1} - {num2} = {difference}")
print(f"{num1} × {num2} = {product}")
print(f"{num1} ÷ {num2} = {quotient}")

# Calculate average
average = (num1 + num2) / 2
print(f"Average: {average}")
\`\`\`

**What you learned:**
Combining input, type conversion, operations, and formatting into a complete program!

---

## Common Data Type Mistakes

### Mistake 1: Type Mismatches

\`\`\`python
# Wrong - can't add string and number
age = "16"
next_year = age + 1  # ERROR!

# Correct - convert first
age = int("16")
next_year = age + 1  # Works!
\`\`\`

---

### Mistake 2: Integer Division Surprise

\`\`\`python
# Be aware of division behavior
result1 = 7 / 2   # 3.5 (float division)
result2 = 7 // 2  # 3 (integer division - drops decimal)

print(result1)
print(result2)
\`\`\`

---

### Mistake 3: Forgetting to Convert Input

\`\`\`python
# Wrong - input returns string
age = input("Age: ")
next_year = age + 1  # ERROR!

# Correct - convert to int
age = int(input("Age: "))
next_year = age + 1  # Works!
\`\`\`

---

## None Type

Python has a special value called \`None\` for "no value":

\`\`\`python
# Representing absence of value
result = None
print(result)  # None
print(type(result))  # <class 'NoneType'>

# Common use: checking if variable has been set
data = None

if data is None:
    print("No data yet!")
else:
    print(f"Data: {data}")
\`\`\`

**When to use None:**
- Variables not yet initialized
- Function returns nothing
- Optional parameters

---

## Memory and Variables

Understanding how Python stores variables:

\`\`\`python
# Numbers and strings with same value share memory
a = 100
b = 100
print(a is b)  # True - same memory location

# But large numbers are separate
x = 100000
y = 100000
print(x is y)  # False - different memory locations

# Variables are references to values
original = [1, 2, 3]
reference = original
reference.append(4)
print(original)  # [1, 2, 3, 4] - changed!
\`\`\`

**What you learned:**
Variables are like name tags pointing to values in memory.

---

## Best Practices for Variables

### Use Descriptive Names

\`\`\`python
# Good
student_name = "Alex"
total_score = 95
is_passing = True

# Bad
sn = "Alex"
ts = 95
ip = True
\`\`\`

---

### Initialize Variables

\`\`\`python
# Good - clear starting value
total = 0
count = 0
message = ""

# Risky - using undefined variable causes error
# total = total + 1  # ERROR if total not defined
\`\`\`

---

### Use Constants for Fixed Values

\`\`\`python
# Good - easy to change in one place
MAX_ATTEMPTS = 3
DEFAULT_SCORE = 0

for attempt in range(MAX_ATTEMPTS):
    print(f"Attempt {attempt + 1}")
\`\`\`

---

## Real-World Applications

### Game Development

\`\`\`python
player_health = 100
player_score = 0
player_name = "Hero"
is_game_over = False
level = 1
\`\`\`

---

### Data Analysis

\`\`\`python
temperature_celsius = 25.5
humidity_percent = 68.2
pressure_hpa = 1013.25
location_name = "New York"
\`\`\`

---

### E-commerce

\`\`\`python
product_name = "Laptop"
price = 999.99
quantity = 5
in_stock = True
discount_percent = 15.0
\`\`\`

---

## Key Takeaways

✅ Variables store values with meaningful names

✅ Python has main types: int, float, str, bool, None

✅ Use \`type()\` to check and convert between types

✅ Variable names should be descriptive and use lowercase_with_underscores

✅ F-strings are the modern way to format output

✅ Always convert \`input()\` to the right type

✅ Constants use UPPERCASE names

✅ Each type has specific operations and methods

---

## Your Challenge

Practice what you learned:

1. **Personal Info Program** - Create variables for your name, age, favorite subject, and grade level. Print them in a formatted sentence.

2. **Temperature Converter** - Get Celsius temperature from user, convert to Fahrenheit using formula: F = C × 9/5 + 32

3. **Shopping Cart** - Create variables for 3 items with names and prices, calculate total, apply 10% tax, show final price.

4. **Mad Libs** - Ask user for different word types (noun, verb, adjective) and create a funny story.

Remember: Variables are the foundation of all programming!

Master them, and everything else becomes easier.

**Keep practicing! 🚀**`
    },
  ];

  for (const lessonData of lessons) {
    try {
      await prisma.lesson.deleteMany({
        where: { slug: lessonData.slug }
      });
      
      const lesson = await prisma.lesson.create({
        data: lessonData,
      });
      console.log(`✅ Updated: ${lesson.title}`);
    } catch (error: any) {
      console.error(`❌ Error updating "${lessonData.title}":`, error.message);
    }
  }

  console.log('\n🎉 Lesson update complete!');
  console.log(`\n📚 Total lessons in database: ${await prisma.lesson.count()}`);
}

updateAllLessons()
  .catch((e) => {
    console.error('Error updating lessons:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
