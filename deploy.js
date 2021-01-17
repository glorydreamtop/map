const deploy = require('scp2');
const ora = require('ora');
const chalk = require('chalk');
const zip = require('zip-local');
const fs = require('fs');
const path = require('path');

let spinner;

const zipper = () => {
    spinner = ora(chalk.green('正在生成部署压缩包...'));
    spinner.start();
    zip.sync.zip('./pc').compress().save('./pc.zip');
    spinner.stop();
    console.log(chalk.green('已生成部署压缩包！'));
    const sourceFile = path.join(__dirname, 'pc.zip');
    const destPath = path.join(__dirname, "pc", 'pc.zip');
    fs.rename(sourceFile, destPath, err => {
        if (err) throw err;
        console.log(chalk.green('已添加到部署目录！'));
        publish(); // 发布
    });

}

const publish = () => {
    spinner = ora(chalk.green('正在发布到服务器...'));
    spinner.start();
    deploy.scp('./pc', {
        'host': '140.143.225.182',
        'port': 22,
        'username': 'root',
        'password': 'Adidas0520',
        'path': '/www/wwwroot/t.zixinco.com/pc'
    }, err => {
        spinner.stop()
        if (err) {
            console.log(chalk.red(`error:${err}`))
        } else {
            console.log(chalk.green('✨  已发布到服务器✅'));
        }
    })
}

zipper(); // 压缩