import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { GoFile } from 'react-icons/go';
import { GrDocumentZip } from 'react-icons/gr';
import { VscFilePdf } from 'react-icons/vsc';
import { AiOutlineFileWord } from 'react-icons/ai';
import './Message.css';
export default function Message(
  {
    data,
    isMine,
    startsSequence,
    endsSequence,
    showTimestamp
  }) {

  const renderIcon = () => {
    const zip = ['ZIP', 'RAR', '7Z', 'ARC', 'ARJ', 'JAR', 'RAR'];
    const word = ['DOC', 'DOCX', 'DOTX'];
    const img = ['PNG', 'JPEG', 'TIFF', 'GIF', 'BMP', 'SVG'];
    if (data.UploadFile === null) {
      return
    } else {
      const isPDF = data.UploadFile.fileType.indexOf('pdf') > -1 ? true : false;
      const isZip = zip.some(a => data.UploadFile.fileType.indexOf(a.toLocaleLowerCase()) > -1) ? true : false;
      const isWord = word.some(a => data.UploadFile.fileType.indexOf(a.toLocaleLowerCase()) > -1) ? true : false;
      const isImg = img.some(a => data.UploadFile.fileType.indexOf(a.toLocaleLowerCase()) > -1) ? true : false;
      const margin = data.messageText === '' ? {} : { marginBottom: '20px' }
      if (isPDF) {
        return (
          <div style={margin} className="file-preview">
            <VscFilePdf size='40' />
            {data.UploadFile.fileName}
            <br />
          </div>
        )
      } else if (isZip) {
        return (
          <div style={margin} className="file-preview">
            <GrDocumentZip size='40' />
            {data.UploadFile.fileName}
            <br />
          </div>
        )

      } else if (isImg) {
        return (
          <>
            <img src={data.UploadFile.filePath} alt="img" />
            <br />
          </>
        )
      } else if (isWord) {
        return (
          <div style={margin} className="file-preview">
            <AiOutlineFileWord size='40' />
            {data.UploadFile.fileName}
            <br />
          </div>
        )
      } else {
        return (
          <div style={margin} className="file-preview">
            <GoFile size='40' />
            {data.UploadFile.fileName}
            <br />
          </div>
        )
      }
    }
  }
  const friendlyTimestamp = moment(data.timestamp).format('LLLL');
  return (
    <div className={[
      'message',
      `${isMine ? 'mine' : ''}`,
      `${startsSequence ? 'start' : ''}`,
      `${endsSequence ? 'end' : ''}`
    ].join(' ')}>
      {
        showTimestamp &&
        <div className="timestamp">
          {friendlyTimestamp}
        </div>
      }

      <div className="bubble-container">
        <div className="bubble" title={friendlyTimestamp}>
          {
            data.UploadFile !== null &&
            renderIcon()
          }
          {data.messageText}
        </div>
      </div>
    </div>
  );
}