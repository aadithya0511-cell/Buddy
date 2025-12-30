// ==================== DATA ====================
const STORAGE_KEY = 'buddy_progress';

const lessons = [
    {
        id: 'lesson1',
        title: 'Variables',
        description: 'Learn how to store and use data in Python',
        icon: '📦',
        topics: ['What are variables?', 'Naming rules', 'Assigning values'],
        learnedSummary: 'Variables store data using the pattern <code>name = value</code>',
        activities: [
            { type: 'teach', data: { title: 'What is a Variable?', whatIs: "A variable is like a labeled box where you store information. Just like you might have a box labeled 'toys' to keep your toys organized, in programming we give our data names so we can find and use it later.", whyUse: "We use variables to remember things! Imagine playing a game — you need to remember the player's score, their name, how many lives they have. Variables let your program remember all of this.", whereUsed: ["Storing a player's score in a game", "Remembering someone's name after they type it", "Keeping track of how many items are in a shopping cart", "Saving the result of a calculation"], example: { code: 'name = "Buddy"\nprint(name)', explanation: "Here we created a variable called 'name' and stored the text 'Buddy' inside it. The = sign is how we put something into a variable. Then we use print() to show what's inside!" } } },
            { type: 'build', data: { instruction: "Let's create your first variable! Store the number 10 in a variable called 'x'.", context: "We want to remember the number 10 for later use.", codeTemplate: ['__BLANK__', '__BLANK__', '__BLANK__'], options: ['x', '=', '10', 'let', ':'], correctOrder: ['x', '=', '10'], hint: "In Python, we write the variable name first, then = (equals), then the value. Think: name = value", explanation: "Perfect! In Python, creating a variable is simple: write the name, then =, then the value. No special keywords needed!" } },
            { type: 'fix', data: { instruction: "This code has a problem. Can you spot which version fixes it?", brokenCode: '1score = 100', errorType: "Invalid variable name", options: [{ code: 'score1 = 100', isCorrect: true }, { code: '1_score = 100', isCorrect: false }, { code: '_1score = 100', isCorrect: false }], hint: "Variable names can contain numbers, but they can't START with a number.", explanation: "Variable names can't start with a number! 'score1' works because the number is at the end." } },
            { type: 'output', data: { instruction: "Let's trace through this code. What will it print?", code: "x = 5\nx = 10\nprint(x)", options: [{ text: '5', isCorrect: false }, { text: '10', isCorrect: true }, { text: '15', isCorrect: false }], walkthrough: ["Line 1: We store 5 in variable x → x is now 5", "Line 2: We store 10 in x → x is now 10 (replaced!)", "Line 3: We print x → It shows 10"], hint: "When you assign a new value to a variable, it REPLACES the old value.", explanation: "When you put a new value in a variable, the old value is replaced! This is called 'reassignment'." } }
        ]
    },
    {
        id: 'lesson2',
        title: 'Data Types',
        description: 'Explore numbers, text, and other data types',
        icon: '🔢',
        topics: ['Integers', 'Strings', 'Floats', 'Booleans'],
        learnedSummary: 'int (whole numbers), float (decimals), str (text), bool (True/False)',
        activities: [
            { type: 'teach', data: { title: 'What are Data Types?', whatIs: "In Python, every piece of information has a 'type'. Think of it like different containers — some are meant for numbers, others for text, and some for yes/no answers.", whyUse: "Different types let you do different things! You can add numbers together, but you can't add a word to a number. Data types help Python understand how to work with your information.", whereUsed: ["Numbers (int, float) → calculating prices, scores, ages", "Text (str) → storing names, messages, user input", "True/False (bool) → checking if someone is logged in", "Lists → storing multiple items like a shopping list"], example: { code: 'age = 25        # integer\nname = "Alex"   # string\nprice = 19.99   # float', explanation: "Python automatically knows 25 is a whole number (integer), 'Alex' is text (string), and 19.99 is a decimal number (float)." } } },
            { type: 'build', data: { instruction: "Create a string variable! Store the text 'Hello' in a variable called 'greeting'.", context: "Strings are text — they always need quotes around them.", codeTemplate: ['greeting', '__BLANK__', '__BLANK__'], options: ['=', '"Hello"', 'Hello', '=='], correctOrder: ['=', '"Hello"'], hint: "Text (strings) must be wrapped in quotes. Without quotes, Python thinks it's a variable name!", explanation: "Strings always need quotes! You can use double quotes or single quotes — both work." } },
            { type: 'output', data: { instruction: "What type is 19.99?", code: "price = 19.99\nprint(type(price).__name__)", options: [{ text: 'int', isCorrect: false }, { text: 'float', isCorrect: true }, { text: 'str', isCorrect: false }], walkthrough: ["Line 1: We store 19.99 in 'price'", "19.99 has a decimal point", "Numbers with decimals are 'float' type"], hint: "Numbers with decimal points are called 'floats'.", explanation: "19.99 is a float because it has a decimal point! If it was just 19, it would be an integer." } },
            { type: 'build', data: { instruction: "Create a boolean variable called 'is_sunny' set to True.", context: "Booleans represent yes/no values — only True or False.", codeTemplate: ['is_sunny', '__BLANK__', '__BLANK__'], options: ['=', 'True', 'true', '"True"'], correctOrder: ['=', 'True'], hint: "In Python, True and False must be capitalized!", explanation: "Booleans in Python are capitalized: True and False (not true/false)." } }
        ]
    },
    {
        id: 'lesson3',
        title: 'Conditions',
        description: 'Make your code smart with if/else statements',
        icon: '🔀',
        topics: ['if statements', 'else clauses', 'elif chains', 'Comparison operators'],
        learnedSummary: 'Use if/elif/else to make decisions. Use == to compare, = to assign.',
        activities: [
            { type: 'teach', data: { title: 'What are Conditions?', whatIs: "Conditions let your code make decisions! Just like you decide 'if it's raining, I'll take an umbrella', Python can choose what to do based on whether something is true or false.", whyUse: "Without conditions, your code would do the exact same thing every time. Conditions make programs smart — they can respond differently based on user input or situations.", whereUsed: ["Checking if a password is correct", "Showing different messages based on score", "Validating if a user is old enough", "Deciding if a game character wins or loses"], example: { code: 'age = 18\nif age >= 18:\n    print("You can vote!")\nelse:\n    print("Too young")', explanation: "We check IF age is 18 or more. If true, print one message. ELSE (otherwise), print a different message." } } },
            { type: 'build', data: { instruction: "Write a condition to check if age is 18 or older.", context: "We want to check if age is greater than OR equal to 18.", codeTemplate: ['__BLANK__', 'age', '__BLANK__', '18:'], options: ['if', '>=', '>', '=', '=='], correctOrder: ['if', '>='], hint: "Use 'if' to start, and >= means 'greater than or equal to'.", explanation: "We use 'if' to start a condition and >= to check 'greater than or equal to'." } },
            { type: 'output', data: { instruction: "What will this code print?", code: "score = 85\nif score >= 90:\n    print(\"A\")\nelif score >= 80:\n    print(\"B\")\nelse:\n    print(\"C\")", options: [{ text: 'A', isCorrect: false }, { text: 'B', isCorrect: true }, { text: 'C', isCorrect: false }], walkthrough: ["score is 85", "Is 85 >= 90? No → skip 'A'", "Is 85 >= 80? Yes! → print 'B'"], hint: "Python checks conditions from top to bottom and stops at the first true one.", explanation: "85 is not >= 90, but it IS >= 80, so 'B' gets printed." } },
            { type: 'fix', data: { instruction: "This condition has a common mistake. Can you fix it?", brokenCode: 'if x = 5:', errorType: "Using = instead of ==", options: [{ code: 'if x == 5:', isCorrect: true }, { code: 'if x === 5:', isCorrect: false }, { code: 'if x := 5:', isCorrect: false }], hint: "Single = is for storing values. To CHECK equality, use ==", explanation: "= is for assignment (storing), == is for comparison (checking equality)." } }
        ]
    },
    {
        id: 'lesson4',
        title: 'Loops',
        description: 'Repeat actions efficiently with loops',
        icon: '🔁',
        topics: ['for loops', 'range()', 'while loops', 'Loop control'],
        learnedSummary: 'Use for loops to repeat code. range(n) gives you n numbers starting from 0.',
        isFinal: true,
        activities: [
            { type: 'teach', data: { title: 'What are Loops?', whatIs: "Loops let you repeat code multiple times without writing it over and over. Imagine printing 'Hello' 100 times — you wouldn't want to type it 100 times!", whyUse: "Loops save time and reduce mistakes. Instead of copying the same code, you write it once and tell Python how many times to repeat it.", whereUsed: ["Going through every item in a list", "Running a game until the player loses", "Sending an email to 1000 users", "Counting from 1 to 100"], example: { code: 'for i in range(3):\n    print("Hello!")', explanation: "This prints 'Hello!' three times. range(3) means 'do this 3 times'. The 'for' loop handles the counting automatically!" } } },
            { type: 'build', data: { instruction: "Write a for loop that runs 5 times.", context: "range(5) generates: 0, 1, 2, 3, 4 — that's 5 numbers!", codeTemplate: ['__BLANK__', 'i', '__BLANK__', 'range(', '__BLANK__', '):'], options: ['for', 'in', '5', 'while', '4'], correctOrder: ['for', 'in', '5'], hint: "The pattern is: for variable in range(number).", explanation: "range(5) generates 0,1,2,3,4 (stops BEFORE 5)." } },
            { type: 'output', data: { instruction: "What will this loop print?", code: "for i in range(3):\n    print(i * 2)", options: [{ text: '0 1 2', isCorrect: false }, { text: '0 2 4', isCorrect: true }, { text: '2 4 6', isCorrect: false }], walkthrough: ["i = 0 → print(0 * 2) → prints 0", "i = 1 → print(1 * 2) → prints 2", "i = 2 → print(2 * 2) → prints 4"], hint: "range(3) gives 0, 1, 2. Each number gets multiplied by 2.", explanation: "range(3) gives 0, 1, 2. Each is multiplied by 2, giving us 0, 2, 4!" } },
            { type: 'fix', data: { instruction: "This while loop runs forever! What's missing?", brokenCode: "count = 0\nwhile count < 3:\n    print(count)", errorType: "Infinite loop - count never changes", options: [{ code: 'count = count + 1  # add inside', isCorrect: true }, { code: 'count = 3  # add inside', isCorrect: false }, { code: 'break  # add inside', isCorrect: false }], hint: "The loop runs while count < 3. If count never increases, it stays 0 forever!", explanation: "We need count = count + 1 inside the loop so count eventually reaches 3 and stops!" } }
        ]
    }
];

const levels = [
    { name: 'Beginner', icon: '🌱', minXP: 0, maxXP: 50 },
    { name: 'Explorer', icon: '🔍', minXP: 50, maxXP: 200 },
    { name: 'Coder', icon: '💻', minXP: 200, maxXP: 500 },
    { name: 'Python Buddy', icon: '🐍', minXP: 500, maxXP: 1000 }
];

const encouragingMessages = [
    { icon: '🚀', text: "Let's get started! You're going to do great." },
    { icon: '💪', text: "You're making progress! Keep going!" },
    { icon: '🌟', text: "Halfway there! You're doing amazing!" },
    { icon: '🔥', text: "On fire! Almost done!" },
    { icon: '🎯', text: "Final stretch! You've got this!" },
    { icon: '🏆', text: "Last one! Finish strong!" }
];

// ==================== STATE ====================
let currentLesson = null;
let currentActivityIndex = 0;
let lessonScore = 0;
let selectedBlanks = [];
let selectedOption = null;
let hintVisible = false;
let answered = false;

// ==================== PROGRESS FUNCTIONS ====================
function getProgress() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
    } catch (e) { console.error(e); }
    return { totalXP: 0, lessonsCompleted: {}, currentStreak: 0, lastActivityDate: null };
}

function saveProgress(progress) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (e) { console.error(e); }
}

function getLevel(xp) {
    for (let i = levels.length - 1; i >= 0; i--) {
        if (xp >= levels[i].minXP) return levels[i];
    }
    return levels[0];
}

function completeLessonProgress(lessonId, score, total) {
    const progress = getProgress();
    const xpEarned = Math.round((score / total) * 50) + 10;
    progress.lessonsCompleted[lessonId] = { completed: true, score, totalQuestions: total, xpEarned };
    progress.totalXP += xpEarned;
    const today = new Date().toDateString();
    if (progress.lastActivityDate !== today) {
        const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
        progress.currentStreak = progress.lastActivityDate === yesterday.toDateString() ? progress.currentStreak + 1 : 1;
        progress.lastActivityDate = today;
    }
    saveProgress(progress);
    updateXPDisplay();
    return xpEarned;
}

function resetProgress() {
    saveProgress({ totalXP: 0, lessonsCompleted: {}, currentStreak: 0, lastActivityDate: null });
    updateXPDisplay();
}

// ==================== UI FUNCTIONS ====================
function updateXPDisplay() {
    const progress = getProgress();
    document.getElementById('totalXPDisplay').textContent = progress.totalXP + ' XP';
}

function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('active');
}

function showPage(pageName) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.getElementById('page-' + pageName).classList.add('active');
    document.querySelector(`.nav-link[data-page="${pageName}"]`)?.classList.add('active');
    window.scrollTo(0, 0);
    
    if (pageName === 'home') renderHomePage();
    else if (pageName === 'levels') renderLevelsPage();
    else if (pageName === 'progress') renderProgressPage();
}

function renderHomePage() {
    const progress = getProgress();
    const heroStats = document.getElementById('heroStats');
    if (progress.totalXP > 0) {
        const level = getLevel(progress.totalXP);
        const lessonsCount = Object.keys(progress.lessonsCompleted).length;
        heroStats.innerHTML = `
            <div class="stat-badge xp"><svg class="xp-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>${progress.totalXP} XP</div>
            <div class="stat-badge"><span>${level.icon}</span> ${level.name}</div>
            <div class="stat-badge primary"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>${lessonsCount} Lessons</div>
        `;
    } else {
        heroStats.innerHTML = '';
    }
}

function renderLevelsPage() {
    const progress = getProgress();
    const completedCount = Object.keys(progress.lessonsCompleted).length;
    document.getElementById('lessonsProgress').textContent = `${completedCount} / ${lessons.length} lessons`;
    document.getElementById('overallProgressFill').style.width = `${(completedCount / lessons.length) * 100}%`;
    
    const list = document.getElementById('lessonsList');
    list.innerHTML = lessons.map((lesson, index) => {
        const lessonProgress = progress.lessonsCompleted[lesson.id];
        const isCompleted = lessonProgress?.completed;
        const prevCompleted = index === 0 || progress.lessonsCompleted[lessons[index-1].id]?.completed;
        const status = isCompleted ? 'completed' : prevCompleted ? 'unlocked' : 'locked';
        
        return `
        <div class="lesson-card ${status}">
            <div class="lesson-number ${status}">
                ${status === 'completed' ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' : status === 'locked' ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' : index + 1}
            </div>
            <div class="lesson-content-wrapper">
                <div class="lesson-icon-wrapper ${status}">${lesson.icon}</div>
                <div class="lesson-details">
                    <div class="lesson-title-row">
                        <h3 class="lesson-title">${lesson.title}</h3>
                        ${isCompleted ? '<span class="completed-badge">Completed</span>' : ''}
                    </div>
                    <p class="lesson-description">${lesson.description}</p>
                    <div class="lesson-topics">${lesson.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}</div>
                    <div class="lesson-action">
                        ${status === 'locked' ? '<div class="locked-message"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Complete previous lesson to unlock</div>' : 
                          isCompleted ? `<div class="progress-container"><div class="progress-bar progress-bar-sm"><div class="progress-fill" style="width:${(lessonProgress.score/lessonProgress.totalQuestions)*100}%"></div></div></div><button class="btn btn-sm btn-secondary" onclick="startLesson('${lesson.id}')">Practice Again</button>` :
                          `<button class="btn btn-primary btn-glow" onclick="startLesson('${lesson.id}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>Start Lesson<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button>`}
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');
}

function renderProgressPage() {
    const progress = getProgress();
    const level = getLevel(progress.totalXP);
    const completedLessons = Object.entries(progress.lessonsCompleted);
    
    document.getElementById('statsGrid').innerHTML = `
        <div class="stat-card"><div class="stat-card-icon xp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg></div><p class="stat-card-value xp">${progress.totalXP}</p><p class="stat-card-label">Total XP</p></div>
        <div class="stat-card"><div class="stat-card-icon primary"><span style="font-size:1.5rem">${level.icon}</span></div><p class="stat-card-value">${level.name}</p><p class="stat-card-label">Current Level</p></div>
        <div class="stat-card"><div class="stat-card-icon success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></div><p class="stat-card-value success">${completedLessons.length}</p><p class="stat-card-label">Lessons Done</p></div>
        <div class="stat-card"><div class="stat-card-icon warning"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg></div><p class="stat-card-value warning">${progress.currentStreak}</p><p class="stat-card-label">Day Streak</p></div>
    `;
    
    const levelIndex = levels.findIndex(l => l.name === level.name);
    const xpInLevel = progress.totalXP - level.minXP;
    const xpForNext = level.maxXP - level.minXP;
    const nextLevel = levels[levelIndex + 1];
    
    document.getElementById('levelProgressCard').innerHTML = `
        <h2 class="card-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>Level Progress</h2>
        <div class="level-row">
            <div class="level-icon"><span>${level.icon}</span><p>${level.name}</p></div>
            <div class="progress-container"><div class="progress-bar progress-bar-lg"><div class="progress-fill" style="width:${(xpInLevel/xpForNext)*100}%"></div></div></div>
            ${nextLevel ? `<div class="level-icon faded"><span>${nextLevel.icon}</span><p>${nextLevel.name}</p></div>` : ''}
        </div>
        ${nextLevel ? `<p class="level-xp-text">${xpForNext - xpInLevel} XP to reach ${nextLevel.name}</p>` : ''}
    `;
    
    document.getElementById('allLevelsCard').innerHTML = `
        <h2 class="card-title">All Levels</h2>
        <div class="levels-grid">${levels.map(l => {
            const isCurrent = l.name === level.name;
            const isAchieved = progress.totalXP >= l.minXP;
            return `<div class="level-item ${isCurrent ? 'current' : isAchieved ? 'achieved' : 'locked'}"><span class="level-item-icon">${l.icon}</span><p class="level-item-name">${l.name}</p><p class="level-item-xp">${l.minXP}+ XP</p></div>`;
        }).join('')}</div>
    `;
    
    const lessonNames = { lesson1: 'Variables', lesson2: 'Data Types', lesson3: 'Conditions', lesson4: 'Loops' };
    document.getElementById('lessonHistoryCard').innerHTML = `
        <h2 class="card-title">Lesson History</h2>
        ${completedLessons.length === 0 ? '<p class="empty-history">No lessons completed yet. Start learning to see your progress here!</p>' :
        `<div class="history-list">${completedLessons.map(([id, data]) => `
            <div class="history-item">
                <div class="history-left">
                    <div class="history-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></div>
                    <div><p class="history-name">${lessonNames[id]}</p><p class="history-score">Score: ${data.score}/${data.totalQuestions}</p></div>
                </div>
                <div class="history-xp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>+${data.xpEarned} XP</div>
            </div>
        `).join('')}</div>`}
    `;
}

function handleResetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
        resetProgress();
        renderProgressPage();
    }
}

// ==================== LESSON FUNCTIONS ====================
function startLesson(lessonId) {
    currentLesson = lessons.find(l => l.id === lessonId);
    currentActivityIndex = 0;
    lessonScore = 0;
    renderLesson();
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-lesson').classList.add('active');
    window.scrollTo(0, 0);
}

function renderLesson() {
    const activity = currentLesson.activities[currentActivityIndex];
    const totalActivities = currentLesson.activities.length;
    
    document.getElementById('lessonHeader').innerHTML = `
        <div class="lesson-header-icon">${currentLesson.icon}</div>
        <div class="lesson-header-text">
            <h1>Lesson: ${currentLesson.title}</h1>
            <p>${currentLesson.description}</p>
        </div>
        <div style="flex:1"></div>
        <div style="min-width:120px">
            <div class="progress-bar progress-bar-sm"><div class="progress-fill" style="width:${(currentActivityIndex/totalActivities)*100}%"></div></div>
        </div>
    `;
    
    const msgIndex = Math.min(Math.floor((currentActivityIndex / totalActivities) * encouragingMessages.length), encouragingMessages.length - 1);
    const msg = encouragingMessages[msgIndex];
    document.getElementById('encouragingMessage').innerHTML = `<span class="encouraging-icon">${msg.icon}</span><span class="encouraging-text">${msg.text}</span>`;
    
    selectedBlanks = [];
    selectedOption = null;
    hintVisible = false;
    answered = false;
    
    if (activity.type === 'teach') renderTeachActivity(activity.data);
    else if (activity.type === 'build') renderBuildActivity(activity.data);
    else if (activity.type === 'fix') renderFixActivity(activity.data);
    else if (activity.type === 'output') renderOutputActivity(activity.data);
}

function renderTeachActivity(data) {
    document.getElementById('lessonContent').innerHTML = `
        <div class="activity-card">
            <h2 class="activity-title">${data.title}</h2>
            <div class="teaching-section">
                <div class="teaching-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>What is it?</div>
                <p class="teaching-content">${data.whatIs}</p>
            </div>
            <div class="teaching-section">
                <div class="teaching-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="12" r="10"/><path d="M12 17h.01"/></svg>Why use it?</div>
                <p class="teaching-content">${data.whyUse}</p>
            </div>
            <div class="teaching-section">
                <div class="teaching-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>Where is it used?</div>
                <ul class="where-used-list">${data.whereUsed.map(w => `<li>${w}</li>`).join('')}</ul>
            </div>
            <div class="example-box">
                <div class="example-label">Example</div>
                <div class="code-block"><code>${escapeHtml(data.example.code)}</code></div>
                <p class="code-explanation">${data.example.explanation}</p>
            </div>
            <button class="btn btn-primary btn-glow" style="width:100%;margin-top:1.5rem" onclick="nextActivity()">Got it! Continue →</button>
        </div>
    `;
}

function renderBuildActivity(data) {
    const blanksCount = data.codeTemplate.filter(t => t === '__BLANK__').length;
    document.getElementById('lessonContent').innerHTML = `
        <div class="activity-card">
            <h2 class="activity-title">${data.instruction}</h2>
            <p class="activity-subtitle">Click the options below to fill in the blanks</p>
            <div class="build-context">${data.context}</div>
            <div class="code-template" id="codeTemplate"></div>
            <button class="hint-toggle" onclick="toggleHint()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>Need a hint?</button>
            <div class="hint-box" id="hintBox"><div class="hint-label">💡 Hint</div><p>${data.hint}</p></div>
            <div class="options-grid" id="optionsGrid"></div>
            <button class="btn btn-primary" id="checkBtn" onclick="checkBuildAnswer()" style="width:100%" disabled>Check Answer</button>
            <div class="feedback-box" id="feedbackBox"></div>
        </div>
    `;
    renderBuildTemplate(data);
}

function renderBuildTemplate(data) {
    const template = document.getElementById('codeTemplate');
    const options = document.getElementById('optionsGrid');
    
    template.innerHTML = data.codeTemplate.map((part, i) => {
        if (part === '__BLANK__') {
            const blankIndex = data.codeTemplate.slice(0, i + 1).filter(p => p === '__BLANK__').length - 1;
            const filled = selectedBlanks[blankIndex];
            return `<span class="code-blank ${filled ? 'filled' : ''}" data-index="${blankIndex}" onclick="clearBlank(${blankIndex})">${filled || '?'}</span>`;
        }
        return `<span class="code-static">${part}</span>`;
    }).join('');
    
    options.innerHTML = data.options.map(opt => {
        const used = selectedBlanks.includes(opt);
        return `<button class="option-btn ${used ? 'used' : ''}" onclick="selectBuildOption('${escapeHtml(opt)}')" ${used ? 'disabled' : ''}>${escapeHtml(opt)}</button>`;
    }).join('');
    
    const blanksCount = data.codeTemplate.filter(t => t === '__BLANK__').length;
    document.getElementById('checkBtn').disabled = selectedBlanks.filter(Boolean).length !== blanksCount;
}

function selectBuildOption(opt) {
    if (answered) return;
    const blanksCount = currentLesson.activities[currentActivityIndex].data.codeTemplate.filter(t => t === '__BLANK__').length;
    const nextEmpty = selectedBlanks.findIndex((b, i) => !b && i < blanksCount);
    if (nextEmpty === -1 && selectedBlanks.length < blanksCount) {
        selectedBlanks.push(opt);
    } else if (nextEmpty !== -1) {
        selectedBlanks[nextEmpty] = opt;
    } else {
        return;
    }
    renderBuildTemplate(currentLesson.activities[currentActivityIndex].data);
}

function clearBlank(index) {
    if (answered) return;
    selectedBlanks[index] = null;
    renderBuildTemplate(currentLesson.activities[currentActivityIndex].data);
}

function checkBuildAnswer() {
    if (answered) return;
    answered = true;
    const data = currentLesson.activities[currentActivityIndex].data;
    const isCorrect = JSON.stringify(selectedBlanks) === JSON.stringify(data.correctOrder);
    if (isCorrect) lessonScore++;
    showFeedback(isCorrect, data.explanation);
    
    document.querySelectorAll('.code-blank').forEach((el, i) => {
        el.classList.add(selectedBlanks[i] === data.correctOrder[i] ? 'correct' : 'incorrect');
    });
}

function renderFixActivity(data) {
    document.getElementById('lessonContent').innerHTML = `
        <div class="activity-card">
            <h2 class="activity-title">${data.instruction}</h2>
            <p class="activity-subtitle">Select the correct fix below</p>
            <div class="error-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>${data.errorType}</div>
            <div class="code-block"><code>${escapeHtml(data.brokenCode)}</code></div>
            <button class="hint-toggle" onclick="toggleHint()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>Need a hint?</button>
            <div class="hint-box" id="hintBox"><div class="hint-label">💡 Hint</div><p>${data.hint}</p></div>
            <div class="fix-options" id="fixOptions">${data.options.map((opt, i) => `
                <div class="fix-option" data-index="${i}" onclick="selectFixOption(${i})">
                    <div class="fix-radio"></div>
                    <code class="fix-code">${escapeHtml(opt.code)}</code>
                </div>
            `).join('')}</div>
            <button class="btn btn-primary" id="checkBtn" onclick="checkFixAnswer()" style="width:100%" disabled>Check Answer</button>
            <div class="feedback-box" id="feedbackBox"></div>
        </div>
    `;
}

function selectFixOption(index) {
    if (answered) return;
    selectedOption = index;
    document.querySelectorAll('.fix-option').forEach((el, i) => {
        el.classList.toggle('selected', i === index);
    });
    document.getElementById('checkBtn').disabled = false;
}

function checkFixAnswer() {
    if (answered || selectedOption === null) return;
    answered = true;
    const data = currentLesson.activities[currentActivityIndex].data;
    const isCorrect = data.options[selectedOption].isCorrect;
    if (isCorrect) lessonScore++;
    showFeedback(isCorrect, data.explanation);
    
    document.querySelectorAll('.fix-option').forEach((el, i) => {
        if (data.options[i].isCorrect) el.classList.add('correct');
        else if (i === selectedOption) el.classList.add('incorrect');
    });
}

function renderOutputActivity(data) {
    document.getElementById('lessonContent').innerHTML = `
        <div class="activity-card">
            <h2 class="activity-title">${data.instruction}</h2>
            <p class="activity-subtitle">Trace through the code and predict the output</p>
            <div class="code-block"><code>${escapeHtml(data.code)}</code></div>
            <div class="walkthrough-box">
                <div class="walkthrough-title">Let's trace through it:</div>
                <ul class="walkthrough-list">${data.walkthrough.map((step, i) => `<li><span class="walkthrough-step">${i + 1}</span>${step}</li>`).join('')}</ul>
            </div>
            <button class="hint-toggle" onclick="toggleHint()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>Need a hint?</button>
            <div class="hint-box" id="hintBox"><div class="hint-label">💡 Hint</div><p>${data.hint}</p></div>
            <div class="output-options" id="outputOptions">${data.options.map((opt, i) => `
                <div class="output-option" data-index="${i}" onclick="selectOutputOption(${i})">${escapeHtml(opt.text)}</div>
            `).join('')}</div>
            <button class="btn btn-primary" id="checkBtn" onclick="checkOutputAnswer()" style="width:100%" disabled>Check Answer</button>
            <div class="feedback-box" id="feedbackBox"></div>
        </div>
    `;
}

function selectOutputOption(index) {
    if (answered) return;
    selectedOption = index;
    document.querySelectorAll('.output-option').forEach((el, i) => {
        el.classList.toggle('selected', i === index);
    });
    document.getElementById('checkBtn').disabled = false;
}

function checkOutputAnswer() {
    if (answered || selectedOption === null) return;
    answered = true;
    const data = currentLesson.activities[currentActivityIndex].data;
    const isCorrect = data.options[selectedOption].isCorrect;
    if (isCorrect) lessonScore++;
    showFeedback(isCorrect, data.explanation);
    
    document.querySelectorAll('.output-option').forEach((el, i) => {
        if (data.options[i].isCorrect) el.classList.add('correct');
        else if (i === selectedOption) el.classList.add('incorrect');
    });
}

function toggleHint() {
    hintVisible = !hintVisible;
    document.getElementById('hintBox').classList.toggle('visible', hintVisible);
}

function showFeedback(isCorrect, explanation) {
    const fb = document.getElementById('feedbackBox');
    fb.className = `feedback-box visible ${isCorrect ? 'correct' : 'incorrect'}`;
    fb.innerHTML = `
        <div class="feedback-header">
            ${isCorrect ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Correct!' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>Not quite...'}
        </div>
        <p class="feedback-text">${explanation}</p>
        <button class="btn ${isCorrect ? 'btn-success' : 'btn-primary'}" onclick="nextActivity()" style="width:100%;margin-top:1rem">Continue →</button>
    `;
}

function nextActivity() {
    currentActivityIndex++;
    if (currentActivityIndex >= currentLesson.activities.length) {
        completeLesson();
    } else {
        renderLesson();
    }
}

function completeLesson() {
    const totalQuestions = currentLesson.activities.filter(a => a.type !== 'teach').length;
    const xpEarned = completeLessonProgress(currentLesson.id, lessonScore, totalQuestions);
    
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-lesson-complete').classList.add('active');
    
    document.getElementById('completionMessage').textContent = currentLesson.isFinal ? "Congratulations! You've mastered the fundamentals of Python!" : `You now understand ${currentLesson.title.toLowerCase()}!`;
    document.getElementById('completionScore').textContent = `${lessonScore}/${totalQuestions}`;
    document.getElementById('completionXP').textContent = `+${xpEarned}`;
    document.getElementById('completionLearned').innerHTML = `<strong>What you learned:</strong> ${currentLesson.learnedSummary}`;
    
    const lessonIndex = lessons.findIndex(l => l.id === currentLesson.id);
    const nextLesson = lessons[lessonIndex + 1];
    
    if (currentLesson.isFinal) {
        document.querySelector('.completion-icon').className = 'completion-icon trophy-icon';
        document.querySelector('.completion-icon').innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>';
        document.getElementById('completionLearned').innerHTML = `<div class="final-celebration"><div class="final-celebration-icon"><img src="logo.png" alt="Buddy" style="width:80px;height:80px;border-radius:16px"></div><h3>You're a Python Buddy now!</h3><p>Keep practicing to strengthen your skills!</p></div>`;
    }
    
    document.getElementById('completionButtons').innerHTML = `
        <button class="btn btn-secondary" onclick="showPage('levels')">${currentLesson.isFinal ? 'Review Lessons' : 'Back to Lessons'}</button>
        ${nextLesson ? `<button class="btn btn-primary btn-glow" onclick="startLesson('${nextLesson.id}')">Next Lesson →</button>` : `<button class="btn btn-primary btn-glow" onclick="showPage('progress')">View Your Stats</button>`}
    `;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    updateXPDisplay();
    renderHomePage();
});
