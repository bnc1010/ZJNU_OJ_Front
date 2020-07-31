const Mock = require('mockjs')


const pagetotal=30
const contest=[]

for (let i = 1; i <= pagetotal; i++) {
    contest.push(Mock.mock({
        description: '@string("lower", 5)',
        endTime: '@datetime("yyyy-MM-ddTHH:mm:ssZ")',
        ended: '@boolean',
        id: i,
        length: "@integer(300, 3000)",
        normalEndTime: '@datetime("yyyy-MM-dd HH:mm")',
        normalStartTime: '@datetime("yyyy-MM-dd HH:mm")',
        pattern: '@pick(["ACM", "IOI"])',
        privilege: '@pick(["public", "private"])',
        runStatu: '@pick(["已结束", "未开始", "进行中"])',
        startTime: '@datetime("yyyy-MM-ddTHH:mm:ssZ")',
        started: '@boolean',
        title: '随机比赛名-' + '@string("lower", 5)'
    }))
}
function min(a,b){
    if(a<b)return a
    else return b
}
module.exports = [
    {
        url: '/vue-element-admin/api/contest',
        type: 'get',
        response: config => {
            const { page, pagesize, search } = config.query
            let _page=Number(page)
            let _pagesize=Number(pagesize)
            let st=_pagesize*(_page-1)
            let ed=min(st+_pagesize, contest.length)
            let res=[]
            for(let i=st;i<ed;i++){
                res.push(contest[i]);
            }
            return {
                code: 20000,
                data: {content:res, pagetotal:pagetotal}
            };
        }
    }
]