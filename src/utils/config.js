const CMOptions = {
  mode: 'text/x-csrc',
  smartIndent: true,
  matchBrackets: true,
  tabSize: 4,
  theme: 'ttcn',
  lineNumbers: true,
  line: true
}

const LangOptions = [
  {
    value: 'text/x-csrc',
    label: 'C',
    key: 'c'
  },
  {
    value: 'text/x-c++src',
    label: 'C++',
    key: 'cpp'
  },
  {
    value: 'text/x-java',
    label: 'Java',
    key: 'java'
  },
  {
    value: 'text/x-python',
    label: 'Python2',
    key: 'py2'
  },
  {
    value: 'text/x-python',
    label: 'Python3',
    key: 'py3'
  },
  {
    value: 'text/x-go',
    label: 'Golang',
    key: 'go'
  }
]

export default {
  CMOptions,
  LangOptions
}
