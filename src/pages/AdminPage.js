import React, { Component } from "react";
import Table from "../components/AdminPage/Table"
import PaginateButtons from "../components/AdminPage/PaginationButtons"
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import dummyUsers from "../data/dummyUsers.json"
import dummyPolls from "../data/dummyPolls.json"
import { Typography } from "@material-ui/core";
import { getDaysHoursMinFroSec } from "../utils/calculateTime"
import { ResultModal } from '../components/ResultModal'
import { ResultChart } from '../components/ResultChart'

const userTitles = "Username, User nr"
const pollTitles = "Question, Name, Duration, Start-time, Visibility Type, Owner"

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 1,
      prPage: 10,
      firstElement: 0,
      lastElement: 10,
      openResults: false,
    };
    this.onClickView = this.onClickView.bind(this)
    this.setOpenResults = this.setOpenResults.bind(this)
  }

  onPageChanged = page => {
    const elements = page * this.state.prPage
    let listSize = this.state.tabValue === 0 ? dummyUsers.length : dummyPolls.length
    let lastElement = elements > listSize ? listSize : elements
    let firstElement = elements < 0 ? 0 : elements - this.state.prPage

    this.setState({
      firstElement: firstElement,
      lastElement: lastElement
    })
  }

  handleChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  getNumberOfPages() {
    return this.state.tabValue === 0 ? Math.ceil(dummyUsers.length / this.state.prPage) : Math.ceil(dummyPolls.length / this.state.prPage)
  }

  getList() {
    return this.state.tabValue === 0 ?
      dummyUsers.slice(this.state.firstElement, this.state.lastElement) : dummyPolls.slice(this.state.firstElement, this.state.lastElement)
  }

  fixTime(dataset) {
    let newDataset = []
    let object0 = dataset[0]
    if (object0['duration'] !== undefined) {
      for (const obj of dataset) {
        obj['duration'] = getDaysHoursMinFroSec(parseInt(obj['duration']))
        newDataset.push(obj)
      }
    }
  }

  componentDidMount(){
    this.fixTime(dummyPolls)
  }

  onClickEdit(param){
  }
  
  onClickView(param){
    this.setOpenResults(true)
  }
  
  onClickDelete(param){
  }

  setOpenResults(setOpen){
    this.setState({
      openResults: setOpen
    })
  }

  render() {
    return (
      <div>
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
        <Typography>
          Showing {this.state.lastElement} / {this.state.tabValue === 0 ? dummyUsers.length : dummyPolls.length}
        </Typography>
        <ResultModal
        open={this.state.openResults}
        setOpen={this.setOpenResults}
        header={this.state.selectedPollQuestion}
      >
        <ResultChart data={this.state.selectedPollVotes} />
      </ResultModal>
        <Table
          coloumnTitles={this.state.tabValue === 0 ? userTitles : pollTitles}
          data={this.getList()} 
          onClickEdit={this.onClickEdit}
          onClickView={this.onClickView}
          onClickDelete={this.onClickDelete}/>
        <PaginateButtons totalPages={this.getNumberOfPages()} pageNeighbours={2} onPageChanged={this.onPageChanged} />
      </div>
    )
  }
}

export default AdminPage