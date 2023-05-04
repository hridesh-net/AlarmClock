// Get DOM elements
const clockFace = document.getElementById('clock-face');
const hourInput = document.getElementById('hour-input');
const minuteInput = document.getElementById('minute-input');
const secondInput = document.getElementById('second-input');
const ampmSelect = document.getElementById('ampm-select');
const setAlarmBtn = document.getElementById('set-alarm-btn');
const alarmsList = document.getElementById('alarms-ul');

// Initialize alarms array
let alarms = [];

// Set up clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = now.getHours() < 12 ? 'AM' : 'PM';
    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    clockFace.textContent = timeString;
}

// Set up alarm
function setAlarm() {
    const hour = parseInt(hourInput.value);
    const minute = parseInt(minuteInput.value);
    const second = parseInt(secondInput.value);
    const ampm = ampmSelect.value;
    const now = new Date();
    const alarm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second);
    if (ampm === 'PM' && hour !== 12) {
        alarm.setHours(alarm.getHours() + 12);
    }
    const alarmString = alarm.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    const listItem = document.createElement('li');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    // Add click event listener to delete button
    deleteBtn.addEventListener('click', () => {
        // Remove alarm from alarms array
        alarms = alarms.filter(a => a !== alarm);
        // Remove list item from alarms list
        listItem.remove();
    });
    // Add alarm string to list item
    listItem.textContent = alarmString;
    // Add delete button to list item
    listItem.appendChild(deleteBtn);
    // Add list item to alarms list
    alarmsList.appendChild(listItem);
    // Add alarm to alarms array
    alarms.push(alarm);
}

// Check alarms
function checkAlarms() {
    const now = new Date();
    // Loop through all alarms in alarms array
    alarms.forEach((alarm, index) => {
        // Check if current time is greater than or equal to alarm time
        if (now >= alarm) {
            // Remove alarm from alarms array
            alarms.splice(index, 1);
            // Remove list item from alarms list
            alarmsList.children[index].remove();
            // Log "Alarm!" to console
            console.log('Alarm!');
            // Display alert with message "Alarm!"
            alert('Alarm!');
        }
    });
}

// Update clock every second
setInterval(() => {
    updateClock();
    checkAlarms();
}, 1000);

// Add click event listener to set alarm button
setAlarmBtn.addEventListener('click', setAlarm);
