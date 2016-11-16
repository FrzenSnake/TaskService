class Task {
	private _id:string;
	private _name:string;

	public desc:string;
	public _status:TaskStatus;

	private _fromNpcId:string;
	private _toNpcId:string;

	public constructor(id:string,name:string,fromNpcId:string,toNpcId:string,status:TaskStatus) 
	{
		this._id=id;
		this._name=name;
		this._fromNpcId=fromNpcId;
		this._toNpcId=toNpcId;
		this._status=status;
		this.desc=" ";
	}
	public get id():string{
		return this._id;
	}
	public get name():string{
		return this._name;
	}
	public get fromNpcId():string{
        return this._fromNpcId;
	}
    public get toNpcId():string{
		return this._toNpcId;
	}
}
enum TaskStatus {
	UNACCEPTABLE=0,
	ACCEPTABLE=1,
	DURING=2,
	CAN_SUBMIT=3,
	SUBMITTED=4
	
}