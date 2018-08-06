import * as React from 'react';
import '../App.css';
import Header from "../components/Header";

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
                <Header name="Kari" />
                <div className="content">
                    Innhold
                </div>
            </div>
        );
    }
}

export default App;
