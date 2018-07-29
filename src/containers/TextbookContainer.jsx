import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import '../css/Textbook.css'

class TextbookTable extends React.Component {
  constructor() {
    super()
    this.state = {
      books: [],
    }
  }

  componentDidMount() {
    fetch('static/slader_data.json', {
    }).then((response) => {
      if (response.status !== 200) {
        console.log(`Looks like there was a problem. Status Code: ${response.status}`)
      }
      response.json().then((data) => {
        const books = data.map((book) => {
          return {
            date: book.DATE,
            url: <a href={book.URL}>{book.NAME}</a>,
            name: book.NAME,
            views: book.VIEWS,
          }
        })
        this.setState({ books })
      })
    })
  }

  render() {
    const { books } = this.state
    return (
      <div>
        <ReactTable
          columns={[
            {
              Header: 'Date',
              accessor: 'date',
            }, {
              Header: 'URL',
              accessor: 'url',
            }, {
              Header: 'Name',
              accessor: 'name',
            }, {
              Header: 'Views',
              accessor: 'views',
              width: 100,
            },
          ]}
          data={books}
          defaultPageSize={10}
        />
      </div>
    )
  }
}

ReactDOM.render(<TextbookTable />, document.getElementById('root'))
