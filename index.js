const http = require('http');
const chalk = require('chalk');

var sites = [];
const length = sites.length;

function siteCallback(i) {
  if (i >= length) {
    console.log(chalk.yellow('Finished!'));
    return;
  }
  
  var req = http.request({
    host: sites[i],
    path: '/.git/HEAD'
  }, function (res) {
    if (res.statusCode === 200) {
      console.log(chalk.green(sites[i]));
    }
    siteCallback(i + 1);
  });

  req.on('error', function(e) {
    console.error(chalk.red(e));
  });


  req.end();
}

console.log(chalk.yellow('Starting'));
siteCallback(0);