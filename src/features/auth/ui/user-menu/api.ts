export interface TodoItem {
	id: string;
	title: string;
	completed: boolean;
	date: string;
}

export async function fetchTodos(): Promise<TodoItem[]> {
	const res = await fetch('/api/todos');
	if (!res.ok) return [];
	const data = await res.json();
	return data.todos ?? [];
}
