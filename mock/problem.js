const Mock = require('mockjs')

const res ={
    caseNumber: 1,
    id: 33,
    info: "",
    language: "cpp",
    length: 249,
    memory: 1679360,
    normalLanguage: "C++",
    normalResult: "Accepted",
    normalSubmitTime: "2020-07-30 09:48:28",
    problem: {
        description: "",
        hint: "",
        id: 1,
        input: "",
        memoryLimit: 1,
        output: "",
        sampleInput: "",
        sampleOutput: "",
        source: "",
        timeLimit: 1,
        title: "",
    },
    result: "Accepted",
    share: true,
    source: "#include <stdio.h>\nint main(){\n	int t,xa,ya,xb,yb;\n	scanf(\"%d\",&t);\n	while(t--){\n		scanf(\"%d%d%d%d\",&xa,&ya,&xb,&yb);\n		if(xa*yb==xb*ya && xa*xa+ya*ya!=xb*xb+yb*yb)\n			printf(\"Let's do it!\");\n		else\n			printf(\"It's impossible!\");\n	}\n	return 0;\n}",
    submitTime: "2020-07-30T01:48:28Z",
    time: 0,
    user: {id: 50, username: "bnc1010", name: "bnc", userProfile: {id: 50, score: 5, accepted: 1, submitted: 2}},
}

const problems=[
    {
        accepted: 5,
        active: true,
        description: "遥远的吉奥米特王国座落在一个无限大的平面上，国王普捷特的宫殿位于原点，坐标为 $(0,0)$ ，某一天，王国的考古学家发现了两处神迹，分别位于 $(x1,y1)$ 和 $(x2,y2)$ ，根据前朝古籍记载，如果修建一条无限长的直线道路，满足\n\n道路经过国王的宫殿\n两处神迹到道路的最短距离相等\n那么这条道路的尽头，就是那古籍中虚无缥缈的神居，国王普捷特非常想要窥探神的真面目，于是命令聪明的你作为工程师，规划指导这条通往神居的道路的修建工作。可是，这样的道路存在吗？如果存在，唯一吗？",
        hint: "",
        id: 1,
        input: "第一行是一个整数 $t$ ，\n表示数据个数，接下来 $t$ 行，每行四个整数 $x1,y1,x2,y2$ ，表示两个神迹的位置，满足 $1\le t \le 100$ ，$|x1|,|y1|,|x2|,|y2|\le 1000$，神迹的位置以及国王的宫殿位置可能重合",
        memoryLimit: 65536000,
        output: "对于每组数据，如果题目中所述的道路存在且唯一，那么输出“Let’s do it!”，否则输出“It’s impossible!”，不含引号",
        ratio: "50.00%",
        sampleInput: "2\n1 1 -2 -2\n0 0 0 0",
        sampleOutput: "Let's do it!\nIt's impossible!",
        score: 5,
        source: "段忠杰",
        submitted: 10,
        tags: [{id: 1, name: "初级", score: 385}, {id: 13, name: "数论", score: 80}],
        timeLimit: 1000,
        title: "寻神者的道路"
    },
]

const lastSubmits=[
    {
        id:33,
        language:"cpp",
        submitTime:"2020-07-30T01:48:28Z",
        time:0,
        memory:1679360,
        length:249,
        result:"Accepted",
        share:true,
        info:"",
        caseNumber:1,
        normalResult:"Accepted",
        normalLanguage:"C++",
        normalSubmitTime:"2020-07-30 09:48:28"
    },
    {
        caseNumber: 1,
        id: 34,
        info: "",
        language: "c",
        length: 61,
        memory: 1560576,
        normalLanguage: "C",
        normalResult: "Wrong Answer on case 1",
        normalSubmitTime: "2020-07-30 14:12:09",
        result: "Wrong Answer",
        share: true,
        submitTime: "2020-07-30T06:12:09Z",
        time: 1
    }
]

const alltags=['组合数学', '贪心', '搜索', '二分图', '计算几何', '容斥', '模拟', '模拟退火']

const pagesize=30
const pagetotal=600
const pros=[]
for (let i = 1; i <= pagetotal; i++) {
    pros.push(Mock.mock({
        id: i,
        problem: '@string("lower", 5)',
        tags: () => {
            return [alltags[Math.floor(Math.random()*alltags.length)]];
        },
        acc: '@integer(0, 500)',
        total: '@integer(500, 700)',
        value: '@integer(10, 20)',
        acrate: '@integer(0, 100)',
        ac: '@boolean'
    }))
}
  
function min(a,b){
    if(a<b)return a
    else return b
}

module.exports = [
    {
        url: '/vue-element-admin/api/status/view/[0-9].*',
        type: 'post',
        response: config => {
            return {
                code: 20000,
                data: res
            };
        }
    },
    {
        url: '/vue-element-admin/api/status/share/[0-9].*',
        type: 'post',
        response: config => {
            return {
                code: 20000,
                data: "success"
            };
        }
    },
    {
        url: '/vue-element-admin/api/problem/submit/[0-9].*',
        type: 'post',
        response: config => {
            return {
                code: 20000,
                data: "success"
            };
        }
    },
    {
        url: '/vue-element-admin/api/status/user/latest/submit/[0-9].*',
        type: 'get',
        response: config => {
            return {
                code: 20000,
                data: lastSubmits
            };
        }
    },
    {
        url: '/vue-element-admin/api/problem/[0-9].*',
        type: 'get',
        response: config => {
            return {
                code: 20000,
                data: problems[0]
            };
        }
    },
    {
        url: '/vue-element-admin/api/problems/tags',
        type: 'get',
        response: config => {
            return {
                code: 20000,
                data: alltags
            };
        }
    },
    {//寻$$初级,数论
        url: '/vue-element-admin/api/problems',
        type: 'get',
        response: config => {
            const { page, pagesize, search } = config.query
            let _page=Number(page)
            let _pagesize=Number(pagesize)
            let st=_pagesize*(_page-1)
            let ed=min(st+_pagesize, pros.length)
            let res=[]
            for(let i=st;i<ed;i++){
                res.push(pros[i]);
            }
            return {
                code: 20000,
                data: {content:res, pagetotal:pagetotal}
            };
        }
    },
    
]