var DialoguePanel = (function (_super) {
    __extends(DialoguePanel, _super);
    function DialoguePanel(stage) {
        var _this = this;
        _super.call(this);
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
        this.buttonText = new egret.TextField();
        this.buttonText.x = (DialoguePanel.TOTAL_WIDTH - DialoguePanel.BUTTON_WIDTH) / 2 + 20;
        this.buttonText.y = DialoguePanel.TOTAL_HEIGHT - DialoguePanel.BUTTON_HEIGHT + 20;
        this.addChild(this.buttonText);
        this.textField = new egret.TextField();
        this.textField.y = 10;
        this.textField.width = DialoguePanel.TOTAL_WIDTH;
        this.addChild(this.textField);
        this.touchEnabled = false;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.onButtonClick();
        }, this);
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    p.onButtonClick = function () {
        if (this.taskcondition._task.getTaskStatus() == TaskStatus.ACCEPTABLE) {
            console.log(this.taskcondition._task.getTaskId());
            TaskService.taskService.accept(this.taskcondition._task.getTaskId());
        }
        else if (this.taskcondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT
            && this.taskcondition._task.getcurrent() == this.taskcondition._task.getTotal()) {
            this.taskcondition.onAccept();
        }
        this.usestage.setChildIndex(this, 0);
        this.touchEnabled = false;
    };
    DialoguePanel.TOTAL_WIDTH = 400;
    DialoguePanel.TOTAL_HEIGHT = 300;
    DialoguePanel.BUTTON_WIDTH = 100;
    DialoguePanel.BUTTON_HEIGHT = 70;
    return DialoguePanel;
}(egret.DisplayObjectContainer));
egret.registerClass(DialoguePanel,'DialoguePanel');
//# sourceMappingURL=DialoguePanel.js.map