const input = document.getElementById('input');
const output = document.getElementById('output');
const inputMode = document.getElementById('inputMode');
const themeToggle = document.querySelector('.theme-toggle');

function convert() {
    const mode = inputMode.value;
    const text = input.value.trim();

    if (!text) {
        output.value = "Please enter some input!";
        return;
    }

    try {
        switch(mode) {
            case 'ascii':
                output.value = asciiToText(text);
                break;
            case 'text':
                output.value = textToAscii(text);
                break;
            case 'binary':
                output.value = binaryToText(text);
                break;
            case 'textBinary':
                output.value = textToBinary(text);
                break;
            default:
                output.value = "Invalid conversion mode";
        }
    } catch (error) {
        output.value = "Error: Invalid input format";
    }
}

function asciiToText(ascii) {
    return ascii.split(' ')
        .map(num => {
            const value = parseInt(num);
            if (isNaN(value)) throw new Error("Invalid ASCII value");
            return String.fromCharCode(value);
        })
        .join('');
}

function textToAscii(text) {
    return text.split('')
        .map(char => char.charCodeAt(0))
        .join(' ');
}

function binaryToText(binary) {
    return binary.split(' ')
        .map(bin => {
            const value = parseInt(bin, 2);
            if (isNaN(value)) throw new Error("Invalid binary value");
            return String.fromCharCode(value);
        })
        .join('');
}

function textToBinary(text) {
    return text.split('')
        .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join(' ');
}

function clearInput() {
    input.value = '';
    output.value = '';
    input.focus();
}

function copyOutput() {
    if (!output.value) {
        alert('Nothing to copy!');
        return;
    }
    output.select();
    try {
        document.execCommand('copy');
        alert('Output copied to clipboard!');
    } catch (err) {
        alert('Failed to copy output');
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
}

function swapContent() {
    const temp = input.value;
    input.value = output.value;
    output.value = temp;
    convert();
}

input.addEventListener('input', convert);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        convert();
    }
});

if (input.value) convert();