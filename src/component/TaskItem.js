import React from 'react';
class TaskItem extends React.Component {
    render() {
        var {item1, changeStatus, onDel, onUpDate} = this.props;
        return (
            <tr>
                <td>{item1.id}</td>
                <td>{item1.name}</td>
                <td onClick={()=>changeStatus(item1)} className="text-center">
                {item1.status === true ? 
                <span  className="label label-success">
                Kích hoạt
                </span> : 
                 <span className="label label-danger">
                 Ẩn
                 </span>}
                    
                </td>
                <td className="text-center">
                    <button onClick={()=>onUpDate(item1)} type="button" className="btn btn-warning">
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button onClick={()=>onDel(item1)} type="button" className="btn btn-danger">
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        )
    }
}

export default TaskItem;
