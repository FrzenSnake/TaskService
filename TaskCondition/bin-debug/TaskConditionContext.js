var TaskCondition = (function () {
    function TaskCondition(task, total, fromNpcId, toNpcId, monsterID, desc) {
        this._task = task;
        this._current = 0;
        this._total = total;
        this._fromNpcId = fromNpcId;
        this._toNpcId = toNpcId;
        this._monsterID = monsterID;
        this._desc = desc;
    }
    var d = __define,c=TaskCondition,p=c.prototype;
    p.onAccept = function () {
        this._current = -2;
        this._task.setcurrent(this._current);
    };
    p.onSubmit = function () {
        this._current++;
        this._task.setcurrent(this._current);
    };
    return TaskCondition;
}());
egret.registerClass(TaskCondition,'TaskCondition');
var TASK_CONDITION;
(function (TASK_CONDITION) {
    TASK_CONDITION[TASK_CONDITION["NPC_TALK"] = 1] = "NPC_TALK";
    TASK_CONDITION[TASK_CONDITION["KILL_MONSTER"] = 2] = "KILL_MONSTER";
})(TASK_CONDITION || (TASK_CONDITION = {}));
//# sourceMappingURL=TaskConditionContext.js.map