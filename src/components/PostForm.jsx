import React, {useState} from "react"
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput"

const PostForm = ({create}) => {

    const [post, setPost] = useState({title: '', content: ''})

    const AddNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: '', content: ''})
    }

    return (
        <form>

            <MyInput 
            value={post.title}
            onChange={e => setPost({...post, title: e.target.value})}
            type="text" 
            placeholder="Название поста" 
            />

            <MyInput 
            value={post.content}
            onChange={e => setPost({...post, content: e.target.value})}
            type="text" 
            placeholder="Описание поста" 
            />

            <MyButton onClick={AddNewPost}>Создать пост</MyButton>
        </form>
    )
};

export default PostForm;
