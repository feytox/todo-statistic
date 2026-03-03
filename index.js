const { getAllFilePathsWithExtension, readFile } = require("./fileSystem");
const { readLine } = require("./console");
const { getTodosFromFileContent } = require("./todoParser");
const { printTodosTable } = require("./todoFormatter");

const files = getFiles();
const todos = getAllTodos();

console.log("Please, write your command!");
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), "js");
    return filePaths.map((path) => readFile(path));
}

function getAllTodos() {
    const result = [];
    for (const fileContent of files) {
        result.push(...getTodosFromFileContent(fileContent));
    }
    return result;
}

function printTodos(todoList) {
    printTodosTable(todoList);
}

function processCommand(command) {
    const [cmd, ...args] = command.trim().split(/\s+/);

    switch (cmd) {
        case "exit":
            process.exit(0);
            break;
        case "show":
            printTodos(todos);
            break;
        case "important":
            printTodos(todos.filter((todo) => todo.importance > 0));
            break;
        case 'user': {
            const username = args.join(' ').toLowerCase();
            printTodos(
                todos.filter(
                    todo => todo.user && todo.user.toLowerCase() === username
                )
            );
            break;
        }
        case "sort": {
            const sortType = args[0];
            let sorted;
            switch (sortType) {
                case "importance":
                    sorted = [...todos].sort(
                        (a, b) => b.importance - a.importance,
                    );
                    break;
                case "user":
                    sorted = [...todos].sort((a, b) => {
                        if (!a.user && !b.user) return 0;
                        if (!a.user) return 1;
                        if (!b.user) return -1;
                        return a.user
                            .toLowerCase()
                            .localeCompare(b.user.toLowerCase());
                    });
                    break;
                case "date":
                    sorted = [...todos].sort((a, b) => {
                        if (!a.date && !b.date) return 0;
                        if (!a.date) return 1;
                        if (!b.date) return -1;
                        return b.date.localeCompare(a.date);
                    });
                    break;
                default:
                    console.log("wrong sort argument");
                    return;
            }
            printTodos(sorted);
            break;
        }
        case "date": {
            const inputDate = args[0];
            if (!inputDate) {
                console.log("wrong date argument");
                return;
            }
            const normalizeDate = (d) => {
                const parts = d.split("-");
                while (parts.length < 3) parts.push("00");
                return parts.join("-");
            };
            const normalizedInput = normalizeDate(inputDate);
            printTodos(
                todos.filter(
                    (todo) =>
                        todo.date &&
                        normalizeDate(todo.date) >= normalizedInput,
                ),
            );
            break;
        }
        default:
            console.log("wrong command");
            break;
    }
}
