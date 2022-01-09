const User = require('../models/User');
const Solution = require('../models/Solution');
//const Question = require('../models/Question')
// const fetch = require("node-fetch");
const fs = require('fs')
const { NodeSSH } = require('node-ssh')
const ssh = new NodeSSH()
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });

// client id  :   7eaec65631d56c14ef7463193fc91eb2
// client secret : fa768de84ea9ef5cd0e4fb7ef12d7a7c13f9e33d4e30dd411a8a6d4a94dba86a
// https://api.jdoodle.com/v1/execute

module.exports.getResult = async (req, res) => {
    let output;
    let error;
    try {
        const { script, language, stdin, versionIndex } = req.body;
        let assign = {
            fileName: "",
            command: "", 
        } 
        if (language === 'cpp17') {
            assign.fileName = "main.cpp"
            assign.command = "g++ main.cpp -o main"
        }
        else if (language === 'python3') {
            assign.fileName = "main.py"
            assign.command = "timeout 1 python3 main.py < input.txt && echo $? || echo $?"
        }
        else if (language === 'java') {
            assign.fileName = "main.java"
            assign.command = "javac main.java"
        }
        fs.writeFile(assign.fileName, script, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('main file created');
            }
        })
        fs.writeFile('input.txt', stdin, function (err) {
            if (err) console.log(err);
            else {
                console.log('input file created');
            }
        })
        ssh.connect({
            host: process.env.VM_HOST_IP,
            username: process.env.SSH_CONNECTOR_USERNAME,
            port: process.env.SSH_CONNECTION_PORT,
            privateKey: fs.readFileSync('./id_rsa', 'utf8'),
        }).then(function () {

            ssh.putFile(`./${assign.fileName}`, `/home/user/cloud/${assign.fileName}`).then(function () {
                console.log("The File thing is done")
            }, function (error) {
                console.log("Something's wrong")
                console.log(error)
            })
            ssh.putFile('./input.txt', '/home/user/cloud/input.txt').then(function () {
                console.log("The File thing is done")
                //compile
                ssh.execCommand(assign.command, { cwd: '/home/user/cloud' }).then(function (result) {
                    output = result.stdout;
                    error = result.stderr;
                    if (error.length > 0)
                        res.send({ cloudOut: error, cloudErr: error, verdict: 0 });
                    else if (language === "python3") {
                        console.log("ou " + output);
                        let verdict;
                        if (output.charAt(output.length - 1) === "0") {
                            verdict = 1;
                            output = output.slice(0, output.length - 1);
                        }
                        else if (output.charAt(output.length - 1) === "4") {
                            verdict = -1;
                            output = "";
                        }
                        res.send({ cloudOut: output, cloudErr: error, verdict: verdict });
                    }
                    else if (language === "cpp17") {
                        //exec
                        ssh.execCommand("timeout 1 ./main < input.txt && echo $? || echo $?", { cwd: '/home/user/cloud' }).then(function (resultE) {

                            let output1 = resultE.stdout;
                            let error1 = resultE.stderr;
                            console.log("ou " + output1);
                            let verdict;
                            if (output1.charAt(output1.length - 1) === "0") {
                                verdict = 1;
                                output1 = output1.slice(0, output1.length - 1);
                            }
                            else if (output1.charAt(output1.length - 1) === "4") {
                                verdict = -1;
                                output1 = "";
                            }
                            else {
                                verdict = -2;
                                resultE.stderr = resultE.stderr.replace("timeout: the monitored command dumped core", "");
                                resultE.stderr = resultE.stderr.replace("timeout 1 ./main < input.txt", "");
                                resultE.stderr = resultE.stderr.replace("bash: line 1:  ", "");
                                output1 = resultE.stderr;
                            }
                            res.send({ cloudOut: output1, cloudErr: error1, verdict: verdict });
                        }, function (err) {
                            console.log(err);
                        })
                    }
                    else if (language === 'java') {
                        ssh.execCommand("timeout 1 java main < input.txt && echo $? || echo $?", { cwd: '/home/user/cloud' }).then(function (resultE) {
                            let output1 = resultE.stdout;
                            let error1 = resultE.stderr;
                            console.log("ou " + output1);
                            console.log("err" + error1);
                            let verdict;
                            if (output1.charAt(output1.length - 1) === "0") {
                                verdict = 1;
                                output1 = output1.slice(0, output1.length - 1);
                            }
                            else if (output1.charAt(output1.length - 1) === "4") {
                                verdict = -1;
                                output1 = "";
                            }
                            else {
                                verdict = -2;
                                output1 = resultE.stderr;
                            }
                            res.send({ cloudOut: output1, cloudErr: error1, verdict: verdict });
                        }, function (err) {
                            console.log(err);
                        })
                    }

                })
            }, function (error) {
                console.log("Something's wrong")
                console.log(error)
            })
        }), function (err) {
            console.log(err);
        }
    }
    catch (err) {
        console.log(err)
    }
}
const dayOfYear = function (today) {
    return Math.ceil((today - new Date(today.getFullYear(), 0, 1)) / 86400000);
}


module.exports.solved = async (req, res) => {
    let solData = req.body;
    try {
        let user = await User.findById(solData.user);
        let index = user.questionsSolved.indexOf(solData.question);
        if (index == -1) {
            user.questionsSolved.push(solData.question);

            var a = dayOfYear(new Date());
            // console.log(a);
            if (a == 1) {
                for (let i = 0; i < user.calender.length; i++) {
                    user.calender[i].value = 0;
                }
            }
            for (let i = 0; i < user.calender.length; i++) {
                if (user.calender[i].day == a) {
                    user.calender[i].value++;
                    break;
                }
            }
        }
        user.save();
        res.send(user);
    } catch (err) {
        console.log(err);
    }
}
module.exports.solutionLog = async (req, res) => {
    let solData = req.body;
    try {
        const solution = new Solution(solData);

        let user = await User.findById(solData.user);
        user.solutions.push(solution._id);
        user.save();
        solution.save(err => {
            if (err) {
                console.log(err);
            }
        })

    } catch (err) {
        console.log(err);
    }
}


// let data = {
        //     clientId: "7eaec65631d56c14ef7463193fc91eb2",
        //     clientSecret: "fa768de84ea9ef5cd0e4fb7ef12d7a7c13f9e33d4e30dd411a8a6d4a94dba86a",
        //     script: script2,
        //     language,
        //     stdin,
        //     versionIndex: versionIndex
        // }
        // // console.log(JSON.stringify(data));
        // let output = await fetch(`https://api.jdoodle.com/v1/execute`, {
        //     method: "POST", body: JSON.stringify(data), headers: {
        //         'Content-Type': 'application/json'
        //     },
        // });
        // let apiOut = await output.json();
        // res.send({ apiOut: apiOut });
