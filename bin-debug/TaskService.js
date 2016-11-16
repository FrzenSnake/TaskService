var TaskService = (function () {
    function TaskService() {
        this.observerList = [];
        this.taskList = {};
        if (!TaskService.taskService) {
            TaskService.taskService = this;
        }
        return TaskService.taskService;
    }
    var d = __define,c=TaskService,p=c.prototype;
    p.addTask = function (task) {
        this.taskList[task.id] = task;
        this.notify();
    };
    p.addObserver = function (o) {
        this.observerList.push(o);
        this.notify();
    };
    p.finish = function (id) {
        if (!id) {
            return ErrorCode.MISSING_TASK;
        }
        var task = this.taskList[id];
        if (!task) {
            return ErrorCode.MISSING_TASK;
        }
        task._status = TaskStatus.SUBMITTED;
        task.desc = "Mission Complete";
        this.notify();
        return ErrorCode.SUCCESS;
    };
    p.accept = function (id) {
        if (!id) {
            return ErrorCode.MISSING_TASK;
        }
        var task = this.taskList[id];
        if (!task) {
            return ErrorCode.MISSING_TASK;
        }
        task._status = TaskStatus.CAN_SUBMIT;
        task.desc = "Kill Him!!!";
        this.notify();
        return ErrorCode.SUCCESS;
    };
    p.getTaskByCustomRule = function (rule) {
        return rule(this.taskList);
    };
    p.notify = function () {
        for (var taskId in this.taskList) {
            for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
                var observe = _a[_i];
                observe.onChange(this.taskList[taskId]);
            }
        }
    };
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["MISSING_TASK"] = 0] = "MISSING_TASK";
    ErrorCode[ErrorCode["SUCCESS"] = 1] = "SUCCESS";
})(ErrorCode || (ErrorCode = {}));
//# sourceMappingURL=TaskService.js.map