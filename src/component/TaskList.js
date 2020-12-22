import React from 'react';
import TaskItem from './TaskItem';
class TaskList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1// all
        }
    }

    onchange = async (event)=>{
        await this.setState({
            [event.target.name]: event.target.value
        })

        this.props.onFilter(this.state.filterName, this.state.filterStatus);
    }
    render() {
        var {filterName, filterStatus} = this.state;
        var {tasks, changeStatus, onDel,  onUpDate, onFilter} = this.props;
        var element = tasks.map((item)=> <TaskItem 
            changeStatus={changeStatus} 
            onDel={onDel} 
            key={item.id} item1={item}
            onUpDate={onUpDate}
            />)
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input 
                                type="text" 
                                className="form-control"
                                name="filterName"
                                value={filterName}
                                onChange={this.onchange}
                             />
                        </td>
                        <td>
                            <select 
                                className="form-control"
                                name="filterStatus"
                                value={filterStatus} 
                                onChange={this.onchange}  
                            >
                                <option value={-1}>Tất Cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích Hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {element}
                </tbody>
            </table>
        )
    }
}

export default TaskList;