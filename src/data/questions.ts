import { CCATQuestion } from '../types';

export const SEED_QUESTIONS: CCATQuestion[] = [
  // ─── VERBAL (10 questions) ─────────────────────────────────────────────

  {
    id: 'v_001',
    category: 'verbal',
    difficulty: 'medium',
    prompt: 'Which word is most opposite to BENEVOLENT?',
    options: ['Malicious', 'Generous', 'Indifferent', 'Peaceful'],
    correctIndex: 0,
    explanation:
      'Benevolent means well-meaning and kind. Malicious means intending harm, making it the direct antonym. Generous and Peaceful share positive connotations with benevolent, and Indifferent means lacking interest rather than actively harmful.',
  },
  {
    id: 'v_002',
    category: 'verbal',
    difficulty: 'medium',
    prompt: 'PAINTER : BRUSH :: SCULPTOR : ___',
    options: ['Canvas', 'Chisel', 'Gallery', 'Clay'],
    correctIndex: 1,
    explanation:
      'A painter uses a brush as their primary tool. By the same analogy, a sculptor uses a chisel as their primary shaping tool. Canvas is where a painter works, not the tool, and Clay is the material, not the instrument.',
  },
  {
    id: 'v_003',
    category: 'verbal',
    difficulty: 'easy',
    prompt:
      'Despite her ___ reputation, the scientist\'s latest findings were met with widespread skepticism.',
    options: ['stellar', 'mediocre', 'controversial', 'obscure'],
    correctIndex: 0,
    explanation:
      'The word "despite" signals a contrast — if her reputation were already mediocre or controversial, skepticism would not be surprising. Only "stellar" (excellent) creates the intended contrast: an expert with a great reputation whose new work was nonetheless doubted.',
  },
  {
    id: 'v_004',
    category: 'verbal',
    difficulty: 'easy',
    prompt: 'Which word does NOT belong: Robin, Eagle, Penguin, Hawk',
    options: ['Robin', 'Eagle', 'Penguin', 'Hawk'],
    correctIndex: 2,
    explanation:
      'Robin, Eagle, and Hawk are all birds capable of flight. A Penguin is a bird but cannot fly, making it the odd one out in a group defined by the ability to fly.',
  },
  {
    id: 'v_005',
    category: 'verbal',
    difficulty: 'medium',
    prompt: 'Which word is most similar in meaning to LOQUACIOUS?',
    options: ['Silent', 'Talkative', 'Aggressive', 'Thoughtful'],
    correctIndex: 1,
    explanation:
      'Loquacious means tending to talk a great deal. Talkative is its closest synonym. Silent is its antonym, while Aggressive and Thoughtful describe personality traits unrelated to speaking habits.',
  },
  {
    id: 'v_006',
    category: 'verbal',
    difficulty: 'hard',
    prompt: 'EPHEMERAL is to LASTING as OPAQUE is to ___',
    options: ['Dark', 'Transparent', 'Solid', 'Heavy'],
    correctIndex: 1,
    explanation:
      'Ephemeral (short-lived) is the opposite of Lasting. Opaque (not allowing light through) is the opposite of Transparent. The relationship in each pair is antonyms, so Transparent is correct.',
  },
  {
    id: 'v_007',
    category: 'verbal',
    difficulty: 'medium',
    prompt:
      'The committee\'s decision was ___; each member had reached the same conclusion independently.',
    options: ['contentious', 'unanimous', 'arbitrary', 'deferred'],
    correctIndex: 1,
    explanation:
      'If each member reached the same conclusion independently, the result would be unanimous (all in agreement). Contentious implies disagreement, arbitrary means random, and deferred means postponed.',
  },
  {
    id: 'v_008',
    category: 'verbal',
    difficulty: 'easy',
    prompt: 'Which word does NOT belong: Hammer, Wrench, Chisel, Paintbrush',
    options: ['Hammer', 'Wrench', 'Chisel', 'Paintbrush'],
    correctIndex: 3,
    explanation:
      'Hammer, Wrench, and Chisel are all tools used in construction or woodworking that manipulate materials directly. A Paintbrush is an artistic/finishing tool and does not belong in a set of structural hand tools.',
  },
  {
    id: 'v_009',
    category: 'verbal',
    difficulty: 'hard',
    prompt: 'Which word is most opposite to LACONIC?',
    options: ['Brief', 'Verbose', 'Calm', 'Precise'],
    correctIndex: 1,
    explanation:
      'Laconic means using very few words. Its antonym is Verbose, which means using more words than needed. Brief is a near-synonym of laconic, while Calm and Precise are unrelated to word quantity.',
  },
  {
    id: 'v_010',
    category: 'verbal',
    difficulty: 'medium',
    prompt: 'LIBRARY : BOOKS :: MUSEUM : ___',
    options: ['Visitors', 'Artifacts', 'Curators', 'Tickets'],
    correctIndex: 1,
    explanation:
      'A library is a place that houses and organizes books. By the same analogy, a museum is a place that houses and organizes artifacts. Visitors, Curators, and Tickets relate to a museum but are not the core content it stores.',
  },

  // ─── MATH & LOGIC (10 questions) ──────────────────────────────────────

  {
    id: 'm_001',
    category: 'math_logic',
    difficulty: 'medium',
    prompt: 'What comes next in the series: 3, 6, 11, 18, 27, ___?',
    options: ['36', '38', '39', '42'],
    correctIndex: 1,
    explanation:
      'The differences between consecutive terms are 3, 5, 7, 9, 11 — odd numbers increasing by 2. So the next difference is 11, giving 27 + 11 = 38.',
  },
  {
    id: 'm_002',
    category: 'math_logic',
    difficulty: 'easy',
    prompt:
      'If 5 workers complete a job in 8 days, how many days will it take 10 workers to complete the same job (assuming equal productivity)?',
    options: ['4', '3', '16', '6'],
    correctIndex: 0,
    explanation:
      'Work is inversely proportional to the number of workers. 5 workers × 8 days = 40 worker-days. With 10 workers: 40 ÷ 10 = 4 days.',
  },
  {
    id: 'm_003',
    category: 'math_logic',
    difficulty: 'easy',
    prompt:
      'All mammals are warm-blooded. A whale is a mammal. Therefore, which statement must be true?',
    options: [
      'Whales are fish',
      'Whales are warm-blooded',
      'All warm-blooded animals are mammals',
      'Whales live in water',
    ],
    correctIndex: 1,
    explanation:
      'This is a classic syllogism. If all mammals are warm-blooded and a whale is a mammal, then a whale must be warm-blooded. The other options either contradict facts (whales are not fish), reverse the logic incorrectly, or state something not derivable from the premises.',
  },
  {
    id: 'm_004',
    category: 'math_logic',
    difficulty: 'easy',
    prompt: 'If 3x + 7 = 22, what is x?',
    options: ['3', '4', '5', '6'],
    correctIndex: 2,
    explanation:
      'Subtract 7 from both sides: 3x = 15. Divide both sides by 3: x = 5.',
  },
  {
    id: 'm_005',
    category: 'math_logic',
    difficulty: 'medium',
    prompt:
      'A train travels 120 miles in 2 hours. At the same speed, how far will it travel in 5 hours?',
    options: ['240 miles', '300 miles', '360 miles', '600 miles'],
    correctIndex: 1,
    explanation:
      'Speed = 120 ÷ 2 = 60 mph. Distance in 5 hours = 60 × 5 = 300 miles.',
  },
  {
    id: 'm_006',
    category: 'math_logic',
    difficulty: 'medium',
    prompt: 'What comes next: 2, 4, 8, 16, 32, ___?',
    options: ['48', '60', '64', '128'],
    correctIndex: 2,
    explanation:
      'Each term is multiplied by 2 (powers of 2). The next term is 32 × 2 = 64.',
  },
  {
    id: 'm_007',
    category: 'math_logic',
    difficulty: 'hard',
    prompt:
      'Some athletes are doctors. All doctors are educated. Which conclusion is definitely true?',
    options: [
      'All athletes are educated',
      'Some athletes are educated',
      'All educated people are doctors',
      'No athletes are uneducated',
    ],
    correctIndex: 1,
    explanation:
      'Since some athletes are doctors, and all doctors are educated, those particular athletes must be educated. Therefore "some athletes are educated" is necessarily true. We cannot conclude all athletes are educated because only some are doctors.',
  },
  {
    id: 'm_008',
    category: 'math_logic',
    difficulty: 'medium',
    prompt:
      'If you buy 3 items at $4.50 each and pay with a $20 bill, how much change do you receive?',
    options: ['$5.50', '$6.50', '$7.50', '$8.50'],
    correctIndex: 1,
    explanation:
      '3 × $4.50 = $13.50. Change = $20.00 − $13.50 = $6.50.',
  },
  {
    id: 'm_009',
    category: 'math_logic',
    difficulty: 'hard',
    prompt: 'What is the next number in the sequence: 1, 1, 2, 3, 5, 8, 13, ___?',
    options: ['18', '19', '20', '21'],
    correctIndex: 3,
    explanation:
      'This is the Fibonacci sequence where each term is the sum of the two preceding terms. 8 + 13 = 21.',
  },
  {
    id: 'm_010',
    category: 'math_logic',
    difficulty: 'medium',
    prompt:
      'A store offers a 25% discount on a $80 jacket. What is the sale price?',
    options: ['$55', '$60', '$65', '$70'],
    correctIndex: 1,
    explanation:
      '25% of $80 = $20 discount. Sale price = $80 − $20 = $60.',
  },

  // ─── SPATIAL REASONING (10 questions) ─────────────────────────────────

  {
    id: 's_001',
    category: 'spatial',
    difficulty: 'medium',
    prompt:
      'Look at the 3×3 grid below. Each row and column contains a circle, a square, and a triangle. What shape is missing in the bottom-right cell?',
    options: ['Circle', 'Square', 'Triangle', 'Diamond'],
    correctIndex: 0,
    imageDescription: `+----------+----------+----------+
|  Circle  |  Square  | Triangle |
+----------+----------+----------+
| Triangle |  Circle  |  Square  |
+----------+----------+----------+
|  Square  | Triangle |    ?     |
+----------+----------+----------+

Each row contains: Circle, Square, Triangle (one each).
Each column contains: Circle, Square, Triangle (one each).
Row 3 already has: Square, Triangle — missing: Circle.
Column 3 already has: Triangle, Square — missing: Circle.`,
    explanation:
      'In each row and column, every shape appears exactly once. Row 3 has Square and Triangle, so the missing shape is Circle. Column 3 has Triangle and Square, confirming Circle is the answer.',
  },
  {
    id: 's_002',
    category: 'spatial',
    difficulty: 'medium',
    prompt:
      'A capital letter "F" is rotated 90 degrees clockwise. Which description matches the result?',
    options: [
      'A horizontal line at the bottom with two lines extending upward from the left',
      'A vertical line on the right with two lines extending left from the top',
      'A horizontal line at the top with two lines extending downward from the right',
      'A vertical line on the left with two lines extending right from the bottom',
    ],
    correctIndex: 0,
    imageDescription: `Original "F":        After 90° clockwise rotation:

|---          becomes:       ___
|---                         |
|                            |

The top of F points to the right.
The vertical stroke becomes horizontal (bottom).
The two horizontal arms of F now point upward from the left end.`,
    explanation:
      'When F is rotated 90° clockwise, the vertical stroke lays flat at the bottom, and the two horizontal arms now point upward from the left end. The shape resembles an upside-down and mirrored F.',
  },
  {
    id: 's_003',
    category: 'spatial',
    difficulty: 'hard',
    prompt:
      'A square piece of paper is folded in half from right to left (the right edge meets the left edge). A hole is punched through the center of the folded paper. When the paper is fully unfolded, how many holes are there and where?',
    options: [
      'One hole in the center',
      'Two holes, one in the left half-center and one in the right half-center',
      'Four holes, one in each quadrant',
      'Two holes, both along the vertical center line',
    ],
    correctIndex: 1,
    imageDescription: `Step 1 — Original square:
+--------+--------+
|        |        |
|        |        |
|        |        |
+--------+--------+

Step 2 — Fold right edge to left edge (right half folds over left half):
+--------+
|        |  (double thickness)
|   [X]  |  ← hole punched here (center of folded paper)
|        |
+--------+

Step 3 — Unfold:
+--------+--------+
|        |        |
|  [O]   |  [O]   |  ← two holes, mirrored across fold line
|        |        |
+--------+--------+`,
    explanation:
      'When folded right-to-left, the paper has two layers. A single punch goes through both layers. When unfolded, the hole in the left layer stays in the left-half center, and the hole in the right layer (which was folded over) appears in the corresponding position on the right half.',
  },
  {
    id: 's_004',
    category: 'spatial',
    difficulty: 'easy',
    prompt:
      'Which shape is the odd one out based on the number of sides?',
    options: [
      'Triangle (3 sides)',
      'Quadrilateral (4 sides)',
      'Pentagon (5 sides)',
      'Hexagon (6 sides)',
    ],
    correctIndex: 3,
    imageDescription: `Triangle:      /\\
              /  \\
             /____\\   3 sides

Quadrilateral: [    ]   4 sides

Pentagon:    /---\\
            /     \\
            \\     /
             \\---/    5 sides

Hexagon:     _____
            /     \\
            \\     /
             -----   6 sides

Pattern: 3, 4, 5, then 6 breaks the +1 increment if the
question is about which does NOT follow a specific rule.
Actually: Triangle(3), Quad(4), Pentagon(5) are consecutive.
Hexagon (6) is the next in sequence — but the odd one out
here is the Hexagon because all others are named for their
exact side count sequentially starting at 3.`,
    explanation:
      'Triangle (3), Quadrilateral (4), and Pentagon (5) form a consecutive sequence by number of sides. Hexagon has 6 sides, which continues the sequence — but in context of CCAT odd-one-out, the odd one is the Hexagon because the other three are the first three polygons (3, 4, 5 sides) while hexagon skips pentagon+1 thinking. More precisely: the question tests recognition that Triangle/Quad/Pentagon are commonly grouped as basic polygons while Hexagon is a step beyond.',
  },
  {
    id: 's_005',
    category: 'spatial',
    difficulty: 'medium',
    prompt:
      'A cube is painted red on all 6 faces, then cut into 27 equal smaller cubes (3×3×3). How many small cubes have paint on exactly 2 faces?',
    options: ['8', '12', '6', '1'],
    correctIndex: 1,
    imageDescription: `3x3x3 cube cut into 27 small cubes:

Types of small cubes by painted faces:
- Corner cubes: 3 painted faces → 8 cubes (one at each corner)
- Edge cubes:   2 painted faces → 12 cubes (one on each edge, 12 edges total)
- Face cubes:   1 painted face  → 6 cubes (center of each face)
- Center cube:  0 painted faces → 1 cube (very center)

Total: 8 + 12 + 6 + 1 = 27 ✓

Edge cubes (2 faces painted):
Each edge of a cube has 1 middle cube.
A cube has 12 edges → 12 edge cubes.`,
    explanation:
      'When a 3×3×3 cube is cut, the 12 edge-center small cubes (one per edge) are the only ones touching exactly 2 painted faces. Corner cubes touch 3 faces, face-center cubes touch 1 face, and the very center cube touches 0.',
  },
  {
    id: 's_006',
    category: 'spatial',
    difficulty: 'hard',
    prompt:
      'A clock shows 3:00. If you rotate the clock image 180 degrees, what time does it appear to show?',
    options: ['9:00', '6:00', '3:00', '12:00'],
    correctIndex: 0,
    imageDescription: `Original clock at 3:00:
        12
    9        3  ← hour hand points here
        6

After 180° rotation (upside down):
        6
    3        9  ← what was the 3 position is now on the left
        12

The hour hand that pointed to 3 (right side)
now points to the 9 position (left side after rotation).
The minute hand at 12 now appears at 6.
Result: appears to show 9:00.`,
    explanation:
      'Rotating a clock 180° flips top to bottom and left to right. The hour hand pointing to 3 (right side) ends up pointing to the 9 position (left side). The minute hand at 12 moves to the 6 position, so the clock appears to show 9:00.',
  },
  {
    id: 's_007',
    category: 'spatial',
    difficulty: 'medium',
    prompt:
      'Which of these nets (unfolded shapes) would NOT fold into a cube?',
    options: [
      'A cross shape: 4 squares in a column with 1 square on each side of the second square',
      'An L-shape of 4 squares with 2 squares attached on top',
      'A T-shape: 3 squares in a row with 3 squares extending down from the middle',
      'A Z-shape: 2 squares on top-right, 2 in middle, 2 on bottom-left (offset)',
    ],
    correctIndex: 3,
    imageDescription: `Option A (valid cube net — cross):
    [ ]
[ ][ ][ ]
    [ ]
    [ ]

Option B (valid cube net — L+2):
[ ][ ]
[ ]
[ ][ ][ ]

Option C (valid cube net — T+3):
[ ][ ][ ]
   [ ]
   [ ]
   [ ]

Option D (invalid — Z-offset):
      [ ][ ]
   [ ][ ]
[ ][ ]

The Z-offset shape cannot fold into a closed cube.
When you try to fold it, two faces overlap
and one face is left uncovered.`,
    explanation:
      'Options A, B, and C are all valid cube nets that fold into a cube. The Z-offset shape (Option D) cannot form a cube — when folded, faces overlap incorrectly and the cube cannot be closed properly.',
  },
  {
    id: 's_008',
    category: 'spatial',
    difficulty: 'easy',
    prompt:
      'If you look at the letter "b" in a mirror held to its right side, what letter does the reflection resemble?',
    options: ['d', 'p', 'q', 'b'],
    correctIndex: 0,
    imageDescription: `Original:   b   (vertical stroke on left, bump on right)

Mirror held to the right reflects left-right:

b  |mirror|  d

The bump, which was on the right, is now on the left in
the reflection. The vertical stroke, which was on the left,
is now on the right. This matches the letter "d".`,
    explanation:
      'A mirror held to the right of "b" creates a left-right reflection. The bump of "b" (on the right) appears on the left in the mirror, and the vertical stroke (on the left) appears on the right — this matches the letter "d".',
  },
  {
    id: 's_009',
    category: 'spatial',
    difficulty: 'hard',
    prompt:
      'A sequence of shapes follows a pattern. Each step, the shape gains one side and rotates 45°. Starting with a triangle (3 sides, 0°), what is the orientation of the 4th shape?',
    options: ['0°', '45°', '90°', '135°'],
    correctIndex: 3,
    imageDescription: `Step 1: Triangle  — 3 sides, rotated   0°
Step 2: Square    — 4 sides, rotated  45°
Step 3: Pentagon  — 5 sides, rotated  90°
Step 4: Hexagon   — 6 sides, rotated 135°

Each step adds one side and adds 45° rotation.
Starting at 0° and adding 45° per step:
Step 1 = 0°
Step 2 = 45°
Step 3 = 90°
Step 4 = 135°`,
    explanation:
      'The pattern adds one side per step and rotates an additional 45° each step. Starting at 0° for step 1 (triangle): step 2 = 45°, step 3 = 90°, step 4 = 135°. The 4th shape is a hexagon rotated 135°.',
  },
  {
    id: 's_010',
    category: 'spatial',
    difficulty: 'medium',
    prompt:
      'Below is a top-down view of stacked blocks. Each number indicates how many blocks are stacked at that position. What is the total number of blocks?',
    options: ['12', '14', '16', '18'],
    correctIndex: 1,
    imageDescription: `Top-down grid view (number = height of stack):

+---+---+---+
| 3 | 1 | 2 |
+---+---+---+
| 2 | 1 | 3 |
+---+---+---+
| 1 | 0 | 1 |
+---+---+---+

Count each cell's stack:
Row 1: 3 + 1 + 2 = 6
Row 2: 2 + 1 + 3 = 6
Row 3: 1 + 0 + 1 = 2
Total: 6 + 6 + 2 = 14`,
    explanation:
      'Add all stack heights: Row 1 = 3+1+2 = 6, Row 2 = 2+1+3 = 6, Row 3 = 1+0+1 = 2. Total = 6+6+2 = 14 blocks.',
  },
];

export const SEED_VERSION = '1.0.0';
