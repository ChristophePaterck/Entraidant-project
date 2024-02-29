import { useState } from 'react';
import './Messagerie_module.scss';

function Messagerie() {
  const [messages, setMessages] = useState([]);

  function sendMessage(e) {
    e.preventDefault();
    const msg = {
      username: e.target.username.value,
      text: e.target.text.value
    };
    setMessages([...messages, msg]);
    e.target.username.value = '';
    e.target.text.value = '';
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Messenger</div>
              <hr/>
              <div className="messages">
                {messages.map((msg, index) => (
                  <div key={index}>{msg.username}: {msg.text}</div>
                ))}
              </div>
            </div>
            <form onSubmit={e => sendMessage(e)}>
              <div className="card-footer">
                <input id="username"
                       type="text"
                       placeholder="Username"
                       className="form-control"
                />
                <br/>
                <input id="text"
                       type="text"
                       placeholder="Your message"
                       className="form-control"
                />
                <br/>
                <button type="submit"
                        className="btn btn-primary form-control">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messagerie;
