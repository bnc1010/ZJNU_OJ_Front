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
    key: 'c',
    id: '0'
  },
  {
    value: 'text/x-c++src',
    label: 'C++',
    key: 'cpp',
    id: '1'
  },
  {
    value: 'text/x-java',
    label: 'Java',
    key: 'java',
    id: '2'
  },
  {
    value: 'text/x-python',
    label: 'Python2',
    key: 'py2',
    id: '3'
  },
  {
    value: 'text/x-python',
    label: 'Python3',
    key: 'py3',
    id: '4'
  },
  {
    value: 'text/x-go',
    label: 'Golang',
    key: 'go',
    id: '5'
  }
]

export default {
  CMOptions,
  LangOptions
}
