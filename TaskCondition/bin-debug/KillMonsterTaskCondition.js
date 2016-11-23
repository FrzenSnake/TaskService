var KillMonsterTaskCondition = (function (_super) {
    __extends(KillMonsterTaskCondition, _super);
    function KillMonsterTaskCondition(task, total, monsterID, fromNpcId, toNpcId, desc) {
        _super.call(this, task, total, fromNpcId, toNpcId, monsterID, desc);
        this._monsterID = monsterID;
    }
    var d = __define,c=KillMonsterTaskCondition,p=c.prototype;
    p.onChange = function () {
    };
    return KillMonsterTaskCondition;
}(TaskCondition));
egret.registerClass(KillMonsterTaskCondition,'KillMonsterTaskCondition',["Observer"]);
//# sourceMappingURL=KillMonsterTaskCondition.js.map