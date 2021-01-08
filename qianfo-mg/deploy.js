let src = 'https://clinic.aioes.cn/'; //上传地址

let type = 2; //状态   1前端  2后端前
let password = 'cq1080';
let username = 'admin';
let versionNumber = '1.0.0'; //版本号

var date = new Date(); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
var Y = date.getFullYear() + '-';
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
var timeRange = Y + M + (D - 1);
var time = Y + M + D + h + m + s;

let fs = require('fs'); //获取文件系统模块，负责读写文件
let path = require('path'); //工具模块，处理文件路径的小工具
let JSZIP = require('jszip');
let zip = new JSZIP();
//  引入nodejs request
let request = require('request');
let FormData = require('form-data');
//  引入shell 使用git
const shell = require('shelljs');

//读取目录及文件
function readDir(obj, nowPath, currPath) {
    let files = fs.readdirSync(nowPath); //读取目录中的所有文件及文件夹（同步操作）
    //  //console.log(files)
    files.forEach(function (fileName, index) {
        //遍历检测目录中的文件
        // //console.log(fileName, index);//打印当前读取的文件名
        let fillPath = nowPath + '/' + fileName;
        let getPath = fileName;
        if (currPath != './') {
            getPath = currPath + '/' + fileName;
        }
        //   //console.log(currPath)
        //   //console.log(getPath)
        let file = fs.statSync(fillPath); //获取一个文件的属性
        if (file.isDirectory()) {
            //如果是目录的话，继续查询
            let dirlist = zip.folder(getPath); //压缩对象中生成该目录
            //  //console.log(getPath)
            readDir(dirlist, fillPath, getPath); //重新检索目录文件
        } else {
            obj.file(fileName, fs.readFileSync(fillPath)); //压缩目录添加文件
        }
    });
}

//开始压缩文件
function startZIP() {
    return new Promise(resolve => {
        var currPath = './'; //文件的绝对路径 当前当前js所在的绝对路径

        var targetDir = path.join(currPath, 'dist'); //
        // //console.log(targetDir)

        readDir(zip, targetDir, currPath);

        zip.generateAsync({
            //设置压缩格式，开始打包
            type: 'nodebuffer', //nodejs用
            compression: 'DEFLATE', //压缩算法
            compressionOptions: {
                //压缩级别
                level: 9
            }
        }).then(function (content) {
            fs.writeFileSync(currPath + '/result.zip', content, 'utf-8'); //将打包的内容写入 当前目录下的 result.zip中
            resolve();
        });
    });
}
//  获取文件发送到服务端
function sendMultipart(filePath) {
    const formData = {
        file: fs.createReadStream(filePath),
        password: password,
        type: type,
        username: username,
        versionNumber: versionNumber
    };
    let options = {
        method: 'POST',
        url: src + '/universal/packageAndGoOnline',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        formData: formData
    };
    return new Promise((resolve, reject) => {
        let readStream = request(options, (error, response, body) => {
            if (!error) {
                resolve({
                    response,
                    body
                });
            } else {
                reject(error);
            }
        });
    });
}

function getLog() {
    let _cmd = `git log --after="${timeRange}" --before="${time}"`;
    return new Promise((resolve, reject) => {
        shell.exec(_cmd, (code, stdout, stderr) => {
            if (code) {
                reject(stderr);
            } else {
                // console.log(stdout)
                //   resolve(JSON.parse(stdout))
                resolve(stdout);
            }
        });
    });
}

async function commit() {
    _gitLog = await getLog();
    // console.log(_gitLog)
}

function isExists() {
    return new Promise(resolve => {
        fs.mkdir('./log', err => {
            resolve();
        });
    });
}

commit();
startZIP()
    .then(res => {
        return sendMultipart('./result.zip'); //相对地址上传文件
    })
    .then((res, val) => {
        console.log(res);
        if (JSON.parse(res.body).status == 200) {
            console.log('打包上传成功');

            isExists().then(res => {
                fs.writeFile(
                    `./log/release${versionNumber}.log`,
                    `提交时间：${time}，提交版本：${versionNumber}，打印：git:${_gitLog}`, {},
                    res => {
                        console.log('记录成功');
                    }
                );
            });
        } else {
            console.log('打包上传失败');
        }
    });