let fs = require('fs');
let path = require('path');

var styleFolder = path.join(__dirname, '/styles');
var distFolder = path.join(__dirname, '/project-dist');
var filesFolder = path.join(__dirname, '/assets');
var copyFolder = path.join(__dirname, '/project-dist/assets');

let arr = [];

function makeFolder() {
    fs.readdir(__dirname, (err, files) => {
        if (files.includes('project-dist') != true) {
            fs.mkdir(path.join(__dirname, '/project-dist'), (err) => {
                if (err) throw err;
                fs.mkdir(path.join(distFolder, '/assets'), err => {});
            });
        } else {
          fs.rmdir(path.join(__dirname, distFolder), {recursive: true}, ()=>{})
        }
    });
}

makeFolder();

let stream = new fs.ReadStream(path.join(__dirname, '/template.html'));
stream.on('readable', () => {
    let data = stream.read();
    if (data != null) {
        let page = data.toString();
        fs.readdir(path.join(__dirname, '/components'), (err, files) => {
            if (err) throw err;
            for (let file of files) {
                if (path.extname(file) == '.html') {
                    let stream = new fs.ReadStream(path.join(__dirname, '/components/' + `${file}`));
                    stream.on('readable', () => {
                        let data = stream.read();
                        if (data != null) {
                            data = data.toString();
                            let fileName = file.slice(0, file.length - 5);
                            page = page.replace('{{' + `${fileName}` + '}}', data);
                            // console.log(page);
                            fs.writeFile(path.join(__dirname, '/project-dist/index.html'), page, () => {
                            });
                        }
                    });
                }
            }
        });
    }
});

// copyDir();

fs.readdir(styleFolder, {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    for (let file of files) {
        if (file.isFile() && path.extname(file.name) == '.css') {
            let stream = new fs.ReadStream(path.join(styleFolder, '/' + `${file.name}`));
            stream.on('readable', () => {
                let data = stream.read();
                if (data != null) {
                    data = data.toString();
                    arr.push(data);
                    fs.writeFile(path.join(distFolder, '/style.css'), arr.join('\n'), () => {});
                }
            });
        }
    }
});

function copyDir() {
    fs.readdir(filesFolder, (err, files) => {
        for (let i of files) {
            fs.readdir(path.join(filesFolder, `${i}`), (err, files) => {
                if (err) throw err;
                fs.mkdir(path.join(copyFolder, '/' + `${i}`), err => {
                            if (err) {
                                fs.rmdir(path.join(copyFolder, '/' + `${i}`), {recursive: true}, ()=>{})
                            } else {
                                f()
                            }
                });
                function f() {
                    for (let file of files) {
                        fs.copyFile(path.join(filesFolder, '/' + `${i}` + '/' + `${file}`), path.join(copyFolder, '/' + `${i}` + '/' + `${file}`), (err) => {
                            if (err) throw err;
                            console.log(i)
                        });
                    }
                }
            })
        }
    });
}

copyDir()
