import { PrismaClient, LessonDifficulty } from '@prisma/client';

const prisma = new PrismaClient();

async function seedComprehensiveLessons() {
  console.log('🌱 Seeding comprehensive Python lessons...\n');

  const lessons = [
    {
      title: 'Control Flow: Making Decisions in Python',
      slug: 'control-flow-if-else',
      description: 'Learn how to make your programs smart by teaching them to make decisions using if, elif, and else statements.',
      difficulty: LessonDifficulty.beginner,
      estimatedTime: 45,
      orderIndex: 3,
      topic: 'Control Flow',
      prerequisites: [],
      content: `# Control Flow: Making Decisions in Python

## Introduction: Why Do We Need Control Flow?

Imagine you're creating a simple video game. You want different things to happen based on what the player does:
- If the player presses the jump button, the character jumps
- If the player has more than 0 health points, they can continue playing
- If it's raining in the game, show an umbrella

In real life, we make decisions all the time: "If it's cold, I'll wear a jacket." "If I'm hungry, I'll eat lunch." Your Python programs need to make decisions too! That's what **control flow** is all about.

## What is Control Flow?

**Control flow** is how we tell our program to make choices. Instead of just running every line of code from top to bottom, control flow lets us:
- Run some code only when certain conditions are true
- Skip code that doesn't need to run
- Choose between different paths our program can take

Think of it like a "Choose Your Own Adventure" book, where you flip to different pages based on the choices you make.

---

## The if Statement: Your First Decision

The simplest form of control flow is the \`if\` statement. It says: "**If** this condition is true, **then** do this code."

### Basic Syntax

\`\`\`python
if condition:
    # Code to run if condition is True
    # Notice the indentation - it's very important!
\`\`\`

### Real Example

\`\`\`python
age = 18

if age >= 18:
    print("You are an adult!")
    print("You can vote!")
\`\`\`

**How it works:**
1. Python checks if \`age >= 18\` is True or False
2. If it's True, Python runs all the indented code below
3. If it's False, Python skips that indented code completely

### Important: Indentation Matters!

In Python, indentation (the spaces at the start of a line) is not just for looks—it's part of the language! All code that belongs to the \`if\` statement must be indented by 4 spaces (or 1 tab).

\`\`\`python
# Correct
if age >= 18:
    print("Adult")    # This is indented - part of the if
    print("Can vote") # This is also indented - also part of the if

# Wrong - This will cause an error!
if age >= 18:
print("Adult")  # No indentation - ERROR!
\`\`\`

---

## Comparison Operators: How to Compare Things

To make decisions, we need to compare values. Python gives us several **comparison operators**:

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| \`==\` | Equal to | \`5 == 5\` | \`True\` |
| \`!=\` | Not equal to | \`5 != 3\` | \`True\` |
| \`>\` | Greater than | \`10 > 5\` | \`True\` |
| \`<\` | Less than | \`3 < 7\` | \`True\` |
| \`>=\` | Greater than or equal | \`5 >= 5\` | \`True\` |
| \`<=\` | Less than or equal | \`4 <= 3\` | \`False\` |

### Common Mistake: = vs ==

\`\`\`python
# Wrong - This assigns 5 to x
if x = 5:
    print("Equal")

# Correct - This compares x to 5
if x == 5:
    print("Equal")
\`\`\`

**Remember:** One equals sign (\`=\`) is for **assignment**, two equals signs (\`==\`) is for **comparison**.

---

## The if-else Statement: Choose Between Two Options

Sometimes you want to do one thing if a condition is true, and something different if it's false. That's where \`else\` comes in!

\`\`\`python
temperature = 25

if temperature > 30:
    print("It's hot outside!")
    print("Don't forget sunscreen!")
else:
    print("The weather is nice.")
    print("Enjoy your day!")
\`\`\`

**How it works:**
- If \`temperature > 30\` is True, run the first block
- Otherwise (if it's False), run the else block
- Exactly ONE of these blocks will run, never both

### Real-World Example: Password Checker

\`\`\`python
password = "secret123"
user_input = "password"

if user_input == password:
    print("✓ Access granted!")
    print("Welcome back!")
else:
    print("✗ Access denied!")
    print("Incorrect password.")
\`\`\`

---

## The if-elif-else Chain: Multiple Choices

What if you have more than two options? Use \`elif\` (short for "else if") to check multiple conditions in order.

\`\`\`python
score = 85

if score >= 90:
    print("Grade: A")
    print("Excellent work!")
elif score >= 80:
    print("Grade: B")
    print("Great job!")
elif score >= 70:
    print("Grade: C")
    print("Good effort!")
elif score >= 60:
    print("Grade: D")
    print("You passed!")
else:
    print("Grade: F")
    print("Need to study more.")
\`\`\`

**How it works:**
1. Python checks each condition **in order** from top to bottom
2. When it finds the **first** True condition, it runs that block
3. It then **skips all remaining** elif and else blocks
4. If **none** of the conditions are True, it runs the else block

### Important: Order Matters!

\`\`\`python
score = 95

# This works correctly
if score >= 90:
    print("A")  # This will print
elif score >= 80:
    print("B")  # This won't run even though 95 >= 80

# This is wrong - won't work as intended!
if score >= 60:
    print("D")  # This will print - wrong!
elif score >= 90:
    print("A")  # Never gets checked
\`\`\`

Always put the most specific conditions first!

---

## Logical Operators: Combining Conditions

Sometimes you need to check multiple conditions at once. Use logical operators:

### The \`and\` Operator

Both conditions must be True for the whole thing to be True.

\`\`\`python
age = 25
has_license = True

if age >= 18 and has_license:
    print("You can drive!")
    
# age >= 18 is True AND has_license is True
# So the whole condition is True
\`\`\`

**Truth table for \`and\`:**
- True and True = True
- True and False = False
- False and True = False  
- False and False = False

### The \`or\` Operator

At least one condition must be True.

\`\`\`python
is_weekend = True
is_holiday = False

if is_weekend or is_holiday:
    print("Time to relax!")
    
# is_weekend is True OR is_holiday is False
# Since one is True, the whole condition is True
\`\`\`

**Truth table for \`or\`:**
- True or True = True
- True or False = True
- False or True = True
- False or False = False

### The \`not\` Operator

Reverses True to False and False to True.

\`\`\`python
is_raining = False

if not is_raining:
    print("Let's go outside!")
    
# not False = True, so this prints
\`\`\`

### Complex Example

\`\`\`python
age = 16
has_permission = True
has_ticket = True

if (age >= 18 or has_permission) and has_ticket:
    print("Welcome to the concert!")
else:
    print("Sorry, you can't enter.")
\`\`\`

---

## Nested if Statements: Decisions Within Decisions

You can put if statements inside other if statements!

\`\`\`python
has_account = True
password_correct = True
two_factor_verified = False

if has_account:
    print("Account found...")
    if password_correct:
        print("Password accepted...")
        if two_factor_verified:
            print("✓ Login successful!")
        else:
            print("✗ Please verify 2-factor authentication")
    else:
        print("✗ Wrong password")
else:
    print("✗ Account not found")
\`\`\`

**Tip:** Don't nest too deeply (more than 2-3 levels) or your code becomes hard to read!

---

## Common Patterns and Examples

### Example 1: Number Classification

\`\`\`python
number = -5

if number > 0:
    print("Positive number")
elif number < 0:
    print("Negative number")
else:
    print("Zero")
\`\`\`

### Example 2: Checking Multiple Conditions

\`\`\`python
username = "admin"
password = "secret123"
is_logged_in = False

if username == "admin" and password == "secret123":
    is_logged_in = True
    print("Admin logged in")
elif username == "admin":
    print("Wrong password")
else:
    print("User not found")
\`\`\`

### Example 3: Range Checking

\`\`\`python
temperature = 22

if temperature < 0:
    print("Freezing! Wear a heavy coat")
elif temperature < 15:
    print("Cold - wear a jacket")
elif temperature < 25:
    print("Pleasant weather")
elif temperature < 35:
    print("Warm - light clothes")
else:
    print("Very hot! Stay hydrated")
\`\`\`

---

## Common Mistakes to Avoid

### 1. Forgetting the Colon

\`\`\`python
# Wrong
if age >= 18
    print("Adult")

# Correct
if age >= 18:
    print("Adult")
\`\`\`

### 2. Wrong Indentation

\`\`\`python
# Wrong
if age >= 18:
print("Adult")

# Correct
if age >= 18:
    print("Adult")
\`\`\`

### 3. Using = Instead of ==

\`\`\`python
# Wrong - this assigns 5 to x
if x = 5:
    print("Five")

# Correct - this compares x to 5
if x == 5:
    print("Five")
\`\`\`

---

## Practice Problems

Try these on your own:

1. **Age Category**: Write code that prints "Child" if age < 13, "Teenager" if age is 13-19, and "Adult" if age >= 20

2. **Grade Calculator**: Given a score, print the letter grade using this scale: A (90-100), B (80-89), C (70-79), D (60-69), F (below 60)

3. **Ticket Price**: A movie ticket costs $12 normally, $8 for seniors (65+), and $6 for children (under 13). Write code to calculate the price based on age.

---

## Key Takeaways

✓ \`if\` statements let your program make decisions
✓ Use comparison operators (\`==\`, \`!=\`, \`>\`, \`<\`, etc.) to compare values
✓ Use \`elif\` for multiple conditions, \`else\` as a fallback
✓ Combine conditions with \`and\`, \`or\`, and \`not\`
✓ Indentation is crucial - Python uses it to understand which code belongs together
✓ Order matters with if-elif-else chains

---

## Additional Resources

**Want to learn more?**
- [Python Official Tutorial - Control Flow](https://docs.python.org/3/tutorial/controlflow.html)
- Practice on [Codecademy's Python Course](https://www.codecademy.com/learn/learn-python-3)
- Try exercises on [HackerRank Python](https://www.hackerrank.com/domains/python)

**Next Steps:**
After mastering control flow, you'll be ready to learn about loops - which let you repeat code multiple times!`,
    },
  ];

  for (const lessonData of lessons) {
    try {
      // Delete existing lesson with same slug
      await prisma.lesson.deleteMany({
        where: { slug: lessonData.slug }
      });
      
      const lesson = await prisma.lesson.create({
        data: lessonData,
      });
      console.log(`✅ Created: ${lesson.title}`);
    } catch (error: any) {
      console.error(`❌ Error creating "${lessonData.title}":`, error.message);
    }
  }

  console.log('\n🎉 Comprehensive lesson seeding complete!');
  console.log(`\n📚 Total lessons in database: ${await prisma.lesson.count()}`);
}

seedComprehensiveLessons()
  .catch((e) => {
    console.error('Error seeding lessons:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
