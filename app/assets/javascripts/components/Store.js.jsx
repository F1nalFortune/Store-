var Store = React.createClass({
  getInitialState: function() {
    return { items: this.props.items};
  },

  componentDidMount: function() {
    this.refreshStore();
  },


  showAddForm: function() {
    this.setState({ showAdd: !this.state.showAdd});
  },

  addItemForm: function() {
    if(this.state.showAdd){
      return(<div>
              <form onSubmit={this.submitItem}>
                <div className='input-field'>
                  <input autoFocus='true' placeholder='add item' type='text' onChange={this.addItemName} />
                  <button className='btn waves effect' type='submit'>Save</button>
                </div>
              </form>
            </div>);

    }
  },

  addItemName: function(e) {
    this.setState({ itemName: e.currentTarget.value });
  },

  submitItem: function(e) {
    e.preventDefault();
    var name = this.state.itemName;
    var self = this;
    $.ajax({
      url: '/items',
      type: 'POST',
      data: { item: { name: name }},
      success: function(data) {
        var items = self.state.items;
        items.push(data);
        self.setState({ items: items, showAdd: false, itemName: null });
      }
    });
  },

  refreshStore: function() {
    var self = this;
    $.ajax({
      url: '/items',
      type: 'GET',
      success: function(data) {
        self.setState({ items: data });
      }
    });
  },

  displayItems: function() {
    var items = [];
    for(var i = 0; i < this.state.items.length; i++){
      var item = this.state.items[i];
      var key = "Item-" + item.id;
      items.push(<Item id={item.id} refreshStore={this.refreshStore} key={key} name={item.name} />);
    }
    return items;
  },

  render: function() {
    return(<div>
            <a className='waves-effect waves-light btn' onClick={this.showAddForm}>Add Item</a>
            {this.addItemForm()}
            <div className='card blue-grey darken-1'>
              <div className='card-content white-text'>
                <span className='card-title'>Store Products</span>
                {this.displayItems()}
              </div>
            </div>
          </div>);
  }

});