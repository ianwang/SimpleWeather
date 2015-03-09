(function() {
  
  var app = window.app || {};

  var Board = React.createClass({
  
    displayName: 'Board',
    getInitialState: function() {
      return {
        city: 'Taipei' 
      }
    },

    render: function() {
      return (
        <div>this.state.city</div>  
      )
    }
    
  })


  React.render(<Board />, document.getElementById('react-container'));
})();
