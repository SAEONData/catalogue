export default () => {

    return (
        <>
            <div>

                {/* Expansion Icon */}
                {expanded ? (
                    <OpenIcon
                        size={iconSizeSmall}
                        onClick={() => {
                            setExpanded(!expanded)
                        }}
                    />
                ) : (
                        <ClosedIcon
                            size={iconSizeSmall}
                            onClick={() => {
                                setExpanded(!expanded)
                            }}
                        />
                    )}

                {/* Child Tree Items */}
                <div style={{ marginLeft: '6px' }} className={expanded ? undefined : clsx(classes.hidden)}>
                    {/* Mapping array of Tables */}
                    {/* STEVEN TO DO: sort tables and sort columns */}
                    {tables.map(table => {
                        return (
                            <TreeItem
                                key={table.id}
                                uniqueIdentifier={`${table.id}`}
                                primaryText={table.id}
                                itemDepth={1}
                                tableId={table.id}
                            >
                                {/* Mapping array of Columns */}
                                {table.fields.map(col => {
                                    return (
                                        <TreeItem
                                            key={`${table.id}-${col.column_name}`}
                                            uniqueIdentifier={`${table.id}-${col.column_name}`}
                                            primaryText={col.column_name}
                                            secondaryText={col.data_type}
                                            itemDepth={2}
                                            tableId={table.id}
                                        />
                                    )
                                })}
                            </TreeItem>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
