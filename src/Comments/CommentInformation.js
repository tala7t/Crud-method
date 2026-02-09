import axios from 'axios';
import { useState, useEffect } from 'react';
import './comment.css';

export default function CommentInformation(){

    const [comment, setComment] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [body, setBody] = useState('');
    const [show, setShow] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() =>{
        axios.get("https://jsonplaceholder.typicode.com/posts/1/comments")
        .then(res => setComment(res.data));
    })

const addcomment = () =>{       
setShow(false);
        axios.post("https://jsonplaceholder.typicode.com/posts/1/comments", {
        name,
        email,
        body
        })
            .then(res => {
        setComment([res.data, ...comment]);
        setName('');
        setEmail('');
        setBody('');
})
    }
    
    return(

        <>
        </>

    );
}