import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Chat = (props) => { 
    const { socket } = props;
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('users_in_chat', (data) => {
            console.log(data);
            setUsers(data);
        });
        socket.on('messages', (data) => {
            setMessages(data);
        });
    }, [socket]);

    const submitHandler = (e) => {
        e.preventDefault();
        socket.emit('new_message', message);
        setMessage('');
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="card shadow-lg border-primary">
                        <div className="card-body bg-light">
                            <h1 className="card-title text-center text-primary mb-4">Chat Room</h1>

                            {/* Users List */}
                            <div className="mb-4">
                                <h4 className="text-success">Users in Chat</h4>
                                <ul className="list-group">
                                    {users.map((user, index) => (
                                        <li key={index} className="list-group-item list-group-item-info">
                                            {user}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Messages List */}
                            <div className="mb-4">
                                <h4 className="text-info">Messages</h4>
                                <div className="list-group">
                                    {messages.map((msg, index) => (
                                        <div key={index} className="list-group-item list-group-item-light">
                                            <strong>User:</strong> {msg}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Message Input Form */}
                            <form onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label text-secondary">Message</label>
                                    <input 
                                        type="text" 
                                        id="message"
                                        className="form-control border-primary" 
                                        onChange={(e) => setMessage(e.target.value)} 
                                        value={message} 
                                        placeholder="Type your message..."
                                    />
                                </div>
                                <button type="submit" className="btn btn-success w-100">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;

