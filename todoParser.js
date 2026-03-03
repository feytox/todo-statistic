function parseTodoLine(line, fileName = '') {
    const todoMatch = line.match(/\/\/\s*TODO\s+(.*)/);
    if (!todoMatch) {
        return null;
    }

    const rawText = todoMatch[1].trim();
    const importance = (rawText.match(/!/g) || []).length;

    // "Имя; Дата; Текст"
    const structuredMatch = rawText.match(
        /^([^;]+);\s*(\d{4}-\d{2}-\d{2});\s*(.+)$/
    );

    if (structuredMatch) {
        return {
            importance,
            user: structuredMatch[1].trim(),
            date: structuredMatch[2].trim(),
            comment: structuredMatch[3].trim(),
            fileName,
        };
    }

    return {
        importance,
        user: null,
        date: null,
        comment: rawText,
        fileName,
    };
}

function getTodosFromFileContent(fileContent, fileName = '') {
    return fileContent
        .split('\n')
        .map(line => parseTodoLine(line, fileName))
        .filter(todo => todo !== null);
}

module.exports = { parseTodoLine, getTodosFromFileContent };