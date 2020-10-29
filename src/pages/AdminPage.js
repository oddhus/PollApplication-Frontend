import React, { Component } from "react";
import Table from "../components/AdminPage/Table";
import PaginateButtons from "../components/AdminPage/PaginationButtons";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { TextField, withStyles } from "@material-ui/core/";
import { Typography, Grid, CircularProgress } from "@material-ui/core";
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
import { AlertDialog } from "../components/AlertDialog";
import _ from "lodash";
import { EditUserDialog } from "../components/EditUserDialog";
import { PollActiveFilterButtons } from "../components/AdminPage/PollActiveFilterButtons";
import { StatusBar } from "../components/StatusBar";

const USER_TITLES = "Username, roles";
const POLL_TITLES =
  "Id, Question, Duration, Start-time, Visibility Type, Owner";
const USER_ATTRIBUTES = ["username", "roles"];
const POLL_ATTRIBUTES = [
  "id",
  "question",
  "pollDuration",
  "startTime",
  "visibilityType",
  "owner",
];

const TYPE = {
  USERS: 0,
  POLLS: 1,
};

const styles = (theme) => ({
  loadingCircle: {
    margin: "0 42%",
    [theme.breakpoints.down(450)]: {
      margin: "0 30%",
    },
  },
});

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
      loading: true,
      alertDialogOpen: false,
      recourceToDelete: "",
      selectedUser: {},
      openEditUser: false,
      openStatusMessage: false,
      statusMessage: "",
      statusType: "success",
    };
    this.onClickView = this.onClickView.bind(this);
    this.setOpenResults = this.setOpenResults.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onPageChanged = this.onPageChanged.bind(this);
    this.onDeleteClicked = this.onDeleteClicked.bind(this);
    this.changeDeleteAlertVisibility = this.changeDeleteAlertVisibility.bind(
      this
    );
    this.onSave = this.onSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.setOpenEdituser = this.setOpenEdituser.bind(this);
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
    if (dataset.length > 0 && this.state.tabValue === TYPE.POLLS) {
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
    Promise.all([axios.get("/polls/admin"), axios.get("/users")])
      .then(([pollResult, userResult]) => {
        let polls =
          pollResult.data.length > 0
            ? categorizePolls(this.fixTime(pollResult.data))
            : [];
        let users = userResult.data.length > 0 ? userResult.data : [];
        this.setState({
          loading: false,
          originalPolls: polls,
          originalUsers: users,
          data: this.state.tabValue === TYPE.POLLS ? polls : users,
        });
      })
      .catch((e) => {
        this.setState({
          loading: false,
          openStatusMessage: true,
          statusMessage:
            "Error fetching users and polls. Error: " + e.response.status,
          statusType: "error",
        });
      });
  }

  onClickEdit(object) {
    if (this.state.tabValue === TYPE.USERS) {
      this.setState(
        {
          selectedUser: object,
        },
        () => {
          this.setOpenEdituser();
        }
      );
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

  onDeleteClicked(param) {
    let found = this.state.data.find((element) => element.id === param);
    this.setState(
      {
        recourceToDelete: found,
      },
      () => {
        this.changeDeleteAlertVisibility();
      }
    );
  }

  async handleDelete() {
    let path = this.state.tabValue === TYPE.USERS ? "/users/" : "/polls/";
    const recourceToDelete = this.state.recourceToDelete;
    const toDeleteFrom =
      this.state.tabValue === TYPE.USERS
        ? this.state.originalUsers
        : this.state.originalPolls;
    try {
      const response = await axios.delete(path + recourceToDelete.id);
      if (response.data) {
        this.changeDeleteAlertVisibility();
        let newList = this.deleteFromListById(toDeleteFrom);
        let newDataList = this.deleteFromListById(this.state.data);
        this.setState({
          originalUsers:
            this.state.tabValue === TYPE.USERS
              ? newList
              : this.state.originalUsers,
          originalPolls:
            this.state.tabValue === TYPE.POLLS
              ? newList
              : this.state.originalPolls,
          data: newDataList,
          openStatusMessage: true,
          statusMessage: path.slice(1, -2) + " sucsesfully deleted",
          statusType: "success",
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      this.setState({
        openStatusMessage: true,
        statusMessage:
          "Could not delete " +
          path.slice(1, -2) +
          " Error " +
          error.response.status,
        statusType: "error",
      });
    }
  }

  changeDeleteAlertVisibility() {
    this.setState({
      alertDialogOpen: !this.state.alertDialogOpen,
    });
  }

  setOpenResults(setOpen) {
    this.setState({
      openResults: setOpen,
    });
  }

  setOpenEdituser() {
    this.setState(
      {
        openEditUser: !this.state.openEditUser,
      },
      () => {}
    );
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

  setOpenStatusMessage(status) {
    this.setState({ openStatusMessage: status });
  }

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
    let dataToShow = [...this.state.originalUsers];
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

  async onSave(updatedUser) {
    this.setState({
      openEditUser: false,
    });
    try {
      const response = await axios.patch(
        "users/" + this.state.selectedUser.id,
        updatedUser
      );
      if (response.status === 200) {
        this.setState({
          data: this.state.data.map((el) =>
            el.id === updatedUser.id ? Object.assign(el, updatedUser) : el
          ),
          originalUsers: this.state.originalUsers.map((el) =>
            el.id === updatedUser.id ? Object.assign(el, updatedUser) : el
          ),
          openStatusMessage: true,
          statusMessage:
            this.state.selectedUser.username + " sucsessfuly updated!",
          statusType: "success",
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      this.setState({
        openStatusMessage: true,
        statusMessage:
          "Could not update " +
          this.state.selectedUser.username +
          " Error " +
          error.response.status,
        statusType: "error",
      });
    }
  }

  deleteFromListById(list) {
    _.reject(list, function (element) {
      return element.id === list.id;
    });
  }

  render() {
    const { classes } = this.props;
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
          <Tab disabled={this.state.loading} label="Users" />
          <Tab disabled={this.state.loading} label="Polls" />
        </Tabs>

        <StatusBar
          open={this.state.openStatusMessage}
          setOpen={this.setOpenStatusMessage.bind(this)}
          severity={this.state.statusType}
        >
          {this.state.statusMessage}
        </StatusBar>

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
            {this.state.tabValue === TYPE.POLLS ? (
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
          <Grid hidden={this.state.tabValue === TYPE.USERS} item>
            <TextField
              fullWidth
              placeholder="Owner"
              onChange={(e) => this.setOwnerFilter(e.target.value)}
              value={this.state.ownerFilter}
            ></TextField>
          </Grid>
        </Grid>
        {/* RADIO BUTTON FILTERS FOR POLL */}
        {this.state.tabValue === TYPE.POLLS && (
          <PollActiveFilterButtons
            btnsValue={this.state.radioBtnsValue}
            handleRadioBtnChange={this.handleRadioBtnChange}
          />
        )}
        {/* CONFIRM DELETE DIALOG */}
        <AlertDialog
          open={this.state.alertDialogOpen}
          setOpen={this.changeDeleteAlertVisibility}
          title={"Confirm delete"}
          button={"Delete"}
          onClick={this.handleDelete}
        >
          Are you sure you want to permanently delete "
          {this.state.tabValue === TYPE.USERS
            ? this.state.recourceToDelete.username
            : this.state.recourceToDelete.question}
          " ?
        </AlertDialog>

        {/* EDIT USER DIALOG */}
        <EditUserDialog
          open={this.state.openEditUser}
          setOpen={this.setOpenEdituser}
          user={this.state.selectedUser}
          onSave={this.onSave}
        ></EditUserDialog>
        {this.state.loading ? (
          <CircularProgress className={classes.loadingCircle} size={"6rem"} />
        ) : (
          <div>
            {/* THE DATA TABLE */}
            <Table
              coloumnTitles={
                this.state.tabValue === TYPE.USERS ? USER_TITLES : POLL_TITLES
              }
              data={this.getList()}
              attributes={
                this.state.tabValue === TYPE.USERS
                  ? USER_ATTRIBUTES
                  : POLL_ATTRIBUTES
              }
              onClickEdit={this.onClickEdit}
              onClickView={this.onClickView}
              onClickDelete={this.onDeleteClicked}
            />
            <Typography variant="h4" hidden={this.state.data.length > 0}>
              {this.state.tabValue === TYPE.USERS
                ? "Could not find any users"
                : "Could not find any polls"}
            </Typography>
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
        )}
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(AdminPage));
