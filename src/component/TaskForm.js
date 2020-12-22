import React from 'react';
class TaskForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            status: true
        }
    }

    componentWillMount(){
        var obj = this.props.taskEdit;
        if(obj){
            this.setState({
                id: obj.id,
                name: obj.name,
                status: obj.status
            })
        }
    }

    onChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addUser = (event)=>{
        event.preventDefault();
        this.props.onAdd(this.state);
        this.setState({
            id: '',
            name: '',
            status: true
        })
    }
    render() {
        var {closeForm} = this.props;
        var title = this.props.taskEdit ? 'Cập nhật công việc' : 'Thêm Công Việc';
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {title}
                    </h3>
                </div>
                <div className="panel-body">
                    <form>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input 
                                onChange={this.onChange}
                                name='name' 
                                value={this.state.name} 
                                type="text" className="form-control" />
                        </div>
                        <label>Trạng Thái :</label>
                        <select onChange={this.onChange} value={this.state.status} name='status' className="form-control" required="required">
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning" onClick={this.addUser}>Thêm</button>&nbsp;
                            <button type="submit" className="btn btn-danger" onClick={closeForm}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default TaskForm;