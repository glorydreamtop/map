const deploy = require('scp2')
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora(chalk.green('正在发布到服务器...'))
spinner.start()

deploy.scp('./pc', {
  'host': '123.57.102.85',
  'port': 22,
  'username': 'root',
  'password': 'zixinweb@1404',
  'path': '/www/wwwroot/business.zixinco.com/pc'
}, err => {
  spinner.stop()
  if (err) {
    console.log('error', err)
  } else {
    console.log('✨  已发布到服务器✅')
  }
})
