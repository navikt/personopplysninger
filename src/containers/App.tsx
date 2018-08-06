import * as React from 'react';
import '../App.css';
import Header from "../components/Header";


class App extends React.Component {
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
