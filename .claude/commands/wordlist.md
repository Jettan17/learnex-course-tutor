---
description: Generate a domain-specific vocabulary reference card to help users prompt more precisely.
ecc_base_version: "5230892"
last_synced: "2026-02-08"
customizations: "Web-search grounded, auto-detect domain, supports any domain (tech and non-tech)"
---

# /wordlist - Domain Vocabulary Reference Card

Generate a quick-reference vocabulary card for **any domain** - technical or non-technical - to help recall relevant concepts and prompt more precisely.

## Usage

```bash
/wordlist                              # Auto-detect domain from project context
/wordlist nlp                          # Tech domain
/wordlist "public transportation"      # Non-tech domain
/wordlist biology                      # Science domain
/wordlist "supply chain logistics"     # Industry domain
```

---

## How It Works

### Step 1: Determine Domain

**If an argument is provided** (e.g., `/wordlist nlp`), use that as the domain. Treat `$ARGUMENTS` as the domain input.

**If no argument is provided** (`$ARGUMENTS` is empty), auto-detect from project context:

1. **Dependencies** - Read `package.json`, `requirements.txt`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `Gemfile`, or similar. Identify domain signals from package names:
   - `transformers`, `spacy`, `nltk` → NLP
   - `react`, `next`, `vue` → Frontend Web Development
   - `tensorflow`, `torch`, `scikit-learn` → Machine Learning
   - `express`, `fastapi`, `django` → Backend Web Development
   - `pandas`, `polars`, `duckdb` → Data Engineering
   - `solidity`, `ethers`, `web3` → Blockchain
   - Use your judgement for other packages

2. **Project settings** - Read `project-settings.md` and parse the **Objective/Use-Case** field for domain keywords.

3. **File patterns** - Scan directory names and file extensions for domain signals:
   - `contracts/`, `.sol` files → Blockchain
   - `models/`, `training/` → Machine Learning
   - `components/`, `pages/` → Frontend
   - `migrations/`, `schemas/` → Database/Backend

4. **If detection fails** - Ask the user:
   > "I couldn't detect a clear domain from the project. What domain would you like a vocabulary card for?"

### Step 2: Web Search (REQUIRED)

**Always perform web searches** to ground the vocabulary in real, current terminology. Do NOT rely solely on LLM knowledge.

Execute these searches using **WebSearch**:

1. `"{domain}" glossary key terms terminology 2026`
2. `"{domain}" concepts cheat sheet vocabulary`

Read 2-3 top results using **WebFetch** to extract authoritative terms.

Synthesize findings from multiple sources. This ensures:
- Non-tech domains (biology, law, transportation) are covered accurately
- Terminology is current and industry-standard
- Niche domains get real coverage rather than guesses

### Step 3: Synthesize & Output

Compile ~20-30 terms into a categorized reference card using the output format below.

---

## Output Format

```markdown
# Wordlist: {Domain Name}

## {Category 1}
- **{term}**: {1-line definition}
- **{term}**: {1-line definition}

## {Category 2}
- **{term}**: {1-line definition}
- **{term}**: {1-line definition}

## {Category 3}
- **{term}**: {1-line definition}

## {Category 4}
- **{term}**: {1-line definition}

## Key Relationships
- {term A} → {term B}: {why they relate}
- {term C} → {term D}: {why they relate}

---
**Prompting tips:** Use these terms for more precise prompts.
Example: "How do I implement {term1} using {term2}?"

**Related domains:** {domain1}, {domain2}, {domain3}
```

### Category Guidelines

- Include ~20-30 terms total across 3-5 categories
- **Categories adapt to the domain** - do NOT force every domain into tech-shaped buckets

Examples of domain-appropriate categories:

| Domain | Example Categories |
|--------|--------------------|
| NLP | Core Concepts, Models & Architectures, Preprocessing, Evaluation Metrics |
| Biology | Organisms & Taxonomy, Cellular Processes, Lab Techniques, Ecological Concepts |
| Public Transportation | Infrastructure, Operations & Scheduling, Fare Systems, Ridership Metrics |
| Law | Legal Principles, Court Procedures, Contract Terms, Regulatory Concepts |
| Supply Chain | Logistics & Warehousing, Procurement, Inventory Management, Shipping & Freight |
| Music Theory | Fundamentals, Harmony & Chords, Rhythm & Meter, Form & Structure |

---

## Edge Cases

### Multi-domain project
If the project spans multiple domains (e.g., an ML-powered web app):
- Show vocabulary for the **primary** domain (most relevant to project objective)
- Suggest other detected domains at the bottom:
  > "Other domains detected: Run `/wordlist frontend` or `/wordlist devops` for more."

### Broad domain (e.g., "science", "engineering")
Suggest narrowing and list sub-domains:
> "That's a broad domain. Consider narrowing to one of these:
> - `/wordlist molecular-biology`
> - `/wordlist organic-chemistry`
> - `/wordlist astrophysics`"

### Very niche domain
Web search handles this. If search results are sparse:
- Provide what terms are available
- Note: "Coverage is limited for this niche. Terms sourced from {N} references."

### Empty project / no argument
If `$ARGUMENTS` is empty AND auto-detection finds nothing, ask:
> "I couldn't detect a domain from the project. What domain would you like a vocabulary card for?"

---

## Examples

### `/wordlist nlp`

```
# Wordlist: Natural Language Processing (NLP)

## Core Concepts
- **Tokenization**: Splitting text into individual units (words, subwords, characters)
- **Lemmatization**: Reducing words to their base dictionary form
- **Named Entity Recognition (NER)**: Identifying and classifying named entities in text
- **Part-of-Speech Tagging (POS)**: Labeling words with their grammatical role
- **Corpus**: A large, structured collection of text used for training or analysis

## Models & Architectures
- **Transformer**: Attention-based architecture behind modern LLMs
- **BERT**: Bidirectional encoder for understanding context in both directions
- **Fine-tuning**: Adapting a pre-trained model to a specific downstream task
- **Embedding**: Dense vector representation of words or sentences
- **Attention Mechanism**: Weighting the relevance of different input tokens

## Preprocessing & Pipelines
- **Stopword Removal**: Filtering out common words (the, is, at) that add noise
- **TF-IDF**: Term frequency-inverse document frequency weighting
- **Stemming**: Reducing words to root form by stripping suffixes
- **Bag of Words**: Representing text as unordered word frequency counts
- **Text Normalization**: Standardizing text (lowercasing, removing punctuation)

## Evaluation Metrics
- **BLEU Score**: Measuring quality of machine-translated text
- **Perplexity**: How well a language model predicts a sample
- **F1 Score**: Harmonic mean of precision and recall
- **ROUGE**: Recall-oriented metric for summarization quality
- **Word Error Rate (WER)**: Measuring speech recognition accuracy

## Key Relationships
- Tokenization → Embedding: Text must be tokenized before creating embeddings
- Fine-tuning → Transfer Learning: Fine-tuning is the practical application of transfer learning
- BLEU → ROUGE: BLEU measures precision, ROUGE measures recall of generated text

---
**Prompting tips:** Use these terms for more precise prompts.
Example: "How do I implement NER using a fine-tuned BERT model?"

**Related domains:** Machine Learning, Information Retrieval, Computational Linguistics
```

### `/wordlist "public transportation"`

```
# Wordlist: Public Transportation

## Infrastructure
- **Right-of-Way (ROW)**: Dedicated path for transit vehicles, classified A (exclusive) to C (mixed traffic)
- **Intermodal Hub**: Station connecting multiple transit modes (bus, rail, bike-share)
- **Park-and-Ride**: Parking facility at transit stations for commuters
- **Grade Separation**: Physical separation of transit from road traffic (elevated, tunneled)

## Operations & Scheduling
- **Headway**: Time interval between consecutive vehicles on the same route
- **Deadheading**: Operating a vehicle without passengers (repositioning)
- **Dwell Time**: Duration a vehicle spends stopped at a station for boarding
- **Revenue Service**: Time a vehicle is carrying paying passengers
- **Bunching**: When vehicles on the same route cluster together, creating gaps

## Fare Systems
- **Fare Zone**: Geographic area determining ticket price based on distance
- **Transfer**: Permission to switch between routes/modes on a single fare
- **Fare Integration**: Unified ticketing across multiple transit operators
- **Distance-Based Fare**: Pricing proportional to trip length

## Ridership & Planning
- **Ridership**: Total number of passenger trips over a time period
- **Mode Share**: Percentage of travelers using a particular transport mode
- **Transit-Oriented Development (TOD)**: Dense, mixed-use development around transit stations
- **First/Last Mile**: The trip segment between a transit stop and final destination
- **Load Factor**: Ratio of passengers to vehicle capacity

## Key Relationships
- Headway → Ridership: Shorter headways increase ridership by reducing wait times
- TOD → Mode Share: Transit-oriented development increases transit mode share
- Bunching → Headway: Bunching destroys even headways, causing service unreliability

---
**Prompting tips:** Use these terms for more precise prompts.
Example: "How do I reduce headway bunching on high-ridership routes?"

**Related domains:** Urban Planning, Civil Engineering, Transportation Economics
```

---

## Arguments

| Argument | Description |
|----------|-------------|
| *(none)* | Auto-detect domain from project context |
| `{domain}` | Generate vocabulary for the specified domain |

---

## Related Commands

- `/design` - Plan implementation using domain vocabulary
- `/learn` - Extract patterns and terminology from your session

## Next Steps Output

**After completing this command, always display the following block at the end of your output:**

```
---
Next: /design - Plan implementation using this vocabulary
---
```
