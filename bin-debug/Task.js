var Task = (function () {
    function Task(id, name, fromNpcId, toNpcId, status) {
        this._id = id;
        this._name = name;
        this._fromNpcId = fromNpcId;
        this._toNpcId = toNpcId;
        this._status = status;
        this.desc = " ";
    }
    var d = __define,c=Task,p=c.prototype;
    d(p, "id"
        ,function () {
            return this._id;
        }
    );
    d(p, "name"
        ,function () {
            return this._name;
        }
    );
    d(p, "fromNpcId"
        ,function () {
            return this._fromNpcId;
        }
    );
    d(p, "toNpcId"
        ,function () {
            return this._toNpcId;
        }
    );
    return Task;
}());
egret.registerClass(Task,'Task');
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CAN_SUBMIT"] = 3] = "CAN_SUBMIT";
    TaskStatus[TaskStatus["SUBMITTED"] = 4] = "SUBMITTED";
})(TaskStatus || (TaskStatus = {}));
//# sourceMappingURL=Task.js.map