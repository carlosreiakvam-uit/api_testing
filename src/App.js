import './App.css';
import React, {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import {useTable, useSortBy} from 'react-table'
import {useForm} from 'react-hook-form'

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

    return (
        // Med utgangspunkt i eksempel fra https://react-table.tanstack.com/docs/examples/sorting
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
                {rows.map(
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
        </>
    )
}


function App() {
    const [users, setUsers] = useState([])
    const {register, handleSubmit} = useForm();
    const onSubmit = data => {
        // // POST data to API
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch(`${PATH_BASE}${PATH_USERS}`, requestOptions)
            .then(response => response.json())
            .then(setUsers(data.data))
        // setUsers({data})
        // .then(result => setUsers(JSON.parse(result)))
        // .then(data => setUsers(JSON.parse(data)))
        // .catch(error => error);

        // // console.log("hallo?")
        // fetch(`${PATH_BASE}${PATH_USERS}`)
        //     .then(response => response.json())
        //     .then(result => setUsers(result))
        //     .catch(error => error);
    }

    // const data = React.useMemo(() => users, [users])
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


    // Fetch data from API
    useEffect(() => {
        fetch(`${PATH_BASE}${PATH_USERS}`)
            .then(response => response.json())
            .then(result => setUsers(result))
            .catch(error => error);
    }, []);

    return (
        <Container className="p-3">

            <h3> Elever </h3>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("first_name", {required: 'Felt må fylles ut'})} placeholder="Fornavn"/>
                    <input {...register("last_name", {required: true})} placeholder="Etternavn"/>
                    <input {...register("phone", {required: true})} placeholder="Tlf"/>
                    <input {...register("address", {required: true})} placeholder="Addresse"/>
                    <input {...register("postal_code",
                        {required: true, minLength: {value: 4, message: '4 '}})}
                           placeholder="Postnummer"/>
                    <input {...register("city", {required: true})} placeholder="By"/>
                    <input type="submit" name="Legg til"/>
                </form>
            </div>

            <Table columns={columns} data={users}/>
        </Container>
    )
}

export default App;
