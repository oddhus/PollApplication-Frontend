import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';


const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const styles = theme => ({
  pagination: {
    color: '#ffffff',
    display: 'flex',
  },
  button: {
    backgroundColor: '#ffffff',
    color: '#445565',
  },
  buttonActive: {
    backgroundColor: '#e3e7eb',
  },
});

class PaginateButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: 1,
      pageNeighbours: 0,
    };

    const {totalPages = null, pageNeighbours = 0} = props;
    this.state.totalPages = typeof totalPages === 'number' ? totalPages : 0;
    this.pageNeighbours = Math.max(0, Math.min(pageNeighbours, 2));
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({totalPages: nextProps.totalPages})
  }

  componentDidMount() {
    this.setState({currentPage: 1});
    this.props.onRef(this)
  }

  goToStart = () => {
    this.setState({currentPage: 1})
  };

  gotoPage = page => {
    const {onPageChanged = f => f} = this.props;

    this.setState({currentPage: page}, () => onPageChanged(page));
  };

  handleClick = page => evt => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = evt => {
    evt.preventDefault();
    let newPage = this.state.currentPage - (this.pageNeighbours * 2) - 1;
    if (newPage <= 0) {
      this.gotoPage(1)
    }
    else {
      this.gotoPage(newPage)
    }
  };

  handleMoveRight = evt => {
    evt.preventDefault();
    let newPage = this.state.currentPage + (this.pageNeighbours * 2) + 1;
    if (newPage >= this.state.totalPages) {
      this.gotoPage(this.state.totalPages)
    }
    else {
      this.gotoPage(newPage)
    }
  };

  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  fetchPageNumbers = () => {
    const {totalPages, currentPage} = this.state;
    const pageNeighbours = this.pageNeighbours;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (this.pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {

      const startPage = Math.max(1, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 1;
      const hasRightSpill = (totalPages - endPage) > 0;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [...pages];

    }

    return range(1, totalPages);

  };

  render() {
    const {currentPage} = this.state;
    const pages = this.fetchPageNumbers();
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <ul className={classes.pagination}>
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <li key={index} className={classes.pageItem}>
                  <Button
                    variant={'contained'}
                    className={classes.button}
                    onClick={this.handleMoveLeft}>
                    &laquo;
                  </Button>
                </li>
              );
            if (page === RIGHT_PAGE)
              return (
                <li key={index} className={classes.pageItem}>
                  <Button
                    variant={'contained'}
                    className={classes.button}
                    onClick={this.handleMoveRight}>
                    &raquo;
                  </Button>
                </li>
              );

            return (
              <li
                key={index}
                className={currentPage === page ? classes.activeItem : classes.pageItem}>
                <Button
                  variant={'contained'}
                  className={currentPage === page ? classes.buttonActive : classes.button}
                  onClick={this.handleClick(page)}>
                  {page}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    );

  }
}

PaginateButtons.propTypes = {
  pageNeighbours: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default withStyles(styles)(PaginateButtons);