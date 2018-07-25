import * as React from "react";
import { Column, Table } from "react-virtualized";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "../models/link";

import "react-virtualized/styles.css";
import "./links.scss";

interface LinksProps {
    data: Array<Link>;
    onCheckChange: (id: number, checked: boolean) => void;
}
interface LinksState {}

class Links extends React.Component<LinksProps, LinksState> {
    headerRenderer(header: { dataKey; sortBy; sortDirection }) {
        if (this.props.data.length > 0) {
            return (
                <Checkbox
                    checked={this.props.data.findIndex(l => l.checked === false) < 0}
                    onChange={(name, checked) => this.props.onCheckChange(null, checked)}
                    value="checkall"
                    color="primary"
                />
            );
        } else {
            return <span />;
        }
    }

    cellRenderer(cell: { cellData: number }) {
        let l: Link = this.props.data.find(d => d.id === cell.cellData);

        return (
            <Checkbox
                checked={l.checked}
                onChange={(name, checked) => this.props.onCheckChange(cell.cellData, checked)}
                value={l.link}
                color="primary"
            />
        );
    }

    noRowsRenderer() {
        return <div className="noRows">No rows</div>;
    }

    render() {
        const { data } = this.props;
        const filterData = data.filter(l => l.showable === true);

        const width = document.body.offsetWidth;
        const height = document.body.offsetHeight;

        return (
            <Table
                ref="Table"
                className="links"
                headerHeight={30}
                rowHeight={30}
                height={height}
                rowGetter={(i: { index: number }) => filterData[i.index]}
                rowClassName="row"
                rowCount={filterData.length}
                noRowsRenderer={() => this.noRowsRenderer}
                width={width}
            >
                <Column
                    label="选择"
                    dataKey="id"
                    width={50}
                    headerRenderer={({ dataKey, sortBy, sortDirection }) =>
                        this.headerRenderer({ dataKey, sortBy, sortDirection })
                    }
                    cellRenderer={({ cellData }) => this.cellRenderer({ cellData })}
                />
                <Column label="序号" dataKey="id" width={30} cellRenderer={({ rowIndex }) => rowIndex + 1} />
                <Column label="名称" dataKey="name" width={200} flexGrow={1} />
                <Column label="大小" dataKey="size" width={60} />
            </Table>
        );
    }
}

export default Links;
