import React from 'react';
class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            keyword: ''
        }
    }

    onChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSearch = ()=>{
        this.props.onChangeKeyWord(this.state.keyword)
    }
    render() {
        
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                      <input value={this.state.keyword} name='keyword' onChange={this.onChange} type="text" className="form-control" placeholder="Nhập từ khóa..." />
                      <span className="input-group-btn">
                          <button onClick={this.onSearch} className="btn btn-primary" type="button">
                              <span className="fa fa-search mr-5"></span>Tìm
                        </button>
                      </span>
                </div>
            </div>
        )
    }
}

export default Search;