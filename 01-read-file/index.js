let fs = require('fs');
let path = require('path');

let file = path.join(__dirname, '/text.txt');

let stream = new fs.ReadStream(file);

stream.on('readable', function(){
  let data = stream.read();
  if (data != null) {
    data = data.toString();
  } else {
    return;
  }
  console.log(data);
});
