import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {ApproveColor, DeclaineColor} from './colors';

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




    componentDidMount() {
        this.subscription = this.onSearch$
            .debounceTime(this.props.DelayTime)
            .subscribe(debounced => this.setState({debounced}));
    }




    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }




    checkPhoneNumber(str) {
        //0675555555 шаблон
        const lengthPhone = 10,
        PhoneCountryOperator = ['039','050','063','066','067','091',
            '092','093','094','095','096','097','098','098'],
        len = str.length;
        var re = /^[0-9]{10}$/;

        if (re.test(str)==false) {
            return false;
        }

        // проверка на первые пять цифр
        if (len>5) {
            if (PhoneCountryOperator.indexOf(str.substring(0,3)) < 0) {
                return false;
            }
        }
        return true;
    }




    checkEmail(str) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log('re>>>',re.test(str));
        if (re.test(str)==true) {
            return true;
        } else return false;
    }




    checkString(str) {
        var re = /^[A-zА-яЁёєЄїЇіІ]+$/;
        console.log('re>>>',re.test(str));
        if ('string',re.test(str)==true) {
            return true;
        } else return false;
    }

    checkNumber(str) {
        var re = /^\d+$/;
        console.log('re>>>',re.test(str));
        if ('number',re.test(str)==true) {
            return true;
        } else return false;
    }




    checkOnType (TypeInput, str) {

        switch (TypeInput) {
            case 'phonenumber':
                return this.checkPhoneNumber(str);
            case 'email':
                return this.checkEmail(str);
            case 'string':
                return this.checkString(str);
            case 'number':
                return this.checkNumber(str);
            default:
                return true;
        }
    }




    onSearch(e) {
        const search = e.target.value,
            minlenght = this.props.MinLength,
            maxlength = this.props.MaxLength,
            // TypeInput='phonenumber' 'email' 'string' 'number' 'any'
            TypeInput = this.props.TypeInput;

        this.setState({search});
        this.onSearch$.next(search);
        console.log( this.checkOnType(TypeInput, search));
        if (search.length >= minlenght && search.length <= maxlength && this.checkOnType(TypeInput, search)) {
            this.setState({textcorrect: true});
        } else {
            this.setState({textcorrect: false});
        }


    }




    render() {
        const {search, debounced} = this.state;
        return (
            <div>
                <input type="text" value={search} onChange={this.onSearch}
                       style={{borderColor: this.state.textcorrect ? ApproveColor : DeclaineColor}}/>
                <div>debounced value: {debounced}</div>
            </div>
        );
    }
}

 Search.propTypes = {
     MinLength: PropTypes.number.isRequired,
     MaxLength: PropTypes.number.isRequired,
     DelayTime: PropTypes.number.isRequired,
     TypeInput: PropTypes.string.isRequired
 };




    //TypeInput={'phonenumber'} or TypeInput={'email'} or TypeInput={'string'} or TypeInput={'number'} or TypeInput={'any'}
ReactDOM.render(
    <Search MinLength={10} MaxLength={10} DelayTime={500} TypeInput={'phonenumber'}/>,
    document.getElementById('phonenumber'),
);
ReactDOM.render(
    <Search MinLength={7} MaxLength={40} DelayTime={500} TypeInput={'email'}/>,
    document.getElementById('email'),
);

ReactDOM.render(
    <Search MinLength={2} MaxLength={40} DelayTime={500} TypeInput={'string'}/>,
    document.getElementById('string'),
);

ReactDOM.render(
    <Search MinLength={2} MaxLength={40} DelayTime={500} TypeInput={'number'}/>,
    document.getElementById('number'),
);

ReactDOM.render(
    <Search MinLength={2} MaxLength={40} DelayTime={500} TypeInput={'any'}/>,
    document.getElementById('any'),
);



