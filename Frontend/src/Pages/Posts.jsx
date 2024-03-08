import React, { useState, useEffect } from 'react';
import Post from '../Component/Post';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Offcanvas from '../Component/Offcanvas';


function Posts() {
    const [page, setPage] = useState(0);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true)
    const url = process.env.REACT_APP_API_URL;

    const handleClick = () => {
        setPage(prevPage => (prevPage < 7) ? prevPage + 1 : 0);
        if (posts.length > 300) {
            setHasMore(false);
        }
    };
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            console.log('hi')
            try {
                // Get token from local storage
                if (!token) {
                    // Handle case when token is not available
                    console.error('Token not found in local storage');
                    alert('user not logged in');
                    return;
                }

                const headers = new Headers();
                headers.append('Authorization', `Bearer ${token}`); // Corrected token format

                const response = await fetch(`${url}/post?page=${page}&limit=50`, {
                    headers: headers
                });
                const data = await response.json();
                // console.log(data);
                if (response.ok) {
                    setPosts((pre) => [...pre, ...data])
                } else {
                    // Handle non-ok response
                    console.error('Error:', response.status);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [page, token, url]); // Add page, token, and url as dependencies

    return (
        <div className=' overflow-hidden '>
            <Offcanvas />
            <h1 className=' text-center font-mono md:text-5xl  mt-3 font-bold pb-4 absolute top-0 right-[40vw]' >Posts Page</h1>
            {/* <button className=' border-l bg-blue-200 p-2 ' onClick={handleClick}>Click me {page}</button> */}
            {token ? <InfiniteScroll
                dataLength={posts.length} //This is important field to render the next data
                next={() => handleClick()}
                hasMore={hasMore}
                loader={<h4 className=' font-bold text-2xl mx-auto text-center'>Loading...</h4>}
                height={"90vh"}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }

            >
                <div>
                    <div className='  md:w-2/3 lg:w-2/4 mx-auto' >
                        {posts?.map((post, index) => (
                            <div key={index} className=' m-4 rounded-xl'>
                                <Post profileimg={post.owner.picture} title={post.owner.title} name={post.owner.firstName + post.owner.lastName} publishDate={post.publishDate} postimg={post.image} text={post.text} tags={post.tags} />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll> :
                <div className=' text-center mt-4'>
                    <p>User not logged in please login for view posts </p>
                    <button className=' bg-blue-500 rounded-lg mx-auto px-3 py-2 mt-4 block textxl' > <Link to='/login' className=' text-xl font-bold'> Login </Link>  </button>
                </div>
            }
        </div>
    );
}

export default Posts;
