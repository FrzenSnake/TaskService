var TaskService = (function (_super) {
    __extends(TaskService, _super);
    function TaskService(sceneService) {
        _super.call(this);
        this.taskList = {};
        this.sceneService = sceneService;
        if (!TaskService.taskService) {
            TaskService.taskService = this;
        }
        return TaskService.taskService;
    }
    var d = __define,c=TaskService,p=c.prototype;
    p.addTask = function (task) {
        this.taskList[task._id] = task;
        this.taskList[task._id].addObserver(this);
        this.notify();
    };
    p.accept = function (id) {
        if (!id) {
            return ErrorCode.MISSING_TASK;
        }
        var task = this.taskList[id];
        if (!task) {
            return ErrorCode.MISSING_TASK;
        }
        if (task._status == TaskStatus.ACCEPTABLE || task._status == TaskStatus.UNACCEPTABLE) {
            if (task._status == TaskStatus.ACCEPTABLE) {
                task._status = TaskStatus.DURING;
            }
            else if (task._status == TaskStatus.UNACCEPTABLE) {
                task._status = TaskStatus.ACCEPTABLE;
            }
            task.checkStatus();
            this.notify();
            return ErrorCode.SUCCESS;
        }
        return ErrorCode.MISSING_TASK;
    };
    p.notify = function () {
        this.sceneService.notify();
    };
    p.onChange = function () {
        this.notify();
    };
    return TaskService;
}(EventEmitter));
egret.registerClass(TaskService,'TaskService',["Observer"]);
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["MISSING_TASK"] = 0] = "MISSING_TASK";
    ErrorCode[ErrorCode["SUCCESS"] = 1] = "SUCCESS";
})(ErrorCode || (ErrorCode = {}));
//# sourceMappingURL=TaskService.js.map