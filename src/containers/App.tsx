import * as React from 'react';
import '../less/App.less';
import Header from "../components/Header";
import ContentWrapper from "../components/ContentWrapper";

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            bruker: {
                navn: {
                    fornavn: ""
                }
            }
        }
    }

    componentDidMount() {
        fetch('/personinfo')
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(bruker => {
                console.log(bruker);
                this.setState({bruker});
            })
    }

    render() {

        return (
            <div className="App">
                <Header name={this.state.bruker.navn.fornavn} />
                <ContentWrapper />
            </div>
        );
    }
}

export default App;
