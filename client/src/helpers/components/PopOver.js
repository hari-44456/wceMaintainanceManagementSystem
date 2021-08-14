import React, { useEffect } from 'react';
import Popover from '@material-ui/core/Popover';

export default function PopOver({ event, content }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        setAnchorEl(event);
    }, [event]);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            {content}
        </Popover>
    );
}
