var TodoList = React.createClass({
  render: function() {
    var self = this;

    var todosList = this.props.todos.map(function(t){
      var completeButton;

      if(!t.completed) {
        completeButton = (
          <button className="btn" id="complete"
            onClick={self.props.handleCompleted.bind(this, t._id)}>
            completed
          </button>
        )
      } else {
        completeButton = "";
      }

      return (
        <div id={t._id} className="panel panel-default">
          <div className="panel-header">
           { t.name }
          </div>
          <div className="panel-body">
            { t.description }
          </div>
          <div className="panel-body">
            { t.priority }
          </div>
          <div className="panel-footer">
            {t.dueDate}
          </div>
          <div className="panel-footer">
            <button className="btn btn-warning"
              onClick={self.props.handleDelete.bind(this, t._id)}>
              delete
            </button>
            &nbsp;
            <button className="btn btn-warning"
              onClick={self.props.handleEdit.bind(this, t._id)}>
              edit
            </button>
            &nbsp;
            {completeButton}
          </div>
        </div>
        )
    })
    return (
      <div>
        <p> { todosList } </p>
      </div>
      )
  }
});

var TodoForm = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      description: '',
      dueDate: '',
      priority: ''
    }
  },
  handleNameChange: function(e) {
    this.setState({
      name: e.target.value
    })
  },
  handleDescriptionChange: function(e) {
    this.setState({
      description: e.target.value
    })
  },
  handlePriorityChange: function(e) {
    this.setState({
      priority: e.target.value
    })
  },
  handleDueDateChange: function(e) {
    this.setState({
      dueDate: e.target.value
    })
  },
  handleForm: function(e){
    e.preventDefault();
    var name = this.state.name;
    var description = this.state.description;
    var priority = this.state.priority;
    var dueDate = this.state.dueDate;
    this.props.handleSubmit({
      name: name, description: description, dueDate: dueDate, priority: priority
    });
    this.setState({
      name: '',
      description: '',
      dueDate: '',
      priority: ''
    })
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.handleForm} method="" role="form">
          <legend>Add New Todo</legend>

          <div className="form-group">
            <input onChange={this.handleNameChange} value={this.state.name} type="text" className="form-control" id="" placeholder="name"/>
          </div>

          <div className="form-group">
            <input onChange={this.handleDescriptionChange} value={this.state.description} type="text" className="form-control" id="" placeholder="description"/>
          </div>

          <div className="form-group">
            <input onChange={this.handlePriorityChange} value={this.state.priority} type="Number" className="form-control" id="" placeholder="priority"/>
          </div>

          <div className="form-group">
            <input onChange={this.handleDueDateChange} value={this.state.dueDate} type="date" className="form-control" id="" placeholder="due date"/>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      )
  }
});

var App = React.createClass({

  getInitialState: function() {
    return {
      todos: []
    }
  },

  loadTodosFromServer: function() {
    var self = this;
    $.ajax({
      url: '/api/todos',
      method: 'GET'
    }).done(function(data){
        console.log(data)
        self.setState({
          todos: data
        })
    });
  },
  handleSubmit: function(todo) {
    var self = this;
    $.ajax({
      url: '/api/todos',
      method: 'POST',
      data: todo
    }).done(function(){
      self.loadTodosFromServer();
      console.log('posted todo to server!')
    })
  },
  handleDelete: function(id) {
    var id = id;
    var self = this;
    $.ajax({
      url: '/api/todos/' + id,
      method: 'DELETE'
    }).done(function(){
      console.log('deleted todo');
      self.loadTodosFromServer();
    })
  },
  handleCompleted: function(id) {
    var id = id;
    var self = this;
    $.ajax({
      url: '/api/todos/' + id,
      method: 'PUT'
    }).done(function(){
      console.log('updated');
      self.loadTodosFromServer();
    })
  },
  handleEdit: function(id) {
      console.log(id)
    React.render(<TodoForm/>, document.getElementById(id));

  },
  handleSave: function(id) {
    // var id = id;
    // var self = this;
    $.ajax({
      url: '/api/todos/' + id,
      method: 'PUT'
    }).done(function(){
      console.log('edited todo');
      // this.loadTodosFromServer();
    })
  },
  componentDidMount: function() {
    this.loadTodosFromServer();
  },
  render: function() {
    return (
      <div>
        <h3> Hello World! </h3>
        <TodoList handleDelete={ this.handleDelete }
                  todos={ this.state.todos }
                  handleEdit={ this.handleEdit }
                  handleCompleted={ this.handleCompleted }/>
        <TodoForm handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
});

React.render(<App/>, document.getElementById('app'));
