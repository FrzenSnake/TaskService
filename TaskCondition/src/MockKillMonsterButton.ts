class MockKillMonsterButton extends egret.DisplayObjectContainer {

	private _sceneService: SceneService;
	public _monsterID: string;

	public button: egret.Shape;
	public textField : egret.TextField;

	public constructor(sceneService: SceneService, monsterID: string) {
		super();

		this._monsterID = monsterID;

		this._sceneService = sceneService;
		this.touchEnabled = true;

		this.button = new egret.Shape();
		this.button.graphics.beginFill(0x000000, 0.5);
		this.button.graphics.drawRect(0, 0, 200, 100);
		this.button.graphics.endFill();
		this.addChild(this.button);

		this.textField = new egret.TextField();
		this.textField.text = "Monsters!";
		this.textField.x = 10;
		this.textField.y = 30;
		this.addChild(this.textField);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.onButtonClick();
		}, this);
	}

	onButtonClick() {
		for (let taskCondition of this._sceneService.taskConditionList) {
			if ((taskCondition._task.getTaskStatus() == TaskStatus.DURING
				&& taskCondition._monsterID == this._monsterID)) {
				taskCondition.onSubmit();
				this.textField.text = "you killed "+taskCondition._current;
			}
		}
	}
}