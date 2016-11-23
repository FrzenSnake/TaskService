var NPCTalkTaskCondition = (function (_super) {
    __extends(NPCTalkTaskCondition, _super);
    function NPCTalkTaskCondition(task, fromNpcId, toNpcId, desc) {
        _super.call(this, task, 1, fromNpcId, toNpcId, null, desc);
        this._fromNpcId = fromNpcId;
        this._toNpcId = toNpcId;
    }
    var d = __define,c=NPCTalkTaskCondition,p=c.prototype;
    p.onChange = function () {
    };
    return NPCTalkTaskCondition;
}(TaskCondition));
egret.registerClass(NPCTalkTaskCondition,'NPCTalkTaskCondition',["Observer"]);
//# sourceMappingURL=NPCTalkTaskCondition.js.map