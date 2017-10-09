import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ApproveColor, DeclaineColor } from './colors';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            debounced: '',
            textcorrect: false,
        };
        this.onSearch$ = new Rx.Subject();
        this.onSearch = this.onSearch.bind(this);
    }
    componentDidMount(){
        this.subscription = this.onSearch$
            .debounceTime(this.props.DelayTime)
            .subscribe(debounced => this.setState({ debounced }));
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onSearch(e) {
        console.log(this.props.MinLength);
        const search = e.target.value,
        minlenght = this.props.MinLength;
        this.setState({ search });
        this.onSearch$.next(search);
        console.log(search.length,minlenght);
        if (search.length>minlenght) {
            this.setState({ textcorrect:true });
        } else
        {
            this.setState({ textcorrect:false });
        }
    }

    render() {
        const { search, debounced } = this.state;
        return (
            <div>
                <input type="text" value={search} onChange={this.onSearch}
                       style={{borderColor : this.state.textcorrect ? ApproveColor : DeclaineColor }}/>
                <div>debounced value: {debounced}</div>
            </div>
        );
    }
}

ReactDOM.render(
    <Search MinLength = {2} DelayTime = {500} />,
    document.getElementById('root')
);