var MockKillMonsterButton = (function (_super) {
    __extends(MockKillMonsterButton, _super);
    function MockKillMonsterButton(sceneService, monsterID) {
        var _this = this;
        _super.call(this);
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
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.onButtonClick();
        }, this);
    }
    var d = __define,c=MockKillMonsterButton,p=c.prototype;
    p.onButtonClick = function () {
        for (var _i = 0, _a = this._sceneService.taskConditionList; _i < _a.length; _i++) {
            var taskCondition = _a[_i];
            if ((taskCondition._task.getTaskStatus() == TaskStatus.DURING
                && taskCondition._monsterID == this._monsterID)) {
                taskCondition.onSubmit();
                this.textField.text = "you killed " + taskCondition._current;
            }
        }
    };
    return MockKillMonsterButton;
}(egret.DisplayObjectContainer));
egret.registerClass(MockKillMonsterButton,'MockKillMonsterButton');
//# sourceMappingURL=MockKillMonsterButton.js.map