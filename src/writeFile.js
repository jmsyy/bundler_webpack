const fs = require('fs');

const context = `<!DOCTYPE html>
  <html>
    <body>
      <header></header>
      <aside></aside>
      <main></main>
      <footer></footer>
    </body>
  </html>
  `
fs.writeFile('./index.html', context,(err) =>{
  if(err){ throw err}
})