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
                <Button onClick={() => onDismiss(item.first_name)}>
                    Dismiss
                </Button>
            </div>)}
    </div>


// Functional stateless component
function Button(props) {
    const {
        onClick,
        className = '', // Settes som default '' fordi optional
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
            result: null,// før: result: null,
            searchTerm: `${PATH_BASE}${PATH_USERS}`,
        }

        // bindings
        this.setUsers = this.setUsers.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    setUsers(result) {
        this.setState({result});
        console.log("result fra setUsers")
        console.log(result) // object
    }

    onDismiss(phone) {
        console.log("onDismiss: this.state.result")
        console.log(this.state.result)
        const isNotID = item => item.phone !== phone;

        const updatedHits = this.state.result.filter(isNotID);
        this.setState({
            result: {...this.state.result, hits: updatedHits} // Spread operator
        })
    }

    componentDidMount() {
        fetch(`${PATH_BASE}${PATH_USERS}`)
            .then(response => response.json())
            .then(result => this.setUsers(result))
            .catch(error => error);
    }

    render() {
        const {result} = this.state

        if (!result) {
            return null;
        }
        console.log("result from render")
        console.log(this.state.result)
        return (
            <div className="App">
                <h2>Brukere</h2>
                <Table
                    // children props passed down from above
                    list={result}
                    onDismiss={this.onDismiss}
                />
            </div>
        );
    }
}

export default App;
