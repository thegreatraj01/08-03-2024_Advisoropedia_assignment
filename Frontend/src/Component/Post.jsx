import React from 'react';
import icon from './like.svg';

function Post({ profileimg, name, title, publishDate, postimg, text, tags }) {
    // console.log(name)

    const dateWithoutTime = publishDate.split("T")[0];

    return (
        <div className="bg-white rounded shadow p-4 overflow-hidden">
            <div className="flex mb-4 items-center">
                <img src={profileimg} className="rounded-full w-10 mr-4" alt="ms. Vanessa Ramos" />
                <div>
                    <div>{title} . {name}</div>
                    <small>{dateWithoutTime}</small>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="self-center">
                    <img src={postimg} className="object-cover w-full h-60" alt={text} />
                </div>
                <div className="self-center">
                    <small className="mb-4">{dateWithoutTime}</small>
                    <div className="mb-4">{text}</div>
                    <div className="flex flex-wrap text-xs mb-4">
                        {tags.map(tag => (
                            <div key={tag} className="px-2 py-1 border mr-1 mb-1 rounded bg-pink-600 text-white"> {tag}</div>
                        ))}


                    </div>
                    <div className="flex items-center">
                        <div className="w-5 mr-2 float-left">
                            <img src={icon} alt="like" />
                        </div>
                        242
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;