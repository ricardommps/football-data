import { fade } from '@material-ui/core/styles/colorManipulator';
export const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    helpIconButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    iconSearch: {
        marginTop: "14px",
        marginBottom: "0px",
        margin: theme.spacing.unit
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },

    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    alert: {
        padding: theme.spacing.unit * 2,
    },

    control: {
        padding: theme.spacing.unit * 2,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    formControlSeason: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    formControlCod: {
        margin: theme.spacing.unit,
        minWidth: 120,
        paddingTop: '16px',
        paddingRight: '5px'
    },

    AppLogo: {
        animation: 'App-logo-spin infinite 20s linear',
        height: '40vmin',
        pointerEvents: 'none',
    },

    AppHeader: {
        textAlign: 'center',
        backgroundColor: '#282c34',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white',
    },

});