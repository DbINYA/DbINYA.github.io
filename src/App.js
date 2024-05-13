import React, {useEffect, useState, useRef} from 'react';
import PostList from './components/PostList.jsx'
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import "./styles/App.css";
import MyModal from './components/UI/modals/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';
import { useFetching } from './hooks/useFetching'
import PostSevice from './API/PostService';
import Loader from './components/UI/loader/Loader';
import { getPageCount, getPagesArray } from './components/utils/pages';
import Pagination from './components/UI/pagination/Pagination';


function Posts() {


  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef()
  const observer = useRef(null)

  let pagesArray = getPagesArray(totalPages);
  const [fecthPosts, isLoadingPosts, postError] = useFetching(async() => {
    const response = await PostSevice.getALL(limit, page);
    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  });


  useEffect(() => {
    if (isLoadingPosts) return;
    if(observer.current) observer.current.disconnect();
    var callback = function(entries, observe){
      if (entries[0].isIntersecting && page < totalPages){
        setPage(page + 1)
      }
    };
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(lastElement.current)  
  }, [isLoadingPosts])


  useEffect(() => {
    fecthPosts()
  }, [page])


  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }


  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }


  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter 
        filter={filter} 
        setFilter={setFilter}
      />
      {postError &&
        <h1>Произошла ошибка ${postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты"/>
      <div ref={lastElement} style={{height: 20, background: 'red'}}/>
      {isLoadingPosts &&
        <div style={{display: "flex", justifyContent: "center", marginTop: 50}}>
            <Loader/>
        </div>
      }
      
      <Pagination 
      page={page}
      changePage={changePage}
      totalPages={totalPages}/>      
    </div>
  );
}

export default Posts;