const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');
const { getTodosFromFileContent } = require('./todoParser');

const files = getFiles();
const todos = getAllTodos();

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function getAllTodos() {
    const result = [];
    for (const fileContent of files) {
        result.push(...getTodosFromFileContent(fileContent));
    }
    return result;
}

function printTodos(todoList) {
    todoList.forEach(todo => console.log(todo.comment));
}

function processCommand(command) {
    const [cmd, ...args] = command.trim().split(/\s+/);

    switch (cmd) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            printTodos(todos);
            break;
        default:
            console.log('wrong command');
            break;
    }
}