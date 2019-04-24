import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import { ToastManager } from '../common/UI';

import { getCompetitions } from '../redux/footballData/actions'
import { getResultCompetitions } from '../redux/footballData/selectors'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import HelpIcon from '@material-ui/icons/Help';

import { styles } from './homeStyle'

import logo from '../football-data.jpg';

const suggestions = [
    { label: 'Brazilian Division One', value: "BSA" },
    { label: 'Premiere League', value: "PL" },
    { label: 'Championship', value: "ELC" },
    { label: 'Champions League', value: "CL" },
    { label: 'European Championships', value: "EC" },
    { label: 'France League 1', value: "FL1" },
    { label: 'Bundesliga', value: "BL1" },
    { label: 'Italy Serie A', value: "SA" },
    { label: 'Eredivise', value: "DED" },
    { label: 'Portuguese Primera Division', value: "PPL" },
    { label: 'Primera Division', value: "PD" }
].map(suggestion => ({
    value: suggestion.value,
    label: suggestion.label,
}));

const renderRows = (rows) => {
    return rows[0].table.map(item => {
        return (
            <TableRow key={item.team.id}>
                <TableCell align="left" style={{ width: 10 }}>{item.position}</TableCell>
                <TableCell align="left"><strong>{item.team.name}</strong></TableCell>
                <TableCell align="left">{item.points}</TableCell>
                <TableCell align="left">{item.won}</TableCell>
                <TableCell align="left">{item.draw}</TableCell>
                <TableCell align="left">{item.lost}</TableCell>
            </TableRow>
        )
    })
}
function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            className={classes.textField}
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                }
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) =>
                    part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 500 }}>
                            {part.text}
                        </span>
                    ) : (
                            <strong key={String(index)} style={{ fontWeight: 300 }}>
                                {part.text}
                            </strong>
                        ),
                )}
            </div>
        </MenuItem>
    );
}

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

function getSuggestionValue(suggestion) {
    return suggestion.value;
}

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            codeCompetition: '',
            popper: '',
            suggestions: [],
            season: '',
        }
        this.handleClickCompetitions = this.handleClickCompetitions.bind(this);
        this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this)
        this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeSeason = this.handleChangeSeason.bind(this)
        this.helpPage = this.helpPage.bind(this)
    }

    helpPage = () => {
        const pageHelp = 'https://www.football-data.org/assets/FootballData_API_Tiers_and_Competitions_June_2018.pdf'
        window.open(pageHelp, "_blank") 
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = name => (event, { newValue }) => {
        this.setState({
            [name]: newValue,
        });
    };

    handleChangeSeason = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    

    handleClickCompetitions = () => {
        const {codeCompetition, season} = this.state
        if(codeCompetition.length == 0 || season.length == 0){
            ToastManager.showWarningMessage(`Competitions and Season are Required `);
        }else{
            this.props.getCompetitions(codeCompetition, season)
            .catch(err => {
                console.log(">>err", err)
            })
        }
    }

    render() {
        const { classes } = this.props
        const competitionSeason = this.props.resultCompetitions.competitions
        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion,
        };
        console.log(">>>",competitionSeason.standings)
        return (
            <React.Fragment>
                <AppBar position="static" color="default">
                    <Toolbar>
                    <IconButton 
                        className={classes.helpIconButton} 
                        color="inherit" 
                        aria-label="Help"
                        onClick={() => this.helpPage()} 
                    >
                        <HelpIcon />
                    </IconButton>
                        <div className={classes.grow} />
                        <div className={classes.search}>
                            <FormControl className={classes.formControlCod}>
                                <Autosuggest
                                    {...autosuggestProps}
                                    inputProps={{
                                        classes,
                                        placeholder: 'Competitions Search a ',
                                        value: this.state.codeCompetition,
                                        onChange: this.handleChange('codeCompetition'),
                                    }}
                                    theme={{
                                        container: classes.container,
                                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                        suggestionsList: classes.suggestionsList,
                                        suggestion: classes.suggestion,
                                    }}
                                    renderSuggestionsContainer={options => (
                                        <Paper {...options.containerProps} square>
                                            {options.children}
                                        </Paper>
                                    )}
                                />
                            </FormControl>
                            <FormControl className={classes.formControlSeason}>
                                <InputLabel htmlFor="season">Season</InputLabel>
                                <Select
                                    value={this.state.season}
                                    onChange={this.handleChangeSeason}
                                    inputProps={{
                                        name: 'season',
                                        id: 'season',
                                    }}
                                >
                                    <MenuItem value={2019}>2019</MenuItem>
                                    <MenuItem value={2018}>2018</MenuItem>
                                    <MenuItem value={2017}>2017</MenuItem>
                                    <MenuItem value={2016}>2016</MenuItem>
                                </Select>
                            </FormControl>
                            <IconButton 
                                aria-label="Search" 
                                className={classes.iconSearch}
                                onClick={() => this.handleClickCompetitions()} 
                            >
                                <SearchIcon />
                            </IconButton>        
                        </div>
                    </Toolbar>
                </AppBar>
                <Grid container justify="center" className={classes.root}>
                    {competitionSeason.standings ?
                        competitionSeason.standings.length == 0 ?
                            <Grid item xs={12}>
                                <Paper className={classes.alert}>
                                    <Typography variant="h5" component="h3">
                                        Atenção
                                    </Typography>
                                    <Typography component="p">
                                        Sem informações para esse torneio
                                    </Typography>
                                </Paper>
                            </Grid>
                            :
                            <Grid item xs={12}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="left">Clube</TableCell>
                                            <TableCell align="left">Pts</TableCell>
                                            <TableCell align="left">VIT</TableCell>
                                            <TableCell align="left">E</TableCell>
                                            <TableCell align="left">D</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {renderRows(competitionSeason.standings)}
                                    </TableBody>
                                </Table>
                            </Grid>
                        :
                        <Grid item xs={12} className={classes.AppHeader}>
                            <img src={logo} className={classes.AppLogo} alt="logo" />
                        </Grid>

                    }
                </Grid>

            </React.Fragment>
        )
    }
}


const mapStateToProps = state => ({
    resultCompetitions: getResultCompetitions(state),
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getCompetitions,
            getResultCompetitions
        },
        dispatch
    );

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(HomePage);