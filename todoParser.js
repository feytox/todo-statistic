function parseTodoLine(line, fileName = '') {
    if (!line.includes('\/\/ TODO ')) return null;

    const rawText = line.split('\/\/ TODO ')[1].trim();
    const importance = rawText.includes('!') ? rawText.split('!').length - 1 : 0;

    const structuredMatch = rawText.split('; ');

    if (structuredMatch.length === 3) {
        return {
            importance,
            user: structuredMatch[0].trim(),
            date: structuredMatch[1].trim(),
            comment: structuredMatch[2].trim(),
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