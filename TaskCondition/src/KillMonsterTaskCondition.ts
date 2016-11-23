class KillMonsterTaskCondition extends TaskCondition implements Observer {

	public constructor(task: TaskConditionContext, total: number, monsterID: string, fromNpcId: string, toNpcId: string, desc: string) {
		super(task, total, fromNpcId, toNpcId, monsterID, desc);
		this._monsterID = monsterID;
	}

	onChange() {

	}
}