import React from 'react';
import '../home.css';
import { CategoryService } from '../services/Category.service'
import NoteService from '../services/Notes.service'

export class Home extends React.Component {


	constructor(props) {
		super(props);
		this.categoryService = new CategoryService();
		this.noteService = new NoteService();
		this.state = { categoryList: [], notes: { title: '', category: '', notes: '', id: null }, noteList: [] };

	}
	async componentDidMount() {


		this.getNotes();
		// this function gets the list of notes for table

		this.getCategoriesList();
		// to render the categories on dropdown.


	}

	async getCategoriesList() {


		const response = await this.categoryService.getCategories();
		const jsonResp = await response.json();


		if (response.status === 200) {
			this.setState({ categoryList: jsonResp.data.category });
			return;
		}

		this.checkStatus(response.status);
	}

	checkStatus(statusCode) {
		// we check the status that our login is expired or not.
		// in the case login is expire we get 401 so we remove the toke and redirect to login page.

		if (statusCode === 401) {
			alert('TOKEN EXPIRED PLEASE LOGIN BACK.');
			this.props.history.push('/login');
			return;
		}
	}

	async getNotes() {

		const getListResponse = await this.noteService.renderList();
		const listResponse = await getListResponse.json();

		if (getListResponse.status === 200) {
			this.setState({ noteList: listResponse.data.contribution });
			return;
		}

		this.checkStatus(getListResponse.status);

	}

	//  to save and update the values of form into the database.
	async saveValues(event) {
		event.preventDefault();

		if (this.state.notes.id) {
			const response = await this.noteService.updateNote({ ...this.state.notes });
			if (response.status === 200) {
				alert('notes updated successfully');
			} else {
				this.checkStatus(response.status);
				return;
			}


		} else {
			const response = await this.noteService.addNewNote({ ...this.state.notes});
			if (response.status === 200) {
				alert('notes created successfully');
			} else {
				this.checkStatus(response.status);
				return;
			}

		}


		this.setState((currentState) => ({ ...currentState, notes: { notes: '', title: '', id: null, category: '' } }));
		this.getNotes();



	}

	updateTitle(event) {
		const value = event.target.value;

		this.setState(currentState => {
			return {
				...currentState, notes: { ...currentState.notes, title: value }
			};
		});


	}


	updateNote(event) {
		const value = event.target.value;

		this.setState(currentState => {
			return {
				...currentState, notes: { ...currentState.notes, notes: value }
			};
		});
	}

	async deleteNoteBtId(id) {

		const deleteResponse = await this.noteService.deleteNote(id);
		if (deleteResponse.status === 200) {
			alert('note deleted successfully');
			this.getNotes();
		}

	}


	async editNoteId(noteObject) {

		this.setState((currentState) => {
			return {
				...currentState, notes: { ...noteObject, category: noteObject.category.id }
			}
		});

	}


	onUpdateSelectValue(ev) {
		const value =ev.target.value;
		this.setState((oldState)=> {
			
			return {
				...oldState,
				notes: {...oldState.notes, category: value}
			}

		});		
	}

	render() {

		return (
			<div>

				<div className="jumbotron">
					<div className="container">

						<div className="row">

							<div className="col-12">

								<div className="row">

									<div className="col-12 m-auto">

										<div className="row">

											<form className="col-12" onSubmit={this.saveValues.bind(this)}>
												<div className="form-row">
													<div className="form-group col-md-6">
														<label htmlFor="inputEmail4">title</label>
														<input type="text" className="form-control" id="inputEmail4" value={this.state.notes.title || ''}
															onChange={this.updateTitle.bind(this)} />
													</div>


													<div className="form-group col-md-6">
														<label htmlFor="inputState">Category</label>
														<select id="inputState" className="form-control" value={this.state.notes.category} 
														onChange={this.onUpdateSelectValue.bind(this)}>
															<option defaultValue>Choose...</option>
															{/* <option>...</option> */}
														 {this.state.categoryList.map(cat=> {
															 return (
															 <option value={cat.id} key={cat.id}>{cat.name}</option>
															 )
														 })}
														 </select>
													</div>


												</div>
												<div className="form-group">
													<label htmlFor="inputAddress">Notes</label>
													<input type="text" className="form-control" id="inputAddress" placeholder="Type your notes here"
														value={this.state.notes.notes || ''} onChange={this.updateNote.bind(this)} />
												</div>


												<button type="submit" className="btn color-dark-green pull-right-side">Save</button>
											</form>

										</div>

									</div>

								</div>

							</div>
						</div>

					</div>
				</div>

				<div className="row">
					<div className="col-12">

						<table className="table">
							<thead className="thead-dark">
								<tr>
									<th scope="col">title</th>
									<th scope="col">Note</th>
									<th scope="col">Category</th>
									<th scope="col">Created At</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>

								{this.state.noteList.map((each, indx) => {
									return (
										<tr key={indx}>
											<td>{each.title}</td>
											<td>{each.notes}</td>
											<td>{each.category.name || ''}</td>
											<td>{each.createdAt}</td>
											<td>
												<a href="javascript:void(0)" onClick={(indx) => { this.editNoteId(each) }}>edit</a>
												&nbsp;/&nbsp;
												<a href="javascript:void(0)" onClick={(event) => this.deleteNoteBtId(each.id)}>delete</a>

											</td>
										</tr>
									)
								})}


							</tbody>
						</table>

					</div>
				</div>

			</div>
		);

	}
}

