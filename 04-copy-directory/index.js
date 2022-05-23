let fs = require('fs');
let path = require('path');
var filesFolder = path.join(__dirname, '/files');
var copyFolder = path.join(__dirname, '/files-copy');

function copyDir() {
  fs.readdir(__dirname, (err, files) => {
    if (err) throw err;
    if (files.includes('files-copy')) {
      fs.readdir(copyFolder, (err, files) => {
        if (err) throw err;
        for (let i of files) {
          fs.unlink(path.join(copyFolder, '/' + `${i}`), (err) =>{
            if (err) throw err;
          });
        }

        fs.readdir(filesFolder, (err, files) => {
          if (err) throw err;
          for (let i of files) {
            fs.copyFile(path.join(filesFolder, '/' + `${i}`), path.join(copyFolder, '/' + `${i}`), (err) => {
              if (err) throw err;
            });
          }
        });
      });
    } else {
      fs.mkdir(copyFolder, {recursive: true}, (err) => {
        if (err) throw err;
        fs.readdir(filesFolder, (err, files) => {
          if (err) throw err;
          for (let i of files) {
            fs.copyFile(path.join(filesFolder, '/' + `${i}`), path.join(copyFolder, '/' + `${i}`), (err) => {
              if (err) throw err;
            });
          }
        });
      });
    }
  });
}

copyDir();





