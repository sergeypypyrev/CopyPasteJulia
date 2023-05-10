const MAX_SIZE = 1 * 1024 * 1024;

function chooseFile(event) {
	let input = event.target;
	let files = input.files;
	if (!files.length)
		return;
	let file = files[0];
	if (file.size >= MAX_SIZE) {
		alert(`File size must be less than ${MAX_SIZE}`);
		input.value = '';
		return;
	}
	let reader = new FileReader();
	reader.onload = () => {
		let data = Array.from(new Uint8Array(reader.result));
		Genie.WebChannels.sendMessageTo('__', 'FileUpload', {
			fileName: file.name,
			fileData: data
		});
		downloadFile(file.name, data);
	};
	reader.readAsArrayBuffer(file);
	input.value = '';
}

function removeFile() {
	Genie.WebChannels.sendMessageTo('__', 'FileUpload', {
		fileName: '',
		fileData: []
	});
	downloadFile('', []);
}

function text(event) {
	Genie.WebChannels.sendMessageTo('__', 'TextUpdate', event.target.value);
}

function copy() {
	document.getElementById('text').select();
	document.execCommand('copy');
}

async function paste() {
	try {
		let text = await navigator.clipboard.readText();
		document.getElementById('text').value = text;
		Genie.WebChannels.sendMessageTo('__', 'TextUpdate', text);
	}
	catch {
		alert('This function is available only if user enabled clipboard access AND CopyPasteJulia is installed on ' +
			'localhost or https');
	}
}

function initialize() {
	if (document.readyState !== 'complete') {
		document.addEventListener('readystatechange', initialize, false);
		return;
	}
	document.getElementById('chooseFile').addEventListener('change', chooseFile, false);
	document.getElementById('removeFile').addEventListener('click', removeFile, false);
	document.getElementById('text').addEventListener('input', text, false);
	document.getElementById('copy').addEventListener('click', copy, false);
	document.getElementById('paste').addEventListener('click', paste, false);
	Genie.WebChannels.sendMessageTo('__', 'GetCurrent');
}

function payload(data) {
	if (typeof data != 'object')
		return;
	if (data.message)
		data = data.payload;
	if ('text' in data)
		document.getElementById('text').value = data.text;
	if ('fileName' in data && 'fileData' in data)
		downloadFile(data.fileName, data.fileData);
}

function downloadFile(name, data) {
	let column = document.getElementById('fileColumn');
	if (name.length) {
		if (downloadFile.old)
			URL.revokeObjectURL(downloadFile.old);
		let a = document.getElementById('downloadFile');
		a.innerText = `Download ${name}`;
		a.download = name;
		downloadFile.old = a.href = URL.createObjectURL(new Blob([new Uint8Array(data)]));
		column.classList.remove('visually-hidden');
	}
	else
		column.classList.add('visually-hidden');
}

Genie.WebChannels.subscriptionHandlers.push(initialize);
window.parse_payload = payload;
