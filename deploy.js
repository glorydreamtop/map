const deploy = require('scp2')
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora(chalk.green('正在发布到服务器...'))
spinner.start()

deploy.scp('./pc', {
    'host': '140.143.225.182',
    'port': 22,
    'username': 'root',
    'password': 'Adidas0520',
    'path': '/www/wwwroot/t.zixinco.com/pc'
}, err => {
    spinner.stop()
    if (err) {
        console.log('error', err)
    } else {
        console.log('✨  已发布到服务器✅')
    }
})