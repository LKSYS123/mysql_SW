const path = require('path')
const AWS = require('aws-sdk');
const model = require('./api/model');

AWS.config.loadFromPath(
    path.join(__dirname, 'config', 'awsConfig.json')
);

module.exports = {
    needs: () => upload,
    api: {
        // 회원가입
        register: (req, res) => {
            const body = req.body;
            model.api.register(body, result => {
                if (result) {
                    res.send(true);
                    console.log('=====회원가입 컨트롤러 완료=====');
                } else {

                    console.log('=====회원가입 컨트롤러 실패=====');
                    return;
                }
            })
        },
        // 로그인
        login: (req, res) => {
            const body = req.body;
            model.api.login(body, result => {
                if (result[0]) {
                    res.send(result[0]);
                    console.log('=====로그인 컨트롤러 성공=====')
                } else {
                    console.log('=====로그인 컨트롤러 실패=====');
                }
            })
        },

        // 로그아웃
        logout: (req, res, auth) => {
            if (auth) {
                res.send(true);
                console.log('정상적으로 로그아웃을 했습니다.');
            } else {
                console.log('로그아웃에 실패했습니다.');
            }
        },

        authCheck: (req, res, auth) => {
            if (auth) {
                res.send(true);
                console.log('authCheck을 정상적으로 실행했습니다.');
            } else {
                console.log('authCheck에서 에러가 발생했습니다.');
            }
        },

        // 포스트 입력
        addPost: (req, res) => {
            const body = req.body;
            model.api.addPost(body, result => {
                if (result) {
                    res.send(true);
                }
            })
        },
        // 포스트목록 조회
        getPostList: (req, res) => {
            model.api.getPostList(result => {
                return res.send(result)
            })
        },

        // 포스트 조회
        getPost: (req, res) => {
            const body = req.body.keys;
            console.log('body ======> ' + JSON.stringify(body));
            model.api.getPost(body, result => {
                if (result) {
                    console.log('getPost ======> ' + JSON.stringify(result));
                    return res.send(result)
                }
            })
        },

        // 예시 데이터
        getData: (req, res) => {
            model.api.getData(data => {
                return res.send(data)
            })
        },
        addData: (req, res) => {
            const body = req.body;
            model.api.addData(body, result => {
                if (result) {
                    res.send(true);
                }
            })
        },
        updateData: (req, res) => {
            const body = req.body;
            model.api.updateData(body, result => {
                if (result) {
                    res.send(true);
                }
            })
        },
        deleteData: (req, res) => {
            const body = req.body;
            model.api.deleteData(body, result => {
                if (result) {
                    res.send(true);
                }
            })
        },

    },
}

