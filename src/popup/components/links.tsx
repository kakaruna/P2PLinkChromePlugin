import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "../models/link";

import "./links.scss";

interface LinksProps {
    data: Array<Link>;
}
interface LinksState {}

class Links extends React.Component<LinksProps, LinksState> {
    render() {
        const { data } = this.props;

        return (
            <Paper className="links">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="tablebody">
                        {data.map((n, i) => {
                            return (
                                <TableRow key={n.id}>
                                    <TableCell component="th" scope="row">
                                        {n.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {n.name}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default Links;
