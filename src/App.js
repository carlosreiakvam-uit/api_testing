import './App.css';
import React, {useEffect, useState} from "react";
import {useTable} from 'react-table'
import Container from 'react-bootstrap/Container';
import './App.css';
import {useSortBy} from "react-table";

const PATH_BASE = "http://localhost:3000";
const PATH_USERS = "/users";

function Table({columns, data}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
            columns,
            data,
        },
        useSortBy
    )
    const firstPageRows = rows.slice(0, 20)

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            // Add the sorting props to control sorting. For this example
                            // we can add them into the header props
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                {/* Add a sort direction indicator */}
                                <span>
                    {column.isSorted
                        ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                        : ''}
                  </span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {firstPageRows.map(
                    (row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    )
                                })}
                            </tr>
                        )
                    }
                )}
                </tbody>
            </table>
            <br/>
            <div>Showing the first 20 results of {rows.length} rows</div>
        </>
    )
}


function App() {
    const [users, setUsers] = useState([])

    const data = React.useMemo(() => users, [users])
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
    // const tableInstance = useTable({columns, data})


    useEffect(() => {
        fetch(`${PATH_BASE}${PATH_USERS}`)
            .then(response => response.json())
            .then(result => setUsers(result))
            .catch(error => error);
    }, []);

    return (
        <Container className="p-3">
            <h2> Elever </h2>
            <Table columns={columns} data={data}/>
        </Container>
    )
}


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


export default App;
