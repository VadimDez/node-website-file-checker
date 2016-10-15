const https = require('https');
const chalk = require('chalk');

var sites = [];
var found = [];
var length = sites.length;

function siteCallback(i) {
  console.log(i);
  if (i >= length) {
    console.log(chalk.yellow('Finished!'));

    if (found.length) {
      console.log(chalk.yellow('Found:'));
      found.forEach(function (site) {
        console.log(chalk.yellow(site));
      });
    }
    return;
  }
  console.log(chalk.grey('Checking ' + sites[i] + '...'));
  
  var req = https.request({
    host: sites[i],
    path: '/.git/HEAD'
  }, function (res) {
    if (res.statusCode === 200) {
      console.log(chalk.green(sites[i]));
      found.push(sites[i]);
    }
    siteCallback(i + 1);
  });

  req.on('error', function(e) {
    console.error(chalk.red(e));
    siteCallback(i + 1);
  });


  req.end();
}

console.log(chalk.yellow('Starting'));

siteCallback(0);