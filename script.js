// Select the dark mode toggle button and body element
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for dark mode preference in local storage
let darkMode = localStorage.getItem('darkMode');
console.log("Initial dark mode state:", darkMode);

// If dark mode was previously enabled, apply it
if (darkMode === 'enabled') {
    body.classList.add('dark-mode');
}

// Function to enable dark mode
function enableDarkMode() {
    console.log("Enabling dark mode");
    body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
}

// Function to disable dark mode
function disableDarkMode() {
    console.log("Disabling dark mode");
    body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
}

// Event listener for the dark mode toggle button
darkModeToggle.addEventListener('click', () => {
    console.log("Dark mode button clicked");
    darkMode = localStorage.getItem('darkMode');

    if (darkMode !== 'enabled') {
        enableDarkMode(); // Enable dark mode if it's not already enabled
    } else {
        disableDarkMode(); // Disable dark mode if it's enabled
    }
});

// Table Click Event - Toggle 'completed' state
const table = document.getElementById('taskTable');

// Initialize table entries from local storage
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || {};

document.querySelectorAll('#taskTable tr').forEach((row, index) => {
    if (savedTasks[index] === 'completed') {
        setRowCompleted(row);
    }
    row.addEventListener('click', () => toggleTaskCompletion(row, index));
});

// Function to toggle task completion
function toggleTaskCompletion(row, index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    if (tasks[index] !== 'completed') {
        setRowCompleted(row);
        tasks[index] = 'completed';
    } else {
        resetRow(row);
        delete tasks[index];
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Set row to 'completed' state
function setRowCompleted(row) {
    row.style.opacity = '0.5';
    row.style.backgroundColor = 'green'; // Change this to your preferred color
}

// Reset row state
function resetRow(row) {
    row.style.opacity = '1';
    row.style.backgroundColor = ''; // Reset to original
}

let currentTable = 0;
const tables = document.querySelectorAll('.taskTable');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const contentsLinks = document.querySelectorAll('#contents a');

// Get the subtitle element
const pageSubtitle = document.getElementById('pageSubtitle');

// Pages or sections with corresponding subtitles
const pageSubtitles = {
    0: 'Part 1',  // Subtitle for the first page
    1: 'Part 2',        // Subtitle for the second page
    2: 'Part 3',        // Subtitle for the third page
    3: 'Part 4',
    4: 'Part 5',
    5: 'Part 6',
    6: 'Dailies',
    7: 'Weeklies',
    8: 'Monthlies'
};

// Function to update the subtitle based on the current page
function updateSubtitle(index) {
    pageSubtitle.textContent = pageSubtitles[index] || 'Welcome'; // Fallback subtitle
}

// Modify the showTable function to also update the subtitle
function showTable(index) {
    tables.forEach((table, i) => {
        table.style.display = i === index ? 'table' : 'none';
    });
    updateSubtitle(index);  // Update subtitle when showing a new table
}

// Initially display the first table and set the subtitle
showTable(currentTable);


// Function to highlight clicked table row
function toggleHighlight(event) {
    const row = event.target.closest('tr'); // Get the closest row (tr) to the clicked element
    if (row) {
        row.classList.toggle('completed');
    }
}

// Add click event listener for highlighting
tables.forEach(table => {
    table.addEventListener('click', toggleHighlight);
});

// Navigation button functionalities
prevButton.addEventListener('click', () => {
    if (currentTable > 0) {
        currentTable--;
        showTable(currentTable);
    }
});

nextButton.addEventListener('click', () => {
    if (currentTable < tables.length - 1) {
        currentTable++;
        showTable(currentTable);
    }
});

// Add click events for sidebar navigation
contentsLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        currentTable = parseInt(link.getAttribute('data-table'));
        showTable(currentTable);
    });
});

// Initially display the first table
showTable(currentTable);
