const repl = require('repl');

const reqlServer = repl.start({prompt: '>'});
reqlServer.defineCommand('callName', {
    help:'叫名字',
    action(name){
      // this.clearBufferedCommand();
      console.log(`i am ${name}`);
      this.displayPrompt();
    }

});
