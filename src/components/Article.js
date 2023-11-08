import React, { useState } from "react";
import axios from "axios";

const Article = ({ article }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState("");
    const dateFormater = (date) => {
        return new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        });
    }

    const handleEdit = () => {
        const data = {
            author: article.author,
            content: editContent ? editContent : article.content,
            date: article.date,
            update : Date.now(),
        };

        axios.put(`http://localhost:3004/articles/${article.id}`, data).then(() => {
            setIsEditing(false);
            
        })

        }
    
    const handleDelete = () => {
        axios.delete(`http://localhost:3004/articles/${article.id}`)
        setTimeout(window.location.reload(), 1000);
    }
    

    return (
        <div 
            className="article" key={article.id} 
            style={{ background: isEditing ? "#f3feff" : "white" }}
            >
            <div className="card-header">
                <h3>{article.author}</h3>
                <em>Posté le {dateFormater(article.date)}</em>
            </div>
            {isEditing ? (
                <textarea
                    defaultValue={editContent ? editContent : article.content}
                    autoFocus
                    onChange={(e) => setEditContent(e.target.value)}
                ></textarea>
            ) : (
                <p>{editContent ? editContent : article.content}</p>
            )}
            <div className="btn-container">
                {
                    isEditing ? (
                        <button onClick={() => handleEdit()}>Valider</button>) : (
                        <button onClick={() => setIsEditing(true)}>Edit</button>)
                }

                <button onClick={
                    () => {
                        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
                            handleDelete();
                            
                        }
                    }
                }>Suprimer</button>
            </div>
        </div>
    );
};

export default Article;