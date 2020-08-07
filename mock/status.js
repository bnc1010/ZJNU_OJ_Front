const Mock = require('mockjs')

const problem={
    description: "",
    hint: "",
    id: '@integer(1, 20)',
    input: "",
    memoryLimit: 1,
    output: "",
    sampleInput: "",
    sampleOutput: "",
    source: "",
    timeLimit: 1,
    title: ""
}


const user={
    id: "@integer(300, 3000)",
    name: "testname" + "@integer(300, 3000)",
    userProfile: {
        accepted: 0,
        id: 64,
        score: 0,
        submitted: 0,
    },
    username: "testuser" + "@integer(300, 3000)"
}

const pagesize=30
const pagetotal=600
const status=[]



for (let i = 1; i <= pagetotal; i++) {
    status.push(Mock.mock({
        caseNumber: 0,
        id: pagetotal-i+1,
        language: '@pick(["c","c++", "python", "java", "go"])',
        length: '@integer(300, 3000)',
        memory: '@integer(300, 3000)',
        normalLanguage: "C",
        normalResult: "Compilation Error on case 0",
        normalSubmitTime: "2020-07-31 20:16:17",
        problem: problem,
        result: '@pick(["Compilation Error", "Accept","Wrong Answer","Runtime Error", "Time Limit Exceeded","Memory Limit Exceeded","System Error"])',
        share: true,
        submitTime: "2020-07-31T12:16:17Z",
        time: '@integer(300, 3000)',
        user: user
    }))
}
function min(a,b){
    if(a<b)return a
    else return b
}
module.exports = [
    {
        url: '/vue-element-admin/api/status',
        type: 'get',
        response: config => {
            const { page, pagesize, search } = config.query
            let _page=Number(page)
            let _pagesize=Number(pagesize)
            let st=_pagesize*(_page-1)
            let ed=min(st+_pagesize, status.length)
            let res=[]
            for(let i=st;i<ed;i++){
                res.push(status[i]);
            }
            return {
                code: 20000,
                data: {content:res, pagetotal:pagetotal}
            };
        }
    },
]