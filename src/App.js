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
        // console.log("Fra constructor: state.result: " + this.state.result)
        // console.log("Fra constructor: this.props: " + this.props)
    }

    setUsers(result) {
        console.log("setUsers kjører")
        this.setState({result});
        console.log("result fra setUsers" + result) // object
        // console.log("state fra setUsers" + this.state)
    }

    onDismiss(phone) {
        // console.log("Fra onDismiss(): phone: " + phone)
        console.log(this.state.result)
        // console.log("Fra onDismiss(): item.phone: " + item.phone)
        // console.log("Fra onDismiss(): result:" + this.state.result)
        const isNotID = item => item.phone !== phone;
        // console.log("Fra onDismiss(): item : " + this.state.result.filter(isNotID()))

        const updatedHits = this.state.result.filter(isNotID);
        // console.log("updatedHits " + updatedHits)
        // const updatedHits = this.state.result.filter(isNotID())
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
        // console.log("Fra render(): this.onDismiss: " + this.onDismiss) // result og mer snacks
        // console.log("render(): result: " + result)

        if (!result) {
            return null;
        }
        console.log("result fra render:" + this.state.result)
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
