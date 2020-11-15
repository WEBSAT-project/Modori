import axios from "axios";
import React, { useEffect, useState } from "react";
import MainBody from "../components/Main/MainBody";
import Post from "../components/Main/Post";

const SERVER = "http://10.80.163.169:8080";

const MainBodyContainer = ({ data }) => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getPosts = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${SERVER}/`);
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getPosts().then((response) => {
            setIsLoading(false);
            setPosts(response.result);
            // setPosts({
            //     ...posts,
            //     title: response.title,
            //     email: response.email,
            //     postTime: response.post_time,
            //     updateTime: response.update_time,
            //     postText: response.text,
            // });
        });
    }, []);
    // const { title, email, postTime, updateTime, postText } = posts;
    const postList = posts.map((post, index) => {
        return <Post post={post} key={post.Post_Code} />;
    });

    return (
        <MainBody
            postList={postList}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
        />
    );
};

export default MainBodyContainer;
