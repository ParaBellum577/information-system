import React, { useState, useEffect } from 'react';
import { AiOutlinePaperClip, AiOutlineClose } from 'react-icons/ai';
import { GoFile } from 'react-icons/go';
import { GrDocumentZip, GrDocumentText, GrDocumentWord } from 'react-icons/gr';
import { FiSend } from 'react-icons/fi';
import { createMessage } from 'actions/chat';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import buttons from 'src/components/buttons.module.scss'
import './Compose.css';

const actions = { createMessage };
const mapStateToProps = ({ user }) => ({ user });


const Compose = function ({ userId, conversationId, getMessages, t, socket }) {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [preview, setPreview] = useState('');

  const handleChangeMessage = e => {
    setMessage(e.target.value)
  }
  const keydownHandler = e => {
    if (e.keyCode === 13) sendMessage();
  }
  
const createMessage = async (data, id) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/message/createMessage',
        data,
        processData: true,
        params: {
          id
        }
      });
      socket.emit('message_send', res.data, conversationId);

    } catch (error) {
      console.log('createMessage error:', error);
    }
  };

  const sendMessage = async e => {
    e.preventDefault();
    if (message.trim() !== '' || selectedFile !== undefined) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('chatRoomId', conversationId);
      formData.append('messageText', message);
      formData.append('author', userId);
      await createMessage(formData, userId);
      setMessage('');
      getMessages(conversationId, userId);
      handleClearFiles();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  }, []);

  const handleSelectInput = () => {
    let element = document.querySelector('input[type="file"]');
    element.click();
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])
  
  const onSelectFile = e => {
    if (!e.target.files || _.isEmpty(e.target.files)) {
      setSelectedFile(undefined);
      return
    }
    setSelectedFile(e.target.files[0])
  }
  const handleClearFiles = () => {
    setSelectedFile(undefined);
  }

  
  const renderIcon = () => {
    const zip = ['ZIP', 'RAR', '7Z', 'ARC', 'ARJ', 'JAR'];
    const doc = ['ODT', 'OTT', 'TXT', 'EPUB', 'PDF'];
    const word = ['DOC', 'DOCX', 'DOTX'];
    const img = ['PNG', 'JPEG', 'TIFF', 'GIF', 'BMP', 'SVG'];
    if (selectedFile === undefined) return;
    const isDock = doc.some(a => selectedFile.name.indexOf(a.toLocaleLowerCase()) > -1) ? true : false;
    const isZip = zip.some(a => selectedFile.name.indexOf(a.toLocaleLowerCase()) > -1) ? true : false;
    const isWord = word.some(a => selectedFile.name.indexOf(a.toLocaleLowerCase()) > -1) ? true : false;
    const isImg = img.some(a => selectedFile.name.indexOf(a.toLocaleLowerCase()) > -1) ? true : false;

    if (isDock) {
      return <div className="selected-block"><GrDocumentText size='80' />{selectedFile.name}</div>
    } else if (isZip) {
      return <div className="selected-block"><GrDocumentZip size='80' />{selectedFile.name}</div>
    } else if (isImg) {
      return  <img src={preview} />
    } else if (isWord) {
      return <div className="selected-block"><GrDocumentWord className="doc-icon" size='80' />{selectedFile.name}</div>
    } else {
      return <div className="selected-block"><GoFile size='80' />{selectedFile.name}</div>
    }
  }
  return (
    <div className="compose">
      <div className={!selectedFile ? 'preview-files-hidden' : 'preview-files-active'}>
        {selectedFile && renderIcon()}
        <AiOutlineClose className="close-icon" onClick={handleClearFiles} />
      </div>
      <form className="compose-form">
        <input
          type="text"
          className="compose-input"
          placeholder={t("Type a message")}
          value={message}
          onChange={handleChangeMessage}
          maxLength={255}
        />
        <AiOutlinePaperClip onClick={handleSelectInput} size="30" key="upload" />
        <input onChange={onSelectFile} style={{ display: 'none' }} type="file" name="file" />
        <button className={buttons.buttonSignIn} onClick={sendMessage} type="submit">{t('Send')}</button>
        <FiSend className="compose-send-button" size="25" onClick={sendMessage} />
      </form>
    </div>
  );
}

export default connect(mapStateToProps, actions)(Compose);
