var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(bitmapName, id, panel, stage) {
        var _this = this;
        _super.call(this);
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
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.onNPCClick();
        }, this);
    }
    var d = __define,c=NPC,p=c.prototype;
    d(p, "id"
        ,function () {
            return this.useid;
        }
    );
    p.onNPCClick = function () {
        var task = TaskService.taskService.getTaskByCustomRule(this.rule);
        if (task == null) {
            return ErrorCode.MISSING_TASK;
        }
        this.usepanel.textField.text = task.desc;
        this.usepanel.NPCId = this.useid;
        this.usestage.setChildIndex(this.usepanel, this.usestage.numChildren - 1);
    };
    p.onChange = function (task) {
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
    };
    p.rule = function (taskList) {
        for (var taskid in taskList) {
            if (taskList[taskid]._status == TaskStatus.ACCEPTABLE || taskList[taskid]._status == TaskStatus.CAN_SUBMIT) {
                return taskList[taskid];
            }
        }
        return null;
    };
    NPC.NPC_HEIGHT = 200;
    NPC.PROMPT_SIZE = 50;
    return NPC;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC,'NPC',["Observer"]);
//# sourceMappingURL=NPC.js.map