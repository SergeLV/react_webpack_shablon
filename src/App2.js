import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ApproveColor, DeclaineColor } from './colors';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            debounced: '',

        };
        this.onSearch$ = new Rx.Subject();
        this.onSearch = this.onSearch.bind(this);
    }
    componentDidMount(){
        this.subscription = this.onSearch$
            .debounceTime(300)
            .subscribe(debounced => this.setState({ debounced }));
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onSearch(e) {
        const search = e.target.value;
        this.setState({ search });
        this.onSearch$.next(search);
    }

    render() {
        const { search, debounced } = this.state;
        return (
            <div>
                <input type="text" value={search} onChange={this.onSearch} />
                <div>debounced value: {debounced}</div>
            </div>
        );
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
);