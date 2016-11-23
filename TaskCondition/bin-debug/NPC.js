var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(bitmapName, id, panel, stage, usesceneService) {
        var _this = this;
        _super.call(this);
        this.rule = function (taskConditionList) {
            for (var _i = 0, taskConditionList_1 = taskConditionList; _i < taskConditionList_1.length; _i++) {
                var taskCondition = taskConditionList_1[_i];
                if ((taskCondition._task.getTaskStatus() == TaskStatus.ACCEPTABLE
                    && taskCondition._fromNpcId == _this.useid)
                    || (taskCondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT
                        && taskCondition._toNpcId == _this.useid)) {
                    return taskCondition;
                }
            }
            return null;
        };
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
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.onNPCClick();
        }, this);
    }
    var d = __define,c=NPC,p=c.prototype;
    p.onNPCClick = function () {
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
    };
    p.onChange = function () {
        var taskcondition = this.rule(this.usesceneService.taskConditionList);
        if (taskcondition == null) {
            console.log("No picture");
            this.useprompt.texture = null;
            return ErrorCode.MISSING_TASK;
        }
        if (taskcondition._fromNpcId == this.useid && taskcondition._task.getTaskStatus() == TaskStatus.ACCEPTABLE) {
            console.log("mission !");
            this.useprompt.texture = RES.getRes("HaveM_jpg");
            this.addChild(this.useprompt);
        }
        else if (taskcondition._toNpcId == this.useid && taskcondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT) {
            console.log("mission ?");
            this.useprompt.texture = RES.getRes("CompM_jpg");
            this.addChild(this.useprompt);
        }
        else {
            console.log("done!");
            this.useprompt.texture = null;
        }
    };
    NPC.NPC_HEIGHT = 200;
    NPC.PROMPT_SIZE = 50;
    return NPC;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC,'NPC',["Observer"]);
//# sourceMappingURL=NPC.js.map