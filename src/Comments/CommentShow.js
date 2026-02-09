import axios from 'axios';
import { useState, useEffect } from 'react';
import './comment.css';

export default function CommentShow(){

    const [comment, setComment] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [body, setBody] = useState('');
    const [show, setShow] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/posts/1/comments")
        .then(res => setComment(res.data));

    }, []) 
    const addcomment = () =>{
        
setShow(false)
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
    
    const updateComment = async(id) =>{

       try {
        let Comment=comment.map((item)=>{
            if(item.id===id)
            {
                item.name=name;
                item.email=email;
                item.body=body;
            }
            return item;
        })
                    setComment(Comment);

        await axios.put(`https://jsonplaceholder.typicode.com/posts/1/comments/${id}`,Comment)
        .catch(()=>{})
       } catch (error) {
        alert(error)
       }
    }




    const deleteComment = (id) =>{
        axios.delete(`https://jsonplaceholder.typicode.com/posts/1/comments/${id}`)
        .catch(() =>{})
        .then(() =>{
            setComment(comment.filter(e => e.id !== id))
        })
    }
    return(
        <>
        <div className='comment'>
                <h1>Comments</h1>
                <button onClick={()=>setShow(true)} className='btn-add'>Add Comments</button>
                {comment.map(comment =>(
                    <div className='show'>
                        <p><strong>Name: </strong>{comment.name}</p>
                        <p><strong>Email: </strong>{comment.email}</p>
                        <p><strong>Comment</strong>{comment.body}</p>
                        <div className='action'>
                            <button onClick={() => {
                                setShow(true) 
                                    setEditId(comment.id)
                            }} >Update</button>
                            <button onClick={() => deleteComment(comment.id)}>Delete</button>
                        </div>
                    </div>
                ))}
                    

        </div>

        {
            show &&
            <div className='model-overlay' onClick={() => setShow(false)}>
            <form  className='comment-form' onSubmit={(e) => e.preventDefault()}>
            <input type='text'
            placeholder='Name'
            value={name}
            onChange={e => setName(e.target.value)}/>

            <input type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}/>

            <textarea placeholder='Comment'
            value={body}
            onChange={e => setBody(e.target.value)}/>
            <div className='btn'>
            <button onClick={addcomment}>Add</button>
            <button onClick={()=>updateComment(editId)}>Edit</button>
            </div>
        </form>
        </div>
        }


        </>
    );
}