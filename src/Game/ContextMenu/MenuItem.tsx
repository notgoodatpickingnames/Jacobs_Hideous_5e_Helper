import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    menuItem: {
        ':hover': {
            backgroundColor: 'white',
        }
    },
}));

interface MenuItemProps {
    label: string;
    onClick: () => void;
}

export function MenuItem({label, onClick}: MenuItemProps) {
    const classes = useStyles();

    return (
        <div onClick={onClick} className={classes.menuItem}>
            {label}
        </div>
    );
}