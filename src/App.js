import './App.css';
import React, {useEffect, useState} from "react";
import {useTable} from 'react-table'
import Container from 'react-bootstrap/Container';
import './App.css';

const PATH_BASE = "http://localhost:3000";
const PATH_USERS = "/users";

// Functional stateless component
// destructured props
// const Table = ({list, onDismiss}) =>
//     <div>
//         {list.map(item =>
//             <div key={item.phone}>
//                 <span>{item.first_name} </span>
//                 <span>{item.last_name} </span>
//                 <span>{item.phone} </span>
//                 <span>{item.address} </span>
//                 <span>{item.postal_code} </span>
//                 <Button onClick={() => onDismiss(item.phone)}>
//                     Dismiss
//                 </Button>
//             </div>)}
//     </div>


// // Functional stateless component
// function Button(props) {
//     const {
//         onClick,
//         className = '', //  default '' because optional
//         children
//     } = props
//     return (
//         <button
//             onClick={onClick}
//             className={className}
//             type="button"
//         >
//             {children}
//         </button>
//     );
// }


// console.log("render: state", this.state)
// console.log("render: state.result", this.state.result)
// console.log("render: type of state.result", typeof this.state.result)
function App() {
    const [users, setUsers] = useState([])

    const data = React.useMemo(() => users)
    const columns = React.useMemo(
        () => [
            {
                Header: 'Fornavn',
                accessor: 'first_name', // accessor is the "key" in the data
            },
            {
                Header: 'Etternavn',
                accessor: 'last_name',
            },
            {
                Header: 'Tlf',
                accessor: 'phone',
            },
            {
                Header: 'Adresse',
                accessor: 'address',
            },
            {
                Header: 'Postnummer',
                accessor: 'postal_code',
            },
            {
                Header: 'By',
                accessor: 'city',
            },
        ],
        []
    )
    const tableInstance = useTable({columns, data})


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    console.log(users)
    useEffect(() => {
        fetch(`${PATH_BASE}${PATH_USERS}`)
            .then(response => response.json())
            .then(result => setUsers(result))
            .catch(error => error);
    }, []);

    return (
        <Container className="p-3">
            <h2> Brukere < /h2>
            <table {...getTableProps()}>
                <thead>
                {// Loop over the header rows
                    headerGroups.map(headerGroup => (
                        // Apply the header row props
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {// Loop over the headers in each row
                                headerGroup.headers.map(column => (
                                    // Apply the header cell props
                                    <th {...column.getHeaderProps()}>
                                        {// Render the header
                                            column.render('Header')}
                                    </th>
                                ))}
                        </tr>
                    ))}
                </thead>
                {/* Apply the table body props */}
                <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                    rows.map(row => {
                        // Prepare the row for display
                        prepareRow(row)
                        return (
                            // Apply the row props
                            <tr {...row.getRowProps()}>
                                {// Loop over the rows cells
                                    row.cells.map(cell => {
                                        // Apply the cell props
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {// Render the cell contents
                                                    cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Container>
    )
}

// Tidligere constructor
// constructor(props) {
//     super(props);
//     this.state = {
//         result: [],
//         searchTerm: `${PATH_BASE}${PATH_USERS}`,
//     }
//
//     // bindings
//     this.setUsers = this.setUsers.bind(this);
//     this.onDismiss = this.onDismiss.bind(this);
//
//
// }

// function setUsers(result)
// {
//     this.setState({result});
//     console.log("setUsers: result", result)
// }
//
// function onDismiss(phone)
// {
//     console.log("onDismiss: phone: ", phone)
//     console.log("onDismiss state", this.state)
//
//     const isNotPhone = item => item.phone !== phone;
//     const updatedHits = this.state.result.filter(isNotPhone);
//
//     this.setState({
//         // result: [...this.state.result, hits: updatedHits] // Spread operator
//         result: updatedHits // Spread operator
//     })
//
//     console.log("onDismiss: this.state.result etter filter", this.state.result)
// }
//
// function onSort(item)
// {
//
// }
//
// function componentDidMount()
// {
//     fetch(`${PATH_BASE}${PATH_USERS}`)
//         .then(response => response.json())
//         .then(result => this.setUsers(result))
//         .catch(error => error);
// }

export default App;
