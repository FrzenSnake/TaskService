class TaskPanel extends egret.DisplayObjectContainer implements Observer{
	private textField:egret.TextField;
	private belowPanel:egret.Shape;

	public static TOTAL_WIDTH = 500;
	public static TOTAL_HEIGHT = 500;
	public constructor() {
		super();
		this.textField = new egret.TextField();
		this.textField.width = TaskPanel.TOTAL_WIDTH;

		this.belowPanel = new egret.Shape();
		this.belowPanel.graphics.beginFill(0x000000,0.5);
		this.belowPanel.graphics.drawRect(0,0,DialoguePanel.TOTAL_WIDTH,DialoguePanel.TOTAL_HEIGHT);
		this.belowPanel.graphics.endFill();

		this.addChild(this.belowPanel);
		this.addChild(this.textField);
	}
	onChange(task:Task){
		if(task._status == TaskStatus.CAN_SUBMIT||task._status == TaskStatus.ACCEPTABLE){
			this.textField.text = task.desc;
		}
		if(task._status == TaskStatus.SUBMITTED){
           this.textField.text=" ";
		}
		
	}
}