import React from 'react';
import {deleteNote, fetchSingleNote} from '../actions';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import { Button, Modal, ModalBody } from 'reactstrap';

class NoteDetails extends React.Component {
    
    componentDidMount(){
        this.props.fetchSingleNote(this.props.match.params.id);
    }

    constructor(props){
        super(props);

        this.state = {
            modal: false,
            deleted: false,
        }

        this.toggle = this.toggle.bind(this);
    
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }
   

    deleted() {
        this.setState({
            deleted: !this.state.deleted
        })
    }

    handleDelete = event =>{
        event.preventDefault();
        this.props.deleteNote(this.props.currentNote._id);
        
        this.toggle();

        this.deleted();

        setTimeout(() => this.props.history.push('/'), 1500);
            
        }
    
    render(){
        
        console.log(this.props.currentNote);
        
    return (

        <div className = 'note-details'>
            <div className = 'edit-delete'>
            <Link to = {`/notes/edit/${this.props.currentNote._id}`}><span >edit</span></Link>
            <span onClick={this.toggle}>delete</span>
            </div>

            <h1>{this.props.currentNote.title}</h1>
            <p>{this.props.currentNote.textBody}</p>

           
            <Modal isOpen={this.state.modal} toggle={this.toggle} className='delete-modal'>
            <ModalBody>
                Are you sure you want to delete this?
                <div className = 'modal-buttons'>
                
                <Button color='danger' onClick={this.handleDelete}>Delete</Button>
                <Button color='info' onClick={this.toggle}>No</Button>
                </div>
            </ModalBody>
            </Modal>

            <Modal isOpen={this.state.deleted} toggle={this.deleted} className='deleted-modal'>
            <ModalBody>
                Note successfully deleted. Returning to notes view.
            </ModalBody>
            </Modal>

        </div>
    )
}
}


const mapStateToProps = state => {
    return {
      currentNote : state.currentNote
    }
  }
  
  export default withRouter(connect(mapStateToProps, {
    deleteNote,
    fetchSingleNote
  })(NoteDetails));
  