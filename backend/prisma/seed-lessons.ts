import { PrismaClient, LessonDifficulty } from '@prisma/client';

const prisma = new PrismaClient();

async function seedMoreLessons() {
  console.log('🌱 Seeding additional Python lessons...\n');

  const lessons = [
    {
      title: 'Control Flow: If/Else Statements',
      slug: 'control-flow-if-else',
      description: 'Learn how to make decisions in your code using if, elif, and else statements.',
      difficulty: LessonDifficulty.beginner,
      estimatedTime: 20,
      orderIndex: 3,
      topic: 'Control Flow',
      prerequisites: [],
      content: `# Control Flow: If/Else Statements

## What is Control Flow?
Control flow allows your program to make decisions and execute different code based on conditions.

## The if Statement
\`\`\`python
age = 18
if age >= 18:
    print("You are an adult!")
\`\`\`

## if-else Statement
\`\`\`python
temperature = 25
if temperature > 30:
    print("It's hot outside!")
else:
    print("The weather is nice.")
\`\`\`

## if-elif-else Statement
\`\`\`python
score = 85
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F")
\`\`\`

## Comparison Operators
- \`==\` Equal to
- \`!=\` Not equal to
- \`>\` Greater than
- \`<\` Less than
- \`>=\` Greater than or equal to
- \`<=\` Less than or equal to

## Logical Operators
\`\`\`python
age = 25
has_license = True

if age >= 18 and has_license:
    print("You can drive!")

# or operator
is_weekend = True
is_holiday = False

if is_weekend or is_holiday:
    print("Time to relax!")
\`\`\``,
    },
    {
      title: 'Loops: For and While',
      slug: 'loops-for-and-while',
      description: 'Master iteration in Python with for and while loops.',
      difficulty: LessonDifficulty.beginner,
      estimatedTime: 25,
      orderIndex: 4,
      topic: 'Control Flow',
      prerequisites: [],
      content: `# Loops in Python

## For Loops
\`\`\`python
for i in range(5):
    print(i)  # Prints 0, 1, 2, 3, 4

fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

## While Loops
\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

## Break and Continue
\`\`\`python
# break - exit early
for i in range(10):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4

# continue - skip iteration
for i in range(5):
    if i == 2:
        continue
    print(i)  # 0, 1, 3, 4
\`\`\`

## Nested Loops
\`\`\`python
for i in range(3):
    for j in range(3):
        print(f"i={i}, j={j}")
\`\`\``,
    },
    {
      title: 'Lists and Data Structures',
      slug: 'lists-and-data-structures',
      description: 'Work with Python lists, tuples, and dictionaries.',
      difficulty: LessonDifficulty.beginner,
      estimatedTime: 30,
      orderIndex: 5,
      topic: 'Data Structures',
      prerequisites: [],
      content: `# Lists and Data Structures

## Lists
\`\`\`python
numbers = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "cherry"]

# Accessing
print(fruits[0])  # "apple"
print(fruits[-1])  # "cherry"

# Modifying
fruits.append("orange")
fruits.remove("apple")
popped = fruits.pop()
\`\`\`

## List Slicing
\`\`\`python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(numbers[2:5])  # [2, 3, 4]
print(numbers[:3])   # [0, 1, 2]
print(numbers[::2])  # [0, 2, 4, 6, 8]
\`\`\`

## Dictionaries
\`\`\`python
person = {
    "name": "Alice",
    "age": 25,
    "city": "NYC"
}

print(person["name"])
person["job"] = "Engineer"

for key, value in person.items():
    print(f"{key}: {value}")
\`\`\`

## List Comprehensions
\`\`\`python
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
\`\`\``,
    },
    {
      title: 'Functions',
      slug: 'functions',
      description: 'Create reusable code with functions, parameters, and return values.',
      difficulty: LessonDifficulty.intermediate,
      estimatedTime: 30,
      orderIndex: 6,
      topic: 'Functions',
      prerequisites: [],
      content: `# Functions in Python

## Defining Functions
\`\`\`python
def greet():
    print("Hello, World!")

greet()
\`\`\`

## Parameters and Return
\`\`\`python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # 8
\`\`\`

## Default Parameters
\`\`\`python
def greet(name="Guest"):
    print(f"Hello, {name}!")

greet()          # Hello, Guest!
greet("Alice")   # Hello, Alice!
\`\`\`

## Multiple Return Values
\`\`\`python
def min_max(numbers):
    return min(numbers), max(numbers)

minimum, maximum = min_max([1, 5, 3, 9, 2])
\`\`\`

## Lambda Functions
\`\`\`python
square = lambda x: x ** 2
print(square(5))  # 25

# With map
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
\`\`\``,
    },
    {
      title: 'String Manipulation',
      slug: 'string-manipulation',
      description: 'Master string operations, formatting, and text processing.',
      difficulty: LessonDifficulty.beginner,
      estimatedTime: 25,
      orderIndex: 7,
      topic: 'Strings',
      prerequisites: [],
      content: `# String Manipulation

## String Methods
\`\`\`python
text = "Hello, World!"
print(text.upper())     # HELLO, WORLD!
print(text.lower())     # hello, world!
print(text.replace("World", "Python"))
print(text.split(","))  # ["Hello", " World!"]
\`\`\`

## String Formatting
\`\`\`python
name = "Alice"
age = 25

# f-strings
print(f"My name is {name} and I'm {age}")

# Formatting numbers
pi = 3.14159
print(f"Pi is approximately {pi:.2f}")
\`\`\`

## String Slicing
\`\`\`python
text = "Python"
print(text[0:3])    # Pyt
print(text[::-1])   # nohtyP (reverse)
\`\`\`

## String Methods
\`\`\`python
text = "python programming"
print(text.startswith("py"))  # True
print(text.endswith("ing"))   # True
print(text.count("p"))        # 2
print(text.find("prog"))      # 7
\`\`\``,
    },
    {
      title: 'File Handling',
      slug: 'file-handling',
      description: 'Learn to read from and write to files in Python.',
      difficulty: LessonDifficulty.intermediate,
      estimatedTime: 25,
      orderIndex: 8,
      topic: 'File Operations',
      prerequisites: [],
      content: `# File Handling

## Reading Files
\`\`\`python
# Read entire file
with open('file.txt', 'r') as file:
    content = file.read()
    print(content)

# Read line by line
with open('file.txt', 'r') as file:
    for line in file:
        print(line.strip())
\`\`\`

## Writing Files
\`\`\`python
# Write (overwrites)
with open('output.txt', 'w') as file:
    file.write("Hello, World!\\n")

# Append
with open('output.txt', 'a') as file:
    file.write("This is appended\\n")
\`\`\`

## Working with JSON
\`\`\`python
import json

# Write JSON
data = {'name': 'Alice', 'age': 25}
with open('data.json', 'w') as file:
    json.dump(data, file, indent=2)

# Read JSON
with open('data.json', 'r') as file:
    data = json.load(file)
\`\`\``,
    },
    {
      title: 'Object-Oriented Programming',
      slug: 'oop-basics',
      description: 'Learn classes, objects, and OOP principles.',
      difficulty: LessonDifficulty.intermediate,
      estimatedTime: 40,
      orderIndex: 9,
      topic: 'OOP',
      prerequisites: [],
      content: `# Object-Oriented Programming

## Classes and Objects
\`\`\`python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def bark(self):
        print(f"{self.name} says Woof!")
    
    def description(self):
        return f"{self.name} is {self.age} years old"

dog = Dog("Buddy", 3)
dog.bark()
print(dog.description())
\`\`\`

## Inheritance
\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

dog = Dog("Buddy")
print(dog.speak())
\`\`\`

## Properties
\`\`\`python
class Circle:
    def __init__(self, radius):
        self.radius = radius
    
    @property
    def area(self):
        return 3.14159 * self.radius ** 2

circle = Circle(5)
print(circle.area)
\`\`\``,
    },
    {
      title: 'Error Handling',
      slug: 'error-handling',
      description: 'Handle errors gracefully using try-except blocks.',
      difficulty: LessonDifficulty.intermediate,
      estimatedTime: 25,
      orderIndex: 10,
      topic: 'Error Handling',
      prerequisites: [],
      content: `# Error Handling

## Try-Except Blocks
\`\`\`python
try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(f"Result: {result}")
except ValueError:
    print("Invalid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
\`\`\`

## Finally Clause
\`\`\`python
try:
    file = open("data.txt")
    content = file.read()
except FileNotFoundError:
    print("File not found!")
finally:
    print("Cleanup code always runs")
\`\`\`

## Raising Exceptions
\`\`\`python
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero!")
    return a / b

try:
    result = divide(10, 0)
except ValueError as e:
    print(e)
\`\`\``,
    },
    {
      title: 'Introduction to Machine Learning',
      slug: 'intro-machine-learning',
      description: 'Learn the fundamentals of machine learning with Python.',
      difficulty: LessonDifficulty.advanced,
      estimatedTime: 45,
      orderIndex: 11,
      topic: 'Machine Learning',
      prerequisites: [],
      content: `# Introduction to Machine Learning

## What is Machine Learning?
Machine learning is a branch of artificial intelligence where computers learn patterns from data without being explicitly programmed.

## Types of Machine Learning

### 1. Supervised Learning
Learning from labeled data to predict outcomes.
- **Classification**: Predicting categories (spam/not spam)
- **Regression**: Predicting continuous values (house prices)

### 2. Unsupervised Learning
Finding patterns in unlabeled data.
- **Clustering**: Grouping similar items together
- **Dimensionality Reduction**: Simplifying complex data

### 3. Reinforcement Learning
Learning through trial and error with rewards.

## Simple Linear Regression Example
\`\`\`python
# Predicting house prices based on size
import numpy as np

# Data: house sizes (sq ft) and prices ($1000s)
sizes = np.array([1000, 1500, 2000, 2500, 3000])
prices = np.array([200, 300, 400, 500, 600])

# Calculate slope and intercept
mean_size = np.mean(sizes)
mean_price = np.mean(prices)

slope = np.sum((sizes - mean_size) * (prices - mean_price)) / np.sum((sizes - mean_size) ** 2)
intercept = mean_price - slope * mean_size

# Make a prediction
new_size = 1800
predicted_price = slope * new_size + intercept
print(f"Predicted price for {new_size} sq ft: $` + `{predicted_price:.0f}k")
\`\`\`

## K-Nearest Neighbors (KNN)
\`\`\`python
# Simple KNN classifier
def euclidean_distance(point1, point2):
    return sum((a - b) ** 2 for a, b in zip(point1, point2)) ** 0.5

def knn_predict(train_data, train_labels, test_point, k=3):
    # Calculate distances
    distances = []
    for i, data_point in enumerate(train_data):
        dist = euclidean_distance(data_point, test_point)
        distances.append((dist, train_labels[i]))
    
    # Sort and get k nearest
    distances.sort()
    k_nearest = distances[:k]
    
    # Majority vote
    labels = [label for _, label in k_nearest]
    return max(set(labels), key=labels.count)

# Example: classify points
train_data = [[1, 1], [1, 2], [2, 1], [6, 5], [7, 7], [8, 6]]
train_labels = ['A', 'A', 'A', 'B', 'B', 'B']
test_point = [3, 3]

result = knn_predict(train_data, train_labels, test_point, k=3)
print(f"Prediction: {result}")
\`\`\`

## Key Concepts

### Features and Labels
- **Features**: Input data (e.g., house size, number of rooms)
- **Labels**: Output/target (e.g., price, category)

### Training and Testing
- Split data into training set (to learn) and test set (to evaluate)
- Typical split: 80% training, 20% testing

### Model Evaluation
\`\`\`python
# Calculate accuracy
def accuracy(true_labels, predicted_labels):
    correct = sum(t == p for t, p in zip(true_labels, predicted_labels))
    return correct / len(true_labels)

true = ['A', 'B', 'A', 'B', 'A']
predicted = ['A', 'B', 'B', 'B', 'A']
print(f"Accuracy: {accuracy(true, predicted):.2%}")
\`\`\`

## Overfitting vs Underfitting
- **Overfitting**: Model learns training data too well, performs poorly on new data
- **Underfitting**: Model is too simple, doesn't capture patterns
- **Goal**: Find the right balance (good generalization)

## Next Steps
1. Learn NumPy for numerical computing
2. Explore scikit-learn library for ML algorithms
3. Study pandas for data manipulation
4. Practice with real datasets
5. Learn about neural networks and deep learning

## Common ML Algorithms
- Linear Regression
- Logistic Regression
- Decision Trees
- Random Forests
- Support Vector Machines (SVM)
- Neural Networks`,
    },
  ];

  for (const lessonData of lessons) {
    try {
      const lesson = await prisma.lesson.create({
        data: lessonData,
      });
      console.log(`✅ Created: ${lesson.title}`);
    } catch (error: any) {
      if (error.code === 'P2002') {
        console.log(`⚠️  Skipping "${lessonData.title}" (already exists)`);
      } else {
        console.error(`❌ Error creating "${lessonData.title}":`, error.message);
      }
    }
  }

  console.log('\n🎉 Lesson seeding complete!');
  console.log(`\n📚 Total lessons in database: ${await prisma.lesson.count()}`);
}

seedMoreLessons()
  .catch((e) => {
    console.error('Error seeding lessons:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
