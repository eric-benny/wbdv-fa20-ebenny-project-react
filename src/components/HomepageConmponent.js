import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './NavigationComponent'


class Homepage extends React.Component {
    render() {
        return (
            <div>
                <Navigation user={this.props.match.params.userId}/>
                <h1>Home Page</h1>
            </div>
        );
    }
}

export default Homepage;
