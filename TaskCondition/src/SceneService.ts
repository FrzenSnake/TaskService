class SceneService extends EventEmitter {

	public taskConditionList: TaskCondition[] = [];

	private sceneStuffList: Observer[] = [];

	public constructor() {
		super();
	}

	addTaskCondition(o: TaskCondition) {
		this.taskConditionList.push(o);
		this.notify();
	}

	addsceneStuff(o: Observer) {
		this.sceneStuffList.push(o);
		this.notify();
	}

	notify() {
		for (let observer of this.sceneStuffList) {
			observer.onChange();
		}
	}
}