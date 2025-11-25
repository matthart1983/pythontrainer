import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateMLLesson() {
  console.log('🔄 Updating Machine Learning lesson...\n');

  // Delete the old lesson
  await prisma.lesson.deleteMany({
    where: { slug: 'intro-machine-learning' }
  });

  // Create the comprehensive ML lesson
  const lesson = await prisma.lesson.create({
    data: {
      title: 'Introduction to Machine Learning with Python',
      slug: 'intro-machine-learning',
      description: 'Discover the exciting world of machine learning - understand AI fundamentals, learn how computers learn from data, and build your first ML models with 10+ practical examples.',
      difficulty: 'advanced',
      estimatedTime: 75,
      orderIndex: 11,
      topic: 'Machine Learning',
      prerequisites: [],
      content: `# Introduction to Machine Learning with Python

Welcome to one of the most exciting fields in technology! Machine learning is revolutionizing how computers solve problems, and you're about to learn how it works.

## What is Machine Learning?

Imagine teaching a computer to recognize your handwriting, predict weather patterns, or recommend movies you'll love - without explicitly programming every rule.

That's machine learning!

**Simple Definition:** Machine learning is teaching computers to learn from examples and make decisions, just like humans learn from experience.

**Traditional Programming vs Machine Learning:**

Traditional Programming:
- You write specific rules
- Computer follows rules exactly
- Limited to what you programmed

Machine Learning:
- You provide examples (data)
- Computer finds patterns automatically
- Can handle new situations

---

## The Story of Machine Learning

### Early Beginnings

The concept started in the 1950s when Arthur Samuel created a program that could learn to play checkers better than he could!

He coined the term "machine learning" in 1959.

### The AI Winters

Progress was slow for decades due to:
- Limited computing power
- Not enough data
- Mathematical challenges

### The Modern Revolution (2012-Present)

Everything changed when:
- **Big Data** became available (billions of examples)
- **Powerful computers** (GPUs) could process it
- **Deep Learning** techniques improved dramatically

Today, ML powers your phone's face recognition, Netflix recommendations, self-driving cars, and medical diagnoses.

---

## Why Learn Machine Learning?

### For High School Students

**Career Opportunities:**

Machine learning engineers earn $120,000-200,000+ per year!

It's one of the fastest-growing fields in technology.

**Real-World Impact:**

- Healthcare: Detecting diseases early
- Environment: Predicting climate change
- Education: Personalized learning systems
- Entertainment: Creating realistic game characters
- Space: Analyzing data from Mars rovers

**Skills That Transfer:**

Learning ML teaches you:
- Problem-solving strategies
- Data analysis
- Critical thinking
- Mathematics in action
- Python programming mastery

### The Future is ML-Powered

By 2030, experts predict:
- 80% of businesses will use AI/ML
- New jobs we haven't imagined yet
- ML will be as common as using a calculator

Starting now gives you a massive advantage!

---

## The Three Types of Machine Learning

### 1. Supervised Learning (Learning with a Teacher)

**What it is:**
You show the computer labeled examples, and it learns the pattern.

**Analogy:**
Like studying for a test with answer keys - you learn by seeing questions AND their correct answers.

**Examples:**
- Email spam detection (labeled: spam or not spam)
- House price prediction (given: size, location, features)
- Medical diagnosis (given: symptoms, known disease)

**How it works:**
Input → Model learns from examples → Predicts output

---

### 2. Unsupervised Learning (Learning Without Labels)

**What it is:**
The computer finds hidden patterns in data without being told what to look for.

**Analogy:**
Like organizing your bookshelf by grouping similar books together, even though no one told you the categories.

**Examples:**
- Customer segmentation (finding groups of similar buyers)
- Recommendation systems (finding users with similar tastes)
- Anomaly detection (finding unusual patterns)

**How it works:**
Input → Model finds patterns → Discovers structure

---

### 3. Reinforcement Learning (Learning by Trial and Error)

**What it is:**
The computer learns by trying things, getting feedback (rewards or penalties), and improving over time.

**Analogy:**
Like learning to ride a bike - you fall, adjust, try again, and eventually master it through practice.

**Examples:**
- Game-playing AI (AlphaGo, chess programs)
- Robot control (learning to walk)
- Self-driving cars (learning to navigate)

**How it works:**
Action → Environment gives reward → Learn better actions

---

## Key Machine Learning Concepts

### Features and Labels

**Features:**
The input data - the information you give the model.

Think of features as the "questions" or "clues."

**Example - House Price Prediction:**
- Features: Square footage, number of bedrooms, location, year built
- Label: Price (what we want to predict)

**Example - Email Spam Detection:**
- Features: Words in email, sender, subject line, links
- Label: Spam or Not Spam

---

### Training and Testing

**Training:**
Teaching the model using examples with known answers.

**Testing:**
Checking if the model learned correctly using NEW examples it hasn't seen.

**Why split data?**
If you test on the same data you trained on, you can't tell if the model truly learned or just memorized.

**Common Split:**
- 80% Training (to learn)
- 20% Testing (to evaluate)

---

### Overfitting vs Underfitting

**Overfitting:**
Model memorizes training data but fails on new data.

Like memorizing test answers without understanding - you fail when questions change slightly.

**Underfitting:**
Model is too simple and doesn't capture the pattern.

Like guessing randomly - you miss the underlying rule.

**The Goal:**
Find the sweet spot - a model that learned the pattern but stays flexible for new data.

---

## Example 1: Understanding Patterns

Let's start with a simple pattern recognition task:

\`\`\`python
# Imagine you have test scores and study hours
study_hours = [1, 2, 3, 4, 5, 6, 7, 8]
test_scores = [50, 55, 65, 70, 78, 85, 90, 95]

# Can you see the pattern?
# More study hours → Higher scores!

# Let's predict: If someone studies 5.5 hours, what score?
# Based on pattern, around 80-82!
\`\`\`

**What you learned:**
This is the essence of ML - finding patterns in data to make predictions.

---

## Example 2: Simple Linear Regression

Linear regression finds the straight line that best fits data points.

\`\`\`python
# House prices example
sizes = [1000, 1500, 2000, 2500, 3000]  # square feet
prices = [200, 300, 400, 500, 600]       # thousands of dollars

# Calculate the "best fit" line
# Formula: price = slope × size + intercept

import statistics

mean_size = statistics.mean(sizes)
mean_price = statistics.mean(prices)

# Calculate slope
numerator = sum((sizes[i] - mean_size) * (prices[i] - mean_price) 
                for i in range(len(sizes)))
denominator = sum((sizes[i] - mean_size) ** 2 
                  for i in range(len(sizes)))
slope = numerator / denominator

# Calculate intercept
intercept = mean_price - slope * mean_size

print(f"Slope: {slope}")
print(f"Intercept: {intercept}")

# Make a prediction!
new_house_size = 1800
predicted_price = slope * new_house_size + intercept
print(f"Predicted price for {new_house_size} sq ft: $` + `{predicted_price:.0f}k")
\`\`\`

**What you learned:**
Linear regression finds mathematical relationships between variables.

---

## Example 3: Distance Calculation

Many ML algorithms use distance to measure similarity.

\`\`\`python
import math

def euclidean_distance(point1, point2):
    """Calculate straight-line distance between two points"""
    # Using Pythagorean theorem
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(point1, point2)))

# Example: Movies with ratings [action, comedy, drama]
movie_a = [8, 2, 5]  # Action-heavy
movie_b = [7, 3, 4]  # Similar to A
movie_c = [2, 9, 3]  # Comedy-heavy

# Which movies are most similar?
distance_ab = euclidean_distance(movie_a, movie_b)
distance_ac = euclidean_distance(movie_a, movie_c)

print(f"Distance A-B: {distance_ab:.2f}")
print(f"Distance A-C: {distance_ac:.2f}")
print("Movie A is more similar to Movie B!" if distance_ab < distance_ac else "Movie A is more similar to Movie C!")
\`\`\`

**What you learned:**
Distance measures help computers understand similarity.

---

## Example 4: K-Nearest Neighbors (KNN)

KNN is one of the simplest ML algorithms - it classifies based on nearest neighbors.

\`\`\`python
def knn_predict(training_data, training_labels, test_point, k=3):
    """
    Predict the label for test_point using K-Nearest Neighbors
    """
    import math
    
    # Calculate distances to all training points
    distances = []
    for i, data_point in enumerate(training_data):
        dist = math.sqrt(sum((a - b) ** 2 for a, b in zip(data_point, test_point)))
        distances.append((dist, training_labels[i]))
    
    # Sort by distance and get k nearest
    distances.sort()
    k_nearest = distances[:k]
    
    # Vote: Most common label wins
    labels = [label for _, label in k_nearest]
    return max(set(labels), key=labels.count)

# Example: Classifying fruits by [weight, sweetness]
training_data = [
    [150, 7],  # Apple
    [160, 8],  # Apple
    [140, 6],  # Apple
    [300, 9],  # Orange
    [320, 10], # Orange
    [280, 8]   # Orange
]
training_labels = ['Apple', 'Apple', 'Apple', 'Orange', 'Orange', 'Orange']

# New fruit: weight=170, sweetness=7
mystery_fruit = [170, 7]
prediction = knn_predict(training_data, training_labels, mystery_fruit, k=3)
print(f"The mystery fruit is probably: {prediction}")
\`\`\`

**What you learned:**
KNN classifies by finding similar examples and using majority vote.

---

## Example 5: Making Predictions with Data

Let's predict if a student will pass based on study hours and previous scores.

\`\`\`python
def predict_pass_fail(study_hours, previous_score):
    """
    Simple rule-based prediction
    In real ML, the model learns these rules from data!
    """
    # Calculate a "success score"
    success_score = (study_hours * 10) + (previous_score * 0.5)
    
    if success_score > 80:
        return "PASS", success_score
    else:
        return "FAIL", success_score

# Test different scenarios
scenarios = [
    (8, 70),   # High study, good previous score
    (3, 50),   # Low study, medium previous score
    (5, 80),   # Medium study, high previous score
    (2, 40),   # Low study, low previous score
]

print("Student Predictions:")
print("-" * 50)
for hours, score in scenarios:
    result, success = predict_pass_fail(hours, score)
    print(f"Study: {hours}h, Previous: {score}% → {result} (Score: {success:.1f})")
\`\`\`

**What you learned:**
ML models make predictions by combining multiple features.

---

## Example 6: Data Normalization

ML models work better when data is on similar scales.

\`\`\`python
def normalize(data):
    """
    Scale data to 0-1 range
    Formula: (value - min) / (max - min)
    """
    min_val = min(data)
    max_val = max(data)
    return [(x - min_val) / (max_val - min_val) for x in data]

# Example: Different scales
ages = [18, 25, 30, 45, 60]        # Range: 18-60
salaries = [20000, 45000, 60000, 80000, 95000]  # Range: 20k-95k

# Normalize both
ages_normalized = normalize(ages)
salaries_normalized = normalize(salaries)

print("Original ages:", ages)
print("Normalized ages:", [f"{x:.2f}" for x in ages_normalized])
print()
print("Original salaries:", salaries)
print("Normalized salaries:", [f"{x:.2f}" for x in salaries_normalized])
\`\`\`

**What you learned:**
Normalization helps ML algorithms treat all features fairly.

---

## Example 7: Accuracy Calculation

How do we know if our model is good? We measure accuracy!

\`\`\`python
def calculate_accuracy(true_labels, predicted_labels):
    """
    Calculate what percentage of predictions were correct
    """
    if len(true_labels) != len(predicted_labels):
        return 0.0
    
    correct = sum(1 for true, pred in zip(true_labels, predicted_labels) 
                  if true == pred)
    total = len(true_labels)
    
    return (correct / total) * 100

# Example predictions
actual = ['Cat', 'Dog', 'Cat', 'Dog', 'Cat', 'Dog', 'Cat', 'Dog']
predicted = ['Cat', 'Dog', 'Dog', 'Dog', 'Cat', 'Dog', 'Cat', 'Cat']

accuracy = calculate_accuracy(actual, predicted)
print(f"Model Accuracy: {accuracy:.1f}%")

# Show which predictions were right/wrong
print("\\nDetailed Results:")
for i, (true, pred) in enumerate(zip(actual, predicted)):
    result = "✓ Correct" if true == pred else "✗ Wrong"
    print(f"Sample {i+1}: True={true}, Predicted={pred} → {result}")
\`\`\`

**What you learned:**
Accuracy shows how often your model is correct.

---

## Example 8: Feature Importance

Not all features are equally important for predictions.

\`\`\`python
# Imagine predicting house prices
# Which feature matters most?

features = {
    'Square Footage': 0.65,    # Very important!
    'Location': 0.25,          # Important
    'Number of Bedrooms': 0.08, # Somewhat important
    'Paint Color': 0.02        # Barely matters
}

print("Feature Importance for House Prices:")
print("-" * 50)

# Sort by importance
sorted_features = sorted(features.items(), key=lambda x: x[1], reverse=True)

for feature, importance in sorted_features:
    bar = "█" * int(importance * 100)
    print(f"{feature:20} {importance:5.1%} {bar}")
\`\`\`

**What you learned:**
Some features have more predictive power than others.

---

## Example 9: Train-Test Split

Always split your data to avoid overfitting!

\`\`\`python
import random

def train_test_split(data, labels, test_size=0.2):
    """
    Split data into training and testing sets
    """
    # Combine data and labels
    combined = list(zip(data, labels))
    
    # Shuffle randomly
    random.shuffle(combined)
    
    # Calculate split point
    split_point = int(len(combined) * (1 - test_size))
    
    # Split
    train = combined[:split_point]
    test = combined[split_point:]
    
    # Separate back into data and labels
    train_data = [item[0] for item in train]
    train_labels = [item[1] for item in train]
    test_data = [item[0] for item in test]
    test_labels = [item[1] for item in test]
    
    return train_data, train_labels, test_data, test_labels

# Example usage
data = list(range(1, 11))  # [1, 2, 3, ..., 10]
labels = ['A', 'B', 'A', 'B', 'A', 'B', 'A', 'B', 'A', 'B']

train_d, train_l, test_d, test_l = train_test_split(data, labels, test_size=0.2)

print(f"Training set size: {len(train_d)} samples")
print(f"Testing set size: {len(test_d)} samples")
print(f"Training data: {train_d}")
print(f"Testing data: {test_d}")
\`\`\`

**What you learned:**
Always keep separate data for testing to ensure fair evaluation.

---

## Example 10: Putting It All Together - Mini ML Pipeline

Let's build a complete mini machine learning pipeline!

\`\`\`python
import random
import math

# Step 1: Generate sample data
def generate_data(n_samples=50):
    """Generate synthetic data: hours studied vs exam scores"""
    data = []
    labels = []
    for _ in range(n_samples):
        hours = random.uniform(1, 10)
        # Score increases with study time (with some randomness)
        score = min(100, max(0, hours * 8 + random.uniform(-10, 10)))
        data.append([hours])
        labels.append(score)
    return data, labels

# Step 2: Split data
def split_data(data, labels, split=0.8):
    """80-20 train-test split"""
    split_idx = int(len(data) * split)
    return data[:split_idx], labels[:split_idx], data[split_idx:], labels[split_idx:]

# Step 3: Simple prediction model
def simple_predictor(train_data, train_labels):
    """Learn the average score per hour"""
    total_hours = sum(item[0] for item in train_data)
    total_scores = sum(train_labels)
    avg_score_per_hour = total_scores / total_hours if total_hours > 0 else 0
    return avg_score_per_hour

# Step 4: Make predictions
def predict(model, test_data):
    """Predict scores for test data"""
    return [model * item[0] for item in test_data]

# Step 5: Evaluate
def mean_absolute_error(true_values, predictions):
    """Calculate average prediction error"""
    errors = [abs(true - pred) for true, pred in zip(true_values, predictions)]
    return sum(errors) / len(errors) if errors else 0

# Run the pipeline!
print("🚀 Machine Learning Pipeline")
print("=" * 60)

# Generate and split data
data, labels = generate_data(50)
train_data, train_labels, test_data, test_labels = split_data(data, labels)

print(f"✓ Generated {len(data)} samples")
print(f"✓ Training samples: {len(train_data)}")
print(f"✓ Testing samples: {len(test_data)}")

# Train model
model = simple_predictor(train_data, train_labels)
print(f"✓ Trained model: {model:.2f} points per study hour")

# Make predictions
predictions = predict(model, test_data)

# Evaluate
error = mean_absolute_error(test_labels, predictions)
print(f"✓ Average prediction error: {error:.2f} points")

# Show sample predictions
print("\\nSample Predictions:")
for i in range(min(5, len(test_data))):
    hours = test_data[i][0]
    true_score = test_labels[i]
    pred_score = predictions[i]
    print(f"  {hours:.1f} hours → Predicted: {pred_score:.1f}, Actual: {true_score:.1f}")
\`\`\`

**What you learned:**
A complete ML workflow: data → split → train → predict → evaluate!

---

## Popular Python Libraries for Machine Learning

### NumPy
Fast numerical computing and array operations.

### Pandas
Data manipulation and analysis (like Excel for Python).

### Scikit-learn
The main ML library with tons of algorithms built-in.

### TensorFlow / PyTorch
Deep learning frameworks for neural networks.

### Matplotlib / Seaborn
Visualizing data and results.

---

## Common ML Algorithms (Beyond KNN)

### Decision Trees
Make decisions like a flowchart.

Good for: Classification and explaining decisions.

### Random Forests
Many decision trees voting together.

Good for: Accurate predictions, handling complex data.

### Support Vector Machines (SVM)
Find the best boundary between classes.

Good for: Text classification, image recognition.

### Neural Networks
Inspired by human brain, layers of connected nodes.

Good for: Images, speech, complex patterns.

### K-Means Clustering
Group similar items automatically.

Good for: Customer segmentation, compression.

---

## Real-World ML Applications

### Healthcare
- Detecting cancer from X-rays
- Predicting disease outbreaks
- Personalized treatment plans

### Finance
- Fraud detection
- Stock price prediction
- Credit scoring

### Entertainment
- Netflix/Spotify recommendations
- Video game AI
- Content generation

### Transportation
- Self-driving cars
- Traffic prediction
- Route optimization

### Education
- Adaptive learning systems
- Automatic grading
- Personalized tutoring

---

## Best Practices for ML Projects

### Start Simple
Begin with basic models before trying complex ones.

### Understand Your Data
Explore and visualize data before building models.

### Feature Engineering
Create useful features from raw data - this is often the key to success!

### Avoid Overfitting
Always validate on separate test data.

### Document Everything
Keep track of what you tried and why.

### Iterate and Improve
First model is rarely the best - keep refining!

---

## Common Mistakes to Avoid

### Using all your data for training
Always keep test data separate!

### Ignoring data quality
Garbage in = garbage out. Clean your data!

### Not normalizing features
Large numbers can dominate small ones.

### Assuming correlation means causation
Just because two things are related doesn't mean one causes the other.

### Overfitting to training data
Model should generalize, not memorize!

---

## Next Steps in Your ML Journey

### Learn More Math
- Statistics (understanding data)
- Linear algebra (vectors and matrices)
- Calculus (how models optimize)

### Practice with Real Data
- Kaggle competitions
- UCI Machine Learning Repository
- Real-world datasets from your interests

### Build Projects
- Spam classifier
- Movie recommendation system
- Image classifier
- Chatbot
- Game-playing AI

### Study Deep Learning
- Neural networks
- Computer vision
- Natural language processing

---

## Learning Resources

### Online Courses
- Fast.ai (practical deep learning)
- Coursera Machine Learning (Andrew Ng)
- Google's Machine Learning Crash Course

### Books
- "Hands-On Machine Learning" by Aurélien Géron
- "Make Your Own Neural Network" by Tariq Rashid
- "Pattern Recognition and Machine Learning" by Christopher Bishop

### Practice Platforms
- Kaggle (competitions and tutorials)
- Google Colab (free GPU for experiments)
- DataCamp (interactive courses)

### Communities
- r/MachineLearning (Reddit)
- ML Discord servers
- Local AI/ML meetups

---

## Key Takeaways

✅ Machine learning teaches computers to learn from data, not explicit rules

✅ Three types: Supervised (with labels), Unsupervised (find patterns), Reinforcement (trial and error)

✅ Always split data into training and testing sets

✅ Start with simple algorithms (KNN, Linear Regression) before complex ones

✅ Feature engineering and data quality matter more than complex algorithms

✅ ML is a powerful tool for solving real-world problems across all industries

✅ Python + scikit-learn make ML accessible to everyone

---

## Your Challenge

Before moving forward, try these exercises:

1. **Modify Example 4** - Change the KNN to classify different types of animals based on features you choose

2. **Extend Example 10** - Add more sophisticated prediction logic to the ML pipeline

3. **Create your own dataset** - Collect data about something you're interested in and try to find patterns

4. **Research a real ML application** - Pick one from the applications section and learn more about how it works

Remember: Every ML expert started exactly where you are now.

The key is practice, curiosity, and persistence!

**Welcome to the future of technology! 🤖✨**`
    }
  });

  console.log('✅ Updated:', lesson.title);
  console.log(`\n📚 Total lessons in database: ${await prisma.lesson.count()}`);
}

updateMLLesson()
  .catch((e) => {
    console.error('Error updating lesson:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
