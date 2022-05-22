let fs = require('fs')
let path = require('path')
let process = require('process')

let readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

fs.writeFile(path.join(__dirname, '/file.txt'), '', request)
let file = path.join(__dirname, '/file.txt')

function request(){
    readline.setPrompt('Enter text: \n')
    readline.prompt()
}

var stream = new fs.ReadStream(file)
let arr = []

readline.on('line', data => {
    if (data == 'exit') {
        process.exit()
    }
    stream.on('readable', function(){
        var text = stream.read();
        if (text != null) {
            text = text.toString()
            arr.push(text)
        } else {
            return
        }
    })
    arr.push(data)
    fs.writeFile(path.join(__dirname, '/file.txt'), arr.join('\n'), request)
});

process.on('exit', (code) => {
    console.log('Bye');
});















