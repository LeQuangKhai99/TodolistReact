import React from 'react';
import './App.css';

import TaskForm from './component/TaskForm';
import Control from './component/control';
import TaskList from './component/TaskList';
var randomstring = require("randomstring");

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      isDisplayForm: false,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sort:{
        by: 'name',
        value: 1
      }
    }
  }

  onGenerateData = () => {
    var tasks = [
      {
        id: randomstring.generate(5),
        name: 'NodeJS',
        status: true
      },
      {
        id: randomstring.generate(5),
        name: 'React',
        status: true
      },
      {
        id: randomstring.generate(5),
        name: '.NET',
        status: false
      }
    ]

    this.setState({
      tasks: tasks
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  showForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm,

    })
  }

  closeForm = () => {
    this.setState({
      isDisplayForm: false,
      taskEdit: null
    })
  }

  onUpDate = async (data) => {
    var list = this.state.tasks;
    var index = list.indexOf(data);
    await this.setState({
      taskEdit: list[index]
    })

    this.showForm();
  }

  onAdd = (data) => {
    if (data.id === '') {
      if (data.name !== '') {
        data.status = data.status === 'false' ? false : true;
        var list = JSON.parse(localStorage.getItem('tasks')) || [];
        data.id = randomstring.generate(5);
        list.push(data);
        localStorage.setItem('tasks', JSON.stringify(list))
        this.setState({
          tasks: list,
          taskEdit: null
        })
      }
    }
    else {
      var list = JSON.parse(localStorage.getItem('tasks')) || [];
      var index = list.findIndex((i) => i.id === data.id);
      list = [
        ...list.slice(0, index),
        {
          ...list[index],
          name: data.name,
          status: data.status
        },
        ...list.slice(index + 1)
      ]
      localStorage.setItem('tasks', JSON.stringify(list))
      this.setState({
        tasks: list,
        taskEdit: null
      })
    }
    this.closeForm();

  }

  changeStatus = (data) => {
    var list = this.state.tasks;
    var index = list.indexOf(data);

    var x = [
      ...list.slice(0, index),
      {
        ...data,
        status: !data.status
      },
      ...list.slice(index + 1)
    ]

    this.setState({
      tasks: x
    })

    localStorage.setItem('tasks', JSON.stringify(x))
  }

  onDel = (data) => {
    var list = this.state.tasks;
    var index = list.indexOf(data);
    var x = [
      ...list.slice(0, index),
      ...list.slice(index + 1)
    ]

    this.setState({
      tasks: x
    })
    this.closeForm();
    localStorage.setItem('tasks', JSON.stringify(x))
  }

  btnAdd = () => {
    this.showForm();
    this.setState({
      taskEdit: null
    })
  }

  onFilter = (filterName, filterStatus) => {
    this.setState({
      filter: {
        name: filterName,
        status: filterStatus
      }
    })
  }

  onChangeKeyWord = (data)=>{
    this.setState({
      keyword: data
    })
  }

  onSort = async (sortBy, sortVaule)=>{
    await this.setState({
      sort:{
        by: sortBy,
        value: sortVaule
      }
    })
  }

  render() {
    var { tasks, 
          isDisplayForm, 
          taskEdit, 
          filter, 
          keyword,
          sort
      } = this.state;
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name.toLocaleLowerCase()) !== -1;
        })
      }

      tasks = tasks.filter((task) => {
        if (parseInt(filter.status) === -1) {
          return task;
        }
        else {
          return (parseInt(filter.status) === 1 ? true : false) === task.status;

        }
      })
    }
    if(keyword !== ''){
      tasks = tasks.filter((item)=>{
        return item.name.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) !== -1;
      })
    }

    if(sort.by === 'name') {
      tasks.sort((a, b)=>{
        if(a.name > b.name) return sort.value;
        else if(a.name < b.name) return -sort.value;
        else return 0;
      })
    }else{
      tasks.sort((a, b)=>{
        var x = a.status === true ? 1 : 0;
        var y = b.status === true ? 1 : 0;
        if(x > y) return -sort.value;
        else if(x < y) return sort.value;
        else return 0;
      })
    }
    return (
      <div className="App">
        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr />
          </div>
          <div className="row">
            <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
              {isDisplayForm ? <TaskForm
                closeForm={this.closeForm}
                onAdd={this.onAdd}
                taskEdit={taskEdit}
              /> : ''}
            </div>
            <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' :
              'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
              <button onClick={this.btnAdd} type="button" className="btn btn-primary">
                <span className="fa fa-plus mr-5"></span>Thêm Công Việc
              </button>
              <Control
                onChangeKeyWord={this.onChangeKeyWord}
                onSort={this.onSort}
              />
              <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList
                    tasks={tasks}
                    changeStatus={this.changeStatus}
                    onDel={this.onDel}
                    onUpDate={this.onUpDate}
                    onFilter={this.onFilter}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
