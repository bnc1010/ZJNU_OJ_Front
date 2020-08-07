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

detialcontest={
    description: "## 这是比赛说明\n```c++\n#include<bits/stdc++.h>\n```\n",
    endTime: "2020-03-06T11:45:00Z",
    ended: true,
    id: 3,
    length: "300",
    normalEndTime: "2020-03-06 19:45",
    normalStartTime: "2020-03-06 14:45",
    pattern: "acm",
    privilege: "public",
    problems: [
        {
            id: 9, 
            problem: {
                active: true,
                description: "甜甜从小就喜欢画图画，最近他买了一支智能画笔，由于刚刚接触，所以甜甜只会用它来画直线，于是他就在平面直角坐标系中画出如下的图形：\n![](http://118.25.96.118:8081/api/media/d3015e28cc1b105b3c78a385c8702144)\n甜甜的好朋友蜜蜜发现上面的图还是有点规则的，于是他问甜甜：在你画的图中，我给你两个点，请你算一算连接两点的折线长度（即沿折线走的路线长度）吧。",
                hint: "",
                input: "第一个数是正整数 $N(\le100)$ 。代表数据的组数。\n每组数据由四个非负整数组成 $x1,y1,x2,y2$；所有的数都不会大于100。",
                memoryLimit: 32768000,
                output: "对于每组数据，输出两点(x1,y1),(x2,y2)之间的折线距离。注意输出结果精确到小数点后3位。",
                sampleInput: "5\n0 0 0 1\n0 0 1 0\n2 3 3 1\n99 99 9 9\n5 5 5 5",
                sampleOutput: "1.000\n2.414\n10.646\n54985.047\n0.000",
                source: "",
                timeLimit: 1000,
                title: ""
            }, 
            tempId: 1, 
            tempTitle: "A simple problemold", 
            submitted: 5, 
            accepted: 5
        },
        {
            id: 1,
            problem:{
                active: true,
                description: "遥远的吉奥米特王国座落在一个无限大的平面上，国王普捷特的宫殿位于原点，坐标为 $(0,0)$ ，某一天，王国的考古学家发现了两处神迹，分别位于 $(x1,y1)$ 和 $(x2,y2)$ ，根据前朝古籍记载，如果修建一条无限长的直线道路，满足\n\n道路经过国王的宫殿\n两处神迹到道路的最短距离相等\n那么这条道路的尽头，就是那古籍中虚无缥缈的神居，国王普捷特非常想要窥探神的真面目，于是命令聪明的你作为工程师，规划指导这条通往神居的道路的修建工作。可是，这样的道路存在吗？如果存在，唯一吗？",
                hint: "",
                input: "第一行是一个整数 $t$ ，\n表示数据个数，接下来 $t$ 行，每行四个整数 $x1,y1,x2,y2$ ，表示两个神迹的位置，满足 $1\le t \le 100$ ，$|x1|,|y1|,|x2|,|y2|\le 1000$，神迹的位置以及国王的宫殿位置可能重合",
                memoryLimit: 65536000,
                output: "对于每组数据，如果题目中所述的道路存在且唯一，那么输出“Let’s do it!”，否则输出“It’s impossible!”，不含引号",
                sampleInput: "2\n1 1 -2 -2\n0 0 0 0",
                sampleOutput: "Let's do it!\nIt's impossible!",
                source: "段忠杰",
                timeLimit: 1000,
                title: ""
            },
            tempId: 2, 
            tempTitle: "寻神者的道路", 
            submitted: 5, 
            accepted: 4
        },
        {
            id: 2,
            problem:{
                active: true,
                description: "遥远的吉奥米特王国座落在一个无限大的平面上，国王普捷特的宫殿位于原点，坐标为 $(0,0)$ ，某一天，王国的考古学家发现了两处神迹，分别位于 $(x1,y1)$ 和 $(x2,y2)$ ，根据前朝古籍记载，如果修建一条无限长的直线道路，满足\n\n道路经过国王的宫殿\n两处神迹到道路的最短距离相等\n那么这条道路的尽头，就是那古籍中虚无缥缈的神居，国王普捷特非常想要窥探神的真面目，于是命令聪明的你作为工程师，规划指导这条通往神居的道路的修建工作。可是，这样的道路存在吗？如果存在，唯一吗？",
                hint: "",
                input: "第一行是一个整数 $t$ ，\n表示数据个数，接下来 $t$ 行，每行四个整数 $x1,y1,x2,y2$ ，表示两个神迹的位置，满足 $1\le t \le 100$ ，$|x1|,|y1|,|x2|,|y2|\le 1000$，神迹的位置以及国王的宫殿位置可能重合",
                memoryLimit: 65536000,
                output: "对于每组数据，如果题目中所述的道路存在且唯一，那么输出“Let’s do it!”，否则输出“It’s impossible!”，不含引号",
                sampleInput: "2\n1 1 -2 -2\n0 0 0 0",
                sampleOutput: "Let's do it!\nIt's impossible!",
                source: "段忠杰",
                timeLimit: 1000,
                title: ""
            },
            tempId: 3, 
            tempTitle: "寻神者的道路2", 
            submitted: 10, 
            accepted: 4
        },
    ],
    runStatu: "已结束",
    startTime: "2020-03-06T06:45:00Z",
    started: true,
    title: "学分制班考试"
}

function min(a,b){
    if(a<b)return a
    else return b
}

module.exports = [
    {
        url: '/vue-element-admin/api/contest/problem/[0-9].*',
        type: 'get',
        response: config => {
            return {
                code: 20000,
                data: detialcontest
            };
        }
    },
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
    },
    
]