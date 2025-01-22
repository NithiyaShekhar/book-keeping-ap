import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBook } from '../../redux/actions/books/bookActions';

const AddBook = () => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const dispatch = useDispatch();

  // Get user info from Redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      category,
      title,
      author,
      createdBy: userInfo?._id, // Use optional chaining for safety
    };

    console.log('Data submitted:', data);
    dispatch(createBook(data));

    // Close the modal after submission
    closeModal();
  };

  return (
    <div className="row container-height">
      <div className="col-lg-6 col-md-6 m-auto">
        <div className="container">
          <button
            type="button"
            className="btn btn-primary"
            onClick={openModal}>
            Click to add Book
          </button>

          {showModal && (
            <div className="modal show d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Create Book</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={closeModal}
                      aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <h1 className="text-center">Add Book</h1>
                    <form onSubmit={formSubmitHandler}>
                      <fieldset>
                        <div className="form-group">
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="custom-select">
                            <option value="">Select Category</option>
                            <option value="programming">Programming</option>
                            <option value="religion">Religion</option>
                            <option value="life">Life</option>
                            <option value="culture">Culture</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="authorInput">Author</label>
                          <input
                            id="authorInput"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Author name"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="titleInput">Title</label>
                          <input
                            id="titleInput"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Book title"
                          />
                        </div>
                        <button type="submit" className="btn btn-warning m-auto">
                          Create Book
                        </button>
                      </fieldset>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBook;
