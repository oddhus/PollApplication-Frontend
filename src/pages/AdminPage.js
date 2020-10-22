import React, { Component } from "react";
import Table from "../components/AdminPage/Table"
import PaginateButtons from "../components/AdminPage/PaginationButtons"


class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onPageChanged = () => {
    console.log("ads")
  }
  render() {
    return (
      <div>
        <Table
          coloumnTitles={
            'Title test 1, ' +
            'Title test 2, ' +
            'Title test 3, ' +
            'Title test 4'
          }
          data={[
            {
              "log_id": "3",
              "username": "bjarne",
              "point_in_time": "2019-03-12 00:00:00",
              "activity": "Changed password",
              "parameters": " "
            },
            {
              "log_id": "2",
              "username": "admin",
              "point_in_time": "2019-03-12 08:08:09",
              "activity": "Created password for user",
              "parameters": "username: bjarne"
            },
            {
              "log_id": "1",
              "username": "admin",
              "point_in_time": "2019-03-12 08:08:08",
              "activity": "Retrieved log information",
              "parameters": " "
            }
          ]
          } />
        <PaginateButtons totalPages={2} onRef={ref => (this.paginateButtons = ref)} pageNeighbours={2} onPageChanged={this.onPageChanged} />
      </div>
    )
  }
}

export default AdminPage