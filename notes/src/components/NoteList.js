import React from 'react';
import Note from './Note';
import {fetchNotes, authCheck} from '../actions/index';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';



class NoteList extends React.Component{

   componentDidMount(){
       if(this.props.isLoggedIn){
        this.props.fetchNotes();
       }
    }

    render(){
    return (
        <div className = 'note-list-container'>
            <h1>Your Notes:</h1>

        <div className = 'note-list'>
        <Link to ='/form'><div className = 'add-note-btn'>+</div></Link>
            {this.props.notes.map(note => {
                return <Note {...note} key = {note.id} />   
            })}

        </div>
        </div>
    )
}
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    }
  }
  
  export default withRouter(connect(mapStateToProps, {
      fetchNotes,
      authCheck
  })(NoteList));