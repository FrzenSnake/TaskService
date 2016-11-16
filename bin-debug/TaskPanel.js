var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel() {
        _super.call(this);
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
    p.onChange = function (task) {
        if (task._status == TaskStatus.CAN_SUBMIT || task._status == TaskStatus.ACCEPTABLE) {
            this.textField.text = task.desc;
        }
        if (task._status == TaskStatus.SUBMITTED) {
            this.textField.text = " ";
        }
    };
    TaskPanel.TOTAL_WIDTH = 500;
    TaskPanel.TOTAL_HEIGHT = 500;
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
//# sourceMappingURL=TaskPanel.js.map