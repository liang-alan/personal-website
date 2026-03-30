import React from 'react';

type NotePopupProps = {
    text: string;
};

const NotePopup: React.FC<NotePopupProps> = ({ text }) => {
    return <div className="note-popup">{text}</div>;
};

export default NotePopup;