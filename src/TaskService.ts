
class TaskService {

	private observerList: Observer[] = [];

	private taskList: {
		[index: string]: Task
	} = {};
	
	public static taskService: TaskService;

	public constructor() {

		if (!TaskService.taskService) {
			TaskService.taskService = this;
		}
		return TaskService.taskService;

	}

	public addTask(task: Task) {
		this.taskList[task.id] = task;
		this.notify();
	}

	public addObserver(o: Observer) {
		this.observerList.push(o);
		this.notify();
	}

	finish(id: string):ErrorCode {

		if (!id) {
			return ErrorCode.MISSING_TASK;
		}

		let task = this.taskList[id];

		if (!task) {
			return ErrorCode.MISSING_TASK;
		}

		task._status = TaskStatus.SUBMITTED;
		task.desc = "Mission Complete";
		this.notify();
		return ErrorCode.SUCCESS;
	}

	accept(id: string):ErrorCode {
		if (!id) {
			return ErrorCode.MISSING_TASK;
		}

		let task = this.taskList[id];

		if (!task) {
			return ErrorCode.MISSING_TASK;
		}

		task._status = TaskStatus.CAN_SUBMIT;
		task.desc = "Kill Him!!!"
		this.notify();
		return ErrorCode.SUCCESS;
	}

	getTaskByCustomRule(rule: Function): Task {
		return rule(this.taskList);
	}

	notify(): void {
		for (let taskId in this.taskList) {
			for (let observe of this.observerList) {
				observe.onChange(this.taskList[taskId]);
			}
		}
	}
}

enum ErrorCode {
	MISSING_TASK = 0,
	SUCCESS = 1,
}

interface Observer {
	onChange(task: Task);
}