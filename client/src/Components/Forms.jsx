import React, { useState } from "react";
import axios from "axios";
import "../Styles/Forms.css";
import { base_url } from "../constants";

export const Forms = () => {
  const [name, setName] = useState("");
  const [publisher, setPublisher] = useState("");
  const [author, setAuthor] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async () => {
    const user_data = {
      name: name,
      publisher: publisher,
      availableQuantity: availableQuantity,
      totalQuantity: totalQuantity,
      totalPrice: totalPrice,
      totalWorth: (availableQuantity * totalPrice) / totalQuantity,
      publicationDate: publicationDate,
      author: author,
      username: localStorage.getItem("username"),
      address: address,
      status: "listed",
      listDate: new Date().toDateString(),
    };
    const response = await axios.post(
      `${base_url}/book`,
      user_data
    );
    console.log(response.data);
    if (response.data.success) {
      localStorage.setItem("username", response.data.userDetails.username);
      window.location.href = `/user`;
    }
  };

  return (
    <div className="form-container " id="donate">
      <h3>Enter Details :</h3>
      <form className="bookform">
        <div className="contleft">
          <div className="mb-3">
            <label for="bookName" className="form-label">
              Book Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="bookName"
              onChange={(e) => setName(() => e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label for="publicationDate" className="form-label">
              Publication Date :
            </label>
            <input
              type="date"
              className="form-control"
              id="publicationDate"
              onChange={(e) => setPublicationDate(() => e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="price" className="form-label">
              Total Price :
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              onChange={(e) => setTotalPrice(() => e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="address" className="form-label">
              Address :
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              onChange={(e) => setAddress(() => e.target.value)}
            />
          </div>
        </div>
        <div className="contright">
          <div className="mb-3">
            <label for="ndc" className="form-label">
              Author :
            </label>
            <input
              type="text"
              className="form-control"
              id="author"
              onChange={(e) => setAuthor(() => e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="availableQuantity" className="form-label">
              Available Quantity :
            </label>
            <input
              type="number"
              className="form-control"
              id="availableQuantity"
              onChange={(e) => setAvailableQuantity(() => e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="totalQuantity" className="form-label">
              Total Quantity :
            </label>
            <input
              type="number"
              className="form-control"
              id="totalQuantity"
              onChange={(e) => setTotalQuantity(() => e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="publisher" className="form-label">
              Publisher :
            </label>
            <input
              type="text"
              className="form-control"
              id="publisher"
              placeholder="Publisher Name..."
              onChange={(e) => setPublisher(() => e.target.value)}
            />
          </div>

        </div>
      </form>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <hr />
    </div>
  );
};
