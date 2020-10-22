import React, { Component } from "react";
import Table from "../components/AdminPage/Table"
import PaginateButtons from "../components/AdminPage/PaginationButtons"
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import dummyUsers from "../data/dummyUsers.json"
import dummyPolls from "../data/dummyPolls.json"
import { Typography } from "@material-ui/core";

const userTitles = "Username, User nr"
const pollTitles = "Question, Name, Duration, Start-time, Visibility Type, Owner"

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 1,
      prPage: 10,
      firstElement: 0,
      lastElement: 10
    };
  }

  onPageChanged = page => {
    const elements = page * this.state.prPage
    let listSize = this.state.tabValue === 0 ? dummyUsers.length : dummyPolls.length
    let lastElement = elements > listSize ? listSize : elements
    let firstElement = elements < 0 ? 0 : elements - this.state.prPage

    console.log('elements: ' + elements)
    console.log('listSize: ' + listSize)
    console.log('lastElement: ' + lastElement)
    console.log('firstElement: ' + firstElement)

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

  setupData() {
    console.log('START')
    let objList = []
    let i = 0

    let questionList = ["Vue > React", "Deno > Node", "Pinapple on pizza", "Banana on pizza", "Dogs are better than cats"]
    let visibilityType = ["PUBLIC", "PRIVATE"]
    let ownerList = ["Bjarne", "Admin", "CoolCat101", "Error404", "Gitchub", "BeerPongMaster"]
    let pollNameList = ["Cool Poll", "best poll", "VOTE HERE :D ", "DONT VOTE!"]
    let startTimeList = ["1997-07-16T19:20:30.45", "2015-02-05T19:22:25.31", "2020-08-18T23:59:01.20", "2020-12-24T10:20:21.15"]
    let durationList = ["213", "23141234", "32598", "910237", "9264618"]

    while (i < 100) {
      let obj = {}
      obj['pollId'] = i
      obj['question'] = questionList[Math.floor(Math.random() * questionList.length)]
      obj['name'] = pollNameList[Math.floor(Math.random() * pollNameList.length)]
      obj['duration'] = durationList[Math.floor(Math.random() * durationList.length)]
      obj['start-time'] = startTimeList[Math.floor(Math.random() * startTimeList.length)]
      obj['visibilityType'] = visibilityType[Math.floor(Math.random() * visibilityType.length)]
      obj['owner'] = ownerList[Math.floor(Math.random() * ownerList.length)]
      objList.push(obj)
      i++
    }
    console.log(objList)
  }


  render() {
    return (
      <div>
        <Typography>
          Showing {this.state.lastElement} / {this.state.tabValue === 0 ? dummyUsers.length : dummyPolls.length}
        </Typography>
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
        <Table
          coloumnTitles={this.state.tabValue === 0 ? userTitles : pollTitles}
          data={this.getList()} />
        <PaginateButtons totalPages={this.getNumberOfPages()} pageNeighbours={2} onPageChanged={this.onPageChanged} />
      </div>
    )
  }
}

export default AdminPage