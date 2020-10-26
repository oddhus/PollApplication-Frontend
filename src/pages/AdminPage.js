import React, { Component } from "react";
import Table from "../components/AdminPage/Table";
import PaginateButtons from "../components/AdminPage/PaginationButtons";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { TextField } from "@material-ui/core/";
import dummyPolls from "../data/dummyPolls.json";
import {
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
} from "@material-ui/core";
import {
  getDaysHoursMinFroSec,
  getSecondsFromDdHhMm,
} from "../utils/calculateTime";
import { ResultModal } from "../components/ResultModal";
import { ResultChart } from "../components/ResultChart";
import { withRouter } from "react-router-dom";
import {
  filterList,
  categorizePolls,
  filterCategory,
} from "../utils/categorizePolls";
import axios from "axios";

const USER_TITLES = "Username, User nr";
const POLL_TITLES =
  "Id, Question, Duration, Start-time, Visibility Type, Owner";
const USER_ATTRIBUTES = ["username", "id"];
const POLL_ATTRIBUTES = [
  "id",
  "question",
  "pollDuration",
  "startTime",
  "visibilityType",
  "owner",
];

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 1,
      prPage: 10,
      firstElement: 0,
      lastElement: 10,
      currentPage: 1,
      openResults: false,
      data: [],
      originalPolls: [],
      originalUsers: [],
      questionFilter: "",
      ownerFilter: "",
      usernameFilter: "",
      radioBtnsValue: "all",
      selectedPollId: null,
    };
    this.onClickView = this.onClickView.bind(this);
    this.setOpenResults = this.setOpenResults.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onPageChanged = this.onPageChanged.bind(this);
  }

  onPageChanged = (page) => {
    const elements = page * this.state.prPage;
    let lastElement =
      elements > this.state.data.length ? this.state.data.length : elements;
    let firstElement = elements < 0 ? 0 : elements - this.state.prPage;

    this.setState({
      firstElement: firstElement,
      lastElement: lastElement,
      currentPage: page,
    });
  };

  handleChange = (event, newValue) => {
    this.setState({
      tabValue: newValue,
      firstElement: 0,
      lastElement: 10,
      data:
        newValue === 1 ? this.state.originalPolls : this.state.originalUsers,
      questionFilter: "",
      ownerFilter: "",
      radioBtnsValue: "all",
    });
  };

  getNumberOfPages() {
    return Math.ceil(this.state.data.length / this.state.prPage);
  }

  getList() {
    return this.state.data.slice(
      this.state.firstElement,
      this.state.lastElement
    );
  }

  fixTime(dataset) {
    if (dataset.length > 0 && this.state.tabValue === 1) {
      let newDataset = [];
      for (const obj of dataset) {
        if (obj["pollDuration"] !== undefined && !isNaN(obj["pollDuration"])) {
          obj["pollDuration"] = getDaysHoursMinFroSec(
            parseInt(obj["pollDuration"])
          );
          newDataset.push(obj);
        }
      }
      return newDataset.length > 0 ? newDataset : dataset;
    }
  }

  componentDidMount() {
    Promise.all([axios.get("/polls/admin"), axios.get("/users")]).then(
      ([pollResult, userResult]) => {
        this.setState({
          originalPolls: categorizePolls(this.fixTime(pollResult.data)),
          originalUsers: userResult.data,
          data: this.state.tabValue === 1 ? categorizePolls(this.fixTime(pollResult.data)) : userResult.data
        })
      }
    )
  }

  onClickEdit(object) {
    if (this.state.tabValue === 0) {
      // EDIT USER
    } else {
      let objToEdit = { ...object };
      let stringArray = objToEdit["pollDuration"].split(" ");
      let dd = stringArray[0];
      let hh = stringArray[2];
      let mm = stringArray[4];
      objToEdit["duration"] = getSecondsFromDdHhMm(dd, hh, mm);
      this.props.history.push({
        pathname: `/polls/${objToEdit.id}`,
        state: objToEdit,
      });
    }
  }

  onClickView(param) {
    this.setState({
      selectedPollId: param,
    });
    this.setOpenResults(true);
  }

  onClickDelete(param) {}

  setOpenResults(setOpen) {
    this.setState({
      openResults: setOpen,
    });
  }

  setQuestionFilter(keyWord) {
    this.setState(
      {
        questionFilter: keyWord,
      },
      () => {
        this.applyPollFilters();
      }
    );
  }

  setOwnerFilter(ownerName) {
      this.setState(
        {
          ownerFilter: ownerName,
        },
        () => {
          this.applyPollFilters();
        }
      );
  }

  handleRadioBtnChange = (e) => {
    this.setState(
      {
        radioBtnsValue: e.target.value,
      },
      () => {
        this.applyPollFilters();
      }
    );
  };

  applyPollFilters() {
    let dataToShow = [...this.state.originalPolls];
    dataToShow = filterList(dataToShow, this.state.questionFilter, "question");
    dataToShow = filterList(dataToShow, this.state.ownerFilter, "owner");
    dataToShow =
      this.state.radioBtnsValue === "all"
        ? dataToShow
        : filterCategory(dataToShow, parseInt(this.state.radioBtnsValue));
    this.setState(
      {
        data: dataToShow,
      },
      () => {
        this.onPageChanged(1);
        this.paginateButtons.goToStart();
      }
    );
  }

  setUsernameFilter(username) {
    let dataToShow = [...this.state.originalusers];
    this.setState(
      {
        data: filterList(dataToShow, username, "username"),
        usernameFilter: username,
      },
      () => {
        this.onPageChanged(1);
        this.paginateButtons.goToStart();
      }
    );
  }

  render() {
    return (
      <div>
        {/* TABS */}
        <Tabs
          value={this.state.tabValue}
          onChange={this.handleChange}
          indicatorColor="secondary"
          textColor="primary"
          centered
        >
          <Tab label="Users" />
          <Tab label="Polls" />
        </Tabs>

        {/* POLL RESULT POPUP */}
        <ResultModal
          open={this.state.openResults}
          setOpen={this.setOpenResults}
          header={this.state.selectedPollQuestion}
        >
          <ResultChart id={this.state.selectedPollId} />
        </ResultModal>

        {/* 1/100 - THINGY */}
        <Typography>
          Showing{" "}
          {this.state.lastElement > this.state.data.length
            ? this.state.data.length
            : this.state.lastElement}{" "}
          / {this.state.data.length}
        </Typography>

        {/* TEXT FILTERS */}
        <Grid container direction="row" justify="space-between">
          <Grid item>
            {this.state.tabValue === 1 ? (
              <TextField
                fullWidth
                placeholder="Question"
                onChange={(e) => this.setQuestionFilter(e.target.value)}
                value={this.state.questionFilter}
              ></TextField>
            ) : (
              <TextField
                fullWidth
                placeholder="Name"
                onChange={(e) => this.setUsernameFilter(e.target.value)}
                value={this.state.usernameFilter}
              ></TextField>
            )}
          </Grid>
          <Grid hidden={this.state.tabValue === 0} item>
            <TextField
              fullWidth
              placeholder="Owner"
              onChange={(e) => this.setOwnerFilter(e.target.value)}
              value={this.state.ownerFilter}
            ></TextField>
          </Grid>
        </Grid>

        {/* RADIO BUTTON FILTERS FOR POLL */}
        {this.state.tabValue === 1 && (
          <RadioGroup
            row
            value={this.state.radioBtnsValue}
            onChange={this.handleRadioBtnChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel
              value="0"
              control={<Radio />}
              label="Not started"
            />
            <FormControlLabel value="1" control={<Radio />} label="Ongoing" />
            <FormControlLabel value="2" control={<Radio />} label="Finished" />
          </RadioGroup>
        )}

        {/* THE DATA TABLE */}
        <Table
          coloumnTitles={this.state.tabValue === 0 ? USER_TITLES : POLL_TITLES}
          data={this.getList()}
          attributes={
            this.state.tabValue === 0 ? USER_ATTRIBUTES : POLL_ATTRIBUTES
          }
          onClickEdit={this.onClickEdit}
          onClickView={this.onClickView}
          onClickDelete={this.onClickDelete}
        />
        <div hidden={this.state.prPage > this.state.data.length}>
          <PaginateButtons
            onRef={(ref) => (this.paginateButtons = ref)}
            currentPage={this.state.currentPage}
            totalPages={this.getNumberOfPages()}
            pageNeighbours={2}
            onPageChanged={this.onPageChanged}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(AdminPage);
