
class DialoguePanel extends egret.DisplayObjectContainer {

	private usestage: egret.DisplayObjectContainer;
	public NPCId: string;

	public textField: egret.TextField;
	public button: egret.Shape;
	public belowPanel: egret.Shape;

	public static TOTAL_WIDTH = 400;
	public static TOTAL_HEIGHT = 300;

	public static BUTTON_WIDTH = 100;
	public static BUTTON_HEIGHT = 70;

	public constructor(stage: egret.DisplayObjectContainer) {

		super();

		this.usestage = stage;

		this.belowPanel = new egret.Shape();
        this.belowPanel.graphics.beginFill(0x000000, 0.5);
        this.belowPanel.graphics.drawRect(0, 0, DialoguePanel.TOTAL_WIDTH, DialoguePanel.TOTAL_HEIGHT);
        this.belowPanel.graphics.endFill();
        this.addChild(this.belowPanel);

		this.button = new egret.Shape();
		this.button.graphics.beginFill(0x000000, 0.5);
        this.button.graphics.drawRect((DialoguePanel.TOTAL_WIDTH - DialoguePanel.BUTTON_WIDTH) / 2, DialoguePanel.TOTAL_HEIGHT - DialoguePanel.BUTTON_HEIGHT, DialoguePanel.BUTTON_WIDTH, DialoguePanel.BUTTON_HEIGHT);
        this.button.graphics.endFill();
		this.addChild(this.button);

		this.textField = new egret.TextField();
		this.textField.y = 10;
		this.addChild(this.textField);

		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.onButtonClick();
		}, this);
	}

	onButtonClick() {
		console.log("touch Panel");

		var task = TaskService.taskService.getTaskByCustomRule(this.rule);
		if (task == null) {
			console.log("what?the");
			this.usestage.setChildIndex(this, 0);
			return ErrorCode.MISSING_TASK;
		}

		if(task.fromNpcId == this.NPCId && task._status == TaskStatus.ACCEPTABLE){
			TaskService.taskService.accept(task.id);
		}
		if (task.toNpcId == this.NPCId && task._status == TaskStatus.CAN_SUBMIT) {
			TaskService.taskService.finish(task.id);
		}
		this.usestage.setChildIndex(this, 0);
	}

	rule(taskList: any): Task {

		for (let taskid in taskList) {
			if (taskList[taskid]._status == TaskStatus.ACCEPTABLE || taskList[taskid]._status == TaskStatus.CAN_SUBMIT) {
				return taskList[taskid];
			}
		}
		return null;
	}
}