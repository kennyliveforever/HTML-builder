let fs = require('fs');
let p = require('path');
var path = p.join(__dirname, '/secret-folder');

fs.readdir(path, {withFileTypes: true}, function f(err, files) {
  if (err) throw err;
  for (let i of files) {
    let filePath = `${path}` + '/' + `${i.name}`;
    if (i.isFile()) {
      let ext = p.extname(i.name);
      ext = ext.slice(1, ext.length);
      fs.stat(filePath, (err, stat) => {
        if (err) throw err;
        if (stat.isFile()) {
          console.log(`${i.name}` + ' - ' + `${ext}` + ' - ' + `${stat.size}` + ' byte');
        }
      });
    }
  }
});



