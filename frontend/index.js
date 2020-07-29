let counter = 0;
const FILES = document.getElementById('files');
const FILES_LIST = document.getElementById('added-files');
const CODE_INPUT = document.querySelector('input[value="Paste code"]');
const OUTPUT = document.querySelector('.output');

const wss = new WebSocket('ws://localhost:8000');
wss.onmessage = showResult;

const multiAppend = (parent, ...children) => children.forEach(child => parent.append(child));

function createNode(tag, className, inside, ...events) {
    const node = document.createElement(tag);

    if (className) node.className = className;

    if (inside) node.innerHTML = inside;

    for (let i = 0; i < events.length; i += 2) {
        const eventName = events[i];
        const eventFn = events[i + 1];
        node.addEventListener(eventName, eventFn);
    }

    return node;
}

function createFileInput() {
    const id = counter.toString();
    const FILEHTML = `
    <div class= form-group">
        <input data-file-id="${id}" type="file" name="file" id="file" class="input-file">
        <label for="file" class="btn btn-tertiary">
            <span class="upload">Upload file</span>
        </label>
    </div>
    `;

    FILES.insertAdjacentHTML('afterbegin', FILEHTML);
    document.querySelector(`input[data-file-id="${id}"]`).addEventListener('change', addFile);
    counter++;
};

function addFile() {
    const fileName = this.files[0].name;
    const parent = this.parentNode;

    this.id = fileName;
    parent.style.display = 'none';

    const file = createNode('li', 'file');

    multiAppend(
        file,
        createNode('span', 'file-name', fileName),
        createNode('span', 'remove-btn', '\t&#10008;', 'click', function() {
            this.parentNode.remove();
            parent.remove();
        })
    );

    FILES_LIST.append(file);

    createFileInput();
}

async function handelFile(input) {
    const file = input.files[0];

    if (file) {
        const partsOfName = file.name.split('.');
        const ext = partsOfName[partsOfName.length - 1];
        const code = await file.text();
        sendFile(file.name, ext, code);
    }
}

function handler(event) {
    event.preventDefault();

    sendFiles();

    FILES.innerHTML = '';
    FILES_LIST.innerHTML = '';

    createFileInput();
}

function sendFiles() {
    const files = document.querySelectorAll('.input-file');
    const input = CODE_INPUT.value;

    //in files will be at least one elem all times
    if (input === '' && !files[1]) {
        alert('Please upload file or paste your code');
        return;
    }

    if (files) {
        files.forEach(handelFile);
        const outputTitle = createNode('h3', null, 'Output Files:');
        OUTPUT.append(outputTitle);
    }
}

function sendFile(name, ext, code) {
    const data = {
        name,
        ext,
        code
    }

    wss.send(JSON.stringify(data));
}

function showResult(message) {
    // const result = JSON.parse(message.data);
    const result = message.data;
    console.log(result);
}

createFileInput();
document.querySelector('.send').addEventListener('click', handler);
