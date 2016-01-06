var Item = React.createClass({
  getInitialState: function() {
    return { edit: false };
  },

  toggleEdit: function() {
    this.setState({ edit: !this.state.edit });
  },


  edit: function() {
    return(<li>
            <div className='row'>
              <div className='col s10'>
                <form onSubmit={this.updateItem}>
                  <input autoFocus={true} type='text' defaultValue={this.props.name} ref='itemName' />
                </form>
              </div>
              <div className='col s2'>
                <a className='waves-effect waves-light btn' onClick={this.toggleEdit}>Cancel</a>
              </div>
            </div>
          </li>);
  },

  item: function() {
    var id = "item-" + this.props.id;
    var itemClass = 'col s9 ';
    return(<li>
            <div className='row'>
              <div onClick={this.toggleEdit} className={itemClass}>
                {this.props.name}
              </div>
              <div onClick={this.deleteItem} className='col s1'>
              X
              </div>
              <div onClick={this.checkItem} className='col s2'>
              </div>
            </div>
          </li>);
  },

  updateItem: function() {
    var name = ReactDom.findDOMNode(this.refs.itemName).value;
    var self = this;
    $.ajax({
      url: '/items/' + this.props.id,
      type: 'PUT',
      data: { item: {name: name }},
      success: function() {
        self.props.refreshStore();
      },
    });
  },

  deleteItem: function() {
    var self = this;
    $.ajax({
      url: '/items/' + this.props.id,
      type: 'DELETE',
      success: function() {
        self.props.refreshStore();
      }
    });
  },

  render: function() {
    if(this.state.edit) {
      return this.edit();
    } else {
      return this.item();
    }
  },
});