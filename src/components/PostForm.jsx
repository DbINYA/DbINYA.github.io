import React, {useState} from "react"
import MyButton from "./UI/buttons/MyButton";
import MyInput from "./UI/inputs/MyInput";


const PostForm = ({create}) => {

    const [post, setPost] = useState({name: '', surname: '', picture: null})

    const AddNewPost = (e) => {
        e.preventDefault()
        create(post)
        setPost({name: '', surname: '', picture: null})
    }

    return (
        <form>
            <div>
            {post.picture && (
                <div>
                <img
                    alt="not found"
                    width={"250px"}
                    src={URL.createObjectURL(post.picture)}
                />
                <br />
                <MyButton onClick={e => setPost({...post, picture: null})}>Удалить</MyButton>
                </div>
            )}

            <br />
            <br />
            
            <MyInput
                type="file"
                name="myImage"
                onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                        setPost({...post, picture: file});
                    } else {
                        setPost({...post, picture: null});
                    }
                }}
            />
            </div>

            <MyInput 
            value={post.name}
            onChange={e => setPost({...post, name: e.target.value})}
            type="text" 
            placeholder="Имя" 
            />

            <MyInput 
            value={post.surname}
            onChange={e => setPost({...post, surname: e.target.value})}
            type="text" 
            placeholder="Фамилия" 
            />

            <MyButton onClick={AddNewPost}>Добавить в PDF</MyButton>
        </form>
    )
};

export default PostForm;
