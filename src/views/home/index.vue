<template>
    <mavonEditor v-model="content"
    :ishljs="true"
    :subfield="false"                                    
 		:boxShadow="false"                                    
 		defaultOpen="preview"                                    
 		:toolbarsFlag="false" 
    ></mavonEditor>
</template>
<script>

import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: "home",
  components: {
    mavonEditor
  },
  data() {
    return {
      content: "# 公告\n\n"+
    "## 运行参数\n" + 
    "- C: `gcc -DONLINE_JUDGE -fno-tree-ch -O2 -Wall -std=c99 main.c -lm -o main && ./main`\n" +
    "- CPP: `g++ -DONLINE_JUDGE -fno-tree-ch -O2 -Wall -std=c++14 main.cpp -lm -o main && ./main `\n"+
    "- Java(jdk8): `javac Main.java -encoding UTF8 && java -Dfile.encoding=UTF-8 -Djava.awt.headless=true Main`\n"+
    "- Python 2.7/3.6: `python main.py` `python3 main.py`\n"+
    "- Golang: `go build main.go && ./main`\n"+
    "\n"+
    "***题目显示的时间空间限制为C/C++语言。其他语言二倍时间空间限制。***\n"+
    "\n"+
    "## Q&A\n"+
    "  1. `main`的问题\n"+
    "错误的例子：\n"+
    "```c\n"+
    "void main()\n"+
    "{\n"+
    "    printf(\"hello\");\n"+
    "}\n"+
    "```\n"+
    "函数`main()`的返回类型必须是`int`，在`main()`里一定要有一句\n"+
    "```c\n"+
    "return 0;\n"+
    "```\n"+
    "`system(\"pause\");`将导致程序超时\n\n"+
    "2. 汉字问题\n"+
    "程序中不要出现任何汉字，即使在注释中也不行。服务器上使用的文字编码未必和你的电脑上的相同，你认为无害的汉字会被编译器认为是各种奇怪的东西。\n"+
    "\n"+
    "3. 输出格式问题\n"+
    "仔细阅读题目中对于输出格式的要求。因为在服务器上程序是严格地按照预设的输出来比对你的程序的输出。\n"+
    "常见的输出格式问题包括：\n"+
    " - 行末要求不带空格（或带空格）\n"+
    " - 输出要求分行（或不分行）\n"+
    " - 有空格没空格要看仔细\n"+
    " - 输出中的标点符号要看清楚，尤其是绝对不能用中文全角的标点符号，另外单引号\“'\”和一撇\“`\”要分清楚\n"+
    " - 当输出浮点数时，通常题目中会做适当处理，要求比较明确的输出格式，一定要严格遵守，因为浮点数会涉及到输出的精度问题\n"+
    " - 当输出浮点数时，如果可能输出`0`，而数据可能为负时，有可能出现输出`-0.0`的情况，需要自己写代码判断，保证不出现`-0.0`\n"+
    "\n"+
    "4. 不能用的库函数\n"+
    "某些库函数因为存在安全隐患是不能用的，目前主要常见的是`itoa`和`gets`。\n"+
    "\n"+
    "5. 过时的写法问题\n"+
    "某些旧书上的过时写法也会在服务器的gcc编译时引起错误，例如：\n"+
    "```c\n"+
    "int f()\n"+
    "int a;\n"+
    "{\n"+
    "}\n"+
    "```\n"+
    "6. 有什么条件判断我的程序是在OJ上运行吗？\n"+
    "您可以使用ONLINE_JUDGE这个条件定义。下面是使用举例：\n"+
    "C/C++\n"+
    "```c\n"+
    "#ifdef ONLINE_JUDGE\n"+
    "//此间的语句只有在OJ上的才会被编译\n"+
    "#endif\n"+
    "```\n"+
    "\n"+
    "7. 在OJ上我能使用哪些输入输出？\n"+
    " 只能使用标准输入输出，您的程序不允许操作文件，否则将被判为'Runtime Error'或者'Wrong Answer'。\n"+
    "\n"+
    "8. 评判结果是什么意思？\n"+
    " - Pending : 您提交的代码已进入队列。\n"+
    " - Running : 您的程序正在OJ上运行。\n"+
    " - Accepted (AC) : 您的程序是正确的，恭喜！\n"+
    " - Wrong Answer (WA) : 输出结果错误，这个一般认为是算法有问题。\n"+
    " - Runtime Error (RE) : 运行时错误，这个一般是程序在运行期间执行了非法的操作造成的。\n"+
    " - Time Limit Exceeded (TLE) : 您的程序运行的时间已经超出了这个题目的时间限制。\n"+
    " - Memory Limit Exceeded (MLE) : 您的程序运行的内存已经超出了这个题目的内存限制。\n"+
    " - Compilation Error (CE) : 您的程序语法有问题，编译器无法编译。具体的出错信息可以点击链接察看。\n"+
    " - System Error (SE) : OJ内部出现错误。由于我们的OJ可能存在一些小问题，所以出现这个信息请原谅，同时请及时与管理员联系。"
    }
  }
}
</script>
<style scoped>

</style>