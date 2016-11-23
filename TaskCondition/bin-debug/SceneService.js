var SceneService = (function (_super) {
    __extends(SceneService, _super);
    function SceneService() {
        _super.call(this);
        this.taskConditionList = [];
        this.sceneStuffList = [];
    }
    var d = __define,c=SceneService,p=c.prototype;
    p.addTaskCondition = function (o) {
        this.taskConditionList.push(o);
        this.notify();
    };
    p.addsceneStuff = function (o) {
        this.sceneStuffList.push(o);
        this.notify();
    };
    p.notify = function () {
        for (var _i = 0, _a = this.sceneStuffList; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.onChange();
        }
    };
    return SceneService;
}(EventEmitter));
egret.registerClass(SceneService,'SceneService');
//# sourceMappingURL=SceneService.js.map