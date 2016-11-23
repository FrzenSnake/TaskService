class NPC extends egret.DisplayObjectContainer implements Observer {
	
	public static NPC_HEIGHT = 200;
	public static PROMPT_SIZE = 50;

	private useprompt: egret.Bitmap;

	private bitmapNPC: egret.Bitmap;
	private useid: string;
	private usepanel: any;
	private usestage: any;
    private usesceneService: SceneService;
	public constructor(bitmapName: string, id: string, panel: egret.DisplayObjectContainer, stage: egret.DisplayObjectContainer,usesceneService: SceneService) {

		super();

		this.touchEnabled = true;

		this.useid = id;
		this.usepanel = panel;
		this.usestage = stage;
        this.usesceneService = usesceneService;

		this.bitmapNPC = new egret.Bitmap;
		this.bitmapNPC.texture = RES.getRes(bitmapName);

		var scaleNum = NPC.NPC_HEIGHT / this.bitmapNPC.height;  
		this.bitmapNPC.scaleY = scaleNum;
		this.bitmapNPC.scaleX = scaleNum;
		this.bitmapNPC.y = NPC.PROMPT_SIZE + 10;                

		this.useprompt = new egret.Bitmap;
		this.useprompt.height = NPC.PROMPT_SIZE;
		this.useprompt.width = NPC.PROMPT_SIZE;
		this.useprompt.x = 40;
		this.useprompt.y = 0;

		this.addChild(this.bitmapNPC);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.onNPCClick();
		}, this);
	}

	onNPCClick() {
		console.log("touch NPC");

		var taskcondition = this.rule(this.usesceneService.taskConditionList);

		if (taskcondition == null) {
			console.log("No Mission On this NPC");
			return ErrorCode.MISSING_TASK;
		}

		this.usepanel.touchEnabled = true;

		this.usepanel.textField.text = taskcondition._desc;
		this.usepanel.taskcondition = taskcondition;

		if (taskcondition._task.getTaskStatus() == TaskStatus.ACCEPTABLE) {
			this.usepanel.buttonText.text = "接受";
		}
		else if (taskcondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT) {
			this.usepanel.buttonText.text = "完成";
		}
		else {
			this.usepanel.buttonText.text = "继续";
		}

		this.usestage.setChildIndex(this.usepanel, this.usestage.numChildren - 1);
	}

	private rule = (taskConditionList: TaskCondition[]): TaskCondition => {

		for (let taskCondition of taskConditionList) {
			if ((taskCondition._task.getTaskStatus() == TaskStatus.ACCEPTABLE
				&& taskCondition._fromNpcId == this.useid)
				|| (taskCondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT
					&& taskCondition._toNpcId == this.useid)) {
				return taskCondition;
			}
		}
		return null;
	}
	
	onChange() {
		var taskcondition = this.rule(this.usesceneService.taskConditionList);
		if (taskcondition == null) {
			console.log("No picture");
			this.useprompt.texture = null;
			return ErrorCode.MISSING_TASK;
		}

		if (taskcondition._fromNpcId == this.useid && taskcondition._task.getTaskStatus() == TaskStatus.ACCEPTABLE) {     //此NPC有可接任务
			console.log("mission !");
			this.useprompt.texture = RES.getRes("HaveM_jpg");
			this.addChild(this.useprompt);
		}

		else if (taskcondition._toNpcId == this.useid && taskcondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT) {   //此NPC有可交任务
			console.log("mission ?");
			this.useprompt.texture = RES.getRes("CompM_jpg");
			this.addChild(this.useprompt);
		}

		else {                           //此NPC无任务
			console.log("done!");
			this.useprompt.texture = null;
		}

	}
	


}