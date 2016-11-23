var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel(sceneService) {
        _super.call(this);
        this.usesceneService = sceneService;
        this.textField = new egret.TextField();
        this.textField.width = TaskPanel.TOTAL_WIDTH;
        this.belowPanel = new egret.Shape();
        this.belowPanel.graphics.beginFill(0x000000, 0.5);
        this.belowPanel.graphics.drawRect(0, 0, DialoguePanel.TOTAL_WIDTH, DialoguePanel.TOTAL_HEIGHT);
        this.belowPanel.graphics.endFill();
        this.addChild(this.belowPanel);
        this.addChild(this.textField);
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function () {
        for (var _i = 0, _a = this.usesceneService.taskConditionList; _i < _a.length; _i++) {
            var taskCondition = _a[_i];
            if (taskCondition._task.getTaskStatus() == TaskStatus.DURING || taskCondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT) {
                this.textField.text = taskCondition._task.getTaskId() + ": " + taskCondition._task.getName();
                ;
            }
            else {
                this.textField.text = " ";
            }
        }
    };
    TaskPanel.TOTAL_WIDTH = 200;
    TaskPanel.TOTAL_HEIGHT = 300;
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
//# sourceMappingURL=TaskPanel.js.map