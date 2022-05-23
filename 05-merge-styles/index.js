let fs = require('fs');
let path = require('path');
var sourceFolder = path.join(__dirname, '/styles');
var destinationFolder = path.join(__dirname, '/project-dist');

let arr = [];

fs.readdir(sourceFolder, {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  for (let file of files) {
    if (file.isFile() && path.extname(file.name) == '.css') {
      let stream = new fs.ReadStream(path.join(sourceFolder, '/' + `${file.name}`));
      stream.on('readable', () => {
        let data = stream.read();
        if (data != null) {
          data = data.toString();
          arr.push(data);
          fs.writeFile(path.join(destinationFolder, '/bundle.css'), arr.join('\n'), () => {});
        } else {
          return;
        }
      });
    }
  }
});

