const MAX_WIDTHS = {
	importance: 1,
	user: 10,
	date: 10,
	comment: 50,
	fileName: 15,
};

function truncate(str, maxLen) {
	if (str.length <= maxLen) {
		return str;
	}
	return str.slice(0, maxLen - 3) + "...";
}

function calcColumnWidths(todoList) {
	const widths = {
		importance: 1,
		user: 0,
		date: 0,
		comment: 0,
		fileName: 0,
	};

	for (const todo of todoList) {
		widths.user = Math.max(widths.user, (todo.user || "").length);
		widths.date = Math.max(widths.date, (todo.date || "").length);
		widths.comment = Math.max(widths.comment, (todo.comment || "").length);
		widths.fileName = Math.max(widths.fileName, (todo.fileName || '').length);
	}

	widths.user = Math.min(widths.user, MAX_WIDTHS.user);
	widths.date = Math.min(widths.date, MAX_WIDTHS.date);
	widths.comment = Math.min(widths.comment, MAX_WIDTHS.comment);
	widths.fileName = Math.min(widths.fileName, MAX_WIDTHS.fileName);

	return widths;
}

function formatRow(importance, user, date, comment, fileName, widths) {
	return (
		`  ${importance.padEnd(widths.importance)}` +
		`  |  ${user.padEnd(widths.user)}` +
		`  |  ${date.padEnd(widths.date)}` +
		`  |  ${comment.padEnd(widths.comment)}` +
		`  |  ${fileName.padEnd(widths.fileName)}`
	);
}

function formatTodoRow(todo, widths) {
	const importance = todo.importance > 0 ? "!" : " ";
	const user = truncate(todo.user || "", widths.user);
	const date = truncate(todo.date || "", widths.date);
	const comment = truncate(todo.comment || "", widths.comment);
	const fileName = truncate(todo.fileName || '', widths.fileName);
	return formatRow(importance, user, date, comment, fileName, widths);
}

function printTodosTable(todoList) {
	const widths = calcColumnWidths(todoList);

	widths.user = Math.max(widths.user, "user".length);
	widths.date = Math.max(widths.date, "date".length);
	widths.comment = Math.max(widths.comment, "comment".length);
	widths.fileName = Math.max(widths.fileName, 'file'.length);

	const header = formatRow("!", "user", "date", "comment", "file", widths);
	console.log(header);

	const totalWidth = header.length;
	const separator = "-".repeat(totalWidth);
	console.log(separator);

	for (const todo of todoList) {
		console.log(formatTodoRow(todo, widths));
	}

	console.log(separator);
}

module.exports = { printTodosTable };
