class NPC extends egret.DisplayObjectContainer implements Observer {
	
	public static NPC_HEIGHT = 200;
	public static PROMPT_SIZE = 50;

	private useprompt: egret.Bitmap;
	private bitmapNPC: egret.Bitmap;
	private useid: string;
	private usepanel: any;
	private usestage: any;

	public constructor(bitmapName: string, id: string, panel: egret.DisplayObjectContainer, stage: egret.DisplayObjectContainer) {

		super();

		this.touchEnabled = true;

		this.useid = id;
		this.usepanel = panel;
		this.usestage = stage;

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

	public get id() {
		return this.useid;
	}
	onNPCClick() {



		var task = TaskService.taskService.getTaskByCustomRule(this.rule);

		if (task == null) {
	
			return ErrorCode.MISSING_TASK;
		}

		this.usepanel.textField.text = task.desc;
		this.usepanel.NPCId = this.useid;
		this.usestage.setChildIndex(this.usepanel, this.usestage.numChildren - 1);
	}
	onChange(task: Task) {

		if (task.fromNpcId == this.id && task._status == TaskStatus.ACCEPTABLE) {    
		
			this.useprompt.texture = RES.getRes("HaveM_jpg");
			this.addChild(this.useprompt);
		}

		else if (task.toNpcId == this.id && task._status == TaskStatus.CAN_SUBMIT) { 
		
			this.useprompt.texture = RES.getRes("CompM_jpg");
			this.addChild(this.useprompt);
		}

		else {                         
			this.useprompt.texture = null;
		}
	}
	private rule(taskList: any):Task{
		for(let taskid in taskList){
			if(taskList[taskid]._status == TaskStatus.ACCEPTABLE || taskList[taskid]._status==TaskStatus.CAN_SUBMIT)
			{
				return taskList[taskid];
			}
		}
		return null;
	}


}