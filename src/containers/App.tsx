import * as React from 'react';
import '../less/App.less';
import Header from "../components/Header";
import ContentWrapper from "../components/ContentWrapper";

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            user: {
                name: '',
                fnr: ''
            }
        }
    }

    componentDidMount() {
        fetch('/user')
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(user => {
                console.log(user);
                this.setState({user});
            })
    }

    render() {
        return (
            <div className="App">
                <Header name={this.state.user.name} />
                <ContentWrapper />
            </div>
        );
    }
}

export default App;
