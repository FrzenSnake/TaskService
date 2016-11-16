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
        this.textField = new egret.TextField();
        this.textField.y = 10;
        this.addChild(this.textField);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.onButtonClick();
        }, this);
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    p.onButtonClick = function () {
        console.log("touch Panel");
        var task = TaskService.taskService.getTaskByCustomRule(this.rule);
        if (task == null) {
            console.log("what?the");
            this.usestage.setChildIndex(this, 0);
            return ErrorCode.MISSING_TASK;
        }
        if (task.fromNpcId == this.NPCId && task._status == TaskStatus.ACCEPTABLE) {
            TaskService.taskService.accept(task.id);
        }
        if (task.toNpcId == this.NPCId && task._status == TaskStatus.CAN_SUBMIT) {
            TaskService.taskService.finish(task.id);
        }
        this.usestage.setChildIndex(this, 0);
    };
    p.rule = function (taskList) {
        for (var taskid in taskList) {
            if (taskList[taskid]._status == TaskStatus.ACCEPTABLE || taskList[taskid]._status == TaskStatus.CAN_SUBMIT) {
                return taskList[taskid];
            }
        }
        return null;
    };
    DialoguePanel.TOTAL_WIDTH = 400;
    DialoguePanel.TOTAL_HEIGHT = 300;
    DialoguePanel.BUTTON_WIDTH = 100;
    DialoguePanel.BUTTON_HEIGHT = 70;
    return DialoguePanel;
}(egret.DisplayObjectContainer));
egret.registerClass(DialoguePanel,'DialoguePanel');
//# sourceMappingURL=DialoguePanel.js.map