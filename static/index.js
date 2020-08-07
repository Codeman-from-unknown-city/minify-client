(function main() {
    const FILES = document.getElementById('files');
    const FILES_LIST = document.getElementById('added-files');
    const CODE_INPUT = document.querySelector('input[placeholder="Paste code"]');
    const OUTPUT = document.querySelector('.output');
    let haveFiles;
    let ext = null;
    
    const wss = new WebSocket('ws://localhost:8000');
    wss.onmessage = showResult;
    
    // UTILS
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
    
    // ADD FILE LOGIC
    function createFileInput() {
        const fileHTML = `
        <div class="form-group">
            <input type="file" name="file" id="file" class="input-file">
            <label for="file" class="btn btn-tertiary">
                <span class="upload">Upload file</span>
            </label>
        </div>
        `;
    
        FILES.insertAdjacentHTML('afterbegin', fileHTML);

        const form = FILES.firstElementChild;
        const input = form.firstElementChild;

        input.addEventListener('change', addFile);
    };
    
    function addFile() {
        const fileName = this.files[0].name;

        const form = this.parentNode;
        form.style.display = 'none';
    
        const file = createNode('li', 'file');
        multiAppend(
            file,
            createNode('span', 'file-name', fileName),
            createNode('span', 'remove-btn', '\t&#10008;', 'click', function() {
                this.parentNode.remove();
                form.remove();
            })
        );
        FILES_LIST.append(file);
    
        createFileInput();
    }
    
    // SEND FILES LOGIC
    function sendLogic(event) {
        event.preventDefault();

        const files= document.querySelectorAll('.input-file');
        const codeFromTextInput = CODE_INPUT.value;

        if ( !checkInputs(files, codeFromTextInput) ) return;

        const result = {
            outputText: null,
            linksToFiles: [],
        };

        if (codeFromTextInput && ext) result.outputText = await postData(codeFromTextInput, ext);
    
        if (files[1]) {
            for (let i = 1; i < files.length; i++) result.linksToFiles.append( await sendFile(files[i]) );
            haveFiles = true;
        }

        clearPage(codeFromTextInput);
        createFileInput();

        return result;
    }

    function checkInputs(files, codeInTextInput) {
        // in files will be at least one elem all times
        if (codeInTextInput === '' && !files[1]) {
            alert('Please upload file or paste your code');
            return false;
        } else if (codeInTextInput && !ext) {
            alert('Please select type of your code');
            return false;
        }

        return true;
    }

    async function sendFile(input) {
        const file = input.files[0];
        const partsOfName = file.name.split('.');
        const ext = partsOfName[partsOfName.length - 1];
        const code = await file.text();  
        
        return await postData(code, ext, file.name);
    }

    async function postData(code, ext, name) {
        const data = name ? {code, ext, name} : {code, ext};

        try {
            return await fetch(
                '/', 
                {
                    method: 'POST',
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify(data),
                }
            );
        } catch(e){
            return 'Sorry, there was an error on the server, please try again later';
        }        
    }

    function clearPage() {
        Array.from(OUTPUT.children).forEach(node => !node.classList.contains('row') ? node.remove() : null);
        document.querySelector('input[placeholder="Output"]').value = '';
        CODE_INPUT.value = '';
        FILES.innerHTML = '';
        FILES_LIST.innerHTML = '';
    }
    
    function showResult(message) {
        if (haveFiles) {
            const outputTitle = createNode('h3', null, 'Output Files:');
            OUTPUT.append(outputTitle);
        }
        
        const { name, result } = JSON.parse(message.data);
        if (name === 'input') {
            document.querySelector('input[placeholder="Output"]').value = result;
            return;
        }
        
        haveFiles = false;
        const outputFile = createNode('div', 'output-file');
        const fileTitle = createNode('span', 'file-title', name,
            'click',
            function() {
                this.parentNode.classList.toggle('active');
            }
        );
        const lineBreak = createNode('div', 'w-100')
        const fileCode = createNode('input', 'file-code');
        fileCode.value = result;
        multiAppend(outputFile, fileTitle, lineBreak, fileCode);
        OUTPUT.append(outputFile);
    }
    
    createFileInput();
    document.querySelector('.send').addEventListener('click', sendLogic);
    document.querySelectorAll('input[name="type"').forEach(node => 
        node.addEventListener('change', function() {
            ext = this.value;
        })
    );
})();