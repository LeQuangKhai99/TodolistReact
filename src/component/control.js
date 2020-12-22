import React from 'react';
import Search from './search';
import Sort from './sort';
class Control extends React.Component {
    render() {
        var {onChangeKeyWord, onSort, sort} = this.props;
        return (
            <div className="row mt-15">
                <Search 
                    onChangeKeyWord={onChangeKeyWord}
                />
                <Sort 
                    onSort={onSort}
                    sort={sort}
                />
            </div>
              
        )
    }
}

export default Control;