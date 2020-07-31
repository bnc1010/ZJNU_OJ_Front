const CMOptions={
    mode: 'text/x-csrc',
    smartIndent:true,
    matchBrackets: true,
    tabSize: 4,
    theme: 'ttcn',
    lineNumbers: true,
    line: true,
}

const LangOptions=[
    {
        value:'text/x-csrc',
        label: 'C'
    },
    {
        value:'text/x-c++src',
        label: 'C++'
    },
    {
        value:'text/x-java',
        label: 'Java'
    },
    {
        value:'text/x-python',
        label: 'Python2'
    },
    {
        value:'text/x-python',
        label: 'Python3'
    },
    {
        value:'text/x-go',
        label: 'Golang'
    },
]

export default{
    CMOptions,
    LangOptions
}　