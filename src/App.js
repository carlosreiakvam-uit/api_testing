import './App.css';
import {Component} from "react";

const PATH_BASE = "http://localhost:3000";
const PATH_USERS = "/users";

// Functional stateless component
// destructured props
const Table = ({list, onDismiss}) =>
    <div>
        {list.map(item =>
            <div key={item.phone}>
                <span>{item.first_name} </span>
                <span>{item.last_name} </span>
                <span>{item.phone} </span>
                <span>{item.address} </span>
                <span>{item.postal_code} </span>
                <span>{item.city} </span>
                <Button onClick={() => onDismiss(item.phone)}>
                    Dismiss
                </Button>
            </div>)}
    </div>


// Functional stateless component
function Button(props) {
    const {
        onClick,
        className = '', //  default '' because optional
        children
    } = props
    return (
        <button
            onClick={onClick}
            className={className}
            type="button"
        >
            {children}
        </button>
    );
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            searchTerm: `${PATH_BASE}${PATH_USERS}`,
        }

        // bindings
        this.setUsers = this.setUsers.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    setUsers(result) {
        this.setState({result});
        console.log("setUsers: result", result)
    }

    onDismiss(phone) {
        console.log("onDismiss: phone: ", phone)
        console.log("onDismiss state", this.state)

        const isNotPhone = item => item.phone !== phone;
        const updatedHits = this.state.result.filter(isNotPhone);

        this.setState({
            // result: [...this.state.result, hits: updatedHits] // Spread operator
            result: updatedHits // Spread operator
        })

        console.log("onDismiss: this.state.result etter filter", this.state.result)

    }

    componentDidMount() {
        fetch(`${PATH_BASE}${PATH_USERS}`)
            .then(response => response.json())
            .then(result => this.setUsers(result))
            .catch(error => error);
    }

    render() {
        console.log("render: state", this.state)
        console.log("render: state.result", this.state.result)
        console.log("render: type of state.result", typeof this.state.result)
        const {result} = this.state

        if (!result) {
            return null;
        }
        return (
            <div className="App">
                <h2>Brukere</h2>
                <Table
                    // children props, passed down from above
                    list={result}
                    onDismiss={this.onDismiss}
                />
            </div>
        );
    }
}

export default App;
